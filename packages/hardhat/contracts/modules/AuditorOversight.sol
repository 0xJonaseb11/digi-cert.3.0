// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from "../core/RolesManager.sol";
import { CertificationAuthority } from "../core/CertificationAuthority.sol";
import { InspectionManager } from "./InspectionManager.sol";
import { Events } from "../utils/Events.sol";
import { DataTypes } from "../utils/DataTypes.sol";
import { Errors } from "../utils/Errors.sol";

contract AuditorOversight {
    RolesManager public immutable rolesManager;
    CertificationAuthority public immutable certAuthority;
    InspectionManager public immutable inspectionManager;

    // ------- #Audit cases ---- //
    mapping(uint256 => DataTypes.AuditCase) private _auditCases;
    uint256 private _caseCounter;

    // ------- #Case parameters ------ //
    uint256 public constant AUDIT_DEPOSIT = 0.1 ether;
    uint256 public constant APPEAL_WINDOW = 7 days;

    constructor (
        address _rolesManager,
        address _certAuthority,
        address _inspectionManager
    ) {
        rolesManager = RolesManager(_rolesManager);
        certAuthority = CertificationAuthority(_certAuthority);
        inspectionManager = InspectionManager(_inspectionManager);

    }

    modifier onlyAuditor() {
        if (!(rolesManager.hasAuditorRole(msg.sender))) {
            revert Errors.RolesManager__NotAuthorizedAuditor();
        }
        _;
    }

    modifier onlyEnterpriseOwner(uint256 caseId) {
        if (msg.sender != _auditCases[caseId].targetEnterprise) {
            revert Errors.AuditorOversight__NotAuthorizedEnterpriseOwner();
        }
        _;
    }

    //////////////////////////////////////////////////
    /////// AUDIT CASE MANAGEMENT ///////////////////
    ////////////////////////////////////////////////
    
    function initiateAudit(
        address _targetEnterprise,
        uint256 _inspectionId,
        string calldata _reason,
        string calldata _evidenceURI
    ) external payable {
        if (!(certAuthority.isCertificationValid(_targetEnterprise))) {
            revert Errors.CertificationAuthority__EnterpriseNotCertifiedYet();
        }

        _caseCounter++;
        _auditCases[_caseCounter] = DataTypes.AuditCase({
            id: _caseCounter,
            targetEnterprise: _targetEnterprise,
            inspectionId: _inspectionId,
            auditor: msg.sender,
            reason: _reason,
            evidenceURI: _evidenceURI,
            depositAmount: msg.value,
            status: DataTypes.AuditStatus.Pending,
            createdAt: block.timestamp,
            resolvedAt: 0
        });

        emit Events.AuditInitiated(
            _caseCounter,
            _targetEnterprise,
            _inspectionId,
            msg.sender,
            _reason,
            _evidenceURI
        );
    }

    ////////////////////////////////////////////
    ////////// AUDIT RESOLUTION  //////////////
    //////////////////////////////////////////
    function resolveAudit(
        uint256 caseId,
        bool upholdDecision,
        string calldata remarks
    ) external onlyAuditor {
        DataTypes.AuditCase storage auditCase = _auditCases[caseId];

        if (auditCase.status != DataTypes.AuditStatus.Pending) {
            revert Errors.AuditorOversight__CaseNotPending();
        }
            auditCase.status = upholdDecision 
                ? DataTypes.AuditStatus.Upheld
                : DataTypes.AuditStatus.Rejected;
            auditCase.resolvedAt = block.timestamp;

            // -- take action if audit is upheld
            if (upholdDecision) {
                certAuthority.revokeCertification(auditCase.targetEnterprise);
                inspectionManager.flagInspection(auditCase.targetEnterprise, auditCase.inspectionId, remarks);
            }

            // ------ return deposit to auditor
            payable(auditCase.auditor).transfer(auditCase.depositAmount);
            
            emit Events.AuditResolved(
                caseId,
                auditCase.targetEnterprise,
                msg.sender,
                upholdDecision,
                remarks
            );     
        }

        //////////////////////////////////////////////
        /////// ENTERPRISE APPEAL ///////////////////
        ////////////////////////////////////////////
        function fileAppeal(
            uint256 caseId,
            string calldata counterEvidenceURI
        ) external onlyEnterpriseOwner(caseId) {
            DataTypes.AuditCase storage auditCase = _auditCases[caseId];

            if (block.timestamp > auditCase.createdAt + APPEAL_WINDOW) {
                revert Errors.AuditorOversight__AppealWindowClosed();
            }

            auditCase.status = DataTypes.AuditStatus.Appealed;

            emit Events.AppealFiled(
                caseId,
                msg.sender,
                counterEvidenceURI,
                block.timestamp
            );
        }

        ////////////////////////////////////////////
        ////////// CROSS-CONTRACT INTEGRATION /////
        //////////////////////////////////////////
        

        /////////////////////////////////////////
        /////// COMPREHENSIVE GETTERS //////////
        ////////////////////////////////////////
        
        function getActiveAudits() public view returns(DataTypes.AuditCase[] memory) {
            uint256 activeCount;

            for (uint256 i = 0; i <= _caseCounter; i++) {
                if (_auditCases[i].status == DataTypes.AuditStatus.Pending) {
                    activeCount++;
                }
            }

            DataTypes.AuditCase[] memory activeAudits = new DataTypes.AuditCase[](activeCount);
            uint256 index;

            for (uint256 i = 1; i <= _caseCounter; i++) {
                if (_auditCases[i].status == DataTypes.AuditStatus.Pending) {
                    activeAudits[index++] = _auditCases[i];
                }
            }
            return activeAudits;
        }
        
    }

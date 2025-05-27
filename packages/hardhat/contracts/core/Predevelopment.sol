// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {RolesManager} from "../core/RolesManager.sol";
import {CertificationAuthority} from "../core/CertificationAuthority.sol";
import {Events} from "../utils/Events.sol";
import {DataTypes} from "../utils/DataTypes.sol";

contract InspectionSystem {
    // Immutable system contracts
    RolesManager public immutable rolesManager;
    CertificationAuthority public immutable certAuthority;
    
    // Inspection relationships
    mapping(address => address[]) private _enterpriseInspectors;
    mapping(address => address[]) private _inspectorEnterprises;
    
    // Inspection reports storage
    mapping(address => DataTypes.InspectionReport[]) private _enterpriseReports;
    mapping(address => mapping(address => uint256)) private _lastInspectionTimestamps;

    constructor(address _rolesManager, address _certAuthority) {
        rolesManager = RolesManager(_rolesManager);
        certAuthority = CertificationAuthority(_certAuthority);
    }

    ///////////////////////////////////////////////
    //////// INSPECTOR ASSIGNMENT LOGIC ///////////
    ///////////////////////////////////////////////

    function assignInspector(
        address enterprise,
        address inspector,
        uint256 validityPeriod
    ) external onlyCertifier {
        require(
            certAuthority.isCertificationValid(enterprise),
            "Enterprise not certified"
        );
        require(
            rolesManager.hasInspectorRole(inspector),
            "Address not an inspector"
        );
        
        _enterpriseInspectors[enterprise].push(inspector);
        _inspectorEnterprises[inspector].push(enterprise);
        _lastInspectionTimestamps[enterprise][inspector] = block.timestamp + validityPeriod;

        emit Events.InspectorAssigned(
            enterprise,
            inspector,
            validityPeriod
        );
    }

    ///////////////////////////////////////////////
    //////// INSPECTION REPORTING LOGIC ///////////
    ///////////////////////////////////////////////

    function submitInspectionReport(
        address enterprise,
        bool passed,
        string calldata remarks,
        string calldata evidenceURI
    ) external onlyActiveInspector(enterprise) {
        require(
            block.timestamp <= _lastInspectionTimestamps[enterprise][msg.sender],
            "Inspection period expired"
        );

        DataTypes.InspectionReport memory report = DataTypes.InspectionReport({
            inspector: msg.sender,
            enterprise: enterprise,
            passed: passed,
            remarks: remarks,
            evidenceURI: evidenceURI,
            inspectedAt: block.timestamp
        });

        _enterpriseReports[enterprise].push(report);

        // Auto-revoke certification if failed
        if (!passed) {
            certAuthority.revokeCertification(enterprise);
        }

        emit Events.InspectionReportSubmitted(
            msg.sender,
            enterprise,
            passed,
            remarks,
            evidenceURI,
            block.timestamp
        );
    }

    ///////////////////////////////////////////////
    //////// ENHANCED ACCESS CONTROL /////////////
    ///////////////////////////////////////////////

    modifier onlyCertifier() {
        require(
            rolesManager.hasCertifierRole(msg.sender),
            "Only certifier"
        );
        _;
    }

    modifier onlyActiveInspector(address enterprise) {
        require(
            rolesManager.hasInspectorRole(msg.sender),
            "Not an inspector"
        );
        require(
            _isInspectorAssigned(enterprise, msg.sender),
            "Not assigned to enterprise"
        );
        require(
            block.timestamp <= _lastInspectionTimestamps[enterprise][msg.sender],
            "Inspection period expired"
        );
        _;
    }

    ///////////////////////////////////////////////
    //////// CROSS-CONTRACT VALIDATION ///////////
    ///////////////////////////////////////////////

    function _isInspectorAssigned(address enterprise, address inspector) 
        private 
        view 
        returns (bool) 
    {
        for (uint256 i = 0; i < _enterpriseInspectors[enterprise].length; i++) {
            if (_enterpriseInspectors[enterprise][i] == inspector) {
                return true;
            }
        }
        return false;
    }

    ///////////////////////////////////////////////
    //////// COMPREHENSIVE GETTERS ///////////////
    ///////////////////////////////////////////////

    function getEnterpriseInspectors(address enterprise) 
        public 
        view 
        returns (address[] memory, uint256[] memory validityPeriods) 
    {
        address[] memory inspectors = _enterpriseInspectors[enterprise];
        uint256[] memory periods = new uint256[](inspectors.length);
        
        for (uint256 i = 0; i < inspectors.length; i++) {
            periods[i] = _lastInspectionTimestamps[enterprise][inspectors[i]];
        }
        
        return (inspectors, periods);
    }

    function getInspectorReports(address inspector) 
        public 
        view 
        returns (DataTypes.InspectionReport[] memory) 
    {
        address[] memory enterprises = _inspectorEnterprises[inspector];
        uint256 totalReports;
        
        // First pass: count reports
        for (uint256 i = 0; i < enterprises.length; i++) {
            totalReports += _enterpriseReports[enterprises[i]].length;
        }
        
        // Second pass: collect reports
        DataTypes.InspectionReport[] memory reports = new DataTypes.InspectionReport[](totalReports);
        uint256 counter;
        
        for (uint256 i = 0; i < enterprises.length; i++) {
            for (uint256 j = 0; j < _enterpriseReports[enterprises[i]].length; j++) {
                if (_enterpriseReports[enterprises[i]][j].inspector == inspector) {
                    reports[counter++] = _enterpriseReports[enterprises[i]][j];
                }
            }
        }
        
        return reports;
    }
}
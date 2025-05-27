// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from "../core/RolesManager.sol";
import { CertificationAuthority } from "../core/CertificationAuthority.sol";
import { Events } from "../utils/Events.sol";
import { DataTypes } from "../utils/DataTypes.sol";

contract InspectionManager is RolesManager {
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



    ////////////////////////////////////////
    //////// ENHANCED ACCESS CONTROL //////
    //////////////////////////////////////

        modifier onlyCertifier() {
        if (!hasCertifierRole(msg.sender)) {
            revert RolesManager__NotAuthorizedCertifier();
        }
        _;
    }

    modifier onlyActiveInspector(address enterprise) {

        if (!hasInspectorRole(msg.sender)) {
            revert RolesManager__NotAuthorizedInspector();
        }

        if (!_isInspectorAssigned(enterprise, msg.sender)) {
            revert InspectionManager__NotAssignedToEnterprise();
        }

        if (block.timestamp > _lastInspectionTimestamps[enterprise][msg.sender]) {
            revert InspectionManager__InspectionPeriodExpired();
        }
        _;
    }



    ////////////////////////////////////////////
    ////////// INSPECTOR ASSIGNMENT ///////////
    ///////////////////////////////////////////
    function assignInspector(
        address enterprise,
        address inspector,
        uint256 validityPeriod
    ) external onlyCertifier {

        if (!certAuthority.isCertificationValid(enterprise)) {
            revert CertificationAuthority__EnterpriseNotCertifiedYet();
        }

        if (!hasInspectorRole(inspector)) {
            revert RolesManager__NotAuthorizedInspector();
        }

        _enterpriseInspectors[enterprise].push(inspector);
        _inspectorEnterprises[inspector].push(enterprise);
        _lastInspectionTimestamps[enterprise][inspector] = block.timestamp + validityPeriod;

        emit Events.InspectorAssigned(
            enterprise, inspector, validityPeriod
        );
    }

    ///////////////////////////////////////////////
    /////// INSPECTION REPORTING /////////////////
    /////////////////////////////////////////////
    function submitInspectionReport (
        address _enterprise,
        bool _passed,
        string calldata _remarks,
        string calldata _evidenceURI
    ) external onlyActiveInspector(_enterprise) {

        if (block.timestamp > _lastInspectionTimestamps[_enterprise][msg.sender]) {
            revert InspectionManager__InspectionPeriodExpired();
        }

        DataTypes.InspectionReport memory report = DataTypes.InspectionReport({
            inspector: msg.sender,
            enterprise: _enterprise,
            remarks: _remarks,
            evidenceURI: _evidenceURI, // IPFS hash
            inspectedAt: block.timestamp,
            passed: _passed
        });

        _enterpriseReports[_enterprise].push(report);

        // Auto-revoke certification if not passed
        if (!_passed) {
            certAuthority.revokeCertification(_enterprise);
            

        }

        emit Events.InspectionReportSubmitted(
            msg.sender,
            _enterprise,
            _passed,
            _remarks,
            _evidenceURI,
            block.timestamp
        );
    }


    ////////////////////////////////////////////////
    /////// CROSS-CONTRACT VALIDATION /////////////
    //////////////////////////////////////////////
    function _isInspectorAssigned(address enterprise, address inspector) private view returns(bool) {
        for (uint256 i = 0; i < _enterpriseInspectors[enterprise].length; i++) {
            if (_enterpriseInspectors[enterprise][i] == inspector) {
                return true;
            }
        }
        return false;
    }

    //////////////////////////////////////////////
    //////// COMPEREHENSIVE GETTERS /////////////
    ////////////////////////////////////////////
    function getEnterpriseInspectors(address enterprise)
    public 
    view 
    returns(address[] memory, uint256[] memory validityPeriods)
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
      returns(DataTypes.InspectionReport[] memory) {

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
        for (uint256 j = 0; j <_enterpriseReports[enterprises[i]].length; j++) {
            if (_enterpriseReports[enterprises[i]][j].inspector == inspector) {
                reports[counter++] = _enterpriseReports[enterprises[i]][j];
            }
        }
    }    

        return reports;
    }

    /////////////////////////////////////////
    /// Simple reports getter for testing////
    /////////////////////////////////////////
      function getReports(address enterprise) external view returns(Report[] memory) {

        if (enterpriseReports[enterprise].length == 0) {
            revert InspectionReport__NoReportsAssociatedWithEnterprise();
        }
        return enterpriseReports[enterprise];
    }
}
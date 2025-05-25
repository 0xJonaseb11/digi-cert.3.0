// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from "../core/RolesManager.sol";
import { DataTypes } from "../utils/DataTypes.sol";
import { Events } from "../utils/Events.sol";

contract InspectionReport is RolesManager {
    RolesManager public rolesManager;

    struct Report {
        address inspector;
        address enterprise;
        bool passed;
        string remarks;
        uint256 timestamp;
    }

    mapping(address => Report[]) private enterpriseReports;

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    }

    modifier onlyInspector () {
        if (!hasInspectorRole(msg.sender)) {
            revert RolesManager__NotAuthorizedInspector();
        }
        _;
    }

    /////////////////////////////////////////
    ////// INSPECTION REPORT FUNCTIONS //////
    /////////////////////////////////////////
    
    function submitInspectionReport(
        address enterprise,
        bool passed,
        string memory remarks
    ) external onlyValidAddress(enterprise) onlyInspector {


        Report memory report = Report ({
            inspector: msg.sender,
            enterprise: enterprise,
            passed: passed,
            remarks: remarks,
            timestamp: block.timestamp
        });

        enterpriseReports[enterprise].push(report);

        emit Events.InspectionReportSubmitted(msg.sender, enterprise, passed, remarks, block.timestamp);
    }

    function getReports(address enterprise) external view returns(Report[] memory) {

        if (enterpriseReports[enterprise].length == 0) {
            revert InspectionReport__NoReportsAssociatedWithEnterprise();
        }
        return enterpriseReports[enterprise];
    }
}
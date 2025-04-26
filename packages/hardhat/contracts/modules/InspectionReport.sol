// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from "../core/RolesManager.sol";
import { DataTypes } from "../utils/DataTypes.sol";
import { Events } from "../utils/Events.sol";

contract InspectionReport {
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
        require(rolesManager.hasInspectorRole(msg.sender), "InspectionReport: Caller is not a registered inspector!");
        _;
    }

    /////////////////////////////////////////
    ////// INSPECTION REPORT FUNCTIONS //////
    /////////////////////////////////////////
    
    function submitReport(
        address enterprise,
        bool passed,
        string memory remarks
    ) external onlyInspector {
        require(enterprise != address(0), "InspectionReport: Invalid Enterprise address!!");

        Report memory report = Report ({
            inspector: msg.sender,
            enterprise: enterprise,
            passed: passed,
            remarks: remarks,
            timestamp: block.timestamp
        });

        enterpriseReports[enterprise].push(report);

        emit Events.InspectionSubmitted(msg.sender, enterprise, passed, remarks, block.timestamp);
    }

    function getReports(address enterprise) external view returns(Report[] memory) {
        return enterpriseReports[enterprise];
    }
}
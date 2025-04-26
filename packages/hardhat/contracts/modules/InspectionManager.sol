// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from "../core/RolesManager.sol";

contract InspectionManager {|
    RolesManager public rolesManager;

    mapping(address => address[]) private enterpriseInspectors;
    mapping(address => address[]) private inspectorEnterprises;

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    }

    modifier onlyCertifier() {
        require(rolesManager.hasCertifierRole(msg.sender), "InspectionManager: Not an authorized certifier!!");
        _;
    }

    ///////////////////////////////////////////
    //////////// INSPECTION FUNCTIONS /////////
    //////////////////////////////////////////
    
    function assignInspector(address enterprise, address inspector) external onlyCertifier {
        require(rolesManager.hasInspectorRole(inspector), "InspectionManager: Address notb a registered Inspector!!");

        enterpriseInspectors[enterprise].push(inspector);
        inspectorEnterprises[inspector].push(enterprise);

        emit InspectorAssigned(enterprise, inspector);   
    }

    function getInspectorsForEnterprise(address enterprise) external view returns (address[] memory) {
        return enterpriseInspectors[enterprise];
    }

    function getEnterprisesForInspector(address inspector) external view returns(address[] memory) {
        return inspectorEnterprises[inspector];
    }



}
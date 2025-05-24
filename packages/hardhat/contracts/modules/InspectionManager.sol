// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from "../core/RolesManager.sol";
import { Events } from "../utils/Events.sol";
import { DataTypes } from "../utils/DataTypes.sol";

contract InspectionManager is RolesManager{
    RolesManager public rolesManager;

    mapping(address => address[]) private enterpriseInspectors;
    mapping(address => address[]) private inspectorEnterprises;

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    }


    }

    ///////////////////////////////////////////
    //////////// INSPECTION FUNCTIONS /////////
    //////////////////////////////////////////
    
    function assignInspector(address enterprise, address inspector) onlyRole(CERTIFIER_ROLE) {

        if (hasInspectorRole(inspector)) {
            revert InspectionManager__InspectorAlreadyAssigned();
        }

        enterpriseInspectors[enterprise].push(inspector);
        inspectorEnterprises[inspector].push(enterprise);

        emit Events.InspectorAssigned(enterprise, inspector);   
    }

    function getInspectorsForEnterprise(address enterprise)  view returns (address[] memory) {
        return enterpriseInspectors[enterprise];
    }

    function getEnterprisesForInspector(address inspector)  view returns(address[] memory) {
        return inspectorEnterprises[inspector];
    }


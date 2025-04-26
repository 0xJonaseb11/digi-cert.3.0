// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../core/RolesManager.sol";

contract InspectorManager {
    RolesManager public rolesManager;

    mapping(address => address[]) private enterpriseInspectors;   // enterprise => list of inspectors
    mapping(address => address[]) private inspectorEnterprises;   // inspector => list of enterprises

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    }

    modifier onlyCertifier() {
        require(rolesManager.hasCertifierRole(msg.sender), "InspectorManager: Not an authorized certifier");
        _;
    }

    function assignInspector(address enterprise, address inspector) external onlyCertifier {
        require(rolesManager.hasInspectorRole(inspector), "InspectorManager: Address is not a registered inspector");

        enterpriseInspectors[enterprise].push(inspector);
        inspectorEnterprises[inspector].push(enterprise);
    }

    function getInspectorsForEnterprise(address enterprise) external view returns (address[] memory) {
        return enterpriseInspectors[enterprise];
    }

    function getEnterprisesForInspector(address inspector) external view returns (address[] memory) {
        return inspectorEnterprises[inspector];
    }
}

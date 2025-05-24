// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from "../core/RolesManager.sol";

/**
* @title AccessModifiers
* @dev provides resusable access control modifiers linnked to RolesManager.
*/
contract AccessModifiers is RolesManager {
    RolesManager public rolesManager;

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    } 

    modifier onlyCertifier() {
        require(hasCertifierRole(msg.sender), "Access Denied: Not a registered certifier!");
        _;
    }

    modifier onlyInspector() {
        require(hasInspectorRole(msg.sender), "Access Denied: Not a registered Inspector");
        _;
    }

    modifier onlyEnterprise() {
        require(hasEnterpriseRole(msg.sender), "Access Denied: Not a registered Enterprise!!");
        _;
    }

    modifier onlyCertificateFactory() {
        require(hasCertificateFactoryRole(msg.sender), "Access Denied: Not a registered Certificate factory!!");
        _;
    }

    modifier onlyAdmin() {
        require(hasAdminRole(msg.sender), "Access Denied: Only Admin can accesss this!!");
        _;
    }
}
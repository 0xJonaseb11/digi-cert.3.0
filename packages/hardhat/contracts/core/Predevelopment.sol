
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import { RolesManager } from "./RolesManager.sol";

/**
 * @title AccessModifiers
 * @dev Provides reusable access control modifiers linked to RolesManager.
 */
abstract contract AccessModifiers {
    RolesManager public rolesManager;

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    }

    modifier onlyCertifier() {
        require(rolesManager.hasCertifierRole(msg.sender), "Access Denied: Not a Certifier");
        _;
    }

    modifier onlyInspector() {
        require(rolesManager.hasInspectorRole(msg.sender), "Access Denied: Not an Inspector");
        _;
    }

    modifier onlyEnterprise() {
        require(rolesManager.hasEnterpriseRole(msg.sender), "Access Denied: Not an Enterprise");
        _;
    }

    modifier onlyCertificateFactory() {
        require(rolesManager.hasCertificateFactoryRole(msg.sender), "Access Denied: Not Certificate Factory");
        _;
    }

    modifier onlyAdmin() {
        require(rolesManager.isAdmin(msg.sender), "Access Denied: Not Admin");
        _;
    }
}

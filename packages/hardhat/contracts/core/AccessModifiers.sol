// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from "./RolesManager.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
* @title AccessModifiers
* @dev provides resusable access control modifiers linnked to RolesManager.
*/
abstract contract AccessModifiers is RolesManager {
    RolesManager public rolesManager;

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    } 

    modifier onlyCertifier() {
        require(rolesManager.hasCertifierRole(msg.sender), "Access Denied: Not a registered certifier!");
        _;
    }

    modifier onlyInspector() {
        require(rolesManager.hasInspectorRole(msg.sender), "Access Denied: Not a registered Inspector");
        _;
    }

    modifier onlyEnterprise() {
        require(rolesManager.hasEnterpriseRole(msg.sender), "Access Denied: Not a registered Enterprise!!");
        _;
    }

    modifier onlyCertificateFactory() {
        require(rolesManager.hasCertificateFactoryRole(msg.sender), "Access Denied: Not a registered Certificate factory!!");
        _;
    }

    modifier onlyAdmin() {
        require(rolesManager.isAdmin(msg.sender), "Access Denied: Only Admin can accesss this!!");
        _;
    }
}
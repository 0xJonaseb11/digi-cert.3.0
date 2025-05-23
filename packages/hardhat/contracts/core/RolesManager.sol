// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Events } from "../utils/Events.sol";
import { DataTypes } from "../utils/DataTypes.sol";

contract RolesManager is AccessControl {
    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
    bytes32 public constant INSPECTOR_ROLE = keccak256("INSPECTOR_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant ENTERPRISE_ROLE = keccak256("ENTERPRISE_ROLE");
    bytes32 public constant CERTIFICATE_FACTORY_ROLE = keccak256("CERTIFICATE_FACTORY_ROLE");

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CERTIFIER_ROLE,  msg.sender);
    }

    function _setupRole(bytes32 role, address account) internal virtual {
    _grantRole(role, account);
}


    ////////////////////////////////////////////////
    /////// ROLEMANAGEMENT FUNCTIONS ////////////////
    ////////////////////////////////////////////////
    

    /////////////////////////////////
    ////// ROLE GRANTING ////////////
    /////////////////////////////////
    function grantCertifier(address account) external {
        grantRole(CERTIFIER_ROLE, account);
    }

    function grantInspector(address account ) external {
        grantRole(INSPECTOR_ROLE, account);
    }

    function grantAuditor(address account) external {
        grantRole(AUDITOR_ROLE, account);
    }

    function grantEnterprise(address account) external {
        grantRole(ENTERPRISE_ROLE, account);
    }


    /////////////////////////////////
    // ROLE REVOKATION /////////////
    ////////////////////////////////
    function revokeCertifier(address account) external {
        revokeRole(CERTIFIER_ROLE, account);
    }

    function revokeInspector(address account) external {
        revokeRole(INSPECTOR_ROLE, account);
    }

    function revokeAuditor(address account) external {
    revokeRole(AUDITOR_ROLE, account);
    }

    function revokeEnterprise(address account) external {
        revokeRole(ENTERPRISE_ROLE, account);
    }


    /////////////////////////////////////////////////
    //////// ROLE OWNERSHIP CHECKS //////////////////
    /////////////////////////////////////////////////
    
    function isAdmin(address account) external view returns(bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    function hasCertifierRole(address account) external view returns(bool) { 
        return hasRole(CERTIFIER_ROLE, account);
    }

    function hasInspectorRole(address account) external view returns(bool) {
        return hasRole(INSPECTOR_ROLE, account);
    }

    function hasAuditRole(address account) external view returns(bool) {
        return hasRole(AUDITOR_ROLE, account);
    }

    function hasEnterpriseRole(address account) external view returns(bool) {
        return hasRole(ENTERPRISE_ROLE, account);
    }

    function hasCertificateFactoryRole(address account) external view returns(bool) {
        return hasRole(CERTIFICATE_FACTORY_ROLE, account);
    }
}
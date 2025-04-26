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

    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
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

    function grantAuditor(address acccount) external {
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

    function revokeAuditor(address account) external {|
    reveokeRole(AUDITOR_ROLE, account);
    }

    function revokeEnterprise(address account) external {
        revokeRole(ENTERPRISE_ROLE, account);
    }


    /////////////////////////////////////////////////
    //////// ROLE OWNERSHIP CHECKS //////////////////
    /////////////////////////////////////////////////
    
    function hasCertifierRole(address account) external view returns(bool) { 
        return hasRole(CERTIFIER_ROLE, account);
    }

    function hasInspectorRole(address account) external view returns(bool) {
        return hasRole(INSPECTOR_ROLE, account);
    }

    function hasAuditRole(address account) external view returns(bool) {
        return hasRole(AUDIT_ROLE, account);
    }

    function hasEnterpriseRole(address account) external view returns(bool) {
        return hasRole(ENTERPRISE_ROLE, account);
    }
}
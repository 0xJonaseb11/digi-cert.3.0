// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract RolesManager is AccessControl {
    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
    bytes32 public constant INSPECTOR_ROLE = keccak256("INSPECTOR_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant ENTERPRISE_ROLE = keccak256("ENTERPRISE_ROLE");

    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    // Grant Roles

    function grantCertifier(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(CERTIFIER_ROLE, account);
    }

    function grantInspector(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(INSPECTOR_ROLE, account);
    }

    function grantAuditor(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(AUDITOR_ROLE, account);
    }

    function grantEnterprise(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ENTERPRISE_ROLE, account);
    }

    // Revoke Roles

    function revokeCertifier(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(CERTIFIER_ROLE, account);
    }

    function revokeInspector(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(INSPECTOR_ROLE, account);
    }

    function revokeAuditor(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(AUDITOR_ROLE, account);
    }

    function revokeEnterprise(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(ENTERPRISE_ROLE, account);
    }

    // Public view functions

    function hasCertifierRole(address account) external view returns (bool) {
        return hasRole(CERTIFIER_ROLE, account);
    }

    function hasInspectorRole(address account) external view returns (bool) {
        return hasRole(INSPECTOR_ROLE, account);
    }

    function hasAuditorRole(address account) external view returns (bool) {
        return hasRole(AUDITOR_ROLE, account);
    }

    function hasEnterpriseRole(address account) external view returns (bool) {
        return hasRole(ENTERPRISE_ROLE, account);
    }
}

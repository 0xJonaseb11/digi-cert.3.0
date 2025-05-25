// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


/**
* @author @0xJonaseb11

* @dev manages the roles of the whole ecosystem 
* @dev Only Super Admin can assign roles
* @dev On very high roles, there's DAO voting
*/


import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Events } from "../utils/Events.sol";
import { Errors } from "../utils/Errors.sol";
import { DataTypes } from "../utils/DataTypes.sol";


contract RolesManager is AccessControl, Errors {

    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFYING_BODY_ROLE");
    bytes32 public constant INSPECTOR_ROLE = keccak256("INSPECTION_MANAGER_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant ENTERPRISE_ROLE = keccak256("ENTERPRISE_ROLE");
    bytes32 public constant CERTIFICATE_FACTORY_ROLE = keccak256("CERTIFICATE_FACTORY_ROLE");
    bytes32 public constant PUBLIC_ROLE = keccak256("PUBLIC_ROLE");


   // ----- modifiers
   modifier onlyValidAddress(address account) {
    if (account == address(0)) {
        revert InvalidAddress();
    }
    _;
   }

//    modifier onlyRole(bytes32 role) override(AccessControl) {
//     if (!hasRole(role, msg.sender)) {
//         revert RolesManager__UnauthorizedToPerformAction();
//     }
//     _;
//    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CERTIFIER_ROLE,  msg.sender);
    }

    function _setupRole(bytes32 role, address account) internal virtual {
    _grantRole(role, account);
}


    ////////////////////////////////////////////////
    /////// ROLES MANAGEMENT  ////////////////
    ////////////////////////////////////////////////
    

    /////////////////////////////////
    ////// ROLE GRANTING ////////////
    /////////////////////////////////

    function grantCertifier(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(CERTIFIER_ROLE, account);
    }

    function grantInspector(address account ) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        grantRole(INSPECTOR_ROLE, account);
    }

    function grantAuditor(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(AUDITOR_ROLE, account);
    }

    function grantEnterprise(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        grantRole(ENTERPRISE_ROLE, account);
    }

    function grantCertificateFactory(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(CERTIFICATE_FACTORY_ROLE, account);
    }

    function grantPublicRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){

        grantRole(PUBLIC_ROLE, account);
    }


    /**
    * @dev Public role will be claimed instantly
    * On the entry of a user to our platform
    * Just clicking `claim public role` and user is assigned role
    * @notice I plan to make it a temporary role on every visit to our platform
    */

    /////////////////////////////////
    // ROLE REVOKATION /////////////
    ////////////////////////////////

    function revokeCertifier(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(CERTIFIER_ROLE, account);
    }

    function revokeInspector(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        revokeRole(INSPECTOR_ROLE, account);
    }

    function revokeAuditor(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
    revokeRole(AUDITOR_ROLE, account);
    }

    function revokeEnterprise(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        revokeRole(ENTERPRISE_ROLE, account);
    }

    function revokeCertificateFactory(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(CERTIFICATE_FACTORY_ROLE, account);
    }
    
    function revokePublicRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {

        revokeRole(PUBLIC_ROLE, account);
    }


    /////////////////////////////////////////////////
    //////// ROLE OWNERSHIP CHECKS //////////////////
    /////////////////////////////////////////////////
    

    function hasAdminRole(address account) public view onlyValidAddress(account) returns(bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    function hasCertifierRole(address account) public view onlyValidAddress(account) returns(bool) { 
        return hasRole(CERTIFIER_ROLE, account);
    }

    function hasInspectorRole(address account) public view onlyValidAddress(account) returns(bool) {
        return hasRole(INSPECTOR_ROLE, account);
    }

    function hasAuditorRole(address account) public view onlyValidAddress(account) returns(bool) {
        return hasRole(AUDITOR_ROLE, account);
    }

    function hasEnterpriseRole(address account) public view onlyValidAddress(account) returns(bool) {
        return hasRole(ENTERPRISE_ROLE, account);
    }

    function hasCertificateFactoryRole(address account) public view onlyValidAddress(account) returns(bool) {
        return hasRole(CERTIFICATE_FACTORY_ROLE, account);
    }
    
    function hasPublicRole(address account) public view onlyValidAddress(account) returns(bool) {

        return hasRole(PUBLIC_ROLE, account);
    }
}
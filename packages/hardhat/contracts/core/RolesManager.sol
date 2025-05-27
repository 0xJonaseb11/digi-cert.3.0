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

    mapping(address => uint256) public publicRoleExpiry;

   // ----- modifiers
   modifier onlyValidAddress(address account) {
    if (account == address(0)) {
        revert InvalidAddress();
    }
    _;
   }


    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CERTIFIER_ROLE,  msg.sender);
    }


    /** ----------- #claim temporary public role -------------- //
    * @dev allows users to claim temporary `PUBLIC` role for `durationInHours` hours on their visit to platform
    * @param durationInHours The duration in hours the user will have the `PUBLIC` role
    * @notice `durationInHours` must be less than 24 hours
    * @notice Emits PublicRoleGranted event on successful claim 
    */
    function claimTemporaryPublicRole(uint256 durationInHours) external {
        if (hasPublicRole(msg.sender)) {
            revert RolesManager__AlreadyHasRole();
        }
        if (durationInHours > 0) {
            revert RolesManager__InvalidDuration();
        }
         if (durationInHours > 24 /*hours */) {
            revert RolesManager__InvalidDuration();
         }
        uint256 durationInSeconds = durationInHours * 1 hours;
    
        _grantRole(PUBLIC_ROLE, msg.sender);
        publicRoleExpiry[msg.sender] = block.timestamp + durationInSeconds;

        emit Events.PublicRoleGranted(msg.sender, durationInHours);
    }

    // ------- helper for client ---- //
    function getMaxPublicRoleDuration() public pure returns (uint256) {
        return 24;
    }


    /** --------- #  Auto-expiry check (Call periodically) ------- //
    * @dev helper to check expiry of `PUBLIC` role
    * @param account The account to check for role expiry
    * @notice Emits PublicRoleExpired event on expiry
    */
    function checkExpiryRoles(address account) public {
        if (hasPublicRole(account) && publicRoleExpiry[account] < block.timestamp) {
            _revokeRole(PUBLIC_ROLE, account);

            emit Events.PublicRoleExpired(account);
        }
    }

    /** ---------- # Bulk Role Grant(Auto) ------- //
    * @dev Bulk grant roles to accounts
    * @param roles The array of roles to grant
    * @param accounts The array of accounts to grant roles
    * emits BulkRolesGranted event on successful grant
    */
    function bulkGrantRoles(
        bytes32[] calldata roles,
        address[] calldata accounts
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (roles.length == 0 || accounts.length == 0) {
            revert RolesManager__EmptyArray();
        }
        if (roles.length != accounts.length) {
            revert RolesManager__ArrayLengthMismatch();
        }
        
        for (uint256 i = 0; i < roles.length; i++) {
            _grantRole(roles[i], accounts[i]);
        }

        emit Events.BulkRolesGranted(roles, accounts);
    }

    /** -------- # Safe Role Transfer ------- //
    * @dev Transfers a role from one account to another
    * @param role The role to transfer
    * @param from The account to transfer the role from
    * @param to The account to transfer the role to
    * @notice Emits RoleTransferred event on successful transfer
    */
    function transferRole(
        bytes32 role,
        address from,
        address to  
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!hasRole(role, from)) {
            revert RolesManager__RoleDoesNotExist();
        }
        _revokeRole(role, from);
        _grantRole(role, to);

        emit Events.RoleTransferred(role, from, to);
    }

    // ---- combined role check ----- //
    function getActiveRoles(address account) public view returns (
        bool isAdmin,
        bool isCertifier,
        bool isInspector,
        bool isAuditor,
        bool isEnterprise,
        bool isCertificateFactory,
        bool isPublic
    ) {
        return (
            hasRole(DEFAULT_ADMIN_ROLE, account),
            hasRole(CERTIFIER_ROLE, account),
            hasRole(INSPECTOR_ROLE, account),
            hasRole(AUDITOR_ROLE, account),
            hasRole(ENTERPRISE_ROLE, account),
            hasRole(CERTIFICATE_FACTORY_ROLE, account),
            hasRole(PUBLIC_ROLE, account)
        );
    }
    

    function _setupRole(bytes32 role, address account) internal virtual {
    _grantRole(role, account);
}


    ////////////////////////////////////////////////
    /////// MANAUAL ROLES MANAGEMENT  ////////////////
    ////////////////////////////////////////////////
    

    /////////////////////////////////
    ////// ROLE GRANTING ////////////
    /////////////////////////////////
    
    /** ---------# GRANTING ROLES ---------//
    * @dev Functions to grant roles to!
    * @param account The account to grant the role to
    * @notice Emits RoleGranted event on successful grant
    */
    function grantCertifier(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(CERTIFIER_ROLE, account);

        emit Events.RoleGranted(CERTIFIER_ROLE, account);

    }
    
    function grantInspector(address account ) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        grantRole(INSPECTOR_ROLE, account);
        emit Events.RoleGranted(INSPECTOR_ROLE, account);
    }

    function grantAuditor(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(AUDITOR_ROLE, account);
        emit Events.RoleGranted(AUDITOR_ROLE, account);
    }

    function grantEnterprise(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        grantRole(ENTERPRISE_ROLE, account);
        emit Events.RoleGranted(ENTERPRISE_ROLE, account);
    }
     
    function grantCertificateFactory(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(CERTIFICATE_FACTORY_ROLE, account);
        emit Events.RoleGranted(CERTIFICATE_FACTORY_ROLE, account);
    }

    function grantPublicRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        grantRole(PUBLIC_ROLE, account);
        emit Events.RoleGranted(PUBLIC_ROLE, account);
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
    

    /** ------------- # REVOKING ROLES ------------- //
    * @dev Functions to revoke roles
    * @param account The account to revoke the role from
    * @notice Emits RoleRevoked event on successful revoke
    */
    function revokeCertifierRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(CERTIFIER_ROLE, account);
        emit Events.RoleRevoked(CERTIFIER_ROLE, account);
    }

    function revokeInspectorRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        revokeRole(INSPECTOR_ROLE, account);
    }

    function revokeAuditorRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
    revokeRole(AUDITOR_ROLE, account);
    emit Events.RoleRevoked(AUDITOR_ROLE, account);
    }

    function revokeEnterpriseRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        revokeRole(ENTERPRISE_ROLE, account);
        emit Events.RoleRevoked(ENTERPRISE_ROLE, account);
    }

    function revokeCertificateFactoryRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(CERTIFICATE_FACTORY_ROLE, account);
        emit Events.RoleRevoked(CERTIFICATE_FACTORY_ROLE, account);
    }
    
    function revokePublicRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(PUBLIC_ROLE, account);
        emit Events.RoleRevoked(PUBLIC_ROLE, account);
    }


    /////////////////////////////////////////////////
    //////// ROLE CHECKS //////////////////
    /////////////////////////////////////////////////
    
   /** --------- # CHECKING ROLES --------- //
   * @dev Functions to check if a certain account has the specified role
   * @param account The account to check 
   */
    function hasAdminRole(address account) public view returns(bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    function hasCertifierRole(address account) public view returns(bool) { 
        return hasRole(CERTIFIER_ROLE, account);
    }

    function hasInspectorRole(address account) public view  returns(bool) {
        return hasRole(INSPECTOR_ROLE, account);
    }

    function hasAuditorRole(address account) public view  returns(bool) {
        return hasRole(AUDITOR_ROLE, account);
    }

    function hasEnterpriseRole(address account) public view  returns(bool) {
        return hasRole(ENTERPRISE_ROLE, account);
    }

    function hasCertificateFactoryRole(address account) public view  returns(bool) {
        return hasRole(CERTIFICATE_FACTORY_ROLE, account);
    }
    
    function hasPublicRole(address account) public view  returns(bool) {
        return hasRole(PUBLIC_ROLE, account);
    }
}
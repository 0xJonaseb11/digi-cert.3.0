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


    // ------ Claim temporary public role ---- //
    function claimTemporaryPublicRole(uint256 durationInHours) external {
        require(!hasPublicRole(msg.sender), "Already has public role");
        require(durationInHours > 0, "Duration must be greater than 0 hours");
        require(durationInHours <= 24, "Duration must be less than or equal to 24 hours");  

        uint256 durationInSeconds = durationInHours * 1 hours;
    
        _grantRole(PUBLIC_ROLE, msg.sender);
        publicRoleExpiry[msg.sender] = block.timestamp + durationInSeconds;
        emit Events.PublicRoleGranted(msg.sender, durationInHours);
    }

    // ------- helper for client ---- //
    function getMaxPublicRoleDuration() public pure returns (uint256) {
        return 24;
    }


    // --------- Auto-expiry check (Call periodically) --- //
    function checkExpiryRoles(address account) public {
        if (hasPublicRole(account) && publicRoleExpiry[account] < block.timestamp) {
            _revokeRole(PUBLIC_ROLE, account);

            emit Events.PublicRoleExpired(account);
        }
    }

    // ---- Bulk Role Management(Gas saver) ---- //
    function bulkGrantRoles(
        bytes32[] calldata roles,
        address[] calldata accounts
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(roles.length == accounts.length, "Array length mismatch");  
        
        for (uint256 i = 0; i < roles.length; i++) {
            _grantRole(roles[i], accounts[i]);
        }
    }

    // --- Safe Role Transfer --- //
    function transferRole(
        bytes32 role,
        address from,
        address to  
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(hasRole(role, from), "From Address doesnot have role!");
        _revokeRole(role, from);
        _grantRole(role, to);
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

    function revokeCertifierRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(CERTIFIER_ROLE, account);
    }

    function revokeInspectorRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        revokeRole(INSPECTOR_ROLE, account);
    }

    function revokeAuditorRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
    revokeRole(AUDITOR_ROLE, account);
    }

    function revokeEnterpriseRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE){
        revokeRole(ENTERPRISE_ROLE, account);
    }

    function revokeCertificateFactoryRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(CERTIFICATE_FACTORY_ROLE, account);
    }
    
    function revokePublicRole(address account) external onlyValidAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(PUBLIC_ROLE, account);
    }


    /////////////////////////////////////////////////
    //////// ROLE OWNERSHIP CHECKS //////////////////
    /////////////////////////////////////////////////
    

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
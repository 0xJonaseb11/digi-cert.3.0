// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { DataTypes } from "../utils/DataTypes.sol";
import { Events } from "../utils/Events.sol";
import { RolesManager } from "../core/RolesManager.sol";
import { CertificateNFT } from "../modules/CertificateNFT.sol";
import { CertificationAuthority } from "../core/CertificationAuthority.sol";

contract EnterpriseRegistry is RolesManager {
    RolesManager public rolesManager;
    CertificateNFT public certificateNFT;
    CertificationAuthority public certAuthority;


    mapping (address => DataTypes.Enterprise) private enterprises;
    address[] public allEnterprises;

    constructor(address _rolesManager, address _certNFT, address _certAuthority) {
        rolesManager = RolesManager(_rolesManager);
        certificateNFT = CertificateNFT(_certNFT);
        certAuthority = CertificationAuthority(_certAuthority);


    }

    modifier onlyEnterprise() {
        require(hasEnterpriseRole(msg.sender));
        if (!hasEnterpriseRole(msg.sender)) {
            revert RolesManager__NotAuthorizedEnterprise();
        }
        _;
    }


    //////////////////////////////////////////////
    /////// MINERAL REGISTRY FUNCTIONS ///////////
    //////////////////////////////////////////////
    
    function registerEnterprise(
        address _enterpriseAddress,
        string calldata _name,
        string calldata _industry,
        string calldata _metadataURI,
        uint256 initialCertDuration
    ) external onlyRole(CERTIFIER_ROLE) {

        if ()
    }
    function updateEnterpriseMetadata(string memory newMetadataURI) external onlyEnterprise {
        
        if (enterprises[msg.sender].isRegistered == false) {
            revert EnterpriseRegistry__EnterpriseDoesNotExist();
        }
        enterprises[msg.sender].metadataURI = newMetadataURI;

        emit Events.EnterpriseUpdated(msg.sender, newMetadataURI);
    }  


    ////////////////////////
    ////// getters /////////
    ////////////////////////
    function getEnterprise(address enterpriseAddress) external view onlyValidAddress(enterpriseAddress) returns (DataTypes.Enterprise memory) {
        return enterprises[enterpriseAddress];
    }

    function listEnterprises() external view returns(address[] memory) {
        return allEnterprises;
    }

}
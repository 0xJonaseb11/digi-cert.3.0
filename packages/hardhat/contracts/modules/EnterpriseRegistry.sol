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
        uint256 _initialCertDuration
    ) external onlyRole(CERTIFIER_ROLE) {

        if (enterprises[_enterpriseAddress].isRegistered) {
            revert EnterpriseRegistry__EnterpriseAlreadyExists();
        }

        enterprises[_enterpriseAddress] = DataTypes.Enterprise({
            enterpriseAddress: _enterpriseAddress,
            name: _name,
            industry: _industry,
            metadataURI: _metadataURI,
            isRegistered: true,
            registrationDate: block.timestamp,
            lastUpdated: block.timestamp,
            certificateId: 0
        });

        // Enable auto-certificatoin in CertificationAuthority contract
        certAuthority.certifyEnterprise(_enterpriseAddress, _industry, _metadataURI, _initialCertDuration);

        // mint NFT Certificate
        uint256 certId = certificateNFT.mintCertificate(_enterpriseAddress, _metadataURI /*, _initialCertDuration*/);
        enterprises[_enterpriseAddress].certificateId = certId;

        allEnterprises.push(_enterpriseAddress);

        emit Events.EnterpriseRegistered(_enterpriseAddress, _name, _industry, _metadataURI, certId);
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
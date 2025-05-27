// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


/**
* @author @0xJonaseb11
* @title CertificateNFT Contract
* @dev This contract is used to mint NFT certificates for enterprises
* @dev Only the Certifier can mint certificates
* @dev Only the Certifier can revoke certificates
* @notice It allows integration with  `CertificationAuthority` contract for smooth certifiation mage't
*/
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { RolesManager } from "../core/RolesManager.sol";
import { Events } from "../utils/Events.sol";
import { DataTypes } from "../utils/DataTypes.sol";

contract CertificateNFT is RolesManager, ERC721URIStorage, Ownable {
    RolesManager public rolesManager;
    uint256 public nextCertificateId;

    mapping(address => uint256) public enterpriseCertificate;
    mapping(uint256 => bool) public validCertificates;

    constructor(address _rolesManager) ERC721("Enterprise Certificate", "DIGI-CERT") Ownable(msg.sender){
        rolesManager = RolesManager(_rolesManager);
    }


    /////////////////////////////////////////////
    //////// CERTIFICATENFT FUNCTIONS ///////////
    /////////////////////////////////////////////
    
    /**
    * @dev Mints a new certificate for an enterprise
    * @dev Only the Super Admin can mint a certificate
    * @param enterprise The address of the enterprise to mint a certificate for
    * @param metadataURI The metadata URI of the certificate
    * @notice Emits CertificateMinted event when a certificate is minted
    * @return uint256 The certificate ID
    */
    function mintCertificate(address enterprise, string memory metadataURI /*, uint256 initialCertificateDuration*/) external onlyValidAddress(enterprise) onlyRole(CERTIFIER_ROLE)  returns(uint256) {

        if (enterpriseCertificate[enterprise] != 0) {
            revert CertificateNFT__EnterpriseAlreadyCertified();
        }


        uint256 certId = ++nextCertificateId;

        _mint(enterprise, certId);
        _setTokenURI(certId, metadataURI);

        enterpriseCertificate[enterprise] = certId;
        validCertificates[certId] = true;
        
        emit Events.CertificateMinted(certId, enterprise, msg.sender, block.timestamp);

        return certId;
    }

    /////////////////////////////
    ////// revoke certificate //
    ////////////////////////////

    /**
    * @dev Revokes a certificate from an enterprise
    * @dev Only the Super Admin can revoke a certificate
    * @param certId The ID of the certificate to revoke
    * @notice Emits CertificateRevoked event on successful certificate revocation
    */
    function revokeCertificate(uint256 certId) external  onlyRole(CERTIFIER_ROLE) onlyRole(DEFAULT_ADMIN_ROLE)  {
        
        if (validCertificates[certId] == false) {
            revert CertificateNFT__CertificateDoesNotExist();
        }
        validCertificates[certId] = false;

        emit Events.CertificateRevoked(certId, msg.sender, block.timestamp);
    }

    /////////////////////////////
    /// some helpers / getters ///
    //////////////////////////////

    function isCertificateValid(uint256 certId) external view returns(bool) {
        return validCertificates[certId];
    }

    function getCertificateId(address enterprise) external view onlyValidAddress(enterprise) returns(uint256) {
        return enterpriseCertificate[enterprise];
    }

    function supportsInterface(bytes4 interfaceId) 
    public view override(AccessControl, ERC721URIStorage) 
    returns (bool) {
        return 
        AccessControl.supportsInterface(interfaceId) || 
        ERC721URIStorage.supportsInterface(interfaceId);
    } 

}    

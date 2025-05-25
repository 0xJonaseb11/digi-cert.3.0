// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

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


    // --------------- Events -------------------//
    event CertificateMinted(uint256 certId, address enterprise, address certifier, uint256 timestamp);

    constructor(address _rolesManager) ERC721("Enterprise Certificate", "DIGI-CERT") Ownable(msg.sender){
        rolesManager = RolesManager(_rolesManager);
    }

    modifier onlyCertifier() {
        if (!hasCertifierRole(msg.sender)) {
            revert RolesManager__NotAuthorizedCertifier();
        }
        _;
    }

    /////////////////////////////////////////////
    //////// CERTIFICATENFT FUNCTIONS ///////////
    /////////////////////////////////////////////
    
    function mintCertificate(address enterprise, string memory metadataURI) external onlyValidAddress(enterprise) onlyCertifier  returns(uint256) {

        if (enterpriseCertificate[enterprise] != 0) {
            revert CertificateNFT__EnterpriseAlreadyCertified();
        }


        uint256 certId = ++nextCertificateId;

        _mint(enterprise, certId);
        _setTokenURI(certId, metadataURI);

        enterpriseCertificate[enterprise] = certId;
        validCertificates[certId] = true;
        
        emit CertificateMinted(certId, enterprise, msg.sender, block.timestamp);

        return certId;
    }

    /////////////////////////////
    ////// revoke certificate //
    ////////////////////////////
    function revokeCertificate(uint256 certId) external onlyCertifier  {
        
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

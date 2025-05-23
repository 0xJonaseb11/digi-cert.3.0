// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { RolesManager } from "../core/RolesManager.sol";
import { Events } from "../utils/Events.sol";
import { DataTypes } from "../utils/DataTypes.sol";

contract CertificateNFT is ERC721URIStorage, Ownable {
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
        require(rolesManager.hasCertifierRole(msg.sender), "CertificateNFT: Not an authorized certifier!!");
        _;
    }

    /////////////////////////////////////////////
    //////// CERTIFICATENFT FUNCTIONS ///////////
    /////////////////////////////////////////////
    
    function mintCertificate(address enterprise, string memory metadataURI) external onlyCertifier  returns(uint256) {
        require(enterprise != address(0), "CertificateNFT: Invalid enterprise address!!");
        require(bytes(metadataURI).length > 0, "CertificateNFT: Invalid metadata URI!!");
        require(enterpriseCertificate[enterprise] == 0, "CertificateNFT: Enterprise already certified!!");

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
        require(validCertificates[certId], "CertificateNFT: Certificate already revoked!!");
        validCertificates[certId] = false;

        emit Events.CertificateRevoked(certId, msg.sender, block.timestamp);
    }

    /////////////////////////////
    /// some helpers / getters ///
    //////////////////////////////

    function isCertificateValid(uint256 certId) external view returns(bool) {
        return validCertificates[certId];
    }

    function getCertificateId(address enterprise) external view returns(uint256) {
        return enterpriseCertificate[enterprise];
    }
}    
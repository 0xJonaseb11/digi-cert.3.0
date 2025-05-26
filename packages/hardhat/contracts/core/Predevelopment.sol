// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {RolesManager} from "../core/RolesManager.sol";
import {CertificationAuthority} from "../core/CertificationAuthority.sol";
import {Events} from "../utils/Events.sol";
import {DataTypes} from "../utils/DataTypes.sol";

contract CertificateNFT is  ERC721URIStorage, AccessControl, RolesManager {
   



function registerEnterprise(
    address _enterpriseAddress,
    string calldata _name,
    string calldata _industry,
    string calldata _metadataURI,
    uint256 initialCertDuration
) external onlyRole(CERTIFIER_ROLE) {
    require(!enterprises[_enterpriseAddress].isRegistered, "Enterprise exists");
    
    // Register enterprise
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

    // Auto-certify in CertificationAuthority
    certAuthority.certifyEnterprise(_enterpriseAddress, _industry, _metadataURI);
    
    // Mint certificate NFT
    uint256 certId = certificateNFT.mintCertificate(_enterpriseAddress, _metadataURI, initialCertDuration);
    enterprises[_enterpriseAddress].certificateId = certId;

    allEnterprises.push(_enterpriseAddress);
    emit Events.EnterpriseRegistered(_enterpriseAddress, _name, _industry, _metadataURI, certId);
}


}
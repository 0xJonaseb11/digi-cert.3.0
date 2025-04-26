// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../core/RolesManager.sol";

contract CertificateNFT is ERC721URIStorage, Ownable {
    RolesManager public rolesManager;
    uint256 public nextCertificateId;

    mapping(address => uint256) public enterpriseCertificate; // enterprise => certificateId
    mapping(uint256 => bool) public validCertificates;         // certId => validity

    constructor(address _rolesManager) ERC721("Enterprise Certificate", "CERT") {
        rolesManager = RolesManager(_rolesManager);
    }

    modifier onlyCertifier() {
        require(rolesManager.hasCertifierRole(msg.sender), "CertificateNFT: Not an authorized certifier");
        _;
    }

    function mintCertificate(address enterprise, string memory metadataURI) external onlyCertifier returns (uint256) {
        require(enterprise != address(0), "CertificateNFT: Invalid enterprise address");
        require(enterpriseCertificate[enterprise] == 0, "CertificateNFT: Enterprise already certified");

        uint256 certId = ++nextCertificateId;

        _mint(enterprise, certId);
        _setTokenURI(certId, metadataURI);

        enterpriseCertificate[enterprise] = certId;
        validCertificates[certId] = true;

        return certId;
    }

    function revokeCertificate(uint256 certId) external onlyCertifier {
        require(validCertificates[certId], "CertificateNFT: Certificate already revoked");
        validCertificates[certId] = false;
    }

    function isCertificateValid(uint256 certId) external view returns (bool) {
        return validCertificates[certId];
    }

    function getCertificateId(address enterprise) external view returns (uint256) {
        return enterpriseCertificate[enterprise];
    }
}

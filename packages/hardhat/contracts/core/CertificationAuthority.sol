// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {RolesManager} from "./RolesManager.sol";
import {Events} from "../utils/Events.sol";
import {DataTypes} from "../utils/DataTypes.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract CertificationAuthority is RolesManager, ERC721URIStorage, ERC721Burnable {
    using DataTypes for DataTypes.Enterprise;
    using DataTypes for DataTypes.Certification;
    using DataTypes for DataTypes.InspectionReport;

    // Storage
    mapping(address => DataTypes.Certification) public certifications;
    mapping(uint256 => address) private _tokenToEnterprise;
    uint256 private _tokenIdCounter;

    constructor() ERC721("EnterpriseCertificate", "ECERT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CERTIFIER_ROLE, msg.sender);
    }

    //////////////////////////////////////////////////////////
    ///////////// ENTERPRISE CERTIFICATION ///////////////////
    //////////////////////////////////////////////////////////

    function certifyEnterprise(
        address enterpriseAddress,
        string memory _industry,
        string memory _metadataURI,
        uint256 validityDurationSeconds
    ) external onlyValidAddress(enterpriseAddress) onlyRole(CERTIFIER_ROLE) {
        if (certifications[enterpriseAddress].isCertified) {
            revert CertificationAuthority__EnterpriseAlreadyCertified();
        }

        uint256 tokenId = _tokenIdCounter++;
        _safeMint(enterpriseAddress, tokenId);
        _setTokenURI(tokenId, _metadataURI);

        certifications[enterpriseAddress] = DataTypes.Certification({
            industry: _industry,
            metadataURI: _metadataURI,
            certifiedAt: block.timestamp,
            expiryDate: block.timestamp + validityDurationSeconds,
            isCertified: true,
            tokenId: tokenId
        });

        _tokenToEnterprise[tokenId] = enterpriseAddress;

        emit Events.CertificationGranted(
            enterpriseAddress,
            _industry,
            _metadataURI,
            block.timestamp + validityDurationSeconds
        );
    }

    //////////////////////////////////////////////////////////
    ///////////// REVOCATION & EXPIRY HANDLING //////////////
    //////////////////////////////////////////////////////////

    function revokeCertification(address enterpriseAddress)
        external
        onlyValidAddress(enterpriseAddress)
        onlyRole(CERTIFIER_ROLE)
    {
        DataTypes.Certification storage cert = certifications[enterpriseAddress];
        if (!cert.isCertified) {
            revert CertificationAuthority__EnterpriseNotCertifiedYet();
        }

        if (cert.tokenId != 0) {
            burn(cert.tokenId); 
            delete _tokenToEnterprise[cert.tokenId];
        }

        cert.isCertified = false;
        emit Events.CertificationRevoked(enterpriseAddress);
    }

    function revokeIfExpired(address enterpriseAddress) external {
        DataTypes.Certification storage cert = certifications[enterpriseAddress];
        require(cert.isCertified, "Not certified");
        require(block.timestamp > cert.expiryDate, "Not expired");

        if (cert.tokenId != 0) {
            burn(cert.tokenId);
            delete _tokenToEnterprise[cert.tokenId];
        }

        cert.isCertified = false;
        emit Events.CertificationRevoked(enterpriseAddress);
    }

    //////////////////////////////////////////////////////////
    ///////////// TRANSFER CONTROL ///////////////////////////
    //////////////////////////////////////////////////////////

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) returns (address) {
        // Block all transfers except minting (to) and burning (address(0))
        if (auth != address(0)) {
            require(to == address(0), "Certificates are non-transferable");
        }
        return super._update(to, tokenId, auth);
    }

    //////////////////////////////////////////////////////////
    ///////////// VALIDATION & METADATA //////////////////////
    //////////////////////////////////////////////////////////

    function isCertificationValid(address enterpriseAddress)
        public
        view
        returns (bool)
    {
        DataTypes.Certification storage cert = certifications[enterpriseAddress];
        return cert.isCertified && block.timestamp <= cert.expiryDate;
    }

    function isCertificationValid(uint256 tokenId) public view returns (bool) {
        address enterprise = _tokenToEnterprise[tokenId];
        return isCertificationValid(enterprise);
    }

    function updateCertificationMetadata(
        address enterpriseAddress,
        string calldata newMetadataURI
    ) external onlyValidAddress(enterpriseAddress) onlyRole(CERTIFIER_ROLE) {
        DataTypes.Certification storage cert = certifications[enterpriseAddress];
        if (!cert.isCertified) {
            revert CertificationAuthority__EnterpriseNotCertifiedYet();
        }

        if (cert.tokenId != 0) {
            _setTokenURI(cert.tokenId, newMetadataURI);
        }

        cert.metadataURI = newMetadataURI;
        emit Events.CertificationUpdated(enterpriseAddress, newMetadataURI);
    }

    //////////////////////////////////////////////////////////
    ///////////// GETTERS & OVERRIDES ////////////////////////
    //////////////////////////////////////////////////////////

    function getCertification(address enterpriseAddress)
        public
        view
        returns (DataTypes.Certification memory)
    {
        return certifications[enterpriseAddress];
    }

    function getEnterpriseByTokenId(uint256 tokenId)
        public
        view
        returns (address)
    {
        return _tokenToEnterprise[tokenId];
    }

    // ----- Required overrides for multiple inheritance --- //
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

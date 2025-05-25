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
    // Immutable system contracts
    RolesManager public immutable rolesManager;
    CertificationAuthority public immutable certAuthority;

    // Certificate tracking
    mapping(uint256 => DataTypes.NFTCertificate) private _certificates;
    uint256 private _nextId;

    constructor(address _rolesManager, address _certAuthority) 
        ERC721("EnterpriseCertificate", "ECERT") 
    {
        rolesManager = RolesManager(_rolesManager);
        certAuthority = CertificationAuthority(_certAuthority);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /////////////////////////////////////////////
    //////// CERTIFICATE MINTING LOGIC //////////
    /////////////////////////////////////////////

    function mintCertificate(
        address enterprise,
        string calldata metadataURI,
        uint256 validityDuration
    ) external onlyCertifier returns(uint256) {
        // Verify enterprise is certified in Authority
        require(
            certAuthority.isCertificationValid(enterprise),
            "Enterprise not certified"
        );

        // Check for existing NFT
        require(
            balanceOf(enterprise) == 0,
            "Enterprise already has certificate"
        );

        uint256 certId = ++_nextId;
        uint256 expiry = block.timestamp + validityDuration;

        _safeMint(enterprise, certId);
        _setTokenURI(certId, metadataURI);

        _certificates[certId] = DataTypes.NFTCertificate({
            enterprise: enterprise,
            issuer: msg.sender,
            issuedAt: block.timestamp,
            expiresAt: expiry,
            isRevoked: false
        });

        emit Events.CertificateMinted(
            certId,
            enterprise,
            msg.sender,
            expiry
        );

        return certId;
    }

    /////////////////////////////////////////////
    //////// ENHANCED REVOCATION LOGIC //////////
    /////////////////////////////////////////////

    function revokeCertificate(uint256 certId) external onlyRevoker {
        require(_certificateExists(certId), "Invalid certificate ID");
        require(!_certificates[certId].isRevoked, "Already revoked");

        _certificates[certId].isRevoked = true;
        emit Events.CertificateRevoked(certId, msg.sender, block.timestamp);
    }

    /////////////////////////////////////////////
    //////// CROSS-CONTRACT VALIDATION //////////
    /////////////////////////////////////////////

    function isValid(uint256 certId) public view returns(bool) {
        return 
            _certificateExists(certId) &&
            !_certificates[certId].isRevoked &&
            block.timestamp < _certificates[certId].expiresAt &&
            certAuthority.isCertificationValid(_certificates[certId].enterprise);
    }

    /////////////////////////////////////////////
    //////// INTEGRATION-SAFE OVERRIDES /////////
    /////////////////////////////////////////////

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        require(to == address(0) || auth == address(0), "Non-transferable");
        return super._update(to, tokenId, auth);
    }

    /////////////////////////////////////////////
    //////// ROLE-BASED ACCESS CONTROL //////////
    /////////////////////////////////////////////

    modifier onlyCertifier() {
        require(hasCertifierRole(msg.sender), "Not certifier");
        _;
    }

    modifier onlyRevoker() {
        require(
            hasCertifierRole(msg.sender) || 
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        _;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    // -------- helper to aid in ceritificate checks
    function _certificateExists(uint256 tokenId) internal view returns (bool) {
    try this.ownerOf(tokenId) returns (address) {
        return true;
    } catch {
        return false;
    }
}
}
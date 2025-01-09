// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* CertificateTokenization
* @author @0xJonaseb11
*
* @dev Assigns a certificate to a valid Enterprise
* @notice It uses ERC-721 token standard to handle tokenization 
 */

 import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
 import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CertificateTokenization is ERC721URIStorage, AccessControl {
    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
    uint256 public nextTokenId;

    // hold certificate metadata
    struct Certificate {
        uint256 tokenId;
        address enterprise;
        uint256 issuedAt;
        uint256 expiresAt;
        bool isRevoked;
    }

    mapping(uint256 => Certificate) public certificates;

    // events to log data to blockchain
    event CertificateIssued(uint256 tokenId, address indexed enterprise, uint256 issuedAt, uint256 expiresAt);
    event CertificateRevoked(uint256 tokenId, address indexed revokedBy);

    constructor() ERC721("CertificateToken", "CERT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
    * @dev Issue a certificate to an enterprise
    * @param enterprise Address of the enterprise receieving the certificate
    * @param metadataURI URI of the certificate metadata (e.g IPFS hash)
    * @param expiresAt Expiry timestamp of the certificate 
    */

    function issueCertificate(address enterprise, string memory metadataURI, uint256 expiresAt) external  onlyRole(CERTIFIER_ROLE) {
        require(expiresAt > block.timestamp, "Expiry date must be in the future!");

        uint256 tokenId = nextTokenId;
        _safeMint(enterprise, tokenId);
        _setTokenURI(tokenId, metadataURI);

        certificates[tokenId] = Certificate({
            tokenId: tokenId,
            enterprise: enterprise,
            issuedAt: block.timestamp,
            expiresAt: expiresAt,
            isRevoked: false
        });

        emit CertificateIssued(tokenId, enterprise, block.timestamp, expiresAt);
        nextTokenId++;
    
    }

    /**
    * @dev Revoke certificate
    * @param tokenId ID of the certificate to revoke 
    */

    function revokeCertificate(uint256 tokenId) external onlyRole(CERTIFIER_ROLE) {
        require(_exists(tokenId), "Certificate does not exist! - It may have been revoked!!");
        require(!certificates[tokenId].isRevoked, "Certificate already revoked!");

        certificates[tokenId].isRevoked = true;

        emit CertificateRevoked(tokenId, msg.sender);
    }

    /**
    * @dev Check if a certificate is valid
    * @param tokenId ID of the certificate to check
    * @return isValid True if the certificate is valid, false otherwise
    */

    function isValidCertificate(uint256 tokenId) public view returns(bool isValid) {
        if (!_exists(tokenId)) return false;

        Certificate memory cert = certificates[tokenId];
        return !cert.isRevoked && cert.expiresAt > block.timestamp;
    }

    /**
    * @dev Add a new certifier
    * @param certifier Address to grant the certifier role
    */

    function addCertifier(address certifier) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(CERTIFIER_ROLE, certifier);
    }

    /**
    * @dev Remove a certifier
    * @param certifier Address to revoke the cetifier role
    */

    function removeCertifier(address certifier) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(CERTIFIER_ROLE, certifier);
    }

    
    
 }
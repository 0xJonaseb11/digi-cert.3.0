// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @title CertificationManager contract
* @author @0xJonaseb11
* 
* @dev Contract issues, revokes and updates certifications
* @notice Ensures only authorized bodies can certify enterprises
*/

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CertificationManager is ERC721 {

    uint256 public nextTokenId;
    address public admin;

    struct Certification {
        uint256 tokenId;
        address enterpriseAddress;
        uint256 certificationDate;
        uint256 expirationDate;
    }

    mapping(uint256 => Certification) public certifications;

    constructor () ERC721("EcoCertificateNFT", "ECN") {
        admin = msg.sender;
    }

    // restrict access
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only Admin can issue certifications");
        _;
    }

    function issueCertification(address enterpriseAddress, uint256 expirationDate) public onlyAdmin {
        uint256 tokenId = nextTokenId;
        _safeMint(enterpriseAddress, tokenId);
        certifications[tokenId] = Certification(tokenId, enterpriseAddress, block.timestamp, expirationDate);
        nextTokenId++;

    }

    function revokeCertification(uint256 tokenId) public onlyAdmin {
        _burn(tokenId);
        delete(certifications[tokenId]);
    }
    
}
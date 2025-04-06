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


        /*//////////////////////////////////////////////////////////////
                            ECOSYSTEM ROLES
        //////////////////////////////////////////////////////////////*/
        bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
        bytes32 public constant INSPECTOR_ROLE = keccak256("INSPECTOR_ROLE");
        bytes32 public constant ENTERPRISE_ROLE = keccak256("ENTERPRISE_ROLE")

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
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
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
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library DataTypes {
    struct Certification {
        string industry;
        string metadataURI;
        uint256 certifiedAt;
        uint256 expiryDate;
        bool isCertified;
        uint256 tokenId;
    }

    struct Enterprise {
        address enterpriseAddress;
        string name;
        string industry;
        string metadataURI;
        bool isRegistered;
        uint256 registrationDate;
        uint256 lastUpdated;
        uint256 certificateId
    }

    struct InspectionReport {
        address inspector;
        address enterprise;
        string reportURI;
        uint256 inspectedAt;
        bool passed;
    }

    struct NFTCertificate {
    address enterprise;
    address issuer;
    uint256 issuedAt;
    uint256 expiresAt;
    bool isRevoked;
}

    
}
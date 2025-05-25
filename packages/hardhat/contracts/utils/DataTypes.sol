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
    }

    struct InspectionReport {
        address inspector;
        address enterprise;
        string reportURI;
        uint256 inspectedAt;
        bool passed;
    }

    
}
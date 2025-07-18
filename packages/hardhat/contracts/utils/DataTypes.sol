// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @author @0xJonaseb11
* @dev This library contains the data types used by the contracts
* @dev These structs hold a huge role in maintaining contract states
*/
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
        uint256 certificateId;
    }

    struct InspectionReport {
        address inspector;
        address enterprise;
        string remarks;
        string evidenceURI; // IPFS hash
        uint256 inspectedAt;
        bool passed;
        bool flagged;
    }

    struct FlaggedInspection {
        address enterprise;
        uint256 reportIndex;
        InspectionReport report;
        address flaggedBy;
        string reason;
        uint256 flaggedAt;
    }

    struct NFTCertificate {
    address enterprise;
    address issuer;
    uint256 issuedAt;
    uint256 expiresAt;
    bool isRevoked;
    }

    struct AuditCase {
        uint256 id;
        address targetEnterprise;
        uint256 inspectionId;
        address auditor;
        string reason;
        string evidenceURI;
        uint256 depositAmount;
        AuditStatus status;
        uint256 createdAt;
        uint256 resolvedAt;
    }

    enum AuditStatus {
        Pending,
        Upheld,
        Rejected,
        Appealed
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Events {
    event CertificationGranted(address indexed enterprise, string industry, string metadataURI);
    event CertificationRevoked(address indexed enterprise);
    event CertificationUpdated(address indexed enterprise, string newMetadataURI);

    event EnterpriseRegistered(address indexed enterprise, string name, string industry, string metadataURI);
    event EnterpriseUpdated(address indexed enterprise, string newMetadataURI);

    event InspectionReportSubmitted(address indexed inspector, address indexed enterprise, bool passed, string reportURI);

    // You can add more events later as needed
}

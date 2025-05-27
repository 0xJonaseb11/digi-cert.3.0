// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
/**
* @author @0xJonaseb11
* @dev This library contains the events emitted by the contracts
* @dev All the contracts inherit this to handle events
*/

library Events {
    event CertificationGranted(address indexed enterprise, string industry, string metadataURI, uint256 expiryDate);
    event CertificationRevoked(address indexed enterprise);
    event CertificationUpdated(address indexed enterprise, string newMetadataURI);

    event EnterpriseRegistered(address indexed enterprise, string name, string industry, string metadataURI, uint256 certificateId);
    event EnterpriseUpdated(address indexed enterprise, string newMetadataURI);
    event EnterpriseDeregistered(address indexed enterprise, uint256 deregisteredAt);
    
    event InspectorAssigned(address indexed enterprise, address indexed inspector, uint256 validityPeriod);
    event InspectionReportSubmitted(address indexed inspector, address indexed enterprise, bool passed, string remarks, string evidenceURI, uint256 ReportedAt);
    
    event CertificateMinted(uint256 certificateId, address indexed enterprise, address indexed certifier, uint256 mintedAt);
    event CertificateRevoked(uint256 certificateId, address indexed revoker, uint256 timestamp);


    event PublicRoleGranted(address indexed user, uint256 duration);
    event PublicRoleExpired(address indexed user);
    event RoleTransferred(bytes32 indexed role, address from, address to);
    event BulkRolesGranted(bytes32[] roles, address[] indexed accounts);
    event RoleGranted(bytes32 indexed role, address indexed account);
    event RoleRevoked(bytes32 indexed role, address indexed account);

}
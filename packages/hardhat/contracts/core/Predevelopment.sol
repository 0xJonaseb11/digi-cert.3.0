// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../utils/Events.sol";
import "../utils/DataTypes.sol";

contract CertificationAuthority is AccessControl {
    using DataTypes for DataTypes.Enterprise; // if we have libraries later

    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
    bytes32 public constant INSPECTOR_MANAGER_ROLE = keccak256("INSPECTOR_MANAGER_ROLE");
    bytes32 public constant CERTIFICATE_FACTORY_ROLE = keccak256("CERTIFICATE_FACTORY_ROLE");

    // Mapping enterprise address => Certification data
    mapping(address => DataTypes.Certification) public certifications;

    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    // Enterprise Certification functions

    function certifyEnterprise(address enterpriseAddress, string memory industry, string memory metadataURI) external onlyRole(CERTIFIER_ROLE) {
        require(certifications[enterpriseAddress].isCertified == false, "Enterprise already certified");
        
        certifications[enterpriseAddress] = DataTypes.Certification({
            industry: industry,
            metadataURI: metadataURI,
            certifiedAt: block.timestamp,
            isCertified: true
        });

        emit Events.CertificationGranted(enterpriseAddress, industry, metadataURI);
    }

    function revokeCertification(address enterpriseAddress) external onlyRole(CERTIFIER_ROLE) {
        require(certifications[enterpriseAddress].isCertified == true, "Enterprise not certified");

        certifications[enterpriseAddress].isCertified = false;

        emit Events.CertificationRevoked(enterpriseAddress);
    }

    function updateCertificationMetadata(address enterpriseAddress, string memory newMetadataURI) external onlyRole(CERTIFIER_ROLE) {
        require(certifications[enterpriseAddress].isCertified == true, "Enterprise not certified");

        certifications[enterpriseAddress].metadataURI = newMetadataURI;

        emit Events.CertificationUpdated(enterpriseAddress, newMetadataURI);
    }

    // Public view functions

    function getCertification(address enterpriseAddress) external view returns (DataTypes.Certification memory) {
        return certifications[enterpriseAddress];
    }
}

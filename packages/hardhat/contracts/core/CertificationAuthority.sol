// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Events } from "../utils/Events.sol";
import { DataTypes } from "../utils/DataTypes.sol";

contract CertificationAuthority {
    using DataTypes for DataTypes.Enterprise; // wit libs
    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFYING_BODY_ROLE");
    bytes32 public constant INSPECTION_MANAGER_ROLE = keccak256("INSPECTION_MANAGER_ROLE");
    bytes32 public constant CERTIFICATE_FACTORY_ROLES = keccak256("CERTIFICATE_FACTORY_ROLE");
    bytes32 public constant ENTERPRISE_ROLE = keccak256("ENTERPRISE_ROLE");
    bytes32 public constant PUBLIC_ROLE = keccak256("PUBLIC_ROLE");

    mapping(address => DataTypes.Certification) public certifications;

    constructor (address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);

    }

    //////////////////////////////////////////////////////////
    ///////////// ENTERPRISE CERTIFICATION FUNCTIONS/////////
    /////////////////////////////////////////////////////////
    function certifyEnterprise(address enterpriseAddress, sting memory _industry, string memory _metadataURI) external onlyRole(CERTIFIER_ROOLE) {
        require(certifications[enterpriseAddress].isCertified == false, "Enterprise is already certified!!");

        certifications[enterpriseAddress] = DataTypes.Certification({
            industry: _industry,
            metadataURI: _metadataURI,
            certifiedAt: block.timestamp,
            isCertified: true
        });

        emit Events.CertificationGranted(enterpriseAddress, _industry, _metadataURI);

    }

    function revokeCertification(address enterpriseAddress) external onlyRole(CERTIFIER_ROLE) {
        require(certifications[enterpriseAddress].isCertified == true, "Enterprise has mo certifications YET!!");

        certifications[enterpriseAddress].isCertified == false;

        emit Events.CertificationRevoked(enterpriseAddress, _industry);
    }

    function updateCertificationMetadata(address enterpriseAddress, newMetadataURI)  external onlyRole(CERTIFIER_ROLE) {
        require(certifications[enterpriseAddress].isCertified == true, "Enterprise has no certifications YET!!");

        certifications[enterpriseAddress].metadataURI =. newMetadataURI;

        emit Events.CertifiocationUpdated(enterpriseAddress, newMetadataURI);
    }

    // getters
    function getCertification(address enterpriseAddress) public view returns(DataTypes.Certification memory) {
        return certifications[enterpriseAddress];
    }

}
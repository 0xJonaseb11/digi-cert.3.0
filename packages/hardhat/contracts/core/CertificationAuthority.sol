// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from "./RolesManager.sol";
import { Events } from "../utils/Events.sol";
import { DataTypes } from "../utils/DataTypes.sol";

contract CertificationAuthority is RolesManager {
    using DataTypes for DataTypes.Enterprise; // wit libs

    mapping(address => DataTypes.Certification) public certifications;
     

     /// -- Assign a custorm address on deployment
    // constructor (address admin) {
    //     _setupRole(DEFAULT_ADMIN_ROLE, admin);
    //     _setupRole(CERTIFIER_ROLE, admin);

    // }

     /// -- assign the deployer on deployment
    constructor() {
     _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
     _setupRole(CERTIFIER_ROLE, msg.sender);
    }


    //////////////////////////////////////////////////////////
    ///////////// ENTERPRISE CERTIFICATION FUNCTIONS/////////
    /////////////////////////////////////////////////////////
    function certifyEnterprise(address enterpriseAddress, string memory _industry, string memory _metadataURI) external onlyRole(CERTIFIER_ROLE) {
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

        emit Events.CertificationRevoked(enterpriseAddress);
    }

    function updateCertificationMetadata(address enterpriseAddress, string calldata newMetadataURI)  external onlyRole(CERTIFIER_ROLE) {
        require(certifications[enterpriseAddress].isCertified == true, "Enterprise has no certifications YET!!");

        certifications[enterpriseAddress].metadataURI = newMetadataURI;

        emit Events.CertificationUpdated(enterpriseAddress, newMetadataURI);
    }

    // getters
    function getCertification(address enterpriseAddress) public view returns(DataTypes.Certification memory) {
        return certifications[enterpriseAddress];
    }

}
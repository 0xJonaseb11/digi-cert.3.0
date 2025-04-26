// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../utils/DataTypes.sol";
import "../utils/Events.sol";
import "../core/RolesManager.sol";

contract EnterpriseRegistry {
    RolesManager public rolesManager;

    mapping(address => DataTypes.Enterprise) private enterprises;
    address[] public allEnterprises;

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    }

    modifier onlyEnterprise() {
        require(rolesManager.hasEnterpriseRole(msg.sender), "EnterpriseRegistry: Not an authorized enterprise");
        _;
    }

    modifier onlyCertifier() {
        require(rolesManager.hasCertifierRole(msg.sender), "EnterpriseRegistry: Not an authorized certifier");
        _;
    }

    function registerEnterprise(
        address enterpriseAddress,
        string memory name,
        string memory industry,
        string memory metadataURI
    ) external onlyCertifier {
        require(!enterprises[enterpriseAddress].isRegistered, "EnterpriseRegistry: Already registered");

        enterprises[enterpriseAddress] = DataTypes.Enterprise({
            enterpriseAddress: enterpriseAddress,
            name: name,
            industry: industry,
            metadataURI: metadataURI,
            isRegistered: true
        });

        allEnterprises.push(enterpriseAddress);

        emit Events.EnterpriseRegistered(enterpriseAddress, name, industry, metadataURI);
    }

    function updateEnterpriseMetadata(string memory newMetadataURI) external onlyEnterprise {
        require(enterprises[msg.sender].isRegistered, "EnterpriseRegistry: Not registered");

        enterprises[msg.sender].metadataURI = newMetadataURI;

        emit Events.EnterpriseUpdated(msg.sender, newMetadataURI);
    }

    function getEnterprise(address enterpriseAddress) external view returns (DataTypes.Enterprise memory) {
        return enterprises[enterpriseAddress];
    }

    function listEnterprises() external view returns (address[] memory) {
        return allEnterprises;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { DataTypes } from "../utils/DataTypes.sol";
import { Events } from "../utils/Events.sol";
import { RolesManager } from "../core/RolesManager.sol";

contract EnterpriseRegistry {
    RolesManager public rolesManager;

    mapping (address => DataTypes.Enterprise) private enterprises;
    address[] public allEnterprises;

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    }

    modifier onlyEnterprise() {
        require(rolesManager.hasEnterpriseRole(msg.sender));
        _;
    }

    modifier onlyCertifier() {
        require(rolesManager.hasCertifierRole(msg.sender));
        _;
    }

    //////////////////////////////////////////////
    /////// MINERAL REGISTRY FUNCTIONS ///////////
    //////////////////////////////////////////////
    
    function registerEnterprise(
        address _enterpriseAddress,
        string memory _name,
        string memory _industry,
        string memory _metadataURI
    ) external onlyCertifier {
        require(!enterprises[_enterpriseAddress].isRegistered, "EnterpriseRegistry: Enterprise Already registererd!!");

        enterprises[_enterpriseAddress] = DataTypes.Enterprise({
            enterpriseAddress: _enterpriseAddress,
            name: _name,
            industry: _industry,
            metadataURI: _metadataURI,
            isRegistered: true
        });

        allEnterprises.push(_enterpriseAddress);

        emit Events.EnterpriseRegistered(_enterpriseAddress, _name, _industry, _metadataURI);

    }

    function updateEnterpriseMetadata(string memory newMetadataURI) external onlyEnterprise {
        require(enterprises[msg.sender].isRegistered, "EnterpriseRegistry: Enterprise Not Registered!!");
        
        enterprises[msg.sender].metadataURI = newMetadataURI;

        emit Events.EnterpriseUpdated(msg.sender, newMetadataURI);
    }  


    ////////////////////////
    ////// getters /////////
    ////////////////////////
    function getEnterprise(address enterpriseAddress) external view returns (DataTypes.Enterprise memory) {
        return enterprises[enterpriseAddress];
    }

    function listEnterprises() external view returns(address[] memory) {
        return allEnterprises;
    }

}
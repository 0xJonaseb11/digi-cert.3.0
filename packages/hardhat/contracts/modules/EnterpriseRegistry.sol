// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { DataTypes } from "../utils/DataTypes.sol";
import { Events } from "../utils/Events.sol";
import { RolesManager } from "../core/RolesManager.sol";

contract EnterpriseRegistry is RolesManager {
    RolesManager public rolesManager;

    mapping (address => DataTypes.Enterprise) private enterprises;
    address[] public allEnterprises;

    constructor(address _rolesManager) {
        rolesManager = RolesManager(_rolesManager);
    }

    modifier onlyEnterprise() {
        require(rolesManager.hasEnterpriseRole(msg.sender));
        if (!hasEnterpriseRole(msg.sender)) {
            revert RolesManager__NotAuthorizedEnterprise();
        }
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
    ) external onlyRole(CERTIFIER_ROLE) {
        
        if (enterprises[_enterpriseAddress].isRegistered == true) {
            revert EnterpriseRegistry__EnterpriseAlreadyExists();
        }
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
        
        if (enterprises[msg.sender].isRegistered == false) {
            revert EnterpriseRegistry__EnterpriseDoesNotExist();
        }
        enterprises[msg.sender].metadataURI = newMetadataURI;

        emit Events.EnterpriseUpdated(msg.sender, newMetadataURI);
    }  


    ////////////////////////
    ////// getters /////////
    ////////////////////////
    function getEnterprise(address enterpriseAddress) external view onlyValidAddress(enterpriseAddress) returns (DataTypes.Enterprise memory) {
        return enterprises[enterpriseAddress];
    }

    function listEnterprises() external view returns(address[] memory) {
        return allEnterprises;
    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { DataTypes } from "../utils/DataTypes.sol";
import { Events } from "../utils/Events.sol";
import { RolesManager } from "../core/RolesManager.sol";
import { CertificateNFT } from "../modules/CertificateNFT.sol";
import { CertificationAuthority } from "../core/CertificationAuthority.sol";

contract EnterpriseRegistry is RolesManager {
    RolesManager public rolesManager;
    CertificateNFT public certificateNFT;
    CertificationAuthority public certAuthority;


    mapping (address => DataTypes.Enterprise) private enterprises;
    address[] public allEnterprises;

    constructor(address _rolesManager, address _certNFT, address _certAuthority) {
        rolesManager = RolesManager(_rolesManager);
        certificateNFT = CertificateNFT(_certNFT);
        certAuthority = CertificationAuthority(_certAuthority);


    }

    modifier onlyEnterprise() {
        require(hasEnterpriseRole(msg.sender));
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
        string calldata _name,
        string calldata _industry,
        string calldata _metadataURI,
        uint256 _initialCertDuration
    ) external onlyRole(CERTIFIER_ROLE) {

        if (enterprises[_enterpriseAddress].isRegistered) {
            revert EnterpriseRegistry__EnterpriseAlreadyExists();
        }

        enterprises[_enterpriseAddress] = DataTypes.Enterprise({
            enterpriseAddress: _enterpriseAddress,
            name: _name,
            industry: _industry,
            metadataURI: _metadataURI,
            isRegistered: true,
            registrationDate: block.timestamp,
            lastUpdated: block.timestamp,
            certificateId: 0
        });

        // Enable auto-certificatoin in CertificationAuthority contract
        certAuthority.certifyEnterprise(_enterpriseAddress, _industry, _metadataURI, _initialCertDuration);

        // mint NFT Certificate
        uint256 certId = certificateNFT.mintCertificate(_enterpriseAddress, _metadataURI /*, _initialCertDuration*/);
        enterprises[_enterpriseAddress].certificateId = certId;

        allEnterprises.push(_enterpriseAddress);

        emit Events.EnterpriseRegistered(_enterpriseAddress, _name, _industry, _metadataURI, certId);
    }

    function updateEnterpriseMetadata(string memory newMetadataURI) external onlyEnterprise {
        
        if (enterprises[msg.sender].isRegistered == false) {
            revert EnterpriseRegistry__EnterpriseDoesNotExist();
        }
        enterprises[msg.sender].metadataURI = newMetadataURI;

        emit Events.EnterpriseUpdated(msg.sender, newMetadataURI);
    }  

    ///////////////////////////////////////////
    ///////////   Essential helpers //////////
    //////////////////////////////////////////
    function isEnterpriseActive(address _enterprise) public view returns(bool) {
        return 
            enterprises[_enterprise].isRegistered &&
            certAuthority.isCertificationValid(_enterprise) &&
            certificateNFT.isCertificateValid(enterprises[_enterprise].certificateId);
    }

    function deRegisterEnterprise(address _enterprise) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!enterprises[_enterprise].isRegistered) {
            revert EnterpriseRegistry__EnterpriseDoesNotExist();
        }
            // revoke in all systems
            certAuthority.revokeCertification(_enterprise);
            certificateNFT.revokeCertificate(enterprises[_enterprise].certificateId);

            enterprises[_enterprise].isRegistered = false;

            emit Events.EnterpriseDeregistered(_enterprise, block.timestamp);
    }


    ////////////////////////
    ////// getters /////////
    ////////////////////////

    /// ------ Simple getters approach ---- //
     function getEnterprise(address enterpriseAddress) external view onlyValidAddress(enterpriseAddress) returns (DataTypes.Enterprise memory) {
        return enterprises[enterpriseAddress];
    }

    function listEnterprises() external view returns(address[] memory) {
        return allEnterprises;
    }


    function getEnterpriseWithStatus(address _enterprise)
    external view
    returns(DataTypes.Enterprise memory, bool isActive) {
        DataTypes.Enterprise memory ent = enterprises[_enterprise];
        return (ent, isEnterpriseActive(_enterprise));
    }

    // paginated enterprise listing
    // --- added pagination for formatted output

    function lisEnterprisesPaginated(uint256 start, uint256 limit) 
    external view returns(address[] memory) {
        
        if (start > allEnterprises.length) {
            revert EnterpriseRegistry__InvalidStart();
        }   uint256 end = start + limit > allEnterprises.length ? allEnterprises.length : start + limit;
            address[] memory result = new address[] (end - start);

            for (uint256 i = start; i < end; i++) {
                result[i - start] = allEnterprises[i];
            }
            return result;
    }

}
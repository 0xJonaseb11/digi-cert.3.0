// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


/**
* @author @0xJonaseb11
* @title EnterpriseRegistry Contract
* @dev This contract is used to register enterprises to the platform
* @dev Only the Super Admin can register enterprises
* @dev Only the Super Admin can deregister enterprises
* @dev Only the owner of the enterprise can update the metadata URI
* @notice It allows integration with  `CertificationAuthority`, `CertificateNFT` and `RolesManager contracts for smooth certification mage't
*/
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

        if (!hasEnterpriseRole(msg.sender)) {
            revert RolesManager__NotAuthorizedEnterprise();
        }
        _;
    }


    //////////////////////////////////////////////
    /////// MINERAL REGISTRY FUNCTIONS ///////////
    //////////////////////////////////////////////
    
    /** 
    * @dev Registers a new enterprise to the platform
    * @dev Automatically creates a certification for the enterprise
    * @dev Automatically mints a NFT certificate for the enterprise
    * @param _enterpriseAddress The address of the enterprise
    * @param _name The name of the enterprise
    * @param _industry The industry of the enterprise
    * @param _metadataURI The metadata URI(IPFS hash) of the enterprise
    * @param _initialCertDuration The duration of the initial certification
    * @notice Emits EnterpriseRegistered event when a new enterprise is registered
    */
    function registerEnterprise(
        address _enterpriseAddress,
        string calldata _name,
        string calldata _industry,
        string calldata _metadataURI,
        uint256 _initialCertDuration
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {

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
    
    /** 
    * @dev Updates the metadata URI of an enterprise
    * @dev Only the owner of the enterprise can update the metadata URI
    * @param newMetadataURI The new metadata URI(IPFS hash) of the enterprise
    * @notice Emits EnterpriseUpdated event when the metadata URI is updated
    */
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

    /**
    * @dev Checks if an enterprise is active 
    * @dev An enterprise is active if it is registered, has a valid certification and has a valid NFT certificate
    * @dev Returns true if the enterprise is active
    * @param _enterprise The address of the enterprise
    * @return bool true if the enterprise is active
     */
    function isEnterpriseActive(address _enterprise) public view returns(bool) {
        return 
            enterprises[_enterprise].isRegistered &&
            certAuthority.isCertificationValid(_enterprise) &&
            certificateNFT.isCertificateValid(enterprises[_enterprise].certificateId);
    }

    /**
    * @dev Deregisters an enterprise from the platform
    * @dev Only the Super Admin can deregister an enterprise
    * @dev Revokes the certification and NFT certificate of the enterprise
    * @notice Emits EnterpriseDeregistered event when an enterprise is deregistered
    */

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
    /**
    * @dev Returns a paginated list of enterprises
    * @dev The list is paginated by start and limit
    * @param start The start index of the list
    * @param limit The number of enterprises to return
    * @return address[] The list of enterprises
    */
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
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @title EnterpriseRegistry contract
* @author @0xJonaseb11
* @dev Manages enterprise registration and related basic details
* @notice Encorporates Authentication and Authorization approaches to enahance security 
*/

contract EnterpriseRegistry {

    // states
    struct Enterprise {
        string name;
        string environmentalImpactHash;
        uint256 certificationStatus; // 0=Uncertified 1=Certified
        address certifyingBody;
    }

     struct EnterpriseInfo {
        address enterpriseAddress;
        string name;
    }

    mapping(address => Enterprise) public enterprises;
    address public admin;
    address public  certificateRevoker;
    EnterpriseInfo[] public enterpriseList;
    EnterpriseInfo[] public certifiedEnterpriseList;

    constructor() {
        admin = msg.sender;
        certificateRevoker = msg.sender;

    }

    // Restrict access
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action!!");
        _;
    }

    /**
    * @dev Events to emit to the blockchain when data are logged
    */
    event EnterpriseRegisteredSuccessfully(string name, address indexed enterpriseAddress, string reportHash);
    event EnterpriseCertified(address enterpriseAddress, address indexed certifier);
    event CertificationRevoked(address indexed enterpriseAddress, address indexed certificateRevoker);

    function registerEnterprise(address enterpriseAddress, string memory name, string memory reportHash) public onlyAdmin {
        require(enterpriseAddress != address(0), "Invalid Enterprise Address!!");
        enterprises[enterpriseAddress] = Enterprise(name, reportHash, 0, address(0));

        // enterpriseList.push(EnterpriseInfo(enterpriseAddress, name));        
        emit  EnterpriseRegisteredSuccessfully(name, enterpriseAddress, reportHash);
    }

    function certifyEnterprise(address enterpriseAddress, address certifier) public onlyAdmin {
        require(enterpriseAddress != address(0), "Invalid Enterprise Address!");
        enterprises[enterpriseAddress].certificationStatus = 1;
        enterprises[enterpriseAddress].certifyingBody = certifier;

        // certifiedEnterpriseList.push(EnterpriseInfo(enterpriseAddress, enterprises[enterpriseAddress].name));
        emit EnterpriseCertified(enterpriseAddress, certifier);
    }

    function revokeCertification(address enterpriseAddress, address revokedBy) public onlyAdmin returns (address, uint256 ){
        require(enterpriseAddress != address(0), "Invalid enterprise address!");
        
        certificateRevoker = revokedBy;
        uint256 certificationStatus = enterprises[enterpriseAddress].certificationStatus = 0;
        
        emit  CertificationRevoked(enterpriseAddress, revokedBy);
        return ( revokedBy, certificationStatus );
    }

    /**
    * @dev Retrieves the registered enterprises from `EnterpriseList[]`
    */
    function getEnterpriseList() public view returns (EnterpriseInfo[] memory) {
        return enterpriseList;
    }

    /**
    * @dev returns certified enterprises 
    */
    function getCertifiedEnterpriseList() public view returns (EnterpriseInfo[] memory) {
        return certifiedEnterpriseList;
    }

}
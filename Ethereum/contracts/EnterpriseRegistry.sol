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
        uint256 certificationiStatus; // 0=Uncertified 1=Certified
        address certifyingBody;
    }

    mapping(address => Enterprise) public enterprises;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    // Restrict access
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action!!");
        _;
    }

    function registerEnterprise(address enterpriseAddress, string memory name, string memory reportHash) public onlyAdmin {
        enterprises[enterpriseAddress] = Enterprise(name, reportHash, 0, address(0));
    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @title GovernanceDAO Contract
* @author @0xJonaseb11 
* @dev Manages standards, voting and disputes in the certification process
* Manages and takes decision regarding voting
*/

contract GovernanceDAO {
    address[] public members;
    mapping(address => uint256) public votes;

    constructor(address[] memory initialMembers) {
        members = initialMembers;
    }

    // restrict access
    modifier onlyMember() {
        bool isMember = false;
        
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == msg.sender) {
                isMember = true;
                break;
            }
        }
        require(isMember, "Only DAO members can vote");
        _;
    }

    function vote(uint256 proposalId, bool approve) public onlyMember {
        if (approve) {
            votes[msg.sender] = proposalId; // real world case, you'd track approval here
        }
    }

}

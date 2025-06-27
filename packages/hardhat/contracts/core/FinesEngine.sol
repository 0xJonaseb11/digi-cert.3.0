// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FinesEngine {
    address public admin;
    address public treasury;

    mapping(address => uint256) public finesETH;
    mapping(address => mapping(address => uint256)) public finesERC20;
    
}
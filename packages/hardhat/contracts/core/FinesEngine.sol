// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FinesEngine {
    address public admin;
    address public treasury;

    mapping(address => uint256) public finesETH;
    mapping(address => mapping(address => uint256)) public finesERC20;


    // pernalty tiers(e.g., 100 USDC for minor, 1000 USDC for major)
    mapping(string => uint256) public penaltyTiers;

    event FineImposedETH(address indexed enterprise, uint256 amount);
    event FineImposedERC20(address indexed enterprise, address token, uint256 amount);
    event FinePaidETH(address indexed enterprise, uint256 amount);
    event FinePaidERC20(address indexed enterprise, address token, uint256 amount);

    constructor(address _treasury) {
        admin = msg.sender;
        treasury = _treasury;

        // initialize penalty tiers (customize as needed)
        penaltyTiers["minor"] = 100 ether;
        penaltyTiers["major"] = 1000 ether;

    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not Authorized!");
        _;
    }

    // --------------- Admin ----------------- //
    function imposeFineETH(address _enterprise, string memory _tier) public onlyAdmin {
        uint256 amount = penaltyTiers[_tier];
        finesETH[_enterprise] += amount;

        emit FineImposedETH(_enterprise, amount);
    }

    function withdrawETH() public onlyAdmin {
        payable(treasury).transfer(address(this).balance);
    }

    function withdrawERC20(address _token) public onlyAdmin {
        IERC20 token = IERC20(_token);
        token.transfer(treasury, token.balanceOf(address(this)));
    }

    // ------------- Enterprise ---------- //
    function payFineETH() public payable {
        require(finesETH[msg.sender] > 0, "No fines pending");
        require(msg.value >= finesETH[msg.sender], "Insufficient paymemnt");
        finesETH[msg.sender] = 0;

        emit FinePaidETH(msg.sender, msg.value);
    }

    function payFineERC20(address _token) public {
        uint256 amount = finesERC20[msg.sender][_token];
        require(amount > 0, "No fines pending!");
        IERC20(_token).transferFrom(msg.sender, address(this), amount);
        finesERC20[msg.sender][_token] = 0;

        emit FinePaidERC20(msg.sender, _token, amount);
    }

}
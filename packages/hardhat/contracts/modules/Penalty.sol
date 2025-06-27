// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FinesEngine {
    address public admin;
    address public treasury;

    // Track fines per enterprise
    mapping(address => uint256) public finesETH; // ETH-denominated fines
    mapping(address => mapping(address => uint256)) public finesERC20; // Token -> Amount

    // Penalty tiers (e.g., 100 USDC for minor, 1000 USDC for major)
    mapping(string => uint256) public penaltyTiers; 

    event FineImposedETH(address indexed enterprise, uint256 amount);
    event FineImposedERC20(address indexed enterprise, address token, uint256 amount);
    event FinePaidETH(address indexed enterprise, uint256 amount);
    event FinePaidERC20(address indexed enterprise, address token, uint256 amount);

    constructor(address _treasury) {
        admin = msg.sender;
        treasury = _treasury;
        // Initialize penalty tiers (customize as needed)
        penaltyTiers["minor"] = 100 ether; // 100 ETH (or use wei)
        penaltyTiers["major"] = 1000 ether;
    }

    // ===================== ADMIN FUNCTIONS =====================
    function imposeFineETH(address _enterprise, string memory _tier) public onlyAdmin {
        uint256 amount = penaltyTiers[_tier];
        finesETH[_enterprise] += amount;
        emit FineImposedETH(_enterprise, amount);
    }

    function imposeFineERC20(address _enterprise, address _token, string memory _tier) public onlyAdmin {
        uint256 amount = penaltyTiers[_tier];
        finesERC20[_enterprise][_token] += amount;
        emit FineImposedERC20(_enterprise, _token, amount);
    }

    function withdrawETH() public onlyAdmin {
        payable(treasury).transfer(address(this).balance);
    }

    function withdrawERC20(address _token) public onlyAdmin {
        IERC20 token = IERC20(_token);
        token.transfer(treasury, token.balanceOf(address(this)));
    }

    // ===================== ENTERPRISE FUNCTIONS =====================
    function payFineETH() public payable {
        require(finesETH[msg.sender] > 0, "No fines pending");
        require(msg.value >= finesETH[msg.sender], "Insufficient payment");
        finesETH[msg.sender] = 0;
        emit FinePaidETH(msg.sender, msg.value);
    }

    function payFineERC20(address _token) public {
        uint256 amount = finesERC20[msg.sender][_token];
        require(amount > 0, "No fines pending");
        IERC20(_token).transferFrom(msg.sender, address(this), amount);
        finesERC20[msg.sender][_token] = 0;
        emit FinePaidERC20(msg.sender, _token, amount);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }
}
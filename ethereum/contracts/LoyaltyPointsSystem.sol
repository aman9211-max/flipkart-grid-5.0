// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoyaltyPointsSystem {
    mapping(address => uint256) public loyaltyPoints;
    mapping(address => uint256) public issuanceTimestamp;

    uint256 public loyaltyPointsValidityDuration = 365 days;

    event PointsEarned(address indexed user, uint256 amount, uint256 issuanceTimestamp);
    event PointsRedeemed(address indexed user, uint256 amount);

    constructor() {}

    function earnPoints(uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than 0");
        require(msg.value >= amount, "Insufficient ether sent");

        loyaltyPoints[msg.sender] += amount;
        issuanceTimestamp[msg.sender] = block.timestamp;

        emit PointsEarned(msg.sender, amount, block.timestamp);
    }

    function redeemPoints(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(loyaltyPoints[msg.sender] >= amount, "Insufficient loyalty points");
        require(block.timestamp < issuanceTimestamp[msg.sender] + loyaltyPointsValidityDuration, "Loyalty points expired");

        loyaltyPoints[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        emit PointsRedeemed(msg.sender, amount);
    }

    function getUserPoints(address user) external view returns (uint256) {
        return loyaltyPoints[user];
    }

    function setLoyaltyPointsValidityDuration(uint256 duration) external {
        loyaltyPointsValidityDuration = duration;
    }

    function getRandomReward(uint256 maxAmount) internal view returns (uint256) {
        uint256 randomFactor = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % 11;
        uint256 reward = (maxAmount * randomFactor) / 100;

        if (reward > maxAmount / 10) {
            return maxAmount / 10;
        }

        return reward;
    }

    function claimRandomReward(uint256 maxShoppingAmount) external {
        require(loyaltyPoints[msg.sender] > 0, "No loyalty points to redeem");
        require(block.timestamp < issuanceTimestamp[msg.sender] + loyaltyPointsValidityDuration, "Loyalty points expired");

        uint256 rewardAmount = getRandomReward(maxShoppingAmount);
        require(rewardAmount <= maxShoppingAmount / 10, "Reward exceeds 10% of total shopping");

        loyaltyPoints[msg.sender] -= 1;
        payable(msg.sender).transfer(rewardAmount);

        emit PointsRedeemed(msg.sender, rewardAmount);
    }
    receive() external payable {}
}

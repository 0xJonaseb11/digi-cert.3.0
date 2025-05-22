// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEnterpriseRegistry {
    function registerEnterprise(address enterprise, string calldata metadataURI) external;
    function suspendInterprise(address enterprise) external;
    function isEnterpriseRegistered(address enterprise) external view returns(bool);
    function isEnterpriseSuspended(address enterprise) external view returns(bool);
    function getEnterpriseMetadata(address enterprise) external view returns(string memory);
}
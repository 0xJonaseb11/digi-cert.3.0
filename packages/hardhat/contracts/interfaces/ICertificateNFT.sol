// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICertificateNFT {
    function mintCertificate(address enterprise, string calldata metadataURI) external;
    
}
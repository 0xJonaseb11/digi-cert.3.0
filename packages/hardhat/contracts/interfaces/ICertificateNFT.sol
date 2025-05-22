// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICertificateNFT {
    function mintCertificate(address enterprise, string calldata metadataURI) external;
    function revokeCertificate(uint256 certId) external;
    function isCertificateValid(uint256 certId) external view returns(bool);
    function getCertificateId(address enterprise) external view returns(uint256);
}
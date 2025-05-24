// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Errors {
    error InvalidAddress();

    // ------- CertificationAuthority
    error CertificationAuthority__EnterpriseAlreadyCertified();
    error CertificationAuthority__EnterpriseNotCertifiedYet();
}
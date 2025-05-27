// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Errors {
    error InvalidAddress();

    // -------- RolesManager ------------------//
    error RolesManager__UnauthorizedToPerformAction();
    error RolesManager__NotAuthorizedCertifier();
    error RolesManager__NotAuthorizedInspector();
    error RolesManager__NotAuthorizedAuditor();
    error RolesManager__NotAuthorizedEnterprise();
    error RolesManager__NotAuthorizedCertificateFactory();
    error RolesManager__NotAuthorizedPublicUser();

    // ------- EnterpriseRegistry --------------//
    error EnterpriseRegistry__EnterpriseAlreadyExists();
    error EnterpriseRegistry__EnterpriseDoesNotExist();
    error EnterpriseRegistry__InvalidStart();

    // ------- CertificationAuthority ------- //
    error CertificationAuthority__EnterpriseAlreadyCertified();
    error CertificationAuthority__EnterpriseNotCertifiedYet();

    // -------- CertificateNFT --------- //
    error CertificateNFT__EnterpriseAlreadyCertified();
    error CertificateNFT__CertificateDoesNotExist();

    // -------- InspectionManageer --------- //
    error InspectionManager__InspectorAlreadyAssigned();
    error InspectionManager__InspectionPeriodExpired();
    error InspectionManager__NotAssignedToEnterprise();

    // ---------- InspectionReport ----------- //
    error InspectionReport__NoReportsAssociatedWithEnterprise();

}
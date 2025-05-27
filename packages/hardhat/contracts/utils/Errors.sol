// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @author @0xJonaseb11
* @dev contains the custom errors emitted by the contracts
@notice All the contracts inherit this to handle custom errors
*/

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
    error RolesManager__AlreadyHasRole();
    error RolesManager__InvalidDuration();
    error RolesManager__EmptyArray();
    error RolesManager__ArrayLengthMismatch();
    error RolesManager__RoleDoesNotExist();

    // ------- EnterpriseRegistry --------------//
    error EnterpriseRegistry__EnterpriseAlreadyExists();
    error EnterpriseRegistry__EnterpriseDoesNotExist();
    error EnterpriseRegistry__InvalidStart();

    // ------- CertificationAuthority ------- //
    error CertificationAuthority__EnterpriseAlreadyCertified();
    error CertificationAuthority__EnterpriseNotCertifiedYet();
    error CertificationAuthority__CertificationNotExpiredYet();

    // -------- CertificateNFT --------- //
    error CertificateNFT__EnterpriseAlreadyCertified();
    error CertificateNFT__CertificateDoesNotExist();

    // -------- InspectionManageer --------- //
    error InspectionManager__InspectorAlreadyAssigned();
    error InspectionManager__InspectionPeriodExpired();
    error InspectionManager__NotAssignedToEnterprise();
    error InspectionManager__InvalidReportIndex();
    error InspectionManager__ReportAlreadyFlagged();
    error InspectionManager__NoReportsAssociatedWithEnterprise();


    // ---------- InspectionReport ----------- //

    error AuditorOversight__NotAuthorizedEnterpriseOwner();
    error AuditorOversight__AppealWindowClosed();
    error AuditorOversight__CaseNotPending();

}
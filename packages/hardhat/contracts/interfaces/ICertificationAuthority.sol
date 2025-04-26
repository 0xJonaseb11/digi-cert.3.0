// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICertificationAuthority {
    function setRolesManager(address _rolesManager) external;
    function updateEnterpriseRegistry(address _enterprise) external;
    function updateInspectionManager(address _inspectionManager) external;
    function updateCertificateNFT(address _certificateNFT) external;
}
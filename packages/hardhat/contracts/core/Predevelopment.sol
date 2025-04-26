// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICertificationAuthority {
    function setRolesManager(address _rolesManager) external;
    function updateEnterpriseRegistry(address _enterpriseRegistry) external;
    function updateInspectorManager(address _inspectorManager) external;
    function updateCertificateNFT(address _certificateNFT) external;
}

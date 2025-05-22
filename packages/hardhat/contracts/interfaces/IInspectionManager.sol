// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEnspectionManager {
    function registerInspector(address inspector) external;
    function removeInspector(address inspector) external;
    function isInspectorRegistered(address inspeector) external view returns(bool);
}
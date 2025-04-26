// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IInspectorManager {
    function registerInspector(address inspector) external;
    function removeInspector(address inspector) external;
    function isInspectorRegistered(address inspector) external view returns (bool);
}

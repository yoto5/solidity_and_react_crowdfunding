// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface CrowdfundingWithTypes {

    function remove_project_from_type_mapping(string memory project_type, 
    address project_add) external;

    function add_project_to_type_mapping(string memory project_type, 
    address project_add) external;
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import './CrowdfundingInterface.sol';

interface CrowdfundingWithTypes is CrowdfundingInterface{

    /*
    * This interface is crowdinterface with project type capabilities.
    * it will able the user to filter projects by project type.
    */

    function remove_project_from_type_mapping(string memory project_type, 
    address project_add) external;

    function add_project_to_type_mapping(string memory project_type, 
    address project_add) external;

    function get_projects_by_type(string memory project_type) external view 
    returns(address[] memory);

    function get_all_types() external view returns(string[] memory);
}
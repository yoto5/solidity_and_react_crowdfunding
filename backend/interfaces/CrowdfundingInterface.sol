// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface CrowdfundingInterface {

    /*
    * This interface is the main crowdfunding app intrface.
    */

    function create_new_project(
        string memory name,
        string memory desc,
        uint256 target,
        uint256 end_date,
        string memory image_add,
        string[] memory types_arr,
        uint256[] memory amounts_to_donate) external returns(address);

        function get_projects_by_user() external view returns(address[] memory);

        function get_all_projects() external view returns(address[] memory);
}
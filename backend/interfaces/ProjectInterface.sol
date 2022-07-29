// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface ProjectInterface {

    function fund_project(string memory funder_name, bool is_anonymous) 
    external payable;

    function return_funds_to_funders() external;

    function return_funds_to_single_funder(address payable funder_add) external;

    function owner_withdraw() external;

    function is_success() external view returns(bool);

    function is_fail() external view returns(bool);

    function add_fix_amount(uint256 amount) external;

    function remove_fix_amount(uint256 amount) external;

    function add_type(string memory project_type) external;

    function remove_type(string memory project_type) external;

    function change_picture(string memory picture_url) external;

    function change_project_name(string memory new_name) external;

    function change_project_description(string memory new_desc) external;

    function get_project_types() external view returns(string[] memory);

    function get_fixed_amounts() external view returns(uint256[] memory);

    function get_name_to_amount() external view 
    returns(string[] memory, uint256[] memory);

    function set_time_limit(uint256 new_time) external;
}
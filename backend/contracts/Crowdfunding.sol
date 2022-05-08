// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Crowdfunding {
    address[] users;
    address[] projects;
    mapping(address=>address) user_to_projects;
    mapping(string=>address) type_to_projects;

    function create_new_project() public {

    }

    function get_project_by_address(address project_address) public {
        
    }

    function get_projects_by_type(string memory project_type) public {
        
    }

    function get_projects_by_user(address user_address) public {
        
    }

    function get_all_projects() public {
        
    }
}
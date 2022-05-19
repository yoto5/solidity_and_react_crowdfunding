// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import './Project.sol';

contract Crowdfunding {
    address[] users;
    address[] projects;
    mapping(address=>address[]) user_to_projects;
    mapping(string=>address[]) type_to_projects;

    function create_new_project(
        string memory name,
        string memory desc,
        uint256 target,
        uint256 end_date,
        string memory image_add,
        string[] memory types_arr,
        uint256[] memory amounts_to_donate) public {
        
        // create new project with given parameters
        Project new_project = new Project(
            msg.sender,
            name,
            desc,
            target, 
            end_date, 
            image_add,
            types_arr,
            amounts_to_donate);

        // add the user to users list
        users.push(msg.sender);

        // push new project to relevant mappings and array
        projects.push(address(new_project));
        user_to_projects[msg.sender].push(address(new_project));

        for(uint i=0; i < types_arr.length; i++){
            type_to_projects[types_arr[i]].push(address(new_project));
        }
    }

    function get_projects_by_type(string memory project_type) public view 
    returns(address[] memory){

        return type_to_projects[project_type];
    }

    function get_projects_by_user() public view 
    returns(address[] memory){

        return user_to_projects[msg.sender];
    }

    function get_all_projects() public view 
    returns(address[] memory){

        return projects;
    }

    function remove_project_from_type_mapping(string memory project_type, 
    address project_add) public{
        
        for(uint i=0; i<type_to_projects[project_type].length; i++){
            if(type_to_projects[project_type][i] == project_add){
                delete type_to_projects[project_type][i];
                break;
            }
        }
    }
}
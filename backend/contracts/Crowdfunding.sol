// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import './Project.sol';

contract Crowdfunding {
    address[] users;
    address[] projects;
    mapping(address=>address[]) user_to_projects;
    mapping(string=>address[]) type_to_projects;

    // constractor parameters 
    uint256 opration_fee_from_user;
    uint256 opration_fee_to_project;

    constructor(
        uint256 fee_from_user, 
        uint256 fee_to_project) {
        /* 
         * main app's owner should set how much fees users required to pay
         * in order to open new project, as well as how much of this fees will
         * be sent to the new project. 
         * the rest of the fees will be used by the main app for operation gas.
        */
        require((opration_fee_to_project > 0) && (opration_fee_to_project < 100), 
        "Opration fee to project should be precent (0 < fee < 100)");
        opration_fee_from_user = fee_from_user;
        opration_fee_to_project = fee_to_project;
    }

    function create_new_project(
        string memory name,
        string memory desc,
        uint256 target,
        uint256 end_date,
        string memory image_add,
        string[] memory types_arr,
        uint256[] memory amounts_to_donate) public payable{
        /* 
         * this is a project factory function
         * flow:
         * - check that the sender send operaion fees.
         * - calaculate how much fees will be sent to the new project from the opp fees.
         * - create new project.
         * - send opp fees to new project.
         * - add the new user to users list and add the new project to mappings.
        */
        
        // check for operation fee
        require(msg.value >= opration_fee_from_user, "missing operation fee");

        // caclulate fees that need to be sent to the new project
        uint256 project_fees = (opration_fee_from_user*opration_fee_to_project) / 100;
        
        // create new project with given parameters
        Project new_project = new Project(
            msg.sender,
            name,
            desc,
            target, 
            end_date, 
            image_add,
            types_arr,
            amounts_to_donate,
            project_fees);
        
        // send fees to prject
        payable(address(new_project)).transfer(project_fees);

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

    function add_project_to_type(string memory project_type, 
    address project_add) public{
        /* 
         * this function will be activate by the frontend when owner add type
         * to his project.
        */
        type_to_projects[project_type].push(project_add);
    }

    function remove_project_from_type_mapping(string memory project_type, 
    address project_add) public{
        /* 
         * this function will be activate by the frontend when owner remove type
         * from his project.
        */
        for(uint i=0; i<type_to_projects[project_type].length; i++){
            if(type_to_projects[project_type][i] == project_add){
                delete type_to_projects[project_type][i];
                break;
            }
        }
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import './Project.sol';
import '../interfaces/CrowdfundingWithTypes.sol';

contract Crowdfunding is CrowdfundingWithTypes{
    address[] users;
    address[] projects;
    mapping(address=>address[]) user_to_projects;
    mapping(string=>address[]) type_to_projects;

    /* 
     * this is a types set.
     * we'll use it to update and get all types.
    */
    struct TypesSet{
        string[] types;
        mapping(string=>bool) is_exists;
    }
    TypesSet types_set;

    function update_types(string[] memory types_from_user) private{
        /* 
         * this function will update the app's types pool
         * with the user's types sent to the new project.
         * uses TypesSet struct in order to update in more efficient way.
        */
        for(uint i=0; i<types_from_user.length; i++){
            string memory new_type = types_from_user[i];
            if (!types_set.is_exists[new_type]) {
                types_set.types.push(new_type);
                types_set.is_exists[new_type] = true;
            }
        }
    }

    function create_new_project(
        string memory name,
        string memory desc,
        uint256 target,
        uint256 end_date,
        string memory image_add,
        string[] memory types_arr,
        uint256[] memory amounts_to_donate) public returns(address){
        /* 
         * this is a project factory function
         * flow:
         * - create new project.
         * - add the new user to users list and add the new project to mappings.
         * - update the new types to our types pool.
        */
        
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
            address(this));

        // add the user to users list
        users.push(msg.sender);

        // push new project to relevant mappings and array
        projects.push(address(new_project));
        user_to_projects[msg.sender].push(address(new_project));

        for(uint i=0; i < types_arr.length; i++){
            type_to_projects[types_arr[i]].push(address(new_project));
        }

        // update types from user into app's types.
        update_types(types_arr);

        return address(new_project);
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

    function add_project_to_type_mapping(string memory project_type, 
    address project_add) external{
        /* 
         * this function will be activate by a project when owner add type
         * to his project.
        */
        type_to_projects[project_type].push(project_add);
        
        string[] memory temp_arr = new string[](1);
        temp_arr[0] = project_type;
        update_types(temp_arr);
    }

    function remove_project_from_type_mapping(string memory project_type, 
    address project_add) external{
        /* 
         * this function will be activate by a project when owner remove type
         * from his project.
        */
        for(uint i=0; i<type_to_projects[project_type].length; i++){
            if(type_to_projects[project_type][i] == project_add){
                uint256 last_index = type_to_projects[project_type].length - 1;
                type_to_projects[project_type][i] = type_to_projects[project_type][last_index];
                type_to_projects[project_type].pop();
                break;
            }
        }
    }

    function get_all_types() public view returns(string[] memory){
        /* 
         * this function will return all the types in our main app.
         * the frontend will use it to enable filtering by type.
        */
        return types_set.types;
    }
}
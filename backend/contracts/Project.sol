// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Project {
    address project_owner;
    uint256 target_amount;
    uint256 date_limit;
    string image_url;
    string[] types;
    uint256[] fixed_amounts_to_donate;

    address[] doners;
    mapping(address=>uint256) doner_to_amount;
    
    function fund_project(uint256 amount) public {

    }

    function return_funds_to_doners() public {

    }

    function owner_withdraw() public {

    }

    function is_success() public {

    }

    function is_fail() public {

    }

    function add_fix_amount(uint256 amount) public {

    }

    function remove_fix_amount(uint256 amount) public {

    }

    function add_type(string memory project_type) public {

    }

    
    function remove_type(string memory project_type) public {

    }

    function change_picture(string memory picture_url) public {

    }
}
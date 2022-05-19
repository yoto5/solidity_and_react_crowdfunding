// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Project {
    address payable project_owner;
    string project_name;
    string project_description;
    uint256 target_amount;
    uint256 date_limit;
    string image_url;
    string[] types;
    uint256[] fixed_amounts_to_donate;

    address payable[] doners;
    mapping(address=>uint256) doner_to_amount;

    constructor(
        address owner,
        string memory name,
        string memory desc,
        uint256 target,
        uint256 end_date,
        string memory image_add,
        string[] memory types_arr,
        uint256[] memory amounts_to_donate) {

            project_owner = payable(owner);
            project_name = name;
            project_description = desc;
            target_amount = target;
            date_limit = end_date;
            image_url = image_add;
            types = types_arr;
            fixed_amounts_to_donate = amounts_to_donate;

    }
    
    function fund_project() public payable {

        doner_to_amount[msg.sender] += msg.value;
        doners.push(payable(msg.sender));
    }

    function return_funds_to_doners() public {
        /*
         * everyone can demand refund.
         * refund can be activated only if those two conditions fulfiled:
         * 1. project has fail.
         * 2. current project blance is above 0.
         */
        require((this.is_fail() == true) && (address(this).balance > 0),
        "Project has not failed yet, or doesn't have any funds.");

        for(uint i=0; i<doners.length; i++){
            doners[i].transfer(doner_to_amount[doners[i]]);
        }
    }

    function owner_withdraw() public {
        /*
         * only the owner can withdraw funds uppon success.
         * withdraw can be made only if those two conditions fulfiled:
         * 1. project has succeed 
         * 2. the owner sent the request.
         */
        require((this.is_success() == true) && (msg.sender == project_owner),
        "Project has not succeed yet, or you are not the owner.");

        project_owner.transfer(address(this).balance);
    }

    function get_curr_total_funds() private view returns(uint256){

        uint256 curr_amount = 0;
        for(uint i=0; i<doners.length; i++){
            curr_amount += doner_to_amount[doners[i]];
        }
        return curr_amount;
    }

    function is_success() public view returns(bool){
        /*
         * if timie limit is bigger than now (didn't reach)
         * and curr total funds is bigger or equale than target amount,
         * then project was succeed.
         */
        uint256 curr_amount = get_curr_total_funds();
        if((date_limit >= block.timestamp) && (curr_amount >= target_amount)){
            return true;
        }
        return false;
    }

    function is_fail() public view returns(bool){
        /*
         * if timie limit is less than now (didn't reach)
         * and curr total funds is less than target amount,
         * then project was failed.
         */
        uint256 curr_amount = get_curr_total_funds();
        if((date_limit < block.timestamp) && (curr_amount < target_amount)){
            return true;
        }
        return false;
    }

    function add_fix_amount(uint256 amount) public {
        // need owner permissions 
        require(msg.sender == project_owner, "Need owner permissions.");

        fixed_amounts_to_donate.push(amount);
    }

    function remove_fix_amount(uint256 amount) public {
        // need owner permissions 
        require(msg.sender == project_owner, "Need owner permissions.");

        for(uint i=0; i<fixed_amounts_to_donate.length; i++){
            if(fixed_amounts_to_donate[i] == amount){
                delete fixed_amounts_to_donate[i];
                break;
            }
        }
    }

    function add_type(string memory project_type) public {
        // need owner permissions 
        require(msg.sender == project_owner, "Need owner permissions.");

        types.push(project_type);
    }

    
    function remove_type(string memory project_type) public {
        // need owner permissions 
        require(msg.sender == project_owner, "Need owner permissions.");

        /*
         * the conversion inside the condition is needed,
         * since soldity don't comapre memory str with storage str.
         */
        for(uint i=0; i<types.length; i++){
            if(keccak256(bytes(types[i])) == keccak256(bytes(project_type))){
                delete types[i];
                break;
            }
        }
    }

    function change_picture(string memory picture_url) public {
        // need owner permissions 
        require(msg.sender == project_owner, "Need owner permissions.");
        
        image_url = picture_url;
    }
}
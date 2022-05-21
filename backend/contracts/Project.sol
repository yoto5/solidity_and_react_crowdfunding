// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Project {

    // private attributes 
    address payable project_owner;

    address payable[] funders;
    mapping(address=>bool) funder_exists;
    mapping(address=>uint256) funder_to_amount;
    mapping(address=>string) funder_to_name;

    // public attributes
    string public project_name;
    string public project_description;
    uint256 public target_amount;
    uint256 public date_limit;
    uint256 public max_recorded_amount;
    string public image_url;
    uint256 public created;
    bool public is_closed;

    string[] public types;
    uint256[] public fixed_amounts_to_donate;

    constructor(
        address owner,
        string memory name,
        string memory desc,
        uint256 target,
        uint256 end_date,
        string memory image_add,
        string[] memory types_arr,
        uint256[] memory amounts_to_donate) {
            /* 
             * main app project factory will activate this constuctor.
            */
            project_owner = payable(owner);
            project_name = name;
            project_description = desc;
            target_amount = target;
            date_limit = end_date;
            image_url = image_add;
            types = types_arr;
            fixed_amounts_to_donate = amounts_to_donate;
            created = block.timestamp;
            is_closed = false;
    }

    function fund_project(string memory funder_name, bool is_anonymous) 
    public payable {
        /* 
         * this function will be used bu users to fund this project.
         * - add the funder to project's funders if it is his first funding 
         *   for this project.
         * - add the funder name or "Anonymous" to the funders history.
         * - update max recorded balance for this project.
        */
        require(is_closed == false, "This project is close.");
        require(this.is_fail() == false, "This project was failed.");

        funder_to_amount[msg.sender] += msg.value;

        if(!funder_exists[msg.sender]){
            funders.push(payable(msg.sender));
            funder_exists[msg.sender] = true;
        }
        
        if(is_anonymous){
            funder_to_name[msg.sender] = "Anonymous"; 
        }
        else{
            funder_to_name[msg.sender] = funder_name;
        }
        
        max_recorded_amount = address(this).balance;
    }

    function return_funds_to_doners() public {
        /*
         * everyone can demand refund.
         * refund can be activated only if those two conditions fulfiled:
         * 1. project has fail.
         * 2. current project blance is above 0.
        */
        require(is_closed == false, "This project is close.");
        require((this.is_fail() == true) && (address(this).balance > 0),
        "Project has not failed yet, or doesn't have any funds.");

        for(uint i=0; i<funders.length; i++){
            funders[i].transfer(funder_to_amount[funders[i]]);
        }

        is_closed = true;
    }

    function owner_withdraw() public {
        /*
         * only the owner can withdraw funds uppon success.
         * withdraw can be made only if those two conditions fulfiled:
         * 1. project has succeed 
         * 2. the owner sent the request.
        */
        require(is_closed == false, "This project is close.");
        require((this.is_success() == true) && (msg.sender == project_owner),
        "Project has not succeed yet, or you are not the owner.");

        project_owner.transfer(address(this).balance);

        is_closed = true;
    }

    function get_curr_total_funds() public view returns(uint256){

        return address(this).balance;
    }

    function is_success() public view returns(bool){
        /*
         * if timie limit is bigger than now (didn't reach)
         * and curr total funds is bigger or equale than target amount,
         * then project was succeed.
        */
        uint256 curr_amount = get_curr_total_funds();
        if(curr_amount >= target_amount){
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

        require(is_closed == false, "This project is close.");
        require(msg.sender == project_owner, "Need owner permissions.");

        fixed_amounts_to_donate.push(amount);
    }

    function remove_fix_amount(uint256 amount) public {

        require(is_closed == false, "This project is close.");
        require(msg.sender == project_owner, "Need owner permissions.");

        for(uint i=0; i<fixed_amounts_to_donate.length; i++){
            if(fixed_amounts_to_donate[i] == amount){
                uint256 last_index = fixed_amounts_to_donate.length - 1;
                fixed_amounts_to_donate[i] = fixed_amounts_to_donate[last_index];
                fixed_amounts_to_donate.pop();
                break;
            }
        }
    }

    function add_type(string memory project_type) public {
        
        require(is_closed == false, "This project is close."); 
        require(msg.sender == project_owner, "Need owner permissions.");

        types.push(project_type);
    }

    
    function remove_type(string memory project_type) public {
        
        require(is_closed == false, "This project is close."); 
        require(msg.sender == project_owner, "Need owner permissions.");

        /*
         * the conversion inside the condition is needed,
         * since soldity don't comapre memory str with storage str.
        */
        for(uint i=0; i<types.length; i++){
            if(keccak256(bytes(types[i])) == keccak256(bytes(project_type))){
                uint256 last_index = types.length - 1;
                types[i] = types[last_index];
                types.pop();
                break;
            }
        }
    }

    function change_picture(string memory picture_url) public {
        
        require(is_closed == false, "This project is close."); 
        require(msg.sender == project_owner, "Need owner permissions.");
        
        image_url = picture_url;
    }

    function get_project_types() public view returns(string[] memory){
        return types;
    }

    function get_fixed_amounts() public view returns(uint256[] memory){
        return fixed_amounts_to_donate;
    }

    function get_name_to_amount() public view 
    returns(string[] memory,
            uint256[] memory){
        /* 
         * This function will be used to get funding history.
         * returns arrays of funders names and funders amounts.
         * for example funder named funders_names[i] donate to this project
         * funders_amounts[i].
         * the front end will get those arrays and will display funding history.
        */
        string[] memory funders_names = new string[](funders.length);
        uint256[] memory funders_amounts = new uint256[](funders.length);

        for(uint i=0; i<funders.length; i++){
            funders_names[i] = funder_to_name[funders[i]];
            funders_amounts[i] = funder_to_amount[funders[i]];
        }
        return (funders_names, funders_amounts);
    }

    function set_time_limit(uint256 new_time) public{
        date_limit = new_time;
    }
}
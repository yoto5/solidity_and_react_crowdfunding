import pytest
from datetime import datetime

from brownie import accounts

from  crowdfunding_test_utils import get_main_app, get_main_app_and_new_project, get_main_app_with_multiple_deployed_projects 


def test_initial_empty_projects():
    crowdfunding = get_main_app()
    projects = crowdfunding.get_all_projects()
    assert projects == []


def test_add_new_project():
    # deploy main app and new project from main app
    crowdfunding, new_project = get_main_app_and_new_project()

    # verify all parameters
    assert new_project.project_name() == "test 1"
    assert new_project.project_description() == "this is test 1"
    assert new_project.target_amount() == 150000
    assert new_project.date_limit() == int(datetime(2030, 1, 1).timestamp())
    assert new_project.image_url() == "http://fake_image.com"
    assert new_project.get_project_types() == ["type1", "type2"]
    assert new_project.get_fixed_amounts() == [10,50]
    assert new_project.is_closed() == False
    assert new_project.is_success() == False
    assert new_project.is_fail() == False
    assert new_project.get_curr_total_funds() == 0
    assert new_project.max_recorded_amount() == 0


def test_success_project_with_withdraw():
   # deploy main app and create new project
    crowdfunding, new_project = get_main_app_and_new_project()

    # verify is_success = False
    assert new_project.is_success() == False

    # 2 transactions from different accounts
    trans = new_project.fund_project("funder1", False, {'from': accounts[1], 'value': 100000})
    trans.wait(1)
    trans = new_project.fund_project("funder2", False, {'from': accounts[2], 'value': 100000})
    trans.wait(1)

    # verify is_success = True and relevant parameters 
    assert new_project.is_success() == True
    assert new_project.get_curr_total_funds() == 200000
    assert new_project.max_recorded_amount() == 200000
    assert new_project.is_closed() == False

    # only owner (account[0]) can withdraw
    with pytest.raises(Exception):
        new_project.owner_withdraw({'from': accounts[1]})

    # owner withdraw and relevant parameters
    trans = new_project.owner_withdraw({'from': accounts[0]})
    trans.wait(1)
    assert new_project.get_curr_total_funds() == 0
    assert new_project.max_recorded_amount() == 200000
    assert new_project.is_closed() == True
    

def test_fail_project_with_refund():
    # deploy main app and create new project
    crowdfunding, new_project = get_main_app_and_new_project()

    # verify is_fail = False
    assert new_project.is_fail() == False

    # 2 transactions from different accounts, not enough 
    trans = new_project.fund_project("funder1", False, {'from': accounts[1], 'value': 10000})
    trans.wait(1)
    trans = new_project.fund_project("funder2", False, {'from': accounts[2], 'value': 10000})
    trans.wait(1)

    # change date limit for test failure
    trans = new_project.set_time_limit(int(datetime(2000, 1, 1).timestamp()), {'from': accounts[0]})
    trans.wait(1)

    # verify failure
    assert new_project.is_fail() == True
    assert new_project.get_curr_total_funds() == 20000

    # verify can't fund if project was failed
    with pytest.raises(Exception):
        new_project.fund_project("funder3", False, {'from': accounts[3], 'value': 10000})

    #demand refund and verify close
    trans = new_project.return_funds_to_funders({'from': accounts[1]})
    trans.wait(1)
    assert new_project.get_curr_total_funds() == 0
    assert new_project.is_closed() == True


def test_funding_history():
    # deploy main app and create new project
    crowdfunding, new_project = get_main_app_and_new_project()

    # 5 transactions 4 different accounts with 2 anonymous
    trans = new_project.fund_project("funder1", False, {'from': accounts[1], 'value': 10000})
    trans.wait(1)
    trans = new_project.fund_project("funder2", False, {'from': accounts[2], 'value': 10000})
    trans.wait(1)
    trans = new_project.fund_project("funder3", True, {'from': accounts[3], 'value': 10000})
    trans.wait(1)
    trans = new_project.fund_project("funder4", True, {'from': accounts[4], 'value': 10000})
    trans.wait(1)
    trans = new_project.fund_project("funder1", False, {'from': accounts[1], 'value': 10000})
    trans.wait(1)

    # verify funding history
    names, amounts = new_project.get_name_to_amount()
    assert names == ["funder1", "funder2", "Anonymous", "Anonymous"]
    assert amounts == [20000, 10000, 10000, 10000]


def test_edit_project_types():
    # deploy main app and create new project
    crowdfunding, new_project = get_main_app_and_new_project()

    # verify types in project and main app and mapping between types to project
    assert new_project.get_project_types() == ["type1", "type2"]
    assert crowdfunding.get_all_types() == ["type1", "type2"]
    assert crowdfunding.get_projects_by_type("type1") == [new_project.address]
    assert crowdfunding.get_projects_by_type("type2") == [new_project.address]

    # add type3 to project and verify
    trans = new_project.add_type("type3", {'from': accounts[0]})
    trans.wait(1)
    assert new_project.get_project_types() == ["type1", "type2", "type3"]
    assert crowdfunding.get_all_types() == ["type1", "type2", "type3"]
    assert crowdfunding.get_projects_by_type("type1") == [new_project.address]
    assert crowdfunding.get_projects_by_type("type2") == [new_project.address]
    assert crowdfunding.get_projects_by_type("type3") == [new_project.address]

    # remove type1 and verify
    trans = new_project.remove_type("type1", {'from': accounts[0]})
    trans.wait(1)
    assert set(new_project.get_project_types()) == set(["type2", "type3"])
    assert crowdfunding.get_all_types() == ["type1", "type2", "type3"]
    assert crowdfunding.get_projects_by_type("type1") == []
    assert crowdfunding.get_projects_by_type("type2") == [new_project.address]
    assert crowdfunding.get_projects_by_type("type3") == [new_project.address]

    # add existing type
    trans = new_project.add_type("type3", {'from': accounts[0]})
    trans.wait(1)
    assert set(new_project.get_project_types()) == set(["type2", "type3"])
    assert crowdfunding.get_all_types() == ["type1", "type2", "type3"]

    # remove not existing type 
    trans = new_project.remove_type("type1", {'from': accounts[0]})
    trans.wait(1)
    assert set(new_project.get_project_types()) == set(["type2", "type3"])
    assert crowdfunding.get_all_types() == ["type1", "type2", "type3"]

    # only owner can add/ remove type
    with pytest.raises(Exception):
        new_project.add_type("type3", {'from': accounts[1]})

    with pytest.raises(Exception):
        new_project.remove_type("type3", {'from': accounts[1]})    


def test_edit_project_parameters():
    # deploy main app and create new project
    crowdfunding, new_project = get_main_app_and_new_project()

    # for each parameters check the state before and after and verify owner edit only

    # get_fixed_amounts
    assert new_project.get_fixed_amounts() == [10,50]
    trans = new_project.add_fix_amount(100, {'from': accounts[0]})
    trans.wait(1)
    assert new_project.get_fixed_amounts() == [10,50, 100]
    with pytest.raises(Exception):
        new_project.add_fix_amount(100, {'from': accounts[1]})

    # remove_fix_amount
    assert new_project.get_fixed_amounts() == [10,50, 100]
    trans = new_project.remove_fix_amount(10, {'from': accounts[0]})
    trans.wait(1)
    assert set(new_project.get_fixed_amounts()) == set([50, 100])
    with pytest.raises(Exception):
        new_project.remove_fix_amount(100, {'from': accounts[1]})

    # change_picture
    assert new_project.image_url() == "http://fake_image.com"
    trans = new_project.change_picture("https://fake_image2.com", {'from': accounts[0]})
    trans.wait(1)
    assert new_project.image_url() == "https://fake_image2.com"
    with pytest.raises(Exception):
        new_project.change_picture("http://fake_image.com", {'from': accounts[1]})

    # change_project_name
    assert new_project.project_name() == "test 1"
    trans = new_project.change_project_name("test111", {'from': accounts[0]})
    trans.wait(1)
    assert new_project.project_name() == "test111"
    with pytest.raises(Exception):
        new_project.change_project_name("bad_test1", {'from': accounts[1]})

    # change_project_description
    assert new_project.project_description() == "this is test 1"
    trans = new_project.change_project_description("new desc", {'from': accounts[0]})
    trans.wait(1)
    assert new_project.project_description() == "new desc"
    with pytest.raises(Exception):
        new_project.change_project_description("bad desc", {'from': accounts[1]})

    # set_time_limit
    assert new_project.date_limit() == int(datetime(2030, 1, 1).timestamp())
    trans = new_project.set_time_limit(int(datetime(2222, 1, 1).timestamp()), {'from': accounts[0]})
    trans.wait(1)
    assert new_project.date_limit() == int(datetime(2222, 1, 1).timestamp())
    with pytest.raises(Exception):
        new_project.set_time_limit(int(datetime(1987, 1, 1).timestamp()), {'from': accounts[1]})


def test_get_projects_from_main_app():
    main_app = get_main_app_with_multiple_deployed_projects()

    # get all projects
    assert len(main_app.get_all_projects()) == 6

    # get projects by type
    assert len(main_app.get_projects_by_type('type1')) == 4
    assert len(main_app.get_projects_by_type('type2')) == 4

    # get projects by user
    assert len(main_app.get_projects_by_user({'from': accounts[1]})) == 2
    assert len(main_app.get_projects_by_user({'from': accounts[2]})) == 2
    assert len(main_app.get_projects_by_user({'from': accounts[3]})) == 2
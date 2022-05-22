from datetime import datetime

from brownie import accounts, Crowdfunding, Project
from brownie.network.contract import Contract

projects_info = [
    ["test 1", "this is test 1", 150000, int(datetime(2030, 1, 1).timestamp()), "http://fake_image.com",
        ["type1", "type2"], [10,50]]
    ]

type_1_projects = [
    ["test 1", "this is test 1", 150000, int(datetime(2030, 1, 1).timestamp()), "http://fake_image1.com",
        ["type1"], [10,50]],
    ["test 2", "this is test 2", 150000, int(datetime(2030, 1, 1).timestamp()), "http://fake_image2.com",
        ["type1"], [10,50]],
    ]

type_2_projects = [
    ["test 3", "this is test 3", 150000, int(datetime(2030, 1, 1).timestamp()), "http://fake_image3.com",
        ["type2"], [10,50]],
    ["test 4", "this is test 4", 150000, int(datetime(2030, 1, 1).timestamp()), "http://fake_image4.com",
        ["type2"], [10,50]],
    ]

type_1_and_2_projects = [
    ["test 3", "this is test 5", 150000, int(datetime(2030, 1, 1).timestamp()), "http://fake_image5.com",
        ["type1", "type2"], [10,50]],
    ["test 4", "this is test 6", 150000, int(datetime(2030, 1, 1).timestamp()), "http://fake_image6.com",
        ["type1", "type2"], [10,50]],
    ]

def get_main_app():
    account = accounts[0]
    crowdfunding = Crowdfunding.deploy({'from': account})
    return crowdfunding

def get_main_app_and_new_project():
    crowdfunding = get_main_app()
    crowdfunding.create_new_project(*projects_info[0]) 
    projects = crowdfunding.get_all_projects()
    assert len(projects) == 1
    new_project = Contract.from_abi("Project", projects[0], Project.abi)

    return crowdfunding, new_project


def get_main_app_with_multiple_deployed_projects():
    crowdfunding = get_main_app()

    # create type1 projects for accounts[1]
    for project_data in type_1_projects:
        crowdfunding.create_new_project(*project_data, {'from': accounts[1]}) 

    # create type2 projects for accounts[2]
    for project_data in type_2_projects:
        crowdfunding.create_new_project(*project_data, {'from': accounts[2]}) 

    # create type1 + type2 projects for accounts[3]
    for project_data in type_1_and_2_projects:
        crowdfunding.create_new_project(*project_data, {'from': accounts[3]}) 

    return crowdfunding
    

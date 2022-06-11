from brownie import accounts, config, Project
from brownie.network.contract import Contract


def main():

    # account = accounts[0]
    account = accounts.add(config['wallets']['from_key'])
    print(account)

    proj_address = '0xE5fFd21cA64677a2f530fd52916EE008EcF9b358'
    project = Contract.from_abi("Project", proj_address, Project.abi)
    print(project.project_name())  


if __name__ == '__main__':
    main()
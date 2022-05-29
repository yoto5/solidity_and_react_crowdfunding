from brownie import accounts, config, Crowdfunding
import time


def main():

    # account = accounts[0]
    account = accounts.add(config['wallets']['from_key'])
    print(account)

    crowdfunding = Crowdfunding.deploy({'from': account})
    time.sleep(5)
    print(crowdfunding.get_all_projects())  


if __name__ == '__main__':
    main()
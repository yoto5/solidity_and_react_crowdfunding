# solidity_and_react_crowdfunding

## Intro
<br>
In this project we'll implement a crowdfunding web app based on Ethereum blockchain.
<br>
The backend will be written in solidity and the frontend with React.ts.
<br>
<br>

### Features:
- login with crypto wallet (Metamask for example).
- users will be able to open new projects.
- users will be able to edit their own projects.
- users will be able to search other projects.
- users will be able to fund other projects.
- project owner must set date limit and target amount.
- if project's time limit has reached without the target amount the project will be failed and all the funders can demand refund.
- if the project got enough funds before the time limit, the project succeed and the owner can withdraw the funds.
- each project can have multiple project type, and users can filter and look for projects by project type.
- project owner need to set fixed amounts that the users can donate to the project.
- each project will have a funding history: name -> amount.
- users will be able to donate anonymously.
- project will get closed after successful withdraw or failure and refund.

### Gas Fees Information:
- owner successful withdraw - owner will pay the gas fees.
- demand refund - the user who demand refund first will pay the gas fees.
- fund project - the user who fund the project. 
- create new project / edit existing project - project's owner
- deploy main app - main app's owner.
---

## Backend
As mentioned above, the backend is written in solidity and will be deployed to Ethereum testnet.
<br>
In this section we have two solidity contracts And one interface:
- Crowdfunding.sol
- Project.sol
- CrowdfundingWithTypes.sol - interface
<br>

### Crowdfunding.sol
This contract represents the main app.
<br>
Our frontend will connect with this contract in order to:
- create new projects.
- get projects by project type.
- get projects by owner.
- get single project by address.
- get all projects.

### Project.sol
This contract represents a single project.
<br>
Our frontend will connect with this contract in order to:
- fund this project.
- check if project has fail.
- check if project has succeed.
- demand refund.
- owner withdraw.
- add/ remove project type.
- add/ remove fixed amount.
- change project image/name/description.
- get the current balance.
- get project's types.
- get funding history - two lists of funders and amounts.

### CrowdfundingWithTypes.sol
This interface will able the projects contracts to add types in the main contract. as well as add/remove connection between type to project's address.
<br>
Since cyclic dependencies are forbidden, each project will have address of type  CrowdfundingWithTypes, and it will able the project to edit the main app's types pool.

<br>

## Backend Tests
The backend tests are written in python with brownie package.
<br>

### Setup
In order to run the test:
- open a brownie project with brownie init 
- locate the contracts/ interface/ tests in the proper directories
- with CLI enter brownie test

<br>

### Test Cases
- deploy a new main app without projects.
- deploy new project from the main app and verify the info.
- project was succeed and owner can withdraw and only owner can withdraw.
- project was fail, every user can demand refund for funders, can't fund project if it fails.
- get funding history, users can fund anonymously.
- owner and only owner can change project's types and the change reflects in the main app mapping.
- owner and only owner can change project's info: name/ description/ amounts to donate/ time limit
- get all projects from main app, get projects by type, get projects by user

<br>

## Backend Deployment

In this project we'll deploy our contracts to Rinkeby testnet.
<br>

### Prerequisite:
- Metamask account (or another wallet with Ethereum)
- Infura account (send RPC requests to the blockchain)
- brownie installed
<br>

### How to deploy:
- Create .env file in your project.
- Create two env vars in your .env - PRIVATE_KEY, WEB3_INFURA_PROJECT_ID.
- Export your private key and assign to PRIVATE_KEY.
- Assign your Infura project id to WEB3_INFURA_PROJECT_ID.
- Run our deploy script with `brownie run scripts/deploy.py --network=rinkeby`
- Now you can find your deployment info in build dir.

### Deployment info:
In our github repo **inside build dir** you can find the Rinkeby deployment info:
- contracts/interfaces - all contracts/interfaces info such as ABI.
- deployments - deployment info, inside map.json you can find our contract's address.

---
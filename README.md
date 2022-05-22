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

### operation fees information:
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

---
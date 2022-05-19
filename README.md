# solidity_and_react_crowdfunding

## Intro
<br>
In this project we'll implement a crowdfunding web app based on Ethereum blockchain.
<br>
The backend will be written in solidity and the frontend with React.ts.
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
---

## Backend
As mentioned above, the backend is written in solidity and will be deployed to Ethereum testnet.
<br>
In this section we have two solidity contracts:
- Crowdfunding.sol
- Project.sol
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
- change project image.
- get the current balance.

---
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
- project owners should pay operation fee when they create their projects.
- operation fee amount will be set by the main app owner. 
- the main app's owner will set percentage of how much fees will be sent to a new project. for example, owner can set this parameter to 80. in this case 80% of the user fees will be sent to the new project and 20% will stay at the main app.
- when new project is create, the main app will send the operation fees to the new project according to the parameters mentioned above. 
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
import Web3 from 'web3';
import process from 'process';

import ProjectsList from '../../components/projects/ProjectsList';
import crowdfunding_abi from '../../contracts/crowdfunding_abi.json';
import project_abi from '../../contracts/project_abi.json';
import { MAIN_CONTRACT_ADDRESS } from '../../consts';

function UserPage(props: any){

    return(
        <ProjectsList projects={props.projects} isOwner={true}/>
    )
}

export async function getServerSideProps(context: any){
    // static info load
    // fetch data from blockchain
    const address = MAIN_CONTRACT_ADDRESS
    const infura = String(process.env.INFURA_URL);
    const userAdd = context.query.userId;
    
    // get all projects from main contract
    const web333 = new Web3(infura);
    const main_contract_abi = JSON.parse(JSON.stringify(crowdfunding_abi))
    const proj_abi = JSON.parse(JSON.stringify(project_abi))
    const main_contract = new web333.eth.Contract(main_contract_abi, address);
    const projects_add = await main_contract.methods.get_projects_by_user().call({from: userAdd});
  
    const projects_info: any = []
  
    for (let i = 0; i < projects_add.length; i++) {
      const proj_contract = new web333.eth.Contract(proj_abi, projects_add[i]);
      const projects_name = await proj_contract.methods.project_name().call();
      const projects_image = await proj_contract.methods.image_url().call();
  
      projects_info.push({
        name: projects_name,
        id: projects_add[i],
        image: projects_image
      })    
    }
  
  
    return{
      props:{
        projects: projects_info
      }
    };
  }

export default UserPage;
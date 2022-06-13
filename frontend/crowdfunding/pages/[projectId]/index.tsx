import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEthers } from '@usedapp/core';
import Web3 from 'web3'

import ProjectInfo from '../../components/projects/ProjectInfo';
import project_abi from '../../contracts/project_abi.json'

const Project: NextPage = (props: any) => {

  const router = useRouter();
  const {account} = useEthers();

  return (
    <ProjectInfo image={props.projectData.image} 
                 name={props.projectData.name} 
                 description={props.projectData.desc}
                 target={props.projectData.target}
                 endDate={props.projectData.endDate}
                 types={props.projectData.types}
                 donationAmounts={props.projectData.donationAmounts}
                 isOwner={router.query.isOwner || false}
                 projectId={props.projectData.id}
                 account={account}
                 router={router}
                 balance={Web3.utils.fromWei(props.projectData.balance)}
                 status={props.projectData.status}
                 isClosed={props.projectData.isClosed}/>
  )
}


export async function getServerSideProps(context: any){
  // static info load
  // fetch data from blockchain
  const proj_add = context.params.projectId;

  const infura = "https://rinkeby.infura.io/v3/de4decb45a434eb5ae1797bb14de7911";

  // get all projects from main contract
  const web333 = new Web3(infura);
  const proj_abi = JSON.parse(JSON.stringify(project_abi))
  const proj_contract = new web333.eth.Contract(proj_abi, proj_add);
  const projects_name = await proj_contract.methods.project_name().call();
  const projects_image = await proj_contract.methods.image_url().call();
  const projects_desc = await proj_contract.methods.project_description().call();
  const projects_target = await proj_contract.methods.target_amount().call();
  const projects_date = await proj_contract.methods.date_limit().call();
  const projects_types = await proj_contract.methods.get_project_types().call();
  const projects_amounts = await proj_contract.methods.get_fixed_amounts().call();
  const is_success = await proj_contract.methods.is_success().call();
  const is_fail = await proj_contract.methods.is_fail().call();
  const balance = await proj_contract.methods.get_curr_total_funds().call();
  const is_closed = await proj_contract.methods.is_closed().call();

  return{
    props: {
      projectData:{
      id: proj_add,
      name: projects_name,
      desc: projects_desc,
      target: projects_target,
      endDate: projects_date,
      types: projects_types,
      donationAmounts: projects_amounts,
      image: projects_image,
      status: is_success ? 'success' : (is_fail ? 'fail': 'active'),
      balance: balance,
      isClosed: is_closed
    }
  }
  };
}

export default Project
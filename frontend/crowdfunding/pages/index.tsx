import type { NextPage } from 'next'
import Web3 from 'web3'

import ProjectsList from '../components/projects/ProjectsList'
import crowdfunding_abi from '../contracts/crowdfunding_abi.json'
import project_abi from '../contracts/project_abi.json'


const Home: NextPage = (props: any) => {
  return (
      <ProjectsList projects={props.projects}/>
  )
}

export async function getStaticProps(){
  // static info load
  // fetch data from blockchain
  const address = "0x559Ab353210b80d1AA41F6E794616C0235170213"
  const infura = "https://rinkeby.infura.io/v3/de4decb45a434eb5ae1797bb14de7911";

  // get all projects from main contract
  const web333 = new Web3(infura);
  const main_contract_abi = JSON.parse(JSON.stringify(crowdfunding_abi))
  const proj_abi = JSON.parse(JSON.stringify(project_abi))
  const main_contract = new web333.eth.Contract(main_contract_abi, address);
  const projects_add = await main_contract.methods.get_all_projects().call();

  console.log('res', projects_add);

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
    },
    revalidate: 1 // revalidate static page every 1 second 
  };
}

export default Home
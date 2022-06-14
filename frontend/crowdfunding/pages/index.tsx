import type { NextPage } from 'next'
import Web3 from 'web3'

import SearchBar from '../components/ui/SearchBar'
import ProjectsList from '../components/projects/ProjectsList'
import crowdfunding_abi from '../contracts/crowdfunding_abi.json'
import project_abi from '../contracts/project_abi.json'

import classes from '../components/ui/mainPage.module.css'

const Home: NextPage = (props: any) => {
  return (
      <div className={classes.mainPage}>
        <div className={classes.Search}>
          <SearchBar types={props.types}/>
        </div>
        <div className={classes.List}>
          <ProjectsList projects={props.projects}/>
        </div>
      </div>
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

  // get all projects addresses 
  const projects_add = await main_contract.methods.get_all_projects().call();

  // get all projects types
  const types = await main_contract.methods.get_all_types().call();

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
      projects: projects_info,
      types: types
    },
    revalidate: 1 // revalidate static page every 1 second 
  };
}

export default Home

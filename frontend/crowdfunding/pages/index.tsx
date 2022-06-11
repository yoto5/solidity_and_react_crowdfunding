import type { NextPage } from 'next'
import Web3 from 'web3'
import fs from 'fs'
import path from 'path'

import ProjectsList from '../components/projects/ProjectsList'
import crowdfunding_abi from '../contracts/crowdfunding_abi.json'

/* Moralis init code */
const serverUrl = "http://localhost:3000";
const appId = "YOUR-APP-ID";
const masterKey = "YOUR-MASTER-KEY";

const DUMMY_PROJECTS = [
  {
    id: 'p1',
    title: 'project 1',
    image: 'https://contentlab-data.s3.amazonaws.com/getty/3875b3aa24c747e5b61ffcfd21e5b17a.jpg',
    address: 'address 1',
    description: 'this is project 1'
  },
  {
    id: 'p2',
    title: 'project 2',
    image: 'https://contentlab-data.s3.amazonaws.com/getty/3875b3aa24c747e5b61ffcfd21e5b17a.jpg',
    address: 'address 2',
    description: 'this is project 2'
  },
  {
    id: 'p3',
    title: 'project 3',
    image: 'https://contentlab-data.s3.amazonaws.com/getty/3875b3aa24c747e5b61ffcfd21e5b17a.jpg',
    address: 'address 3',
    description: 'this is project 3'
  },
  {
    id: 'p4',
    title: 'project 4',
    image: 'https://contentlab-data.s3.amazonaws.com/getty/3875b3aa24c747e5b61ffcfd21e5b17a.jpg',
    address: 'address 4',
    description: 'this is project 4'
  },
  {
    id: 'p5',
    title: 'project 5',
    image: 'https://contentlab-data.s3.amazonaws.com/getty/3875b3aa24c747e5b61ffcfd21e5b17a.jpg',
    address: 'address 5',
    description: 'this is project 5'
  },
  {
    id: 'p6',
    title: 'project 6',
    image: 'https://contentlab-data.s3.amazonaws.com/getty/3875b3aa24c747e5b61ffcfd21e5b17a.jpg',
    address: 'address 6',
    description: 'this is project 6'
  },
  {
    id: 'p7',
    title: 'project 7',
    image: 'https://contentlab-data.s3.amazonaws.com/getty/3875b3aa24c747e5b61ffcfd21e5b17a.jpg',
    address: 'address 7',
    description: 'this is project 7'
  },
  {
    id: 'p8',
    title: 'project 8',
    image: 'https://contentlab-data.s3.amazonaws.com/getty/3875b3aa24c747e5b61ffcfd21e5b17a.jpg',
    address: 'address 8',
    description: 'this is project 8'
  }
]

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

  const web333 = new Web3(infura);
  const netId = web333.eth.net.getId();
  const abi = JSON.parse(JSON.stringify(crowdfunding_abi))
  const contract = new web333.eth.Contract(abi, address);
  const res = await contract.methods.get_all_projects().call({from: '0x12B23A65617A4201EC7DB64A47574C28A45f0664'});

  console.log('res', res);

  return{
    props:{
      projects: DUMMY_PROJECTS
    },
    revalidate: 1 // revalidate static page every 1 second 
  };
}

export default Home

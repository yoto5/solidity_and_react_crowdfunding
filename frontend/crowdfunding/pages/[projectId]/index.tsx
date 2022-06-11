import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import ProjectInfo from '../../components/projects/ProjectInfo';

const dummy = {
  id: 'p1',
  title: 'project 1',
  image: 'https://contentlab-data.s3.amazonaws.com/getty/3875b3aa24c747e5b61ffcfd21e5b17a.jpg',
  address: 'address 1',
  description: 'this is project 1'
}

const Project: NextPage = (props: any) => {

  const router = useRouter();

  return (
    <ProjectInfo image={props.projectData.image} 
                 title={props.projectData.title} 
                 address={props.projectData.address} 
                 description={props.projectData.description}/>
  )
}


export async function getServerSideProps(context: any){
  // static info load
  // fetch data from blockchain
  const id = context.params.projectId;
  return{
    props: {
      projectData:{
      id: dummy.id,
      title: id,
      image: dummy.image,
      address: dummy.address,
      description: dummy.description
    }
  }
  };
}

export default Project
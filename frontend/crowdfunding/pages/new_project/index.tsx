import { useRouter } from 'next/router';

import NewProjectForm from "../../components/projects/NewProjectForm";

function NewProject(props: any){

    const router = useRouter();
    
    async function newProjectHandler(projectData: any){
        // get data from form and pass to confirm project page.

        router.push({
            pathname: '/confirm_project',
            query: {
                name: projectData.name,
                description: projectData. description,
                target: projectData.target,
                endDate: projectData.endDate,
                image: projectData.image,
                type: projectData.type,
                amountToDonate: projectData.amountToDonate,
                account: router.query.userId
            }
        });
    }

    return(
        <NewProjectForm onAddProject={newProjectHandler}/>
    )
}

export default NewProject;
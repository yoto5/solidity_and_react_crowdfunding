import ProjectElement from './ProjectElement';
import classes from './ProjectsList.module.css';

function ProjectsList(props: any) {
  return (
    <ul className={classes.list}>
      {props.projects.map((project: any) => (
        <ProjectElement
          key={project.id}
          id={project.id}
          image={project.image}
          name={project.name}
          isOwner={props.isOwner}
        />
      ))}
    </ul>
  );
}

export default ProjectsList;
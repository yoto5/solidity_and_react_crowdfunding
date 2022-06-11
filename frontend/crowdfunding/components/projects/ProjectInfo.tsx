import classes from './ProjectInfo.module.css'

function ProjectInfo(props: any){
    return(
        <section className={classes.detail}>
        <img src={props.image} alt=""/>
        <h1>{props.title}</h1>
        <p>{props.address}</p>
        <p>{props.description}</p>
      </section>
    )
}

export default ProjectInfo;
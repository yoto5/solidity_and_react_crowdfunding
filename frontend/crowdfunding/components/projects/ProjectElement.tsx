import Link from 'next/link';
import Card from '../ui/Card';
import classes from './ProjectElement.module.css';

function ProjectElement(props: any) {
  return (
    <li>
      <Card>
        <div className={classes.item}>
          <div className={classes.image}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={classes.content}>
            <h3>{props.name}</h3>
          </div>
          <div className={classes.actions}>
            <button><Link href={{pathname: String('/' + props.id), query: { isOwner: props.isOwner }}}>Show Details</Link></button>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default ProjectElement;
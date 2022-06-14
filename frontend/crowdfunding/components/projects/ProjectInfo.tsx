import EditableInfo from './EditableInfo';
import FinancialInfo from './FinancialInfo';
import DonorsList from './DonorsList';

import classes from './ProjectInfo.module.css'

function ProjectInfo(props: any){

    return(
      <div>
        <div className={classes.detail}>
          <FinancialInfo {...props}/>
        </div>

        <div className={classes.detail}>
          <EditableInfo {...props}/>
        </div>

        <div className={classes.detail}>
          <DonorsList {...props}/>
        </div>
      </div>
    )
}

export default ProjectInfo;
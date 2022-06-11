import Web3 from 'web3'

import classes from './ProjectInfo.module.css'

function ProjectInfo(props: any){
    return(
        <section className={classes.detail}>
        <img src={props.image} alt=""/>
        <div className={classes.info}>
          <div className={classes.name}>
            <h1>{props.name}</h1>
          </div>
          <div className={classes.details}>
            <p><b>Description: </b>{props.description}</p>
            <p><b>Target Amount: </b>{Web3.utils.fromWei(props.target)} (Eth)</p>
            <p><b>End Date: </b>{new Date(Number(props.endDate)*1000).toLocaleString()}</p>
            <p><b>Types: </b><ul>{props.types.map((type: any) => <li>{type}</li>)}</ul></p>
            <p><b>Donation Amounts: </b><ul>{props.donationAmounts.map(
              (amount: any) => <li>{Web3.utils.fromWei(amount)} (Eth)</li>)}</ul></p>
          </div>
        </div>
      </section>
    )
}

export default ProjectInfo;
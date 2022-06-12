import Web3 from 'web3'

import classes from './ProjectInfo.module.css'

function ProjectInfo(props: any){
    const isOwner = props.isOwner;
    function editHandler(){

    }

    return(
        <section className={classes.detail}>
        <img src={props.image} alt=""/>
        <div className={classes.info}>
          <div className={classes.name}>
            <h1>{props.name}</h1>
          </div>
          <div className={classes.details}>
            <div className={classes.editable}>
              <p><b>Description: </b>{props.description}</p>
              {isOwner && <button onClick={editHandler}>Edit</button>}
            </div>
            <div className={classes.editable}>
              <p><b>Target Amount: </b>{Web3.utils.fromWei(props.target)} (Eth)</p>
              {isOwner && <button onClick={editHandler}>Edit</button>}
            </div>
            <div className={classes.editable}>
              <p><b>End Date: </b>{new Date(Number(props.endDate)*1000).toLocaleString()}</p>
              {isOwner && <button onClick={editHandler}>Edit</button>}
            </div>   
            <div className={classes.editable}>
              <p><b>Types: </b><ul>{props.types.map((type: any) => <li>{type}</li>)}</ul></p>
              {isOwner && <button onClick={editHandler}>Edit</button>}
            </div>
            <div className={classes.editable}>
              <p><b>Donation Amounts: </b><ul>{props.donationAmounts.map(
                (amount: any) => <li>{Web3.utils.fromWei(amount)} (Eth)</li>)}</ul></p>
                {isOwner && <button onClick={editHandler}>Edit</button>}
            </div>
          </div>
        </div>
      </section>
    )
}

export default ProjectInfo;
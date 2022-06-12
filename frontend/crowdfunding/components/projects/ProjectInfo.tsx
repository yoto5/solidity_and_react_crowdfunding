import { useState } from 'react';
import Web3 from 'web3'

import classes from './ProjectInfo.module.css'



function ProjectInfo(props: any){
    const isOwner = props.isOwner;
    const router = props.router;
    
    // state for expose/hide the inputs
    const [editName, setEditName] = useState(false);
    const [editDesc, setEditDesc] = useState(false);
    const [editTarget, setEditTarget] = useState(false);
    const [editEndDate, setEditEndDate] = useState(false);
    const [addType, setAddType] = useState(false);
    const [addAmount, setAddAmount] = useState(false);

    // state for get inputs values
    const [nameVal, setNameVal] = useState('');
    const [descVal, setDescVal] = useState('');
    const [targetVal, setTargetVal] = useState(0);
    const [endDateVal, setDateVal] = useState('');
    const [typeVal, setTypeVal] = useState('');
    const [amountVal, setAmountVal] = useState(0);

    async function submitHandler(info: any){
      if(nameVal){
        router.push({
          pathname: '/confirm_field_change',
          query:{newVal: nameVal, projectAddress: props.projectId, functionName: 'change_project_name', 
            account: props.account, fieldName: 'name'}
        })
      }
      else if(descVal){
        console.log('descVal', descVal);
      }
      else if(targetVal){
        console.log('targetVal', targetVal);
      }
      else if(endDateVal){
        console.log('endDateVal', endDateVal);
      }
      else if(typeVal){
        console.log('typeVal', typeVal);
      }
      else if(amountVal){
        console.log('amountVal', amountVal);
      }
    }

    return(
        <section className={classes.detail}>
        <img src={props.image} alt=""/>
        <div className={classes.info}>
          <div className={classes.editInfo}>
              {isOwner && <p>Please <b>edit one field per change</b>, the first one will be taken</p>}
          </div>
          <div className={classes.name}>
            <h1>{props.name}</h1>
              {isOwner && editName && 
              <input type="text" name="name" onChange={(e)=>{setNameVal(e.target.value)}}/>}
              {isOwner && <button onClick={() => {setEditName(!editName)}}>Edit</button>}
          </div>
          <div className={classes.details}>
            <div className={classes.editable}>
              <p><b>Description: </b>{props.description}</p>
              {isOwner && editDesc && 
              <input type="text" name="desc" onChange={(e)=>{setDescVal(e.target.value)}}/>}
              {isOwner && <button onClick={() => {setEditDesc(!editDesc)}}>Edit</button>}
            </div>
            <div className={classes.editable}>
              <p><b>Target Amount: </b>{Web3.utils.fromWei(props.target)} (Eth)</p>
              {isOwner && editTarget && 
              <input type="number" name="target" onChange={(e)=>{setTargetVal(Number(e.target.value))}}/>}
              {isOwner && <button onClick={()=>{setEditTarget(!editTarget)}}>Edit</button>}
            </div>
            <div className={classes.editable}>
              <p><b>End Date: </b>{new Date(Number(props.endDate)*1000).toLocaleString()}</p>
              {isOwner && editEndDate && 
              <input type="date" name="endDate" onChange={(e)=>{setDateVal(e.target.value)}}/>}
              {isOwner && <button onClick={()=>{setEditEndDate(!editEndDate)}}>Edit</button>}
            </div>   
            <div className={classes.editable}>
              <p><b>Types: </b><ul>{props.types.map((type: any) => <li>{type}</li>)}</ul></p>
              {isOwner && addType && 
              <input type="text" name="type" onChange={(e)=>{setTypeVal(e.target.value)}}/>}
              {isOwner && <button onClick={()=>{setAddType(!addType)}}>Edit</button>}
            </div>
            <div className={classes.editable}>
              <p><b>Donation Amounts: </b><ul>{props.donationAmounts.map(
                (amount: any) => <li>{Web3.utils.fromWei(amount)} (Eth)</li>)}</ul></p>
                {isOwner && addAmount && 
                <input type="number" name="amount" onChange={(e)=>{setAmountVal(Number(e.target.value))}}/>}
                {isOwner && <button onClick={()=>{setAddAmount(!addAmount)}}>Edit</button>}
            </div>
          </div>
          <div className={classes.submit}>
                {isOwner && (
                  editName || editDesc || editTarget || editEndDate || addType || addAmount
                ) && <input type="submit" name="submit" value={'Submit Changes'} onClick={submitHandler}/>}
          </div>
        </div>
      </section>
    )
}

export default ProjectInfo;
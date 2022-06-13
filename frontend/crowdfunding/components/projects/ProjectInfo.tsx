import { useState } from 'react';
import Web3 from 'web3'

import classes from './ProjectInfo.module.css'



function ProjectInfo(props: any){
    const isOwner = props.isOwner;
    const router = props.router;
    
    // state for expose/hide the inputs
    const [editImage, setEditImage] = useState(false);
    const [editName, setEditName] = useState(false);
    const [editDesc, setEditDesc] = useState(false);
    const [addType, setAddType] = useState(false);
    const [addAmount, setAddAmount] = useState(false);

    // state for get inputs values
    const [imageVal, setImageVal] = useState('');
    const [nameVal, setNameVal] = useState('');
    const [descVal, setDescVal] = useState('');
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
        router.push({
          pathname: '/confirm_field_change',
          query:{newVal: descVal, projectAddress: props.projectId, functionName: 'change_project_description', 
            account: props.account, fieldName: 'description'}
        })
      }
      else if(typeVal){
        router.push({
          pathname: '/confirm_field_change',
          query:{newVal: typeVal, projectAddress: props.projectId, functionName: 'add_type', 
            account: props.account, fieldName: 'add type'}
        })
      }
      else if(amountVal){
        const amountInWei = Web3.utils.toWei(String(amountVal))
        router.push({
          pathname: '/confirm_field_change',
          query:{newVal: amountInWei, projectAddress: props.projectId, functionName: 'add_fix_amount', 
            account: props.account, fieldName: 'add donation amount'}
        })
      }
      else if(imageVal){
        router.push({
          pathname: '/confirm_field_change',
          query:{newVal: imageVal, projectAddress: props.projectId, functionName: 'change_picture', 
            account: props.account, fieldName: 'image'}
        })
      }
    }

    function deleteValueHandler(val: any, is_type: boolean){
      if(is_type){
        console.log(val);
        router.push({
          pathname: '/confirm_field_change',
          query:{newVal: val, projectAddress: props.projectId, functionName: 'remove_type', 
            account: props.account, fieldName: 'remove type'}
        })
      }
      else{
        console.log(val);
        router.push({
          pathname: '/confirm_field_change',
          query:{newVal: String(val), projectAddress: props.projectId, functionName: 'remove_fix_amount', 
            account: props.account, fieldName: 'remove donation amount'}
        })
      }
    }

    return(
        <section className={classes.detail}>
        <div className={classes.image}>
          <img src={props.image} alt=""/>
          {isOwner && editImage && 
          <input type="url" name="image" onChange={(e)=>{setImageVal(e.target.value)}}/>}
          {isOwner && <button onClick={() => {setEditImage(!editImage)}}>Edit Image</button>}
        </div>
        <div className={classes.info}>
          <div className={classes.editInfo}>
              {isOwner && <p>Please <b>edit one field per change</b>, the first one will be taken</p>}
          </div>
          <div className={classes.name}>
            <h1>{props.name}</h1>
              {isOwner && editName && 
              <input type="text" name="name" onChange={(e)=>{setNameVal(e.target.value)}}/>}
              {isOwner && <button onClick={() => {setEditName(!editName)}}>Edit Name</button>}
          </div>
          <div className={classes.details}>
            <div className={classes.editable}>
              <p><b>Description: </b>{props.description}</p>
              {isOwner && editDesc && 
              <input type="text" name="desc" onChange={(e)=>{setDescVal(e.target.value)}}/>}
              {isOwner && <button onClick={() => {setEditDesc(!editDesc)}}>Edit Description</button>}
            </div>
            <div className={classes.editable}>
              <p><b>Target Amount: </b>{Web3.utils.fromWei(props.target)} (Eth)</p>
            </div>
            <div className={classes.editable}>
              <p><b>End Date: </b>{new Date(Number(props.endDate)*1000).toLocaleString()}</p>
            </div>   
            <div className={classes.editable}>
              <p><b>Types: </b><ul>{props.types.map((type: any) =>
              <div className={classes.remove}>
                <li>{type}</li>
                {isOwner && addType && <button onClick={()=>{deleteValueHandler(type, true)}}>X</button>}
              </div>
              )}</ul></p>
              {isOwner && addType && 
              <input type="text" name="type" onChange={(e)=>{setTypeVal(e.target.value)}}/>}
              {isOwner && <button onClick={()=>{setAddType(!addType)}}>Edit Types</button>}
            </div>
            <div className={classes.editable}>
              <p><b>Donation Amounts: </b><ul>{props.donationAmounts.map(
                (amount: any) => 
                <div className={classes.remove}>
                  <li>{Web3.utils.fromWei(amount)} (Eth)</li>
                  {isOwner && addAmount && <button  onClick={()=>{deleteValueHandler(amount, false);}}>X</button>}
                </div>)}</ul></p>
                {isOwner && addAmount && 
                <input type="number" step="0.000000000000000001" name="amount" onChange={(e)=>{setAmountVal(Number(e.target.value))}}/>}
                {isOwner && <button onClick={()=>{setAddAmount(!addAmount)}}>Edit Amounts</button>}
            </div>
          </div>
          <div className={classes.submit}>
                {isOwner && (
                  editName || editDesc || addType || addAmount || editImage
                ) && <input type="submit" name="submit" value={'Submit Changes'} onClick={submitHandler}/>}
          </div>
        </div>
      </section>
    )
}

export default ProjectInfo;
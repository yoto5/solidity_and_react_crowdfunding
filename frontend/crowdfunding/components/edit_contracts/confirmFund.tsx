import { useContractFunction } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts';
import { utils } from 'ethers';
import Web3 from 'web3';

import projectAbi from '../../contracts/project_abi.json'
import classes from './confirmFieldChange.module.css'

function ConfirmFund(props: any){
    
    const router = props.router;
    const query = router.query;

    const projectInterface = new utils.Interface(projectAbi);
    const projectContract = new Contract(query.projectAddress, projectInterface);
    const {send, state} = useContractFunction(projectContract, query.functionName);

    const anonymousBool = query.anonymous==='true' ? true : false;

    async function approveHandler(){
        const res = await send(query.donorName, anonymousBool, { value: query.amount });
        router.push('/');
    }

    async function declineHandler(){
        router.push('/');
    }

    return(
        <div>
            {
            state.status !=='None' ? (
                    <div className={classes.info}>
                        <h2>Transaction status: {state.status}</h2>
                    </div>
            ) : (
                    <div>
                        <div className={classes.info}>
                            <h2>Please confirm</h2>
                            <p>You are going to give {Web3.utils.fromWei(query.amount)} Eth to this project.</p>
                            <p>You are are sending with name: {query.donorName}.</p>
                            <p>Did you signed as Anonymous?: {query.anonymous}.</p>
                        </div>
                        <div className={classes.actions}>
                            <button onClick={approveHandler} className={classes.conf}>Approve</button>
                            <button onClick={declineHandler} className={classes.dec}>Decline</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ConfirmFund
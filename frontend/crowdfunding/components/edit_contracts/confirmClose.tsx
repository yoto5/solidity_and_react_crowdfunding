import { useContractFunction } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts';
import { utils } from 'ethers';

import projectAbi from '../../contracts/project_abi.json'
import classes from './confirmClose.module.css'

function ConfirmClose(props: any){

    const router = props.router;
    const query = router.query

    const projectInterface = new utils.Interface(projectAbi);
    const projectContract = new Contract(query.projectAddress, projectInterface);
    const {send, state} = useContractFunction(projectContract, query.functionName);

    async function approveHandler(){
        const res = await send();
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
                            <p>You are going to {query.opp}, curr balance: {query.balance}</p>
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

export default ConfirmClose
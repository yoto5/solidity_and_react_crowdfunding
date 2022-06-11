import { useWeb3Contract } from 'react-moralis';
import Web3 from 'web3';

import crowdfunding_abi from '../../contracts/crowdfunding_abi.json'
import classes from './confirmProject.module.css'

function ConfirmProject(props: any){

    const router = props.router;
    const endDate: any = router.query.endDate ? router.query.endDate: null;
    const resolvedEndDate: any = endDate ? new Date(endDate) : Date.now();
    const projectParams = {
        name: router.query.name,
        desc: router.query.description ? router.query.description : '',
        target: String(Web3.utils.toWei(router.query.target)),
        end_date: String(resolvedEndDate.valueOf() / 1000),
        image_add: router.query.image,
        types_arr: [router.query.type],
        amounts_to_donate: [String(Web3.utils.toWei(router.query.amountToDonate))]
        };

    console.log('projectParams', projectParams);

    const {runContractFunction} = useWeb3Contract({
        abi: crowdfunding_abi,
        contractAddress: "0x559Ab353210b80d1AA41F6E794616C0235170213",
        functionName: "create_new_project",
        params: projectParams
        });

        console.log('runContractFunction', runContractFunction);

    async function approveHandler(){
        const res = await runContractFunction();
        console.log(res);

        router.push('/');
    }

    async function declineHandler(){
        router.push('/');
    }

    return(
        <div>
            <div>
                <h2>Please Confirm Your New Project</h2>
            </div>
            <div className={classes.info}>
                <p><b>Name:</b> {router.query.name}</p>
                <p><b>Description:</b> {router.query.description}</p>
                <p><b>Target Amount:</b> {router.query.target}</p>
                <p><b>End Date:</b> {router.query.endDate}</p>
                <p><b>Image URL:</b> {router.query.image}</p>
                <p><b>Type:</b> {router.query.type}</p>
                <p><b>Donation Amount:</b> {router.query.amountToDonate}</p>
            </div>
            <div className={classes.actions}>
                <button onClick={approveHandler} className={classes.conf}>Approve</button>
                <button onClick={declineHandler} className={classes.dec}>Decline</button>
            </div>
        </div>
    )

}

export default ConfirmProject;
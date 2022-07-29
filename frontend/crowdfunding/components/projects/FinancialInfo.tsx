import { useState } from 'react';
import Web3 from 'web3'

import classes from './ProjectInfo.module.css'


function FinancialInfo(props: any){

    const isOwner = props.isOwner;
    const router = props.router;

    const [fund, setFund] = useState(false);

    const [anonymousVal, setAnonymousVal] = useState(false);
    const [donorNameVal, setDonorNameVal] = useState('');

    const [donorToRefundAdd, setDonorToRefundAdd] = useState('');

    function withdrawHandler(){
        router.push({
          pathname: '/confirm_close',
          query:{opp: 'withdraw', projectAddress: props.projectId, functionName: 'owner_withdraw', 
            account: props.account, balance: props.balance}
        })
      }
  
      function globalRefundHandler(){
          router.push({
            pathname: '/confirm_close',
            query:{opp: 'demand refund', projectAddress: props.projectId, functionName: 'return_funds_to_funders', 
              account: props.account, balance: props.balance, donor_add: null}
          })
      }

      function singleRefundHandler(){
        router.push({
          pathname: '/confirm_close',
          query:{
                opp: 'demand refund for donor with address: ' + donorToRefundAdd, 
                projectAddress: props.projectId, functionName: 'return_funds_to_single_funder', 
                account: props.account, balance: props.balance, donor_add: donorToRefundAdd
        }
        })
    }
  
      function fundHandler(val: string){
        const fundAmount = Web3.utils.toWei(val);
        router.push({
          pathname: '/confirm_fund',
          query:{donorName: donorNameVal, projectAddress: props.projectId, functionName: 'fund_project', 
            account: props.account, anonymous: anonymousVal, amount: fundAmount}
        })
        
      }
    return(
        <div>
            <div className={classes.criticalInfo}>
                { !props.isClosed && (props.status === 'success' ? (
                    <div className={classes.criticalInfoSuccess}>
                    <h1>Status: {props.status}</h1>
                    <h1>Balance: {props.balance}</h1>
                    </div>
                ):(props.status === 'fail' ? (
                    <div className={classes.criticalInfoFail}>
                    <h1>Status: {props.status}</h1>
                    <h1>Balance: {props.balance}</h1>
                    </div>
                ) : (
                    <div className={classes.criticalInfoActive}>
                    <h1>Status: {props.status}</h1>
                    <h1>Balance: {props.balance}</h1>
                    </div>
                ))
                )}
                {
                props.isClosed &&
                <div className={classes.criticalInfoClosed}>
                    <h1>Project was closed by Withdraw/Refund</h1>
                </div> 
                }
            </div>

            <div className={classes.fundMe}>
                {!props.isClosed && (!(props.status==='fail')) && (
                <div className={classes.fund}>
                    <h2>Fund Me!</h2>
                    <h4>Enter your name</h4>
                    <div className={classes.donorNameClass}>
                        <p>Name</p>
                        <input type="text" onChange={(e)=>setDonorNameVal(e.target.value)}/>
                        <p>Anonymously</p>
                        <input type="checkbox" onChange={(e)=>setAnonymousVal(e.target.checked)}/>
                    </div>
                    <h4>Choose amount to fund (in Eth)</h4>
                    <div className={classes.innerFund}>
                    {props.donationAmounts.map((amount: any) => 
                        <input type="submit" value={Web3.utils.fromWei(amount)}  onClick={
                        (e)=>{fundHandler((e.target as HTMLInputElement).value)}}/>
                        )}
                    </div>
                </div>
                )}
            </div>

            <div className={classes.ops}>
              {props.status === 'fail' && !props.isClosed &&
              <div>
                <button className={classes.refund} onClick={globalRefundHandler}>Demand Refund For All Donors</button>
                <button className={classes.refund} onClick={singleRefundHandler}>Demand Refund For Specific Donor</button>
                <input type="text" placeholder="Enter Donor Address" onChange={(e)=>setDonorToRefundAdd(e.target.value)}/>
              </div>
              }
              {isOwner && props.status === 'success' && !props.isClosed &&
              <button className={classes.withdraw} onClick={withdrawHandler}>Owner Withdraw</button>}
            </div>

        </div>
    )
}


export default FinancialInfo;
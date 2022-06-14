import { useState } from 'react';
import Web3 from 'web3'

import classes from './ProjectInfo.module.css'

function DonorsList(props: any){

    const nameAmount = props.donorsNames.map(function(e: any, i: number) {
        return [e, props.donorsAmounts[i]];
    });

    return(
        <div>
            <div className={classes.fundingHistory}>
                <h1>Funding history</h1>
            </div>
            <div className={classes.fundingHistoryBody}>
                {nameAmount.map((e: any) =>
                <div className={classes.fundingHistoryRow}>
                    <h2>{e[0]}</h2>
                    <h2>{Web3.utils.fromWei(e[1])} Eth</h2>      
                </div>
                )}
            </div>
        </div>
    )
}

export default DonorsList;
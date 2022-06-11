import { useEthers } from '@usedapp/core';
import { useState, useEffect } from 'react';

import classes from './connectButton.module.css'

function ConnectButton(props: any){
    const {account, activateBrowserWallet, deactivate} = useEthers();
    const [isConnected, setIsConnected] = useState(account !== undefined);
    
    function buttonHandler(){
        if(isConnected){
            props.isConnectedHandler(false)
            setIsConnected(false);
            deactivate();
        }
        else{
            props.isConnectedHandler(true)
            setIsConnected(true);
            activateBrowserWallet();
        }
    }

    useEffect(() => {    
        const val = account !== undefined;
        props.isConnectedHandler(val);
        setIsConnected(val);
        }, [account]);
    
    return(
        <div className={classes.click}>
            {isConnected ? (
                <button onClick={buttonHandler}>Logout</button>
            ) : (
                <button onClick={buttonHandler}>Login</button>
            )}
        </div>
    );
}

export default ConnectButton;
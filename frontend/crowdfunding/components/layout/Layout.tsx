import { useEthers } from '@usedapp/core';
import { useRouter } from 'next/router';

import NavBar from './NavBar';
import classes from './Layout.module.css';


function Layout(props: any) {
  const router = useRouter();
  const {account, activateBrowserWallet, deactivate, isLoading} = useEthers();

  async function isConnectedHandler(){
    if(!account){
      await activateBrowserWallet();
    }
    else{
      await deactivate();
    }
  }

  return (
    <div>
      <NavBar isConnectedHandler={isConnectedHandler} userId={account}/>
      {
        !isLoading ? (
              account ? (
                <main className={classes.main}>{props.children}</main>) : (
                    <div className={classes.layerNote}><h1>Please Connect To Wallet</h1></div>)
          ) : (
        <div className={classes.layerNote}><h1>Loading</h1></div>)
      }
    </div>
  );
}

export default Layout;
import { useEthers } from '@usedapp/core';
import { useState } from 'react';

import NavBar from './NavBar';
import classes from './Layout.module.css';

function Layout(props: any) {
  const {account} = useEthers();
  const [isConnected, setIsConnected] = useState(account !== undefined);

  function isConnectedHandler(newVal: boolean){
    setIsConnected(newVal);
  }

  return (
    <div>
      <NavBar isConnectedHandler={isConnectedHandler}/>
      {
        isConnected ? (
        <main className={classes.main}>{props.children}</main>) : (
        <h1>Please Connect To Wallet</h1>)
      }
    </div>
  );
}

export default Layout;
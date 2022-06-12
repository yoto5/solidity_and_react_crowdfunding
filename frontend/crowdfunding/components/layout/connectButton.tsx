import classes from './connectButton.module.css'

function ConnectButton(props: any){
    return(
        <div className={classes.click}>
            {(props.account !== undefined) ? (
                <p>{props.account}</p>
            ) : (
                <button onClick={props.isConnectedHandler}>Login</button>
            )}
        </div>
    );
}

export default ConnectButton;
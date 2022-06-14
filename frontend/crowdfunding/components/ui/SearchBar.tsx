import { useState } from 'react';
import { Button } from 'web3uikit';

import classes from './SearchBar.module.css'

function SearchBar(props: any){

    const[showTypes, setShowTypes] = useState(false);

    function handleTypeClick(){

    }

    return(
        <div className={classes.searchBar}>
            {showTypes ? (
                <div>
                    <div className={classes.allTypes}>
                        {props.types.map((type: any) =>
                            <button onClick={handleTypeClick} value={type}>{type}</button>
                            )}
                    </div>
                    <div className={classes.hide}>
                        <button onClick={()=>{setShowTypes(!showTypes)}}>Hide Types</button>
                    </div>
                </div>
                
            ) : (
                <div className={classes.HeadLine}> 
                    <h2>Search by type</h2>
                    <button onClick={()=>{setShowTypes(!showTypes)}}>Show All Types</button>
                </div>
                
            )}
        </div>
    )
}

export default SearchBar;
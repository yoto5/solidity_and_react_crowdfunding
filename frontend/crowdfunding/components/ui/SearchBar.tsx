import { useState } from 'react';
import { useRouter } from 'next/router';

import classes from './SearchBar.module.css'

function SearchBar(props: any){

    const router = useRouter();

    const[showTypes, setShowTypes] = useState(false);

    function handleTypeClick(e: any){
        const type = e.target.value ? e.target.value : '';

        router.push({pathname: '/type_page', query: {type: type}});
    }

    return(
        <div className={classes.searchBar}>
            {showTypes ? (
                <div>
                    <div className={classes.allTypes}>
                        {props.types.map((type: any) =>
                            <button onClick={(e)=>{handleTypeClick(e)}} value={type}>{type}</button>)}
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
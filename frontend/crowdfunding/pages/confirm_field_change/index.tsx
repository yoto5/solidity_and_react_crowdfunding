import { useRouter } from "next/router";

import ConfirmFieldChange from "../../components/edit_contracts/confirmFieldChange";

function ConfirmFieldChangePage(){
    const router = useRouter();
    return(
        <ConfirmFieldChange router={router}/>
    )   
}

export default ConfirmFieldChangePage;
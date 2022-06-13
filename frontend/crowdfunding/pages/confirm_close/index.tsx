import { useRouter } from "next/router";

import ConfirmClose from "../../components/edit_contracts/confirmClose";

function ConfirmClosePage(){
    const router = useRouter();
    return(
        <ConfirmClose router={router}/>
    )   
}

export default ConfirmClosePage;
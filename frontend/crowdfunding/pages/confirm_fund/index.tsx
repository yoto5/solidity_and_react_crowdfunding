import { useRouter } from "next/router";

import ConfirmFund from "../../components/edit_contracts/confirmFund";

function ConfirmFundPage(){
    const router = useRouter();
    return(
        <ConfirmFund router={router}/>
    )   
}

export default ConfirmFundPage;
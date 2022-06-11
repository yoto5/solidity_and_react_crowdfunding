import { useRouter } from "next/router";

import ConfirmProject from "../../components/edit_contracts/confirmProject";

function ConfirmProjectPage(){
    const router = useRouter();
    return(
        <ConfirmProject router={router}/>
    );
}

export default ConfirmProjectPage;
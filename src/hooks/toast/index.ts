import { TypeMessage } from "@minhaescola/components/ui/toast";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface ToastInformations{
    typeToast: TypeMessage,
    message: string
}
export interface IUseToast {
    showToast: ToastInformations | undefined,
    setToastInformations:  Dispatch<SetStateAction<ToastInformations | undefined>>
}

export default function useToast(): IUseToast {
    const [showToast, setToastInformations] = useState<ToastInformations | undefined>();

    const applyDispacth = () => {
        setTimeout(function () {
            setToastInformations(undefined);
        }, 5000)
    }


    useEffect(applyDispacth, [showToast])

    return {
        showToast,
        setToastInformations
    }
}
"use client";

import useToast, { IUseToast } from "@minhaescola/hooks/toast";
import { Context, createContext } from "react";

export const ContextHook: Context<IUseToast | null> = createContext<IUseToast | null>(null);

export default function UseToastContext({ children }: { children: any }) {
    const { showToast, setToastInformations } = useToast();

    return <ContextHook.Provider value={{ showToast, setToastInformations}}> {children} </ContextHook.Provider>
}
'use client';

import Image from "next/image";
import ToastMessage, { TypeMessage } from "../toast";
import { ContextHook } from "@minhaescola/contexts/ApplicationContext";
import { useContext, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export class Column {
    column: string = "";
    data: string = "";
    isHeader: boolean = false;
    width?: string | undefined = undefined;
    filter: (data: any, row?: any) => any = (data: any) => { return ""};
}

export default function DataTable({ rows, columns } : { rows: any[], columns: Column[] }) {
    const toastContext = useContext(ContextHook);
    var [page, setPage] = useState<number>(0);

    const [counterPerPage, setCounter] = useState<number>(5);
    const [breakPoint, setBreakPoint] = useState<number>(3);
    
    return (
        <section className="py-3 sm:py-5">
            <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
                <div className="relative overflow-hidden bg-white dark:bg-gray-800 sm:rounded-lg">
                    <p className="pl-4 pt-4 mx-auto max-w-screen-2xl text-bold text-[1.5rem] dark:text-white">Mangement Classes</p>
                    <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                        <div className="flex items-center flex-1 space-x-4">
                            <h5>
                                <span className="text-gray-500">All Products:</span>
                                <span className="dark:text-white">{rows.length}</span>
                            </h5>
                            <h5>
                                <span className="text-gray-500">Total sales:</span>
                                <span className="dark:text-white">$88.4k</span>
                            </h5>
                        </div>
                        <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                            <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add new product
                            </button>
                            <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                Update stocks 1/250
                            </button>
                            <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Export
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            {
                                rows.length > 0 ?
                                <caption className="caption-bottom">
                                    <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            Showing
                                            <span className="font-semibold text-gray-900 dark:text-white">{page == 0 ? generatePages(rows, counterPerPage)[page].length : generatePages(rows, counterPerPage).map((item) => item.length).filter((item, index) => (page - 1) >= index).reduce((partialSum, a) => partialSum + a, 0) + generatePages(rows, counterPerPage)[page].length}</span>
                                            of
                                            <span className="font-semibold text-gray-900 dark:text-white">{rows.length}</span>
                                        </span>
                                        <ul className="inline-flex items-stretch -space-x-px">
                                            <li>
                                                <a 
                                                    href="#" 
                                                    onClick={() => {
                                                        if(page > 0) 
                                                        {
                                                            page = page - 1;

                                                            setPage(page);
                                                            
                                                            if(page < (breakPoint - 3) && (breakPoint - 3) != 0) {
                                                                setBreakPoint(breakPoint - 3);
                                                            }
                                                        }
                                                    }} 
                                                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                    </svg>
                                                </a>
                                            </li>
                                            {
                                                generatePages(rows, counterPerPage)
                                                .map(function (item, index) {
                                                    return (
                                                        <div key={index}>
                                                            {
                                                                page == index ?
                                                                <li>
                                                                    <a onClick={() => { setPage(index); }} aria-current="page" className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{index + 1}</a>
                                                                </li> : 
                                                                <li>
                                                                    <a onClick={() => { setPage(index); }} className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index + 1}</a>
                                                                </li>
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                            {
                                                generatePages(rows, counterPerPage).length > 3?
                                                <li>
                                                    <a className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                                </li> : <></>
                                            }
                                            <li>
                                                <a onClick={() => {
                                                        if(generatePages(rows, counterPerPage)[page + 1] != undefined) {
                                                            if((page + 1) >= breakPoint) {
                                                                setBreakPoint(breakPoint + 3);
                                                            }

                                                            setPage(page + 1);
                                                        }
                                                    }} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                    <span className="sr-only">Next</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </caption> : <></>
                            }
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {
                                        columns.map(function (item, index) {
                                            return (
                                                <th  scope="col" className="px-6 py-3" key={index}>{item.column}</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                        
                                    rows.length > 0 ?
                                    generatePages(rows, counterPerPage)[page].map(function (item: any, index: number) {
                                        return (
                                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" key={index} >
                                                {
                                                    columns.map(function (column, indexColumn) {
                                                        return (<td key={indexColumn} className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>{column.filter(extractResult(item, column.data), item)}</td>)
                                                    })
                                                }
                                            </tr>
                                        )
                                    }) : <tr className="bg-[rgba(171, 171, 171, 0.152)] text-center "> <td colSpan={columns.length} className="p-4 bg-gray-400/[.1] rounded-[9px]">Not found informations!</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create a new class
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#">
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required/>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                    <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required/>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required/>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected>Select category</option>
                                        <option value="TV">TV/Monitors</option>
                                        <option value="PC">PC</option>
                                        <option value="GA">Gaming/Console</option>
                                        <option value="PH">Phones</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here"></textarea>
                                </div>
                            </div>
                            <button onClick={() => {
                                toastContext?.setToastInformations({
                                    typeToast: TypeMessage.success,
                                    message: "Sucesso"
                                })
                            }} className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function RangeNumber(number: number) 
{
    var array = [];

    for (let index = 0; index < number; ++index) {
        array.push(index);
    }
    return array;
}

export function generatePages(array: any[], counterPageIndex: number) 
{
    var numbersOfPages: number[] = RangeNumber(Math.ceil(array.length / counterPageIndex));
    var matrizOfPages: any[] = [];
    var counterPage: number = 0;

    numbersOfPages.map((item, index) => {
        counterPage = counterPage + parseInt(`${counterPageIndex}`);

        if(matrizOfPages.length == 0) 
        {
            matrizOfPages.push(
                array.filter(function (data, position) {
                    if ((position < counterPageIndex) ) 
                    {
                        return data;
                    }
                })
            )
        } else {
            matrizOfPages.push(
                array.filter(function (data, position) {
                    if((position >= (counterPage - matrizOfPages[matrizOfPages.length - 1].length)) && (position < counterPage)) {
                       return true;
                    } else {
                        return false;
                    }
                })
            )
        }
    });
    return matrizOfPages;
}

function extractResult(json: any, propertie: string) {
    //situacoes[0].nome
    var properties: string[] = propertie.split(".");
    var result: any = {};
    
    var resultOfSearch = properties.map(function (item: string, index: number) {
        try {
            if(index == 0) {
                if(item.includes("[") && item.includes("]")) {
                    var namePropertie: string = item.substring(0, item.indexOf("["))
                    var valueIndexOfArrayType: number = parseInt(item.substring(item.indexOf("[")).replace("[", "").replace("]", ""));
    
                    var valueJson = json[namePropertie];
                    result = valueJson[valueIndexOfArrayType];
                } else {
                    result = json[item];
                }
            } else {
                if(item.includes("[") && item.includes("]")) {
                    var namePropertie: string = item.substring(0, item.indexOf("["))
                    var valueIndexOfArrayType: number = parseInt(item.substring(item.indexOf("[")).replace("[", "").replace("]", ""));
    
                    var valueJson = result[namePropertie];
                    result = valueJson[valueIndexOfArrayType];
                } else {
                    result = result[item]
                }
            }
        } catch (error: any) {
            return [];
        }
        return result;
    })

    return resultOfSearch[resultOfSearch.length - 1];
}
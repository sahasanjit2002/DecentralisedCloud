'use client'
import React,{useState,useEffect} from 'react'

export default function Table({ account, contract}) {

    const [Data, setData] = useState([]) //data from database
    const [grantList, setGrantList] = useState([]) //data from database
    const getData = async()=>{
        const data = await fetch('http://localhost:4000/getPending',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            requested: account
        })
    })
    const res = await data.json()
    setData(res)
    }
    
    const getGranted = async()=>{
        const data = await fetch('http://localhost:4000/grantList',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            requester: account
        })
    })
    const res = await data.json()
    setGrantList(res)
    }

    useEffect(() => {
        getGranted()
        getData()
        
    }, [account])


    const accept = async (requester)=>{
        await contract.allow(requester)
        try{
            const data = await fetch('http://localhost:4000/grant',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requested: account,
                requester: requester
            })
        })
        const res = await data.json()
        getGranted()
        getData()
        }catch(e){
            console.log(e)
        }
        
    }
    const revoke = async (requester)=>{
        await contract.disallow(requester);
        try{
            const data = await fetch('http://localhost:4000/revoke',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requested: account,
                requester: requester
            })
        })
        const res = await data.json()
        getGranted()
        getData()
        }catch(e){
            console.log(e)
        }
        
    }

    return (
        <div className='m-3'>
            <hr></hr>
            <h3 className='font-bold'>Request Given</h3>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Requester
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {Data? Data&&Data.map((element,i)=>{
                        return(
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {element.requester}
                            </th>
                            <td className="px-6 py-4">
                               {element.access===true?"Access Granted":"Pending"}
                            </td>
                            <td className="px-6 py-4">
                            {element.access===false?<><button onClick={()=>{accept(element.requester)}} className='button m-1 bg-green-600 text-white p-1 rounded-lg'>Accept</button><button onClick={()=>{revoke(element.requester)}} className='button bg-green-600 text-white p-1 m-1 rounded-lg'>Revoke</button></>:<button onClick={()=>{revoke(element.requester)}} className='button bg-red-600 text-white p-1 m-1 rounded-lg'>Revoke</button>}
                            </td>
                            
                        </tr>
                        )
                    }):"No data Available"}    
                    </tbody>
                </table>


            <div className="m-2">
            <hr></hr>
            <h3 className='font-bold'>Granted Access</h3>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Requester
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {grantList ? grantList&&grantList.map((element,i)=>{
                        return(
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {element.requested}
                            </th>
                            <td className="px-6 py-4">
                               {element.access===true?"Access Recieved":"Pending"}
                            </td>
                            
                            
                        </tr>
                        )
                    }):"No data Available"}    
                    </tbody>
                </table>
            </div>
                

                
                <p class="text-xs text-gray-900 dark:text-white">Paste the desired address on the view input field to view the files</p>
            </div>

        </div>
        </div>
    )
}

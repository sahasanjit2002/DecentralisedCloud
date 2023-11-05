import React,{useState,useEffect} from 'react'
import Table from './Table'

export default function ReqInput(props) {
    const[requester, setRequester] = useState(props.account)
    const[requested, setRequested] = useState('')
    useEffect(() => {setRequester(props.account)}, [props.account])
    const handleSubmit = async (e) => {
        if(requested === requester) {
            alert('You cannot request access to your own account')
            setRequested('')
            return}
        if(requested === '') {
            alert('Please enter an address')
            return}
        const data = await fetch('http://localhost:4000/writePending',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requester: requester,
                requested: requested
            })
        })
        const res = await data.json()
        setRequested('')
    }

  return (
    <div>
        <input type="text" id="inputLink"  placeholder='Enter Adress' value={requested} onChange={(e) => setRequested(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm mt-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <button
        type="submit" onClick={handleSubmit}
        className="inline-flex items-center mt-2 rounded-md bg-black px-3 mx-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
      >
        Request Access
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="ml-2 h-4 w-4"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
      
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import ReqInput from './ReqInput';
import Table from './Table';

const Modal = ({ account, contract }) => {

  const [access, setAccess] = useState([]);

  const share = async (address) => {
    await contract.allow(address)
    console.log("Done Sharing")
  }

  useEffect(() => {
    const sharedAccounts = async () => {
      const data = await contract.shareAccess()
      console.log("contratcs "+ data)

      const newAccessElement = [];
      setAccess([])

      for (let i = 0; i < data.length; i++) {
        if (data[i].access === true) {
          let element = data[i][0];

          if (!newAccessElement.includes(element)) {
            newAccessElement.push(element);
          }
        }
      }

      setAccess((prev) => [...prev, ...newAccessElement])
    }

    account && sharedAccounts()
  }, [])
  

  const remove = async () => {
    const selectedOption = document.querySelector('#select');
    const selectedText = selectedOption.options[selectedOption.selectedIndex].value;

    if (selectedText) {
      await contract.disallow(selectedText);
      console.log("Done");
    } else {
      alert("Please select an account")
    }
  }

  return (
    <div>
    <div className='flex justify-center border border-r-0 border-l-0 border-gray-900 bg-gray-900'>
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white"><span class="text-gray-100 dark:text-gray-100 mt-1">Share</span></h2>
      </div>

      {/* access field */}
      <div>
      <ReqInput account={account}/>
      {/* access provided and pending */}
      <Table account={account} contract={contract}/>
      </div>

      {/* grant access and notif field*/}
    </div>
  )
}

export default Modal
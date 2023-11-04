import React, { useEffect, useState } from 'react'

const Modal = ({account, contract, setModalOpen}) => {

  const [access, setAccess] = useState([]);
  
  const share = async() =>{
    const address = document.querySelector("#selectedAccount").value
    await contract.allow(address)
    console.log("Done Sharing")
  }

  useEffect(() => {
    const sharedAccounts = async() =>{
      const data = await contract.shareAccess()
      console.log(data)

      const newAccessElement = [];
      setAccess([])

      for(let i=0; i<data.length; i++){
        if(data[i].access === true){
          let element = data[i][0];

          if(!newAccessElement.includes(element)){
            newAccessElement.push(element);
          }
        }
      }

      setAccess((prev)=>[...prev, ...newAccessElement])
    }

    account && sharedAccounts()
  }, [])

  const remove = async() =>{
    const selectedOption = document.querySelector('#select');
    const selectedText = selectedOption.options[selectedOption.selectedIndex].value;
    
    if(selectedText){
      await contract.disallow(selectedText);
      console.log("Done");
    }else{
      alert("Please select an account")
    }
  }
  
  return (
    <div style={{padding: "1rem", margin:"10px"}}>
      <h3>Share with</h3>

      <input type='text' id='selectedAccount' placeholder='Enter Address'/><br/>
      <select id="select">
        <option value="">Select from the following list</option>
        {
          access.map((ele, i) => (
            <option key={i} value={ele}>{ele}</option>
          ))
        }
      </select><br/><br/>

      <button onClick={()=>setModalOpen(false)}>Cancel</button>&nbsp;&nbsp;
      <button onClick={share}>Share</button>&nbsp;&nbsp;
      <button onClick={remove}>Remove</button>
    </div>
  )
}

export default Modal
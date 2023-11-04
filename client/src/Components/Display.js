import React, { useState } from 'react'

const Display = ({account, contract}) => {
  const[data, setData] = useState(null)

  const getData = async() =>{
    const inputLink = document.querySelector('#inputLink').value;
    let dataArray;

    try {

      if(inputLink){
        //if inputLink contains an address it means user wants to fetch data of another address
        dataArray = await contract.display(inputLink)
      }else{
        //usres own data
        dataArray = await contract.display(account)
      }

      //basically the links are stored in blockchain
      console.log(dataArray)
    } catch (error) {
      alert("Don't have permission")
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if(!isEmpty){
      const image = dataArray.map((element, i) =>{
        return (
          //fetch data from each link
          <a href = {element} key={i} style={{margin:"1rem"}} target='_blank'>
            <img key={i}
                src = {element}
                alt='new'
                style={{height: "200px", width: "200px"}}
            />
          </a>
        )
      })

      setData(image)
    }else{
      alert("No image to Display")
    }
  }

  return (
    <div>
      <div>{data}</div>
      <input id="inputLink" type='text' placeholder='Enter Address'/> &nbsp;
      <button onClick={getData}> Get Data </button>
    </div>
  )
}

export default Display
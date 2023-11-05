//0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

import { useEffect, useState } from "react";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import FileUpload from "./Components/FileUpload";
import Display from "./Components/Display";
import Modal from "./Components/Modal" 
import "./App.css";
import Navbar from './Components/Navbar';
function App() {
  const [account, setAccount] = useState(""); //metamask account
  const [contract, setContract] = useState(null); //hardhat contract info
  const [provider, setProvider] = useState(null); //to read data from blockchain
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    //check if metamask is installed
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {

        window.ethereum.on("chainChanged", () =>{
          window.location.reload();
        })

        window.ethereum.on("accountsChanged", () =>{
          window.location.reload();
        })

        await provider.send("eth_requestAccounts", []); //open metamask account
        const signer = provider.getSigner(); //signer is used to write in blockchain
        const address = await signer.getAddress(); //get account address from metamask
        setAccount(address);

        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        //create hardhat contract info
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };

    provider && loadProvider();
  }, []);
  
  console.log(contract, account)
  return <div className="App absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120] index_beams__yWcJT">
    <Navbar account={account}/>
    <br/>
    
    <div className=" justify-items-center text-center">
      <FileUpload account={account} contract = {contract} provider={provider}/>
    </div>
    <div className="flex flex-col items-center justify-center mt-20 h-screen ">
    <div className="grid grid-cols-2 gap-4 container mt-4">
    {/* <div className="">
    <h2>Account : {account ? account : "Metamask is not connected"}</h2>
    {/* <FileUpload account={account} contract = {contract} provider={provider}/> }
    </div> */}
    <div className=" mx-3 px-3 text-center container border border-slate-800 border-l-0 border-x-0 border-y-0 border-r">
    <Display account={account} contract={contract}/><br/>
    
    </div>
    <div className="text-center ">
    
    {
      <Modal account={account} contract={contract}/>
    }
      </div>
    </div>
    </div>
    {/* <h2>Account : {account ? account : "Metamask is not connected"}</h2>
    <FileUpload account={account} contract = {contract} provider={provider}/> */}
    {/* <Display account={account} contract={contract}/><br/>
    {
      (!modalOpen)?<button onClick={()=>setModalOpen(true)}>Share</button>:
      <Modal account={account} contract={contract} setModalOpen={setModalOpen}/>
    } */}
  </div>;
}

export default App;

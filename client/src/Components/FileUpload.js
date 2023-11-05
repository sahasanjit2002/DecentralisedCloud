import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ account, contract, provider }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData.get("file"))

        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: '4d1a0ded1badc65b19b1',
              pinata_secret_api_key: 'bbfaef82f8c6bded33ae0d8e27e70127b7e1ac4ad888e3adf010232ee3c5a897',
              "Content-Type": "multipart/form-data",
            },
          });
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          contract.add(account,ImgHash);
          alert("Successfully Image Uploaded");
          setFile(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const retrieveData = (e) => {
    const data = e.target.files[0]; //target.value will return only path so we need target.files[0]
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };

    console.log(e.target.files[0]);
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="inputFile">Choose File</label>&nbsp; */}
        <input
          disabled={!account}
          type="file"
          id="inputFile"
          /*className=" px-1 w-96 text-gray-900 border border-gray-300 rounded-lg cursor-pointer"*/
          className=" text-xs w-1/2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          onChange={retrieveData}
        />
        {/* <button type="submit">Upload File</button> */}
        <button
        type="submit"
        class="inline-flex items-center rounded-md bg-black px-3 mx-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
      >
        Upload
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
          class="ml-2 h-4 w-4"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
      </form>

      
    </div>
  );
};

export default FileUpload;

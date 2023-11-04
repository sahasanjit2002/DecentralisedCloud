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
        <label htmlFor="inputFile">Choose File</label>&nbsp;
        <input
          disabled={!account}
          type="file"
          id="inputFile"
          onChange={retrieveData}
        />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default FileUpload;

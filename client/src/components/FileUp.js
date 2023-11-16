import React from "react";
import { useState } from "react";
import axios from 'axios';



const FileUp = ({ contract, account, provider }) => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);
  
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `4c48c3e0c1e8d1064dde`,
              pinata_secret_api_key: `86f8e69490ac4b5a972d46dcd234d2e93fcdaddb69d975ecf4a21432de67e3fd`,
              "Content-Type": "multipart/form-data",
            },
          });
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          console.log(ImgHash);
          contract.add(account,ImgHash);
          alert("Successfully Image Uploaded");
          setFileName("No image selected");
          setFile(null);
        } catch (e) {
          alert("Unable to upload image to Pinata");
        }
      }
      //alert("Successfully Image Uploaded");
      setFileName("No image selected");
      setFile(null);
    };
    const retrieveFile = (e) => {
      const data = e.target.files[0]; //files array of files object
      // console.log(data);
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(e.target.files[0]);
      };
      setFileName(e.target.files[0].name);
      e.preventDefault();
    };     


    return (
        <div>
            <h2>Upload here</h2>

            <form onSubmit={handleSubmit}>
                <input type='file' onChange={retrieveFile}/>
                <br/>
                <button type="submit" className="upload" disabled={!file}>
                    Upload File
                </button>
            </form>
        </div>
    );
};
export default FileUp;

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM5OTNGNjU5RWJDRUI2YTg4NzBmRWM2NWJmQkM5OGMxYkExMmU1MTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc0MDk5ODI2NjUsIm5hbWUiOiJIZWFsdGhJbnRlcmZhY2UifQ.ckaS_bxvqslKPkL8wPEcohqHKEtXMnLY59Wk7gdE-Fs*/
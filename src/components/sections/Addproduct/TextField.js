import React, {useState} from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { db, storage } from "../../firebase/firebaseConfig";

 

const  Addproductcontent = () => {

  const [ filenames, setFilenames] = useState([]);
  const [ downloadURLs, setDownloadURLs] = useState([]);
  const [ isUploading, setIsUploading] = useState(false);
  const [ uploadProgress, setUploadProgress] = useState(0);



 

 
  const handleUploadSuccess = async filename => {
    const downloadURL = await firebase.storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();
      

      // setFilenames([...filenames,filename])
      // setDownloadURLs([...downloadURLs, downloadURL])
      this.setState(oldState => ({
        filenames: [...oldState.filenames, filename],
        downloadURLs: [...oldState.downloadURLs, downloadURL],
        uploadProgress: 100,
        isUploading: false
      }));
     
  
  };

  const datos = () => {
    console.log(downloadURLs)
  }
 
    return (
      <div>
        <FileUploader
          accept="image/*"
          name="image-uploader-multiple"
          randomizeFilename
          storageRef={storage.ref("images")}
          onUploadSuccess={handleUploadSuccess}
          multiple
        />

        <div>
          {/* {downloadURLs.map((downloadURL, i) => {
            return <img key={i} src={downloadURL} />;
          })} */}
        </div>
        <button
        onClick={datos}
        >datos</button>
      </div>
    );
  }

 

export default Addproductcontent
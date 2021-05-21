import React, {Component} from "react";
import FileUploader from "react-firebase-file-uploader";
import { db, storage } from "../../firebase/firebaseConfig";
import Thumb from "./Thumb";

 

   
  class Addproductcontent extends Component {
   
    state = {
      filenames: [],
      downloadURLs: [],
      isUploading: false,
      uploadProgress: 0
    };
   
    handleUploadStart = () =>
      this.setState({
        isUploading: true,
        uploadProgress: 0
      });
   
    handleProgress = progress =>
      this.setState({
        uploadProgress: progress
      });
   
    handleUploadError = error => {
      this.setState({
        isUploading: false
        // Todo: handle error
      });
      console.error(error);
    };
   
    handleUploadSuccess = async filename => {
      const downloadURL = await storage
        .ref("images")
        .child(filename)
        .getDownloadURL();
   
      this.setState(oldState => ({
        filenames: [...oldState.filenames, filename],
        downloadURLs: [...oldState.downloadURLs, downloadURL],
        uploadProgress: 100,
        isUploading: false
      }));
    };
         
 

    render() {
     
      return (
        <div>
             <Thumb
                   downloadURLs={this.state.downloadURLs}
                    />
          <FileUploader
            accept="image/*"
            name="image-uploader-multiple"
            randomizeFilename
            storageRef={storage.ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            multiple
          />
   
          <p>Progress: {this.state.uploadProgress}</p>
   
          <p>Filenames: {this.state.filenames.join(", ")}</p>
          filenames
        
          <div>
            {this.state.downloadURLs.map((downloadURL, i) => {
              return <img key={i} src={downloadURL} />;
            })}
          </div>
        </div>
      );
    }
  }
   
export default Addproductcontent
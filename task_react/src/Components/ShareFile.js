import React from 'react';
import './ShareFile.css'
import add from '../static/add.svg'
import file from '../static/file.svg'
import axios from 'axios'
import JSZip from 'jszip';
import db, {storage} from '../firebase';
import firebase from "firebase";
import {ProgressBar} from 'react-bootstrap';

class ShareFile extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            uploadPercentage: 0,
            dispArr:[],
            files:[],
            fileSize:0,
            id:''
        }
        this.handleFiles=this.handleFiles.bind(this)
        this.upload=this.upload.bind(this)
    }

    componentDidMount(){
        document.getElementById('progress').classList.add('d-none')
    }

    handleFiles=(event)=>{
        
        const arr=[]
        let size=0
        for(let i=0;i<event.target.files.length;i++){
            arr.push(
                <div className="singleFile" key={i}>
                    <img src={file} alt="file"></img>
                    <p>{event.target.files[i].name}</p>
                </div>
            )
            size=size+(event.target.files[i].size)/1000000
        }
        size=size.toFixed(1)
        this.setState({
            files:event.target.files,
            dispArr:arr,
            fileSize:size
        })
    }

    upload(){
        let formData = new FormData()
        const storageRef = firebase.storage().ref();
        if(this.state.files.length){
            // document.getElementById('upload').classList.add('d-none')
            // document.getElementById('progress').classList.remove('d-none')
            // let zip = new JSZip();
            for(let i=0;i<this.state.files.length;i++){
                const selfile= storageRef.child(this.state.files[i].name);
                selfile.put(this.state.files[i]).then((snapshot) =>{
                    formData.append('file', this.state.files[i])
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    let options={
                        onUploadProgress: (progressEvent) => {
                            const {loaded, total} = progressEvent;
                            let percent = Math.floor( (loaded * 100) / total )
                            console.log( `${loaded}kb of ${total}kb | ${percent}%` );
                            if( percent < 100 ){
                              this.setState({ uploadPercentage: percent })
                            }
                          
                        },
                    }   

                        let filename = this.state.files[i].name;
                        
                        console.log(filename);
                        db.collection("files").add({
                            filename: filename,
                        });

                    axios.post(`/upload`,formData,options).then(res=>{
                        //data.delete('file')
                        console.log(res);
                    this.setState({
                        files:[],
                        dispArr:[],
                        fileSize:0,
                        //id:res.data.id,
                        uploadPercentage: 100},
                        ()=>{
                            setTimeout(() => {
                              this.setState({ uploadPercentage: 0 })
                            }, 2000);
                        })

                })
                
            })
                .catch((err)=>{
                    console.log(err);
                    this.setState({
                        files:[],
                        dispArr:[],
                        fileSize:0
                    })
                    
                    this.props.uploadCallback({success:1})
                })
                
                
            }
            
        }
    else{
            this.props.uploadCallback({success:2})
        }
    }

    render(){
        const {uploadPercentage} = this.state;
        return (
            <div className="content">
                <div className="listView">
                    <input type="file" multiple id="file" name="file" onChange={this.handleFiles}></input>
                    {this.state.files.length?<div className="filesList">
                    {this.state.dispArr}
                    </div>:<div className="addFiles">
                        <img src={add} alt="add files"></img>
                        <p>Drag and Drop files <span>or click to send files</span></p>
                    </div>}
                </div>
                <div className="fileDetails">
                    <p>No. of Files: {this.state.files.length?this.state.files.length:0}</p>
                    <p>Total Size: {this.state.fileSize}MB</p>
                </div>
                
                <button id="upload" className="btn btn-primary" onClick={this.upload}>Upload</button>
                <p></p>
                <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`} /> 
                <div className="progress" id="progress">
                    <div id="bar" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: '0%'}}></div>
                </div>
            </div>
        )
    }

}

export default ShareFile
import React from 'react'
import axios from 'axios';

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        e.preventDefault();  // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response);
        })
    }
    onChange(e) {
        this.setState({file: e.target.files[0]})
    }
    fileUpload(file){
        const formData = new FormData();
        formData.append('file', file);
        console.log("fd", formData)
        console.log("************  file", formData.get("file"))
        return axios({
            method: 'post',
            url: `/api/image-upload`,
            data: formData,
            config: { headers: {'content-type': 'multipart/form-data' }},
        }).then(response => {
            console.log("response upload", response);

        }).catch(function (response) {
            console.log("Error",response);
        });
        // return axios.post('/api/image-upload', formData, )
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
                <h1>File Upload</h1>
                <input type="file" name="recfile" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default FileUpload;
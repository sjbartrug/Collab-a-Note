const { render } = require("@testing-library/react");
import axios from 'axios'




class AccountPage extends Component{

    state = {
        selectedFile: null
    }


    fileSelectHandler = event =>{
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile.name)
        axios.post('', fd, {} )
            onUploadProgress: progressEvent =>{
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%') 
            }
        then(res => {
            console.log(res);
        });
    }


render() {
    return (
        <div className="AccountPage">
            <input style={{display: 'none'}} 
            type="file" 
            onChange={this.fileSelectHandler}
            ref={fileInput => this.fileInput = fileInput}/>
            <button onClick={() => this.fileInput.click()}>Pick File</button>
            <button onClick={this.fileUploadHandler}>Upload</button>
        </div>
    );
}}
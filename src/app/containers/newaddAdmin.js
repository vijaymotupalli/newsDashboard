import React from "react";
import {addAdmin,setAdminError,getSchools,uploadVideo, setProgress,} from "../actions/index";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';
class Adduser extends React.Component {
    constructor(props) {
        super(props);
        this.props.getSchools();
        this.state = {
            email: "",
            name: "",
            password:"",
            isSchool:false,
            phone:"",
            address:"",
            school:"",
            error: "",
            url: "",
            uri: "",
        };

        this.onSubmit = this.onSubmit.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleImageChange = this._handleImageChange.bind(this)
    }

    _handleSubmit(e) {
        e.preventDefault();
        const {uri} = this.state;
        this.props.uploadVideo(uri).then((result, err)=> {

            var logoUrl = JSON.parse(result)

            this.setState({url: logoUrl[0]})
        })

    }

    _handleImageChange(e) {
        e.preventDefault();
        this.props.setProgress(0);
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                uri: file
            });
        }
        reader.readAsDataURL(file)
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({error:""})
        this.props.setAdminError("");
        const {email, name,password,phone,address,school,url} = this.state;
        if(!((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))){ this.setState({
            error: "Email Not Valid"
        })}else {
           this.props.addAdmin({email: email, name: name, password:password,school:school,phone:phone,address:address,schoolLogoUrl:url}).then((result,err)=> {
               if(!err){
                   this.props.setProgress(0);
                   document.getElementById("rad1").checked = false;
                   document.getElementById("rad2").checked = false;
                   this.setState({
                       email:"",name:"",school:"",password:"",error:"",phone:"",address:"",isSchool:false,url:"",uri:""
                   })
               }
            })
        }
    }
    render() {
        var schools = this.props.schools ? this.props.schools : []
        var listSchools = schools.map(function (school) {
            return (
                <option key={school._id} value={school._id}>{school.name}</option>
            )
        }, this);
        return (
            <div>
                <div className="container" >
                    <div className="modal fade" id="myUserAddModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Add Admin</h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Name</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type Name" name="name"
                                                           onChange={e => this.setState({name: e.target.value})} value={this.state.name} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Email</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="email"  className="form-control" placeholder="Type Email ID" name="email"
                                                           onChange={e => this.setState({email: e.target.value})}
                                                           value={this.state.email} required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Password</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type Password" name="password"
                                                           onChange={e => this.setState({password: e.target.value})} value={this.state.password} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Phone</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type Phone Number" name="phone"
                                                           onChange={e => this.setState({phone: e.target.value})} value={this.state.phone} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Address</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type Address" name="address"
                                                           onChange={e => this.setState({address: e.target.value})} value={this.state.address} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Type</label>
                                                </div>
                                                <div className="col-md-9">

                                                        <div className="radio">
                                                            <label>
                                                                <input type="radio" value="school" name="isSchool" id="rad1" onClick={(e)=>this.setState({isSchool:true})} />
                                                                School
                                                            </label>
                                                        </div>
                                                        <div className="radio">
                                                            <label>
                                                                <input type="radio" value="admin" name="isSchool" id="rad2" onClick={(e)=>this.setState({isSchool:false})} />
                                                                User
                                                            </label>
                                                        </div>

                                                </div>
                                            </div>
                                        </div>

                                        {this.state.isSchool && <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Select School</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <select className="form-control" id="sel1" onChange={e => this.setState({school: e.target.value})} value={this.state.school}>
                                                        <option value="" defaultValue disabled>--Select School--</option>
                                                        {listSchools}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>}

                                        {this.state.isSchool && <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Upload Logo<span className="required">*</span></label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="file" id="test"  onChange={(e)=> {
                                                        this._handleImageChange(e)
                                                    }}/>
                                                    <span><button className="submitButton"
                                                                  type="submit"
                                                                  onClick={(e)=>this._handleSubmit(e)}
                                                                  disabled={!this.state.uri}>Upload</button></span>
                                                </div>
                                            </div>
                                        </div> }
                                        {this.state.isSchool && this.props.progress ? <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Logo Url</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input className="form-control" rows="5"
                                                           id="comment"
                                                           value={this.state.url ?this.state.url :"please wait getting URL ....."} disabled="disabled"/>
                                                </div>
                                            </div>
                                        </div> :""}
                                        {this.state.isSchool && this.props.progress ? <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-12">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                             style={{width: this.props.progress + "%"}}>
                                                            {this.props.progress + "%"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : ""}

                                    </form>
                                    <div className="text-center">
                                        <label className="errorcolor">
                                            { this.state.error && <div>{this.state.error}</div>  }
                                            { this.props.adminError && <div>{ this.props.adminError}</div>}
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" data-dismiss="modal"
                                                    style={{width:"100%",background:"#fff",color:"#333"}}>CANCEL</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton"  onClick={this.onSubmit} style={{width:"100%"}}>CREATE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
};

const mapStateToProps = (state) => {
    return {
        adminError: state.User.error,
        schools:state.Data.schools,
        adminDataClear:state.User.adminDataClear,
        progress: state.Videos.progress

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadVideo: (file) => dispatch(uploadVideo(file)),
        setProgress: (progress) => dispatch(setProgress(progress)),
        getSchools: ()=> dispatch(getSchools()),
        addAdmin: (admin) => dispatch(addAdmin(admin)),
        setAdminError: (error) => dispatch(setAdminError(error)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Adduser);

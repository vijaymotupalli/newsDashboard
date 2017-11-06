import React from "react";
import {addUser,setUserError,getSchools} from "../actions/index";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';
class Adduser extends React.Component {
    constructor(props) {
        super(props);
        this.props.getSchools();
        this.state = {
            username:"",
            email: "",
            name: "",
            password:"",
            isSchool:false,
            phone:"",
            address:"",
            school:"",
            error: ""
        };

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({error:""})
        this.props.setUserError("");
        const {email, name,password,phone,address,school,username} = this.state;
        if(!((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))){ this.setState({
            error: "Email Not Valid"
        })}else {
            this.props.addUser({username:username,email: email, name: name, password:password,school:school,phone:phone,address:address}).then((result,err)=> {
                if(!err){
                    this.setState({
                        username:"",email:"",name:"",school:"",password:"",error:"",phone:"",address:"",isSchool:false
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
                                    <h4 className="modal-title">Add User</h4>
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
                                                    <label className="colorGray">User Name</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type User Name" name="username"
                                                           onChange={e => this.setState({username: e.target.value})} value={this.state.username} />
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
                                        {/*<div className="form-group modalFields">*/}
                                            {/*<div className="row mt30">*/}
                                                {/*<div className="col-md-3">*/}
                                                    {/*<label className="colorGray">Type</label>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-md-9">*/}

                                                    {/*<div className="radio">*/}
                                                        {/*<label>*/}
                                                            {/*<input type="radio" value="school" name="isSchool" onClick={(e)=>this.setState({isSchool:true})} />*/}
                                                            {/*School*/}
                                                        {/*</label>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="radio">*/}
                                                        {/*<label>*/}
                                                            {/*<input type="radio" value="admin" name="isSchool" onClick={(e)=>this.setState({isSchool:false})} />*/}
                                                            {/*User*/}
                                                        {/*</label>*/}
                                                    {/*</div>*/}

                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                        {/*{this.state.isSchool && <div className="form-group modalFields">*/}
                                            {/*<div className="row mt30">*/}
                                                {/*<div className="col-md-3">*/}
                                                    {/*<label className="colorGray">Select School</label>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-md-9">*/}
                                                    {/*<select className="form-control" id="sel1" onChange={e => this.setState({school: e.target.value})} value={this.state.school}>*/}
                                                        {/*<option value="" defaultValue disabled>--Select School--</option>*/}
                                                        {/*{listSchools}*/}
                                                    {/*</select>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div>}*/}
                                    </form>
                                    <div className="text-center">
                                        <label className="errorcolor">
                                            { this.state.error && <div>{this.state.error}</div>  }
                                            { this.props.userError && <div>{ this.props.userError}</div>}
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
        userError: state.User.error,
        schools:state.Data.schools
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSchools: ()=> dispatch(getSchools()),
        addUser: (admin) => dispatch(addUser(admin)),
        setUserError: (error) => dispatch(setUserError(error)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Adduser);

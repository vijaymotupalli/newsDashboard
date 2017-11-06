import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUserDetails} from "../actions/index";
import EditUser from './editUser'
import moment from 'moment'
class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.props.getUserDetails(props.match.params.userId)
        this.state={
            selectedUser:props.match.params.userId
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h3  className="title">User Details</h3>
                <div  className="row">
                    <div  className="col-md-12">
                        <div  className="cardWidget">
                            <div  className="cardBottom">
                                <div  className="row">
                                    <div  className="col-md-6">
                                        <p ><strong >User Name</strong> <span >{this.props.selectedUser.userName}</span></p>
                                        <p ><strong >Email</strong> <span >{this.props.selectedUser.email}</span></p>
                                        <p ><strong >Name</strong> <span >{this.props.selectedUser.name}</span></p>
                                    </div>
                                    <div  className="col-md-4 text-center">
                                        <p ><strong >Date of Joining</strong> <span >{moment(this.props.selectedUser.createdAt).format('LL')}</span></p>
                                        <p ><strong >Address</strong> <span >{this.props.selectedUser.address}</span></p>
                                        <p ><strong >Phone </strong> <span >{this.props.selectedUser.phone} </span></p>
                                    </div>
                                    <div  className="col-md-2 text-right">
                                        <button   className="btn blackButton" data-toggle="modal"
                                                  data-target="#myUserEditModal">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.selectedUser  && <EditUser />}
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        selectedUser: state.User.selectedUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserDetails:(userId)=> dispatch(getUserDetails(userId))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
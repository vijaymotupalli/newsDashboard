import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getAdmins,selectedAdminData,deleteAdmin} from "../actions/index";
import Newadd from './newaddAdmin'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';

import 'style-loader!react-confirm-alert/src/react-confirm-alert.css'

import {Route, Link, Switch} from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.onDeleteAdmin = this.onDeleteAdmin.bind(this);
    }
    componentDidMount() {
        this.props.getAdmins();
    }
    selectedAdmin(admin){
        const {context,history} = this.props
        this.props.selectedAdminData(admin);
        history.push(this.props.match.url+"/"+admin.email)
    }

    onDeleteAdmin(userId){
        confirmAlert({
            title: 'Confirm To Delete',                        // Title dialog
            message: 'Are you sure to do this.',               // Message dialog
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => this.props.deleteAdmin(userId)   // Action after Confirm
        })

    }

    render() {
        var admins = this.props.admins
        var listAdmins = admins.map(function (admin) {
            return (
                <tr key={admin._id} onClick={()=>this.selectedAdmin(admin)}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.phone}</td>
                    <td>{admin.school ? "School" : "User"}</td>
                    <td>{admin.createdAt}</td>
                    <td>
                        <button  className="btn blackButton" onClick={(e)=>{e.stopPropagation();this.onDeleteAdmin(admin._id)}}>Remove</button>
                    </td>
                </tr>
            );
        }, this);
        return (
            <div>
                <div>
                    <Newadd/>
                    <div className="row" id="title">
                        <div className="col-sm-10" id="userslist">Admins List</div>
                        <div className="col-sm-2" >
                            <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                                    data-target="#myUserAddModal">
                                <span className="glyphicon glyphicon-plus"/> Add Admin
                            </button>
                        </div>
                    </div>
                    <div className="gridTable">
                        <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Type</th>
                                <th>Added At</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listAdmins }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        admins: state.User.admins,
        selectedAdmin: state.User.selectedAdmin
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAdmins: () => dispatch(getAdmins()),
        selectedAdminData: (data) => dispatch(selectedAdminData(data)),
        deleteAdmin: (adminId) => dispatch(deleteAdmin(adminId)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(User);
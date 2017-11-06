import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getAdminDetails} from "../actions/index";
import EditAdmin from './editAdmin'
import moment from 'moment'
class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.props.getAdminDetails(props.match.params.adminId)
        this.state={
            selectedAdmin:props.match.params.adminId
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h3  className="title">Admin Details</h3>
                    <div  className="row">
                        <div  className="col-md-12">
                            <div  className="cardWidget">
                                {this.props.selectedAdmin.school && <div className="ribbon ribbon-top-right"><span>school</span></div>}
                                {this.props.selectedAdmin.school && <div className="cardTop">
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <figure>
                                                <img src={this.props.selectedAdmin.schoolLogoUrl || "https://codeuniverse.s3.ap-south-1.amazonaws.com/no_image_placeholder.png"}  />
                                            </figure>
                                            <figcaption>School Logo</figcaption>
                                        </div>
                                    </div>
                                </div>}
                                <div  className="cardBottom">
                                    <div  className="row">
                                        <div  className="col-md-6">
                                            <p ><strong >Email</strong> <span >{this.props.selectedAdmin.email}</span></p>
                                            <p ><strong >Name</strong> <span >{this.props.selectedAdmin.name}</span></p>
                                            <p ><strong >Address</strong> <span >{this.props.selectedAdmin.address}</span></p>
                                        </div>
                                        <div  className="col-md-4 text-center">
                                            <p ><strong >Date of Joining</strong> <span >{moment(this.props.selectedAdmin.createdAt).format('L')}</span></p>
                                            <p ><strong >Phone </strong> <span >{this.props.selectedAdmin.phone} </span></p>
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
                {this.props.selectedAdmin  && <EditAdmin />}
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        selectedAdmin: state.User.selectedAdmin
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAdminDetails:(email)=> dispatch(getAdminDetails(email))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
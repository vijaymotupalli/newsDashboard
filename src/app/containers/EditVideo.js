import React from "react";
import {editVideo,setSelectedVideo,getStandards,getSubjects} from "../actions/index";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';

var moment = require('moment');

class EditVideo extends React.Component {
    constructor(props) {
        super(props);
        this.props.getSubjects();
        this.props.getStandards();
        this.state = {
            title: this.props.selectedVideo.title ? this.props.selectedVideo.title :"",
            description:  this.props.selectedVideo.description ? this.props.selectedVideo.description:"",
            url: this.props.selectedVideo.url ? this.props.selectedVideo.url:"",
            subject: this.props.selectedVideo.subject ? this.props.selectedVideo.subject._id:"",
            standard: this.props.selectedVideo.standard ? this.props.selectedVideo.standard._id:"",
            videoId:this.props.selectedVideo._id ? this.props.selectedVideo._id:""
        };
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillReceiveProps(nextProps){
        this.setState ({
            title: nextProps.selectedVideo.title ? nextProps.selectedVideo.title :"",
            description:  nextProps.selectedVideo.description ? nextProps.selectedVideo.description:"",
            url: nextProps.selectedVideo.url ? nextProps.selectedVideo.url:"",
            subject: nextProps.selectedVideo.subject ? nextProps.selectedVideo.subject._id:"",
            standard: nextProps.selectedVideo.standard ? nextProps.selectedVideo.standard._id:"",
            videoId:nextProps.selectedVideo._id ? nextProps.selectedVideo._id:""
        });

    }
    onSubmit(e) {
        e.preventDefault();
        const {title, description, subject, standard,videoId} = this.state;
        this.props.editVideo({
            videoId:videoId,
            title: title,
            description: description,
            subject: subject,
            standard: standard,
        }).then((result,err)=>{
            if(!err){
                document.getElementById("close").click()
                this.props.setSelectedVideo("");
            }
        })
    }

    render() {
        var subjects = this.props.subjects ? this.props.subjects : []
        var listSubjects = subjects.map((subject)=> {
            return (
                <option key={subject._id} value={subject._id}>{subject.name}</option>
            )
        });
        var standards = this.props.standards ? this.props.standards : []
        var listStandards = standards.map( (standard)=> {
            return (
                <option key={standard._id} value={standard._id}>{standard.name}</option>
            )
        });
        return (
            <div>
                <div className="modal fade" id="editVideo" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" id="close" className="close"  data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Edit Video</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Title</label>
                                            </div>
                                            <div className="col-md-9">
                                                <input type="text"  className="form-control" placeholder="Enter Title" name="name"
                                                       onChange={e => this.setState({title: e.target.value})} value={this.state.title} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Description</label>
                                            </div>
                                            <div className="col-md-9">
                                                    <textarea placeholder="Enter Description" className="form-control" rows="5" id="comment"
                                                              onChange={e => this.setState({description: e.target.value})} value={this.state.description} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Subject</label>
                                            </div>
                                            <div className="col-md-9">
                                                <select className="form-control"  onChange={e => this.setState({subject: e.target.value})} value={this.state.subject}>
                                                    <option value="" defaultValue="--Select Subject--" disabled>--Select Subject--</option>
                                                    {listSubjects}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Standard</label>
                                            </div>
                                            <div className="col-md-9">
                                            <select className="form-control" onChange={e => this.setState({standard: e.target.value})} value={this.state.standard}>
                                                <option value="" defaultValue="--Select Standard--" disabled>--Select Standard--</option>
                                                {listStandards}
                                            </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Video</label>
                                            </div>
                                            <div className="col-md-9">
                                                {this.state.url ? <video className="videoDisplay" style={{width:"70%"}} controls>
                                                    <source src={this.state.url}/>
                                                </video> : "Video Loading....."}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="button" className="btn blackButton" data-dismiss="modal"
                                                style={{width:"100%",background:"#fff",color:"#333"}}>CANCEL</button>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" className="btn blackButton" onClick={this.onSubmit} style={{width:"100%"}}>SUBMIT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
;

const mapStateToProps = (state) => {
    return {
        selectedVideo:state.Videos.selectedVideo,
        subjects: state.Data.subjects,
        standards: state.Data.standards,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editVideo: (video) => dispatch(editVideo(video)),
        setSelectedVideo: (video) => dispatch(setSelectedVideo(video)),
        getStandards: ()=> dispatch(getStandards()),
        getSubjects: ()=> dispatch(getSubjects()),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditVideo);

import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import {applyFilter, getSchools, getStandards, getSubjects,setLoader} from "../actions/index";
import './styles.css';
import Select from 'react-select'
import 'style-loader!react-select/dist/react-select.css';

import {connect} from "react-redux";

class SelectDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            superAdmin :false
        }
        this.props.getSubjects();
        this.props.getStandards();
        this.props.getSchools();
        this.state = {
            standardValues:"",
            schoolValues:"",
            subjectValues:""
        }

        this.handleStandardChange = this.handleStandardChange.bind(this)
        this.handleSubjectChange = this.handleSubjectChange.bind(this)
        this.handleSchoolChange = this.handleSchoolChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillMount(){
        var role = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).role :"";
        if(role == "SUPER_ADMIN"){
            this.setState({
                superAdmin:true
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
       var standard = this.state.standardValues ?  this.state.standardValues.split(",") :[]
       var school = this.state.schoolValues ? this.state.schoolValues.split(",") :[]
       var subject = this.state.subjectValues ? this.state.subjectValues.split(",") :[]
        this.props.setLoader(true);
        this.props.applyFilter({standard,school,subject}).then( (result)=> {
           this.props.setLoader(false)
        }, (error)=> {
            if(error)this.props.setLoader(false);
        })
    }

    handleStandardChange (value) {
        this.setState({ standardValues :value });
    }
    handleSubjectChange (value) {
        this.setState({ subjectValues:value });
    }
    handleSchoolChange (value) {
        this.setState({ schoolValues:value });
    }


    render() {
        const { standardValues,schoolValues,subjectValues } = this.state;
        var standards = this.props.standards.map((standard)=>{
            return {value:standard._id,label:standard.name}
        })
        var schools = this.props.schools.map((school)=>{
            return {value:school._id,label:school.name}
        })
        var subjects = this.props.subjects.map((subject)=>{
            return {value:subject._id,label:subject.name}
        })

        return (
            <div >
                <div className="row">
                    <div className="col-sm-3">
                        <Select
                            multi
                            onChange={this.handleStandardChange}
                            options={standards}
                            placeholder="Select Standard(s)"
                            simpleValue
                            value={standardValues}
                        />
                    </div>
                    <div className="col-sm-3">
                        <Select
                            multi
                            onChange={this.handleSubjectChange}
                            options={subjects}
                            placeholder="Select Subject(s)"
                            simpleValue
                            value={subjectValues}
                        />
                    </div>
                    {this.state.superAdmin &&  <div className="col-sm-4">
                        <Select
                            multi
                            onChange={this.handleSchoolChange}
                            options={schools}
                            placeholder="Select School(s)"
                            simpleValue
                            value={schoolValues}
                        />
                    </div>}
                    <div className="col-sm-2">
                        <button type="button" className="btn btn-info btn-sm" style={{backgroundColor:"black"}} onClick={this.onSubmit}>
                            <span className="glyphicon glyphicon-filter" /> Apply Filter
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        schools: state.Data.schools,
        subjects: state.Data.subjects,
        standards: state.Data.standards
    }
};


const mapDispatchToProps = (dispatch)=> {

    return {
        getSchools: ()=> dispatch(getSchools()),
        getStandards: ()=> dispatch(getStandards()),
        getSubjects: ()=> dispatch(getSubjects()),
        applyFilter: (filterData)=> dispatch(applyFilter(filterData)),
        setLoader: (value)=> dispatch(setLoader(value)),

    };

}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDemo);



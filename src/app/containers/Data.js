import React from "react";
import {connect} from "react-redux";
import InlineEdit from 'react-edit-inline';
import './styles.css';
import {getCategories, getTypes, getLocalities, getCountries,
    addCategory, addType,addLocality,addCountry,
    editCategory, editType, editLocality,editCountry ,
    deleteCategory, deleteType, deleteLocality,deleteCountry
} from "../actions/index";
import  moment from 'moment'


class Data extends React.Component {
    constructor(props) {
        super(props);
        this.props.getCategories();
        this.props.getCountries();
        this.props.getLocalities();
        this.props.getTypes();
        this.state = {
            category: "", locality: "", type: "",country:"", editField: "", disabled: true
        }
        this.editCategory = this.editCategory.bind(this);
        this.editCountry = this.editCountry.bind(this);
        this.editLocality = this.editLocality.bind(this);
        this.editType = this.editType.bind(this);
        
        this.submitCategory = this.submitCategory.bind(this);
        this.submitCountry = this.submitCountry.bind(this);
        this.submitLocality = this.submitLocality.bind(this);
        this.submitType = this.submitType.bind(this);
    }

    editCategory(category) {
        this.props.editCategory({name: category.name, _id: this.state.editField})
    }

    editLocality(locality) {
        this.props.editLocality({name: locality.name, _id: this.state.editField})
    }

    editCountry(country) {
        this.props.editCountry({name: country.name, _id: this.state.editField})
    }
    editType(type) {
        this.props.editType({name: type.name, _id: this.state.editField})
    }

    submitCategory(e) {
        e.preventDefault();
        const {category} = this.state;
        this.props.addCategory({name: category});
        this.setState({
            category: ''
        });
    }

    submitLocality(e) {
        e.preventDefault();
        const {locality} = this.state;
        this.props.addLocality({name: locality});
        this.setState({
            locality: ''
        });
    }

    submitCountry(e) {
        e.preventDefault();
        const {country} = this.state;
        this.props.addCountry({name: country});
        this.setState({
            country: ''
        });
    } 
    submitType(e) {
        e.preventDefault();
        const {type} = this.state;
        this.props.addType({name: type});
        this.setState({
            type: ''
        });
    }

    render() {
        var categoriesList = this.props.categories.map((category)=> {
            return (
                <div className="row" style={{padding:"5px"}} key={category._id}>
                    <div className="col-sm-10" onClick={()=>this.setState({editField: category._id})}>
                        <InlineEdit
                            text={category.name}
                            paramName="name"
                            change={this.editCategory}
                            activeClassName="form-control"
                        />

                    </div>
                    <div className="col-sm-2">
                        <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                            this.props.deleteCategory(category._id)

                        }}>
                            <span className="glyphicon glyphicon-trash"/>
                        </button>
                    </div>
                </div>

            )
        })
        var countriesList = this.props.countries.map((country)=> {
            return (  <div className="row"  style={{padding:"5px"}} key={country._id}>
                <div className="col-sm-10" onClick={()=>this.setState({editField: country._id})}>
                    <InlineEdit
                        text={country.name}
                        paramName="name"
                        change={this.editCountry}
                        activeClassName="form-control"
                    />

                </div>
                <div className="col-sm-2">
                    <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                        this.props.deleteCountry(country._id)

                    }}>
                        <span className="glyphicon glyphicon-trash"/>
                    </button>
                </div>
            </div>)
        })
        var localitiesList = this.props.localities.map((locality)=> {
            return (<div className="row" style={{padding:"5px"}} key={locality._id}>
                <div className="col-sm-10" onClick={()=>this.setState({editField: locality._id})}>
                    <InlineEdit
                        text={locality.name}
                        paramName="name"
                        change={this.editLocality}
                        activeClassName="form-control"
                    />

                </div>
                <div className="col-sm-2">
                    <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                        this.props.deleteLocality(locality._id)

                    }}>
                        <span className="glyphicon glyphicon-trash"/>
                    </button>
                </div>
            </div>)
        })  
        var typesList = this.props.types.map((type)=> {
            return (<div className="row" style={{padding:"5px"}} key={type._id}>
                <div className="col-sm-10" onClick={()=>this.setState({editField: type._id})}>
                    <InlineEdit
                        text={type.name}
                        paramName="name"
                        change={this.editType}
                        activeClassName="form-control"
                    />

                </div>
                <div className="col-sm-2">
                    <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                        this.props.deleteType(type._id)

                    }}>
                        <span className="glyphicon glyphicon-trash"/>
                    </button>
                </div>
            </div>)
        })
        return (
            <div className="container-fluid">
                <div>
                    <div className="row dataGrid">
                        <div className="col-sm-3">
                            <h3>Categories </h3>
                            <div className="cardWidget">
                                <div className="cardBottom">
                                    <form onSubmit={this.submitCategory}>
                                        <div className="form-group addbox">
                                            <input type="text" value={this.state.category} className="form-control"
                                                   onChange={(e)=>this.setState({category: e.target.value})}
                                                   placeholder="Add Category"/>
                                        </div>
                                        <button type="submit" id="addbutton" className="btn btn-default addbutton">
                                            Submit
                                        </button>
                                    </form>
                                    <ul className="list-group listData">
                                        {this.props.categories.length > 0 ? categoriesList : <span className="listData2">No Categories Added</span> }
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h3>Localities </h3>
                            <div className="cardWidget">
                                <div className="cardBottom">
                                    <form onSubmit={this.submitLocality}>
                                        <div className="form-group addbox">
                                            <input type="text" className="form-control" value={this.state.locality}
                                                   onChange={(e)=>this.setState({locality: e.target.value})}
                                                   placeholder="Add Locality"/>
                                        </div>


                                        <button type="submit" id="addbutton" className="btn btn-default addbutton">
                                            Submit
                                        </button>

                                    </form>
                                    <ul className="list-group listData">
                                        {this.props.localities.length > 0 ? localitiesList : "No Localities Added"}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h3>Countries </h3>
                            <div className="cardWidget">
                                <div className="cardBottom">
                                    <form onSubmit={this.submitCountry}>
                                        <div className="form-group addbox">
                                            <input type="text" className="form-control" value={this.state.country}
                                                   onChange={(e)=>this.setState({country: e.target.value})}
                                                   placeholder="Add Country"/>
                                        </div>


                                        <button type="submit" id="addbutton" className="btn btn-default addbutton">
                                            Submit
                                        </button>


                                    </form>
                                    <ul className="list-group listData">
                                        {this.props.countries.length > 0 ? countriesList : "No Countries Added"}
                                    </ul>

                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <h3>Types </h3>
                            <div className="cardWidget">
                                <div className="cardBottom">

                                    <form onSubmit={this.submitType}>
                                        <div className="form-group addbox">
                                            <input type="text" className="form-control" value={this.state.type}
                                                   onChange={(e)=>this.setState({type: e.target.value})}
                                                   placeholder="Add Type"/>
                                        </div>


                                        <button type="submit" id="addbutton" className="btn btn-default addbutton">
                                            Submit
                                        </button>


                                    </form>
                                    <ul className="list-group listData">
                                        {this.props.types.length > 0 ? typesList : "No Types Added"}
                                    </ul>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        categories: state.Data.categories,
        localities: state.Data.localities,
        countries: state.Data.countries,
        types: state.Data.types,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: ()=> dispatch(getCategories()),
        getCountries: ()=> dispatch(getCountries()),
        getLocalities: ()=> dispatch(getLocalities()),
        getTypes: ()=> dispatch(getTypes()),
        
        addLocality: (locality)=> dispatch(addLocality(locality)),
        addCountry: (country)=> dispatch(addCountry(country)),
        addCategory: (category)=> dispatch(addCategory(category)),
        addType: (type)=> dispatch(addType(type)),
        
        editCountry: (locality)=> dispatch(editCountry(locality)),
        editLocality: (country)=> dispatch(editLocality(country)),
        editCategory: (category)=> dispatch(editCategory(category)),
        editType: (type)=> dispatch(editType(type)),
        
        deleteLocality: (locality)=> dispatch(deleteLocality(locality)),
        deleteCountry: (country)=> dispatch(deleteCountry(country)),
        deleteCategory: (category)=> dispatch(deleteCategory(category)),
        deleteType: (type)=> dispatch(deleteType(type)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Data);
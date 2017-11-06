import React from "react";
import {uploadImage, postNews,setNewsError,getCountries,getCategories,getTypes,getLocalities} from "../actions/index";
import {connect} from "react-redux";
import './styles.css';

class Addvideo extends React.Component {
    constructor(props) {
        super(props);
        this.props.getCategories();
        this.props.getLocalities();
        this.props.getTypes();
        this.props.getCountries();
        this.state = {
            title: "",
            description: "",
            type:"",
            category:"",
            sourceUrl:"",
            country:"",
            locality:"",
            image:"",
            file:"",
            imagePreviewUrl:""
        };
        this.onSubmit = this.onSubmit.bind(this)
        this._handleImageChange = this._handleImageChange.bind(this)
        this.clearImage = this.clearImage.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();
        const {title, description,type,category,sourceUrl,country,locality,image,file} = this.state;
        if(!(title && type && sourceUrl )){
            this.props.setNewsError("Fill All Required Fields")
        }else {
            this.props.uploadImage(file).then((result, err)=> {
                console.log("----result----",result,err);
                var logoUrl = JSON.parse(result)
                this.setState({image: logoUrl})
                this.props.postNews({
                    title: title,
                    description: description,
                    type: type,
                    category: category,
                    sourceUrl: sourceUrl,
                    country: country,
                    locality: locality,
                    image: this.state.image
                }).then((result, err)=> {
                    console.log("------SUCCESSFULLY ADDED-------",result,err)
                    this.props.setNewsError("");
                    this.setState({
                        title: "",
                        description: "",
                        type: "",
                        category: "",
                        sourceUrl: "",
                        country: "",
                        locality: "",
                        image: "",
                        imagePreviewUrl:"",
                        file:""
                    })
                })

            })
        }
    }
    
    clearImage(){
        console.log("----image has    to be cleared-------");
        this.setState({imagePreviewUrl:""})
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {

        let {imagePreviewUrl} = this.state;
        var categories = this.props.categories ? this.props.categories : []
        var listCategories = categories.map((category)=> {
            return (
                <option key={category._id} value={category._id}>{category.name}</option>
            )
        });
        var countries = this.props.countries ? this.props.countries : []
        var listCountries = countries.map( (country)=> {
            return (
                <option key={country._id} value={country._id}>{country.name}</option>
            )
        });
        var types = this.props.types ? this.props.types : []
        var listTypes = types.map( (type)=> {
            return (
                <option key={type._id} value={type._id}>{type.name}</option>
            )
        });
        var localities = this.props.localities ? this.props.localities : []
        var listLocalities = localities.map( (locality)=> {
            return (
                <option key={locality._id} value={locality._id}>{locality.name}</option>
            )
        });
        return (
            <div>
                <div className="container" >
                    <div className="modal fade" id="addvideo" role="dialog" >
                        <div className="modal-dialog modal-lg" >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" >&times;</button>
                                    <h4 className="modal-title">Upload News</h4>
                                </div>
                                <div className="modal-body">

                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Title <span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <input type="text" className="form-control" placeholder="Enter Title"
                                                       name="name"
                                                       onChange={e => this.setState({title: e.target.value})}
                                                       value={this.state.title} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Description</label>
                                            </div>
                                            <div className="col-md-9">
                                                    <textarea placeholder="Enter Description" className="form-control"
                                                              rows="5" id="comment"
                                                              onChange={e => this.setState({description: e.target.value})}
                                                              value={this.state.description}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Source Url<span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <input type="text" className="form-control" placeholder="Enter Source Url"
                                                       name="sourceurl"
                                                       onChange={e => this.setState({sourceUrl: e.target.value})}
                                                       value={this.state.sourceUrl} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Type <span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <select className="form-control"  onChange={e => this.setState({type: e.target.value})} value={this.state.type}>
                                                    <option value="" defaultValue="--Select Type--" disabled>--Select Type--</option>
                                                    {listTypes}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Category<span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <select className="form-control" onChange={e => this.setState({category: e.target.value})} value={this.state.category}>
                                                    <option value="" defaultValue="--Select Category--" disabled>--Select Category--</option>
                                                    {listCategories}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Country<span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <select className="form-control" onChange={e => this.setState({country: e.target.value})} value={this.state.country}>
                                                    <option value="" defaultValue="--Select Country--" disabled>--Select country--</option>
                                                    {listCountries}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Locality<span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <select className="form-control" onChange={e => this.setState({locality: e.target.value})} value={this.state.locality}>
                                                    <option value="" defaultValue="--Select Locality--" disabled>--Select Locality--</option>
                                                    {listLocalities}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Image<span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-5">
                                                <div >
                                                    {imagePreviewUrl &&<div className="glyphicon corner" onClick={this.clearImage}>&#xe088;</div>}
                                                    {imagePreviewUrl ? <img src={this.state.imagePreviewUrl} style={{width:"100%",marginTop:"10px"}} /> :"Select Image To Show Preview"}
                                                </div>
                                                <br/>
                                                <div className="upload-btn-wrapper">
                                                    <button className="btn">Upload Image</button>
                                                    <input type="file" name="myfile" onChange={(e)=>this._handleImageChange(e)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <label className="errorcolor">
                                        { this.props.newsError && <div>{this.props.newsError}</div> }
                                    </label>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" data-dismiss="modal"
                                                    style={{width: "100%", background: "#fff", color: "#333"}}>Cancel
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" onClick={this.onSubmit}
                                                    style={{width: "100%"}}>Submit
                                            </button>
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
}
;

const mapStateToProps = (state) => {
    return {
        progress: state.Videos.progress,
        newsError: state.Videos.newsError,
        categories: state.Data.categories,
        countries: state.Data.countries,
        types: state.Data.types,
        localities: state.Data.localities,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadImage: (file) => dispatch(uploadImage(file)),
        postNews: (news) => dispatch(postNews(news)),
        setNewsError: (newsError) => dispatch(setNewsError(newsError)),
        getCategories: ()=> dispatch(getCategories()),
        getLocalities: ()=> dispatch(getLocalities()),
        getTypes: ()=> dispatch(getTypes()),
        getCountries: ()=> dispatch(getCountries()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Addvideo);



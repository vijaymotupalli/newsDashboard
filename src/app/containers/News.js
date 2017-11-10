import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import {setSelectedNews, getNews,deleteNews} from "../actions/index";
import './styles.css';
import Addvideo from './AddVideo'
import EditVideo from './EditVideo'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import ApplyFilter from './ApplyFilter'
import 'style-loader!react-confirm-alert/src/react-confirm-alert.css'
import {connect} from "react-redux";
import moment from "moment"

import Loadable from 'react-loading-overlay'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

class Videos extends React.Component {
    constructor(props) {
        super(props)
        this.props.getNews()
        this.state = {
            superAdmin :false
        }
        this.onDeleteNews = this.onDeleteNews.bind(this)
    }
    componentWillMount(){
        var role = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).role :"";
        if(role == "SUPER_ADMIN"){
            this.setState({
                superAdmin:true
            })
        }

    }

    onDeleteNews(news){
        confirmAlert({
            title: 'Confirm To Delete',                        // Title dialog
            message: 'Are you sure to do this.',               // Message dialog
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => this.props.deleteNews(news)   // Action after Confirm
        })

    }

    render() {
        return (
               <div>
                   <Addvideo/>
                   <EditVideo/>
                   <div className="row" id="title">
                       <div className="col-sm-10" id="userslist">All News</div>
                        <div className="col-sm-2" >
                           <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                                   data-target="#addvideo">
                               <span className="glyphicon glyphicon-plus"/> Upload News
                           </button>
                       </div>

                   </div>
                   {/*<div className="filter">*/}
                       {/*<ApplyFilter/>*/}
                   {/*</div>*/}
                   <OverlayLoader
                       color={'red'} // default is white
                       loader="ScaleLoader" // check below for more loaders
                       text="Loading... Please wait!"
                       active={this.props.loader}
                       backgroundColor={'white'} // default is black
                       opacity="0.4" // default is .9
                   >

                       <div className="newsDisplay">
                           {this.props.news.length > 0 ? this.props.news.map((news)=> {
                               return (
                                   <div className="row eachNews" key={news._id}>
                                       <div  className="cardTest">
                                           <div className="col-sm-2">
                                               <img className="videoDisplay img-thumbnail"
                                                    src={news.image ? news.image : "https://codeuniverse.s3.ap-south-1.amazonaws.com/no_image_placeholder.png"}/>
                                           </div>
                                           <div className="col-sm-10">
                                               <div className="row">
                                                   <div className="col-sm-9"> <h5>{news.title}</h5></div>
                                                   <div className="col-sm-2"> <span className="newsTime">-{moment(news.createdAt).startOf('hour').fromNow()}</span></div>
                                                   <div className="col-sm-1"> <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                                                       this.props.setSelectedNews(news)
                                                   }} data-toggle="modal" data-target="#editVideo">
                                                       <span className="glyphicon glyphicon-pencil"/>
                                                   </button></div>
                                               </div>
                                               <div className="row">
                                                   <div className="videoTitle"> {news.description}</div>
                                               </div>
                                               <div className="row">
                                                   <div className="col-sm-11">
                                                       <div className="labels">
                                                           <div className="col-sm-3">
                                                               <strong >Country: <span className="label label-primary ">{news.country.name}</span></strong>
                                                           </div>
                                                           <div className="col-sm-3">
                                                               <strong >Category: <span className="label label-success ">{news.category.name}</span></strong>
                                                           </div>
                                                           <div className="col-sm-3">
                                                               <strong >Locality: <span className="label label-warning ">{news.locality.name}</span></strong>
                                                           </div>
                                                           <div className="col-sm-3">
                                                               <strong >Type: <span className="label label-default ">{news.type.name}</span></strong>
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="col-sm-1 labels">
                                                       <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                                                           this.onDeleteNews(news)
                                                       }}>
                                                           <span className="glyphicon glyphicon-trash" />
                                                       </button>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               )
                           }) : <h2 className="notFound">"News Not Found"</h2> }
                       </div>

                   </OverlayLoader>
               </div>
        )
    }

}

const mapStateToProps = (state) => {


    return {
        news: state.Videos.news,
        loader: state.Videos.loader,
        selectedNews: state.Videos.selectedNews
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {
        setSelectedNews: (news) => dispatch(setSelectedNews(news)),
        getNews: () => dispatch(getNews()),
        deleteNews: (news) => dispatch(deleteNews(news)),

    };

}

export default connect(mapStateToProps, mapDispatchToProps)(Videos);



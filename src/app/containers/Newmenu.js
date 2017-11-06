import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import './styles.css';
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.onSignout = this.onSignout.bind(this)
        this.state = {
            superAdmin :false
        }
        this.onSignout = this.onSignout.bind(this)
    }
    componentWillMount(){
        var role = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).role :"";
        if(role == "SUPER_ADMIN"){
            this.setState({
                superAdmin:true
            })
        }

    }

    onSignout(e) {
        localStorage.clear()
    }

    render() {
        const {match} = this.props
        return (
        <div>
            <div className="header">Welcome To VR Science</div>
            <div className="container-fluid" >
                <div id="sidebar" className="sidenav">
                    <div className="mainLinks">
                        <NavLink to={match.url + '/myprofile'} activeClassName="active" exact><span
                            className="glyphicon glyphicon-user"/> My Profile </NavLink>

                        { this.state.superAdmin && <NavLink to={match.url + '/data'} activeClassName="active"  exact>
                            <span className="glyphicon glyphicon-file"/> Data </NavLink>
                        }

                            {this.state.superAdmin && <NavLink to={match.url + '/admins'} activeClassName="active"  exact>
                                <span className="glyphicon glyphicon-stats" /> Admins </NavLink>}

                        {this.state.superAdmin && <NavLink to={match.url + '/users'} activeClassName="active"  exact>
                            <span className="glyphicon glyphicon-stats" /> Users </NavLink>}

                        <NavLink to={match.url + '/videos'} activeClassName="active" exact><span
                            className="glyphicon glyphicon-facetime-video"/> Videos </NavLink>

                        <NavLink to="/" activeClassName="active" onClick={this.onSignout} exact><span
                            className="glyphicon glyphicon-off"/> Signout </NavLink>
                    </div>
                </div>
            </div>
            <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn">
                <i className="glyphicon glyphicon-align-left"></i>
            </button>
        </div>


        )
    }

}


const mapStateToProps = (state) => {
    return {
        isLoginPending: state.Login.isLoginPending,
        isLoginSuccess: state.Login.isLoginSuccess,
        loginError: state.Login.loginError
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {};

}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
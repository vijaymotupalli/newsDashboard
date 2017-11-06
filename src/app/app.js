import  React from "react";
import AdminLogin from './containers/AdminLogin'
import SuperAdminLogin from './containers/SuperAdminLogin'
import Admin from './containers/Admin'
import SuperAdmin from './containers/SuperAdmin'
import { BrowserRouter,HashRouter ,Route ,Redirect} from 'react-router-dom'
class App extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div >
            <Route exact path="/" component={SuperAdminLogin} />
            {/*<Route exact path="/admin" component={AdminLogin} />*/}
            <Route  path="/dashboard" component={SuperAdmin} />
            {/*<Route  path="/admin/dashboard" component={Admin} />*/}
            </div>
    );
    }
}

export default App;

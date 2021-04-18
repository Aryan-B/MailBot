import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Component } from "react";
import RegisteredUsers from "./Components/user-list.component"
import EditUser from "./Components/edit-user.components"
import CreateUser from "./Components/create-user.component"

class App extends Component{
  render(){
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img src={'./logo192.png'} width="80" height="80" alt=""/>
            </a>
            <Link to="/" className="navbar-brand"><h1>NW+ App</h1></Link>
            <div  className="nav-collapse">
              <ul className="nav nav-bar mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Registered Users</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Users</Link>
                </li>
              </ul>
            </div>
          </nav>

        <Route path="/" exact component={RegisteredUsers} />
        <Route path="/delete/:id" component={EditUser}/>
        <Route path="/create" component={CreateUser}/>
        </div>
      </Router>
    );
  }
}

export default App;

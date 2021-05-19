import React, {Component} from 'react';
import axios from 'axios';

var status=[];
const Hackers = props=>(
    <tr>
        <td>{props.hacker.u_firstname}</td>
        <td>{props.hacker.u_lastname}</td>
        <td>{props.hacker.u_email}</td>
        <td>{props.hacker.u_major}</td>
        <td>{props.hacker.u_area}</td>
        <td>
            <button className="btn btn-danger" onClick={()=>deleteRow(props.hacker._id)}>Delete</button>
       </td>
       <td><input type="checkbox" onChange={()=>statusChange(props.hacker._id)}/></td>
        
    </tr>
)

export function deleteRow(id){
    axios.get('/users/delete/'+id);
}

export function statusChange(id){
    if(!status.includes(id))
        status.push(id);
    else{
        status=status.filter((function(value){ 
            return value !== id;
        }));
    }
    console.log(status);
}

export function sendMails(){
    if(status.length===0){return;}
    else{
        const obj = {
            ids: status
        }
        axios.post('/users/sendmail/',obj)
        .then(res=>console.log(res.data));
    }
}

export default class RegisteredUsers extends Component{
    constructor(props){
        super(props);
        this.state = { userList : []};
    }

    componentDidMount(){
        axios.get('/users/')
        .then(response => {
            this.setState({userList : response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    componentDidUpdate(){
        axios.get('/users/')
        .then(response => {
            this.setState({userList : response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }


    userList(){
        return this.state.userList.map(function(user,i){
            return <Hackers hacker={user} key={i}/>;
        });
    }

    render() {
        return(
            <div>
                <h3 >All Registered Users</h3>
                <table className="table table-stripped" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                            <th>Residence Address</th>
                            <th>Delete Record</th>
                            <th>Send Mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
            <button className="btn btn-primary" onClick={()=>sendMails()}>Send mail to selected Users</button>
            </div>
        )
    }
}
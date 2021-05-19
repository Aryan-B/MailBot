import React, {Component} from 'react';
import axios from 'axios';
export default class CreateUser extends Component{
    constructor(props){
        super(props);

        this.onChangeFN=this.onChangeFN.bind(this);
        this.onChangeLN=this.onChangeLN.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeMajor=this.onChangeMajor.bind(this);
        this.onChangeArea=this.onChangeArea.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            u_firstname:'',
            u_lastname:'' ,
            u_email:'' ,
            u_major:'',
            u_area:'',
            u_status: false
        }
    }



    onChangeFN(e){
        this.setState({
            u_firstname:e.target.value
        });
    }

    onChangeLN(e){
        this.setState({
            u_lastname:e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            u_email:e.target.value
        });
    }
    onChangeMajor(e){
        this.setState({
            u_major:e.target.value
        });
    }
    onChangeArea(e){
        this.setState({
            u_area:e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();


        console.log("submitted");
        console.log(`${this.state.u_firstname}`);
        console.log(`${this.state.u_lastname}`);
        console.log(`${this.state.u_email}`);
        console.log(`${this.state.u_major}`);
        console.log(`${this.state.u_area}`);
        console.log(`${this.state.u_status}`);

        const newUser = {
            u_firstname:this.state.u_firstname,
            u_lastname:this.state.u_lastname,
            u_email:this.state.u_email,
            u_major:this.state.u_major,
            u_area:this.state.u_area,
            u_status:this.state.u_status
        }

        axios.post('/users/register',newUser)
        .then(res => console.log(res.data));

        this.setState({
            u_firstname:'',
            u_lastname:'' ,
            u_email:'' ,
            u_major:'',
            u_area:'',
            u_status: false
        });
    }

    render() {
        return(
            <div style={{marginTop:20}}>
                <h3>Registration Form</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group ">
                        <label>First Name : </label>
                        <input  type='text' 
                                className="form-control" 
                                value={this.state.u_firstname} 
                                onChange={this.onChangeFN}/>
                    </div>
                    <div className="form-group ">
                        <label>Last Name : </label>
                        <input  type='text' 
                                className="form-control" 
                                value={this.state.u_lastname} 
                                onChange={this.onChangeLN}/>
                    </div>
                    <div className="form-group">
                        <label>Email : </label>
                        <input  type='text' 
                                className="form-control" 
                                value={this.state.u_email} 
                                onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Contact Number : </label>
                        <input  type='tel' 
                                className="form-control" 
                                value={this.state.u_major} 
                                onChange={this.onChangeMajor}/>
                    </div>
                    <div className="form-group">
                        <label>Current Address : </label>
                        <input  type='text' 
                                className="form-control" 
                                value={this.state.u_area} 
                                onChange={this.onChangeArea}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register User" className="btn btn-primary"/>
                    </div>
                </form>
                
            </div>
        )
    }
}
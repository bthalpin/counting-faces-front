import React from 'react';
import '../Navigation/Navigation.css';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            alreadyRegistered: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name:event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email:event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password:event.target.value})
    }

    onSubmit = () => {
        console.log('test')
        if (this.state.password.length<8){
            this.setState({alreadyRegistered:'Password must be 8 characters long'})
            return
        }else{
            this.setState({alreadyRegistered:''})
        }
        const emailPattern = /\S+@\S+\.\S+/
        if (emailPattern.test(this.state.email)){
        fetch("https://secure-anchorage-68689.herokuapp.com/register",{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                console.log(user)
                this.props.loadUser(user)
                this.props.onRouteChange('home')
                // this.setState({alreadyRegistered:''})
            }else {
                this.setState({alreadyRegistered:'Unable to Register'})
            }
        }).catch(err => console.log(err))
    }else{
        this.setState({alreadyRegistered:'Enter a valid email address'})
    }
    }
    render() {
        return (
            <div>
            <article className="br3 formWindow ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                            <input 
                            className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange = {this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange = {this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange = {this.onPasswordChange}
                            />
                        </div>
                       </fieldset>
                        <div className="">
                        <input 
                            onClick = {this.onSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                            type="submit" 
                            value="Register"
                        />
                        </div>
                    </div>
                </main>
                
                
            </article>
            <div className = "registerError">{this.state.alreadyRegistered}</div>
            </div>
        );
    }
    
}

export default Register;
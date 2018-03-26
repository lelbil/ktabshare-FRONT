import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import TextField from 'material-ui/TextField'
import { blue500 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton';
import joi from 'joi'
import _ from 'lodash'

const validationMapping = {
    email: joi.string().email().max(255).min(3).required(),
    username: joi.string().max(55).min(3).required(),
    password: joi.string().min(6).max(255).required(),
    passwordConf: joi.string().valid(joi.ref('password')).required(),
}

const api_uri = process.env.REACT_APP_API_URI || "localhost:3005"

const userRegistrationValidation = joi.object().keys(validationMapping)

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            anchorEl: null,
            username: null,
            email: null,
            password: null,
            passwordConf: null,
            errors: {
                username: null,
                email: null,
                password: null,
                passwordConf: null,
            },
            valid: false,
            snackBarOpen: false,
        }
    }

    componentWillReceiveProps(props) {
        if (props.anchorEl) this.setState({anchorEl: props.anchorEl})
        if (props.isOpen) this.setState({open: true})
    }

    onRegister = this.props.onRegister

    signUp = () => {
        const { email, username, password, passwordConf } = this.state
        const body = {
            email, username, password, passwordConf,
        }

        fetch( api_uri + '/users', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(response => {
            if (response.status === 201) {
                this.setState({ snackBarOpen: true })
                this.closePopover()
                this.onRegister()
            }
            else {
                alert('there has been an error, no user created!')
            }
        })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    closingSnackBar = () => {
        this.setState({snackBarOpen: false})
    }

    closePopover = () => {
        this.setState({ open: false })
        this.props.close()
    }

    change = e => {
        const { name, value } = e.target
        const newStateObject = {}
        newStateObject[name] = value
        const newErrorObject = {}
        if (name === "passwordConf") {
            newErrorObject["passwordConf"] = (value !== this.state.password) ? "Passwords don't match" : null
        } else {
            newErrorObject[name] = joi.validate(value, validationMapping[name]).error && joi.validate(value, validationMapping[name]).error.message
            if (name === "password") {
                    newErrorObject["passwordConf"] = (value !== this.state.passwordConf) ?  "Passwords don't match" : null
            }
        }
        this.setState(Object.assign(newStateObject, {errors: Object.assign(this.state.errors, newErrorObject)}),() => {
            const validationObject = _.pick(this.state, ['username', 'email', 'password', 'passwordConf',])
            const valid = ! joi.validate(validationObject, userRegistrationValidation).error
            this.setState({valid})
        })
    }

    render () {
        return <React.Fragment>
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                onRequestClose={this.closePopover}
                animation={PopoverAnimationVertical}
            >
                <div style={{ width: "300px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <form style={{ display: "flex", flexDirection: "column", width: "90%", marginBottom: "20px", }}>
                        <TextField errorText={this.state.errors.email} onChange={this.change} value={this.state.email} fullWidth={true} name="email" floatingLabelText={"Email"} floatingLabelFocusStyle={{color: blue500}}/>
                        <TextField errorText={this.state.errors.username} onChange={this.change} value={this.state.username} fullWidth={true} name="username" floatingLabelText={"Username"} floatingLabelFocusStyle={{color: blue500}}/>
                        <TextField errorText={this.state.errors.password} onChange={this.change} type="password" value={this.state.password} fullWidth={true} name="password" floatingLabelText={"Password"} floatingLabelFocusStyle={{color: blue500}}/>
                        <TextField errorText={this.state.errors.passwordConf} onChange={this.change} type="password" value={this.state.passwordConf} fullWidth={true} name="passwordConf" floatingLabelText={"Confirm Password"} floatingLabelFocusStyle={{color: blue500}}/>
                        <RaisedButton onClick={this.signUp} style={{margin: "10px",}} primary={true} disabled={!this.state.valid}>Register</RaisedButton>
                    </form>
                </div>
            </Popover>
            <Snackbar
                open={this.state.snackBarOpen}
                message="User registered. Welcome aboard! :)"
                autoHideDuration={4000}
                onRequestClose={this.closingSnackBar}
            />
        </React.Fragment>
    }

}

export default Register
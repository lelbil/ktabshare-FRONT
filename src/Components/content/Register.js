import React, { Component } from 'react'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import TextField from 'material-ui/TextField'
import { blue500 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton';

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
        }
    }

    componentWillReceiveProps(props) {
        if (props.isOpen) this.setState({open: true})
        if (props.anchorEl) this.setState({anchorEl: props.anchorEl})
    }

    closePopover = () => {
        this.setState({ open: false })
        this.props.close()
    }

    render () {
        return <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.closePopover}
            animation={PopoverAnimationVertical}
        >
            <form style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                <TextField value={this.state.email} fullWidth={true} name="email" floatingLabelText={"Email"} floatingLabelFocusStyle={{color: blue500}}/>
                <TextField value={this.state.username} fullWidth={true} name="username" floatingLabelText={"Username"} floatingLabelFocusStyle={{color: blue500}}/>
                <TextField type="password" value={this.state.password} fullWidth={true} name="password" floatingLabelText={"Password"} floatingLabelFocusStyle={{color: blue500}}/>
                <TextField type="password" value={this.state.passwordConf} fullWidth={true} name="passwordConf" floatingLabelText={"Confirm Password"} floatingLabelFocusStyle={{color: blue500}}/>
                <RaisedButton primary={true}>Register</RaisedButton>
            </form>
        </Popover>
    }

}

export default Register
import React, { Component } from 'react'
import SideControls from './SideControls'
import BookList from './BookList'

const styles = {
    box2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
}

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: 'ERZ',
        }
    }

    handleChange = (field, value) => {
        this.setState({query: value})
    }


    render = () => (
        <div id={"content"}>
            <div id={"box2"} className={"box"} style={styles.box2} >
                <SideControls handleChange={this.handleChange}/>
            </div>
            <div id={"box3"} className={"box"}>
                <BookList query={this.state.query}/>
            </div>
        </div>
        )
}

export default Content
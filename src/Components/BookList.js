import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import './BookList.css'

const data = [
    {

    }
]

class BookList extends Component {
    render = () => (
        <div id="bookContainer">
            <Paper className="bookPanel" zDepth={3}>
                <div className="bookPanelContent">
                    <img className="bookCover" alt="A Song Of Ice And Fire: A Feast Of Crows" src="https://images-na.ssl-images-amazon.com/images/I/71nJQs9rawL.jpg"></img>
                    <div className="bookInfo">
                        <h3 className="bookTitle">A Song Of Ice And Fire</h3>
                        <br/>
                        <h5 className="authorName">J.K Rowling</h5>
                    </div>
                    <div className="buttons">
                        <RaisedButton backgroundColor="rgb(237, 218, 220)">BUY</RaisedButton>
                        <RaisedButton>DONATE</RaisedButton>
                    </div>
                </div>
            </Paper>
            <Paper className="bookPanel" zDepth={3}>
                <h1>Test</h1>
            </Paper>
            <Paper className="bookPanel" zDepth={3}>
                <h1>Test</h1>
            </Paper>
            <Paper className="bookPanel" zDepth={3}>
                <h1>Test</h1>
            </Paper>
            <Paper className="bookPanel" zDepth={3}>
                <h1>Test</h1>
            </Paper>
            <Paper className="bookPanel" zDepth={3}>
                <h1>Test</h1>
            </Paper>
            <Paper className="bookPanel" zDepth={3}>
                <h1>Test</h1>
            </Paper>
            <Paper className="bookPanel" zDepth={3}>
                <h1>Test</h1>
            </Paper>
        </div>
    )
}

export default BookList
import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import { ChevronLeft, ChevronRight } from 'material-ui-icons'

import './Pagination.css'

class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        const { page, perPage, count, hasNextPage } = this.props
        const howManyPages = count / perPage

        return (
            <div>
                <IconButton><ChevronLeft className="iconButton"/></IconButton>
                <a>1</a>
                <a>2</a>
                <span> . . . </span>
                <a>{page}</a>
                <span> . . . </span>
                <a>{Math.floor(howManyPages)}</a>
                <a>{Math.floor(howManyPages) + 1}</a>
                <IconButton><ChevronRight  className="iconButton"/></IconButton>
                {/*
                <a></a>
                { (page != 1)?  "<" : ""}
                {"1"}

                {Math.floor(howManyPages) + 1}
                {">"}
                */}
            </div>
        )
    }
}

export default Pagination
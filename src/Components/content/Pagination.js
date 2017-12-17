import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import { ChevronLeft, ChevronRight } from 'material-ui-icons'

import './Pagination.css'

class Pagination extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1
        }
    }

    pageChange = (page) => {
        this.setState({
            page
        })
        this.props.pageChange(page)
    }

    render() {

        const { page, perPage, count, hasNextPage } = this.props
        const howManyPages = Math.floor(count / perPage)

        return (
            <div>
                <IconButton onClick={() => {this.props.pageChange(1)}}><ChevronLeft className="iconButton"/></IconButton>
                <a onClick={() => {this.props.pageChange(1)}}>1</a>
                <a onClick={() => {this.props.pageChange(2)}}>2</a>
                <span> . . . </span>
                <a onClick={() => {this.props.pageChange(page)}}>{page}</a>
                <span> . . . </span>
                <a onClick={() => {this.props.pageChange(howManyPages)}}>{howManyPages}</a>
                <a onClick={() => {this.props.pageChange(howManyPages + 1)}}>{Math.floor(howManyPages) + 1}</a>
                <IconButton onClick={() => {this.props.pageChange(page + 1)}}><ChevronRight  className="iconButton"/></IconButton>
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
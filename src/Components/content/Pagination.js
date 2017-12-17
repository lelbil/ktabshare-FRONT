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
        const howManyPages = Math.floor(count / perPage) + 1

        return (
            <div>
                <IconButton disabled={page === 1} onClick={() => {this.props.pageChange(page - 1)}}><ChevronLeft className="iconButton"/></IconButton>
                { howManyPages >= 2 && page > 1 && <a disabled={page === 1} onClick={() => {this.props.pageChange(1)}}>1</a>}
                { howManyPages >= 3 && page > 2 && <a onClick={() => {this.props.pageChange(2)}}>2</a>}
                { howManyPages >= 4 && page >= 4 && <span> . . . </span>}
                <a id="currentPage">{page}</a>
                { howManyPages >= 4 && page < howManyPages - 2 && <span> . . . </span>}
                {page < (howManyPages - 1) && <a onClick={() => {this.props.pageChange(howManyPages - 1)}}>{howManyPages - 1}</a>}
                {page < howManyPages && <a onClick={() => {this.props.pageChange(howManyPages)}}>{howManyPages}</a>}
                <IconButton disabled={!hasNextPage} onClick={() => {this.props.pageChange(page + 1)}}><ChevronRight  className="iconButton"/></IconButton>
            </div>
        )
    }
}

export default Pagination
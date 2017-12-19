import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { ChevronLeft, ChevronRight } from 'material-ui-icons'

import './Pagination.css'

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around"
    },
    perPage: {
        display: "flex",
        flexDirection: "row"
    }
}

class Pagination extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            perPage: 10,
        }
    }

    pageChange = (page, perPage) => {
        this.setState({
            page, perPage
        })
        this.props.pageChange(page, perPage)
    }

    render() {

        const { page, perPage, count, hasNextPage } = this.props
        const howManyPages = Math.floor(count / perPage) + 1

        return (
            <div style={styles.root}>
                <span>
                    <IconButton disabled={page === 1} onClick={() => {this.pageChange(page - 1, this.state.perPage)}}><ChevronLeft className="iconButton"/></IconButton>
                    { howManyPages >= 2 && page > 1 && <a disabled={page === 1} onClick={() => {this.pageChange(1, this.state.perPage)}}>1</a>}
                    { howManyPages >= 3 && page > 2 && <a onClick={() => {this.pageChange(2, this.state.perPage)}}>2</a>}
                    { howManyPages >= 4 && page >= 4 && <span> . . . </span>}
                    <a id="currentPage">{page}</a>
                    { howManyPages >= 4 && page < howManyPages - 2 && <span> . . . </span>}
                    {page < (howManyPages - 1) && <a onClick={() => {this.pageChange(howManyPages - 1, this.state.perPage)}}>{howManyPages - 1}</a>}
                    {page < howManyPages && <a onClick={() => {this.pageChange(howManyPages, this.state.perPage)}}>{howManyPages}</a>}
                    <IconButton disabled={!hasNextPage} onClick={() => {this.pageChange(page + 1, this.state.perPage)}}><ChevronRight  className="iconButton"/></IconButton>
                </span>
                <span style={{...styles.perPage, marginTop: "15px"}} >
                    <span>Per Page: </span>
                    <RadioButtonGroup style={styles.perPage} valueSelected={this.state.perPage}>
                        <RadioButton style={{display:'block', width: ''}}
                                     onClick={() => {this.pageChange(1, 10)}}
                            label="10" value={10}
                        />
                        <RadioButton style={{display:'block', width: ''}}
                                     onClick={() => {this.pageChange(1, 20)}}
                            label="20" value={20}
                        />
                        <RadioButton style={{display:'block', width: ''}}
                                     onClick={() => {this.pageChange(1, 50)}}
                            label="50" value={50}
                        />
                        <RadioButton style={{display:'block', width: ''}}
                                     onClick={() => {this.pageChange(1, 100)}}
                            label="100" value={100}
                        />
                    </RadioButtonGroup>

                </span>
            </div>
        )
    }
}

export default Pagination
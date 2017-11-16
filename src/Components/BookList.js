import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'

const data = [
    {

    }
]


class BookList extends Component {
    render = () => (
            <div>
                <GridList cellHeight={280} cellWidth={80}>
                    <GridTile
                        key={"Key"}
                        title={"Title"}
                        subtitle={"SubTitle"}
                    >
                        <img src={"http://lorempixel.com/400/200/"} />
                    </GridTile>
                    <GridTile
                        key={"Key"}
                        title={"Title2"}
                        subtitle={"SubTitle2"}
                    >
                        <img src={"http://lorempixel.com/500/200/"} />
                    </GridTile>
                    <GridTile
                        key={"Key"}
                        title={"titre"}
                        subtitle={"Sous-titre"}
                    >
                        <img src={"http://lorempixel.com/500/300/"} />
                    </GridTile>
                    <GridTile
                        key={"Key"}
                        title={"عنوان"}
                        subtitle={"عنوان ثاني"}
                    >
                        <img src={"http://lorempixel.com/500/400/"} />
                    </GridTile>
                </GridList>
            </div>
    )
}

export default BookList
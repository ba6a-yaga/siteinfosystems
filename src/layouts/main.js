import React from 'react'
import PropTypes from 'prop-types';

const Main = props => (
    <React.Fragment>
        <head>
            <title>{props.title}</title>
            {/*<link rel="stylesheet" type="text/css" href={'/static/'+props.styleName} />*/}
        </head>
        {props.children}
    </React.Fragment>
)

Main.defaultProps = {
    title: "",
}
Main.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
}

export default Main
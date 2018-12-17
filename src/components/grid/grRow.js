import React from 'react'
import Radium from 'radium'

const Row = (props) => {
    let style = {
        grRow: {
            display: 'flex',
            flexDirection: 'row',
        }
    }

    if (props.styleProperties !== null) {
        style.grRow = Object.assign({}, style.grRow, props.styleProperties)
    }

    return (
        <div onClick={props.onClick} className={props.className} id={props.id} style={style.grRow}>
            {props.children}
        </div>
    )
}

export default Radium(Row)
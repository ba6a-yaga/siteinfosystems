import React from 'react'
import "./index.scss"

const Header = props => {
    return (
        <header className="App-header" id={'header'}>
            <h1 className="title">{props.title}</h1>
            <p className="description">{props.desc}</p>
            <p className="btn-desc">Подробнее</p>
            <div className='btn-scroll'>
                <div onClick={(e) => {props.handlePageClick(e, "solutions"); e.preventDefault(); return false;}}>{props.btnTitle}</div>
            </div>
        </header>
    )
}

export default Header
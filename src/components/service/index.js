import React from 'react'
import "./index.scss"

const ServiceTile = props => {
    return (
        <div className={props.className}>
            <div className={
                Boolean(props.iconTop)?'serviceWithTopIcon':
                    Boolean(props.iconLeft)?'serviceWithLeftIcon':
                        'service'
            }>
                {
                    Boolean(props.iconTop) ?
                        <div className={'iconTop icon'+props.number} /> :
                            null
                }
                {
                    Boolean(props.iconLeft) ?
                        <div className={'iconLeft icon'+props.number} /> :
                            null
                }
                <div className='numberBlock' style={{color:props.titleColor}}>{props.number}</div>
                <h3 className='title' style={{color:props.titleColor}}>{props.title}</h3>
                { typeof props.desc !== 'undefined' ? <p className='desc'>{props.desc}</p> : null }
                {
                    typeof props.list !== 'undefined' ?
                        <ul className='list'>
                            {props.list.map((t,k) => {
                                return <li key={k}>{t}</li>
                            })}
                        </ul>
                        : null
                }
            </div>
        </div>
    )
}

export default ServiceTile
import React from 'react'
import "./index.scss"
import ServiceTile from "../../components/service";

const Solutions = props => {
    return (
        <div className='App-solutions' id='solutions'>
            <div className='imgBackBlock' />
            <ServiceTile className='titleService' number='01' title={props.title} desc={props.desc} />
            {
                props.info.length > 0
                ?
                    <div className='solutions-info'>
                        {props.info.map((info,k)=>{
                        return(
                            <div className='info' key={k}>
                                <div className={k === 0 ? 'solutions-info-icon'+1 : 'solutions-info-icon'+2} />
                                <div className='solutions-info-title'>{info.title}</div>
                                <div className='solutions-info-desc'>
                                    {info.desc.map((text,k)=>{
                                        return (<React.Fragment><span key={k}>{text}</span><br /></React.Fragment>)
                                    })}
                                </div>
                            </div>
                        )
                        })}
                    </div>
                :
                    null
            }
        </div>
    )
}

export default Solutions
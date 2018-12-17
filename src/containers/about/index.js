import React from 'react'
import "./index.scss"
import ServiceTile from "../../components/service";

const About = props => {
    return (
        <div className='App-about' id='about'>
            <div className='logoBlock'>ИНФОРМАЦИОННЫЕ СИСТЕМЫ</div>
            <ServiceTile className='titleService' number='02' title={props.title} desc={props.desc} />
            {
                props.info.length > 0
                    ?
                    <div className='about-info'>
                        {props.info.map((info,k)=>{
                            return(
                                <div className='info' key={k}>
                                    <div className='about-info-title'>{info.title}</div>
                                    <div className='about-info-desc'>
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
            {
                props.license.length > 0
                ?
                    <React.Fragment>
                        <div className='about-license'>
                            {props.license.map((text,k)=>{
                                return(
                                    <div className='info' key={k}>
                                        <div className='about-license-title'>{text}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='imgBackBlock' />
                    </React.Fragment>
                :
                    null
            }
        </div>
    )
}

export default About
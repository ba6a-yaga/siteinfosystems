import React from 'react'
import "./index.scss"
import ServiceTile from "../../components/service";

const Services = props => {
    return (
        <div className='App-services' id='services'>
            {
                Boolean(props.tiles) ?
                    props.tiles.map((p,k)=>{
                    let bool = k+1 === props.tiles.length
                    return <ServiceTile
                                key={k}
                                iconTop={bool}
                                iconLeft={!bool}
                                className={'titleService'+k}
                                number={4+k}
                                title={p.title}
                                desc={p.desc}
                                list={p.list}
                    />
                })
                : null
            }
        </div>
    )
}

export default Services
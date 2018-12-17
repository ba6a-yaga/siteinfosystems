import React from 'react'
import "./index.scss"
import ServiceTile from "../../components/service"

class Development extends React.Component {
    state = {
        activeElement: 0,
        enableMore: false
    }

    render() {
        let activeElement = this.state.activeElement
        let enableMore = this.state.enableMore
        const handlerMore = () => {
            if (!this.state.enableMore) {
                this.setState({
                    enableMore: true
                })
            } else {
                this.setState({
                    enableMore: false
                })
            }
        }

        return (
            <div className='App-development' id='development'>
                <div className='logoBlock'>ИНФОРМАЦИОННЫЕ СИСТЕМЫ</div>
                <ServiceTile className='titleService' number='03' title={this.props.title} desc={this.props.desc} />
                {
                    this.props.info.length > 0
                        ?
                        <React.Fragment>
                            <div className='development-info'>
                                {this.props.info.map((info, k) => {
                                    return (
                                        <div className={k === activeElement ? 'info active' : 'info'}
                                             key={k}
                                             id={"development-info" + (k + 1)}
                                             onClick={
                                                 (e) => {
                                                     let currentActiveElement = document.getElementsByClassName("info active")
                                                     if (typeof currentActiveElement !== 'undefined') {
                                                         let id = e.target.parentNode.id
                                                         if (id === '') {
                                                             id = e.target.id
                                                         }
                                                         currentActiveElement[0].classList.remove("active")
                                                         let newActiveElement = document.getElementById(id)
                                                         newActiveElement.classList.add("active")
                                                         this.setState({
                                                             activeElement: (id.slice(-1) - 1),
                                                         })
                                                     }
                                                 }
                                             }>
                                            <div className={'development-info-icon' + (k + 1)}/>
                                            <div className='development-info-title'>{info.title}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            {this.props.info.map((info, k) => {
                                return (
                                    activeElement === k
                                        ?
                                        <React.Fragment key={k}>
                                            <div id='development-info-desc'>
                                                {
                                                    info.desc.map((d, k) => {
                                                        return (
                                                            <p key={k}>{d}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                            {
                                                enableMore
                                                    ?
                                                    <div id='development-info-more' className='enable' onClick={handlerMore}>
                                                        {info.more.substr(0, 200)}
                                                    </div>
                                                    :
                                                    <div id='development-info-more' className='disable' onClick={handlerMore}>
                                                        {info.more.substr(0, Math.round(info.more.length / 5)) + '...'}
                                                    </div>
                                            }
                                        </React.Fragment>
                                        :
                                        null
                                )
                            })}
                        </React.Fragment>
                        :
                        null
                }
            </div>
        )
    }
}

export default Development
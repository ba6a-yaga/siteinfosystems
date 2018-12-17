import React from 'react'
import "./index.scss"
import ServiceTile from "../../components/service";
import icon1 from "../../static/resources/icon11.svg"
import icon2 from "../../static/resources/icon12.svg"
import icon3 from "../../static/resources/icon13.svg"
import icon4 from "../../static/resources/icon14.svg"
import icon5 from "../../static/resources/icon15.svg"
import icon6 from "../../static/resources/icon16.svg"

class Features extends React.Component {

    state = {
        activeBlock:3
    }

    handleClickOnIcon = (e) => {
        this.setState({
            activeBlock:parseInt(e.target.id)
        })
    }

    render() {
        let ico1 = icon1,
            ico2 = icon2,
            ico3 = icon3,
            ico4 = icon4,
            ico5 = icon5,
            ico6 = icon6;

        return (
            <div className='App-features' id='features'>
                <ServiceTile titleColor='#FFFFFF' className='titleService' number='07' title={this.props.title}
                             desc={this.props.desc}/>
                <div className='roundBack'>
                    {
                        Boolean(this.props.list) ?
                            this.props.list.map((l, k) => {
                                if (k + 1 === this.props.list.length) {
                                    return (
                                        <div id={k} key={k} className={k === this.state.activeBlock ? 'round roundActive _'+ (k + 1) : 'round _'+ (k + 1)} onClick={this.handleClickOnIcon}>
                                            <img id={k} alt='' src={eval('ico' + (k + 1))}/>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <React.Fragment key={k}>
                                            <div id={k} className={k === this.state.activeBlock ? 'round roundActive _'+ (k + 1) : 'round _'+ (k + 1)} onClick={this.handleClickOnIcon}>
                                                <img id={k} alt='' src={eval('ico' + (k + 1))}/>
                                            </div>
                                            <div className={(k % 2 > 0 ? 'line2' : 'line1') + ' _' + (k + 1)}/>
                                        </React.Fragment>
                                    )
                                }
                            })
                            : null
                    }
                </div>
                <div className='descList'>
                    {
                        Boolean(this.props.list) ?
                            this.props.list.map((l, k) => {
                                return (
                                    <div className={k === this.state.activeBlock ? 'descBlock active' : 'descBlock'}
                                         key={k}>
                                        <div className='line'/>
                                        <div className='number'>{k + 1}</div>
                                        <div className='title'>{l.desc[0]}</div>
                                        <div className={k === this.state.activeBlock ? 'more':'more none'}>{l.desc[1]}</div>
                                    </div>
                                )
                            })
                            : null
                    }
                </div>
            </div>
        )
    }
}

export default Features
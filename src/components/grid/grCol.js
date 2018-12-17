import React from 'react'

class Col extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            style: {
            }
        }
    }

    updateStyle = () => {
        const resolution = {
            mb:800,
            tb:1024,
            dt:1366,
            hd:1920,
        }
        const width = window.innerWidth;
        switch(true) {
            case width <= resolution.mb:
                this.setState({
                    style:{
                        // position:'relative',
                        display: (this.props.mb === 0) ? 'none':'flex',
                        flexGrow: this.props.mb,
                        flexBasis: '0px',
                    }
                })
                break
            case width <= resolution.tb:
                // console.log()
                this.setState({
                    style:{
                        // position:'relative',
                        display: (this.props.tb === 0) ? 'none':'flex',
                        flexGrow: this.props.tb,
                        flexBasis: '0px',
                    }
                })
                break
            case width <= resolution.dt:
                this.setState({
                    style:{
                        // position:'relative',
                        display: (this.props.dt === 0) ? 'none':'flex',
                        flexGrow: this.props.dt,
                        flexBasis: '0px',
                    }
                })
                break
            default:
                this.setState({
                    style:{
                        // position:'relative',
                        display: (this.props.hd === 0) ? 'none':'flex',
                        flexGrow: this.props.hd,
                        flexBasis: '0px',
                    }
                })
                break


        }
    }

    componentWillMount() {
        this.updateStyle()
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateStyle)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateStyle)
    }

    render() {
        return (
            <div className={this.props.className} id={this.props.id} style={{...this.state.style,...this.props.styleProperties}}>
                {this.props.children}
            </div>
        )
    }
}

export default Col
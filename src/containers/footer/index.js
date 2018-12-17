import React from 'react'
import icon_contact from "../../static/resources/icon_contacts.svg";
import './index.scss';
// import firebase from '../../firebase'

class Contacts extends React.Component {

    state = {
        message: this.props.form.inputMessage,
        name:this.props.form.inputName,
        phone:'+7 (___) ___-__-__',
        numbers:[],
        isValid:{
            message:false,
            name:false,
            phone:false,
        },
    }

    submitForm = () => {
        let isValid = true
        Object.keys(this.state.isValid).forEach((k)=>{
            // console.log("key:",k)
            if (!this.state.isValid[k]) {
                isValid = false
                // Добавляем стиль
                switch(k) {
                    case "name":
                        // console.log("name - is not valid")
                        let inputName = document.getElementById('inputName')
                        inputName.classList.add("isNotValid")
                        break
                    case "message":
                        // console.log("email - is not valid")
                        let inputMessage = document.getElementById('inputMessage')
                        inputMessage.classList.add("isNotValid")
                        break
                    default:
                        // console.log("phone - is not valid")
                        let inputPhone = document.getElementById('inputPhone')
                        inputPhone.classList.add("isNotValid")
                }
            }
        })
        if (isValid) {
            // const db = firebase.firestore()
            // const settings = {timestampsInSnapshots: true}
            // db.settings(settings)
            // db.collection('message').add({
            //     name:this.state.name,
            //     message:this.state.message,
            //     phone:this.state.phone,
            // })
            //     .then(
            //         console.log("Спасибо! Мы скоро свяжемся с вами =)")
            //     )
        }

    }

    handleInputName = (e) => {
        let inputName = document.getElementById('inputName');
        const alphaExp = /^[a-zA-Zа-яА-Я]+$/;
        if(e.target.value.match(alphaExp)){
            this.setState({
                name:e.target.value,
                isValid:{
                    name:true,
                    message:this.state.isValid.message,
                    phone:this.state.isValid.phone,
                }
            })
            inputName.classList.remove("isNotValid")
        } else {
            this.setState({
                name:e.target.value,
                isValid:{
                    name:false,
                    message:this.state.isValid.message,
                    phone:this.state.isValid.phone,
                }
            })
            inputName.classList.add("isNotValid")
        }
    }

    handleInputMessage = (e) => {
        let inputName = document.getElementById('inputMessage');
        if(e.target.value !== ""){
            this.setState({
                message:e.target.value,
                isValid:{
                    message:true,
                    name:this.state.isValid.name,
                    phone:this.state.isValid.phone,
                }
            })
            inputName.classList.remove("isNotValid")
        } else {
            this.setState({
                message:e.target.value,
                isValid:{
                    message:false,
                    name:this.state.isValid.name,
                    phone:this.state.isValid.phone,
                }
            })
            inputName.classList.add("isNotValid")
        }
    }

    changeTemplate = (n) => {
        let template = `+7 (___) ___-__-__`
        // console.log("n",n)
        if (n.length <= 3) {
            template = `+7 (${n.join("")}) ___-__-__`
            // console.log(template)
        } else if (n.length <= 6) {
            template = `+7 (${n.slice(0,3).join("")}) ${n.slice(3,6).join("")}-__-__`
            // console.log(template)
        } else if (n.length <= 8) {
            template = `+7 (${n.slice(0,3).join("")}) ${n.slice(3,6).join("")}-${n.slice(6,8).join("")}-__`
            // console.log(template)
        } else if (n.length <= 10) {
            template = `+7 (${n.slice(0,3).join("")}) ${n.slice(3,6).join("")}-${n.slice(6,8).join("")}-${n.slice(8,10).join("")}`
            // console.log(template)
        }
        this.setState({
            phone:template,
            numbers:n,
        })
    }

    handleInputPhone = (e) => {
        let inputPhone = document.getElementById('inputPhone');
        const numbers = this.state.numbers
        const exp = /^[0-9]*$/
        const lastValue = e.target.value.substr(e.target.value.length-1)

        if(lastValue.match(exp) && numbers.length < 10){
            numbers.push(lastValue)
            this.changeTemplate(numbers)
            // console.log(lastValue)

            inputPhone.classList.add("isNotValid")
        } else if (numbers.length < 10) {
            numbers.pop()
            this.changeTemplate(numbers)

            inputPhone.classList.add("isNotValid")
        } else if (numbers.length === 10) {
            numbers.pop()
            this.changeTemplate(numbers)

            inputPhone.classList.add("isNotValid")
        }

        if (numbers.length === 10) {
            this.setState({
                isValid:{
                    phone:true,
                    name:this.state.isValid.name,
                    message:this.state.isValid.message,
                }
            })
            inputPhone.classList.remove("isNotValid")
        }
    }

    handlePhoneFocus(e) {
        let input = e.target;
        let position = e.target.value.length
        setTimeout((input, position) => {
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(position, position);
            } else if (input.createTextRange) {
                let range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', position);
                range.moveStart('character', position);
                range.select();
            }
        }, 20, input, position)

    }

    render() {
        return (
            <footer className="App-footer page" id={'footer'}>
                <div className="area">
                    <div className="footer form">
                        <h2 className={'title'} dangerouslySetInnerHTML={{__html: this.props.title}}/>
                        <div className={'contact-form'}>
                            <input className={'name'} id="inputName"
                                   type={'text'}
                                   placeholder={this.state.name}
                                   onInput={this.handleInputName}
                            />
                            <input className="phone inputPhone" id="inputPhone"
                                   type={'text'}
                                   placeholder={this.props.inputPhone}
                                   onInput={this.handleInputPhone}
                                   value={this.state.phone}
                                   onSelect={this.handlePhoneFocus.bind(this)}
                            />
                            <input className={'message'} id="inputMessage"
                                   type={'text'}
                                   placeholder={this.state.message}
                                   onInput={this.handleInputMessage}
                            />
                            <button className={'button-send'} onClick={this.submitForm}>
                                {this.props.form.btnSend}
                            </button>
                        </div>
                        <div className={'cutaway'}>
                            <img src={icon_contact} alt=""/>
                            <div className={'contacts'}>
                                <span>{this.props.contacts.title}</span>
                                <span>{this.props.contacts.phone}</span>
                                <span>{this.props.contacts.email.title}<a href={"mailto:" + this.props.contacts.email.value}
                                                                     target="_top">{this.props.contacts.email.value}</a></span>
                            </div>
                        </div>
                        <div
                            id={'move-to-top'}
                            className={'xs-hidden'}
                            onClick={(e) => {
                                this.props.goToPage(e, 'header');
                                e.preventDefault();
                                return false;
                            }}/>
                        <p className={'privacy'}><a target="_blank" rel="noopener noreferrer"
                                                    href={this.props.policy.source}>{this.props.policy.title}</a></p>
                        <p className={'copyright'} dangerouslySetInnerHTML={{__html: this.props.copyright}}/>

                    </div>

                    {/*<div id="messageSuccess" className="modalForm hide">*/}
                        {/*<div className="messageTitle">*/}
                            {/*Спасибо за обращение!*/}
                        {/*</div>*/}
                        {/*<div className="messageDesc">*/}
                            {/*Мы скоро свяжемся с вами =)*/}
                        {/*</div>*/}
                    {/*</div>*/}

                </div>
            </footer>
        )
    }
}

export default Contacts
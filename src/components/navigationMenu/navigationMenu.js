import React, {Component} from 'react';
import './navigationMenu.scss';

class NavigationMenu extends Component {
    pages = {
        'header': {index:0, menuIndex:0},
        'solutions':{index:1, menuIndex:0},
        'about':{index:2, menuIndex:1},
        'development':{index:3, menuIndex:0},
        'services':{index:4, menuIndex:0},
        'features':{index:5, menuIndex:0},
        'clients':{index:6, menuIndex:2},
        'footer':{index:7, menuIndex:3}
    };

    setActivePage(id) {
        let elems = document.getElementsByClassName('menu')[0].children[1].children
        for (let i = 0; i < elems.length; i++) {
            elems[i].children[0].classList.remove('active')
        }

        if (this.pages.hasOwnProperty(id)) {
            let page = this.pages[id];
            if (elems[page.menuIndex] !== undefined) {
                elems[page.menuIndex].children[0].classList.add('active');
            }
        }
    }

    menuOpened = false;

    toggleIsOpen() {
        let element = document.getElementsByClassName("menu-icon")[0];
        element.classList.toggle("is-open");

        let menu = document.getElementsByClassName("menu-grid")[0];
        menu.classList.toggle("opened")
        this.menuOpened = menu.classList.contains("opened");
    }

    hideMenu() {
        let element = document.getElementsByClassName("menu-icon")[0];
        element.classList.remove("is-open");

        let menu = document.getElementsByClassName("menu-grid")[0];
        menu.classList.remove("opened")
        this.menuOpened = false;
    }

    toggleDefault() {
        let element = document.getElementsByClassName("menu-grid")[0];
        element.classList.remove('invert')
    }

    toggleInvert() {
        let element = document.getElementsByClassName("menu-grid")[0];
        element.classList.add('invert')
    }

    onMenuClick(e, id) {
        this.props.handlePageClick(e, id)
        this.hideMenu();
        e.preventDefault();
        return false;
    }

    render() {
        return (
            <nav>
                <div className="area">
                    <div className="menu-grid">
                        <div className='App-logo' onClick={(e) => {return this.onMenuClick(e, 'header');}} />
                        <div className={'menu'}>
                            <div className='App-logo' onClick={(e) => {this.onMenuClick(e, 'header');}} />
                            <ul>
                                {this.props.elements.length > 0
                                    ?
                                    this.props.elements.map((element,k)=>{
                                        return <li key={k}><a href={"#"+element.href} onClick={(e) => {this.onMenuClick(e, element.href);}}>{element.title}</a></li>
                                    })
                                    :
                                    null
                                }
                            </ul>
                        </div>
                        <button className="menu-icon cross" onClick={this.toggleIsOpen.bind(this)}><span></span></button>
                    </div>
                </div>
            </nav>

        );
    }
}

export default NavigationMenu;

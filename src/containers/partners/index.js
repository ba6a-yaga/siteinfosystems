import React, { Component } from "react";
import Swipe from "react-easy-swipe";
import "./index.scss";

import PaginationList from "../../components/paginationList/paginationList";
import logo1 from "../../static/resources/logo_1.png";
import logo2 from "../../static/resources/logo_2.png";
import logo3 from "../../static/resources/logo_3.png";
import logo4 from "../../static/resources/logo_4.png";
import logo5 from "../../static/resources/logo_5.png";
import logo6 from "../../static/resources/logo_6.png";
import logo7 from "../../static/resources/logo_7.png";
import logo8 from "../../static/resources/logo_8.png";

class Partners extends Component {
  slideListId = "slide-list";

  currentTransition = "none";
  onSwipeStart(event) {
    this.swipeOffset = 0;
    console.log("Start swiping...", event);
    this.currentTransition = document.getElementById(
      this.slideListId
    ).style.transition;
    document.getElementById(this.slideListId).style.transition = "none";
    event.preventDefault();
    return false;
  }
  swipeOffset = 0;
  onSwipeMove(position, event) {
    let elem = document.getElementById(this.slideListId);

    const percent = this.paginationList.currentPage * -100;
    elem.style.transform =
      "translateX(calc(" + percent + "% + " + position.x + "px))";
    console.log(`Moved ${position.x} pixels horizontally`, event);
    console.log(`Moved ${position.y} pixels vertically`, event);
    this.swipeOffset = position.x;
    event.preventDefault();
    return false;
  }

  onSwipeEnd(event) {
    document.getElementById(
      this.slideListId
    ).style.transition = this.currentTransition;
    if (this.swipeOffset < -50) {
      this.paginationList.showPage(event, this.paginationList.currentPage + 1);
    } else if (this.swipeOffset > 50) {
      this.paginationList.showPage(event, this.paginationList.currentPage - 1);
    }
    console.log("End swiping...", event);
    event.preventDefault();
    return false;
  }

  showPage(e, index) {
    let elem = document.getElementById("slide-list");
    const percent = index * -100;
    console.log(index);
    elem.style.transform = "translateX(" + percent + "%)";
  }
  onPartnerClick = e => {
    console.log(this.swipeOffset);
    if (this.swipeOffset > -10 && this.swipeOffset < 10) {
    } else {
      e.preventDefault();
      return false;
    }
  };

  render() {
    return (
      <section className="App-service page clients" id={"clients"}>
        <div className="area">
          <div className="content">
            <div className="content-header">
              <h2>{this.props.title}</h2>
            </div>
            <Swipe
              allowMouseEvents={true}
              onSwipeStart={this.onSwipeStart.bind(this)}
              onSwipeMove={this.onSwipeMove.bind(this)}
              onSwipeEnd={this.onSwipeEnd.bind(this)}
            >
              <div className="clients-page-container">
                <div className="clients-page" id={this.slideListId}>
                  {this.props.images.length === 0 ? (
                    <React.Fragment>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo1} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo2} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo3} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo4} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo6} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo7} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo5} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo8} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo1} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo2} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo3} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo4} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo6} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo7} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo5} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo8} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo1} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo2} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo3} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo4} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo6} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo7} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo5} />
                      </a>
                      <a href="true" onClick={this.onPartnerClick.bind(this)}>
                        <img alt="" src={logo8} />
                      </a>
                    </React.Fragment>
                  ) : (
                    this.props.images.map((img, k) => {
                      return (
                        <a
                          key={k}
                          href={img.href}
                          onClick={this.onPartnerClick.bind(this)}
                        >
                          <img alt={img.alt} src={img.source} />
                        </a>
                      );
                    })
                  )}
                </div>
              </div>
            </Swipe>
            <PaginationList
              ref={c => (this.paginationList = c)}
              slideListId={this.slideListId}
              showPage={(e, index) => {
                this.showPage(e, index);
              }}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Partners;

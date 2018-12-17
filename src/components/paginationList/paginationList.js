import React, {Component} from 'react';
import './paginationList.scss'
class PaginationList extends Component {
    lastWindowSize = 0;
    currentPage = 0;
    constructor(props) {
        super(props);
        this.state = {
            lastCountPerPage: 0,
            count: 0
        }
    }

    onWindowResize = (e) => {
        let countPerPage = this.countPerPage(window.innerWidth);
        if (countPerPage !== this.state.lastCountPerPage) {
            this.setState({count: this.getPagesCount(), lastCountPerPage: countPerPage})
            if (this.currentPage >= this.state.count) {
                this.showPage(undefined, this.state.count - 1);
            }
        }
        this.lastWindowSize = window.innerWidth
    }

    getPagesCount() {
        let countPerPage = this.countPerPage(window.innerWidth);
        let count = this.getElemsCount();
        let pagesCount = 0;
        if (count % countPerPage === 0) {
            pagesCount = count / countPerPage;
          console.log(count, countPerPage)
        } else {
            pagesCount = Math.floor(count / countPerPage) + 1;
          console.log(pagesCount)
        }

        if (pagesCount > 5) {
            return 5;
        } else {
            return pagesCount;
        }
    }

    getElemsCount() {
        return document.getElementById(this.props.slideListId).children.length
    }

    countPerPage (width) {
        if (width < 768) {
            return 4;
        } else if (width < 992) {
            return 6;
        } else {
            return 8;
        }
    }

    componentDidMount() {
        this.setState({count: this.getPagesCount()})
        this.lastWindowSize = window.innerWidth;
        window.addEventListener("resize", this.onWindowResize)
    }

    showPage(e, i) {
        console.log(i);
        let pagesCount = this.getPagesCount();
        if (i < 0) {
            i = 0;
        }
        if (i >= pagesCount) {
            i = pagesCount - 1;
        }

        let elems = document.getElementById("pagination-list").children;
        if (elems[i] !== undefined) {

            for (let i = 0; i < elems.length; i++) {
                elems[i].classList.remove("active")
            }
            this.props.showPage(e, i);
            if (e !== undefined) {
                e.preventDefault();
            }
            elems[i].classList.add('active');
        }
        this.currentPage = i;
        return false;
    }

    render() {
        return (
            <ul className="pagination-list" id={"pagination-list"}>
                {[...Array(this.state.count)].map((x, i) =>
                    <li key={i}  className={i === 0 ? "pagination-item active" :"pagination-item"}><a href="/" onClick={(e) => { return this.showPage(e, i) }}>&nbsp;</a></li>
                )}
            </ul>
        );
    }
}
export default PaginationList
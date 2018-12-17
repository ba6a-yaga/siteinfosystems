import React from 'react';

class SimplePageScroller extends React.Component {

    /**
     * Функция получения координат элемента на странице
     * @param elem
     * @returns {{x: number, y: number}}
     */
    getCoords(elem) {
        let box = elem.getBoundingClientRect();

        let body = document.body;
        let docEl = document.documentElement;

        let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        let clientTop = docEl.clientTop || body.clientTop || 0;
        let clientLeft = docEl.clientLeft || body.clientLeft || 0;

        let top = box.top + scrollTop - clientTop;
        let left = box.left + scrollLeft - clientLeft;

        return {x: Math.round(left), y: Math.round(top)};
    }

    /**
     *
     * @param e - event
     * @param pageId - id страницы на который нужно перейти
     * @param fromBottom если мы листаем снизу то нужно переходить на нижнюю часть верхней страницы
     */
    scrollToPage(e, pageId, fromBottom = false) {
        let elem = document.getElementById(pageId);
        let coordinates = this.getCoords(elem);
        if (fromBottom) {
            coordinates.y += elem.offsetHeight - window.innerHeight;
        }
        this.scrollToPosition(coordinates, this.props.duration);
        if (this.props.onChangePage !== undefined) {
            this.props.onChangePage(this.pages.indexOf(pageId) + 1, pageId)
        }
    }

    /**
     * если нужно прервать предыдущую анимацию скролла то перед анимацией этот параметр ставиться в true
     * @type {boolean}
     */
    needInterrupt = false;

    /**
     * скроллим страницу в конкретную позицию
     * @param position - {{x: number, y: number}} // пока что работает только с y координатой
     * @param scrollDuration время анимации в милисекундах
     */
    scrollToPosition(position, scrollDuration) {
        // если юзер не держит палец на экране тогда можно скроллить страницу,
        // а то будут дикие глюки с прыганием страницы
        if (!this.scrolling && !this.touchActive) {

            let scrollCount = 0, // сколько уже проскролили от 1 до -1 (синусоида)
                oldTimestamp = performance.now(); // время последнего фрейма

            // дельта между scrollY в начале анимации и необходимой в конце анимации
            let delta = 0;

            // сохраняем каким был window.scrollY в начале акнимации чтобы к нему приплюсовывать нормализованную дельту
            let startY = 0;

            // если страница уже скроллится
            if (this.scrolling) {
                // то прерываем предыдущую анимацию
                this.needInterrupt = true
            }
            // устанавливаем значение что страница скроллится в данный момент
            this.scrolling = true;

            // флаг который будет определять первый фрейм
            let firstFrame = true;

            // функция шага анимации
            let step = (newTimestamp) => {
                // если мы на первом фрейме нашей новой анимации
                // (другая запущенная анимация должна была прерваться к текущему моменту)
                if (firstFrame) {
                    // то отменяем флаг что нужно прервать анимашку
                    this.needInterrupt = false

                    // и отменяем флаг первого фрейма
                    firstFrame = false;

                    // и вычисляем дельту межу позицией старта и финиша
                    delta = (position.y - window.scrollY);

                    // и сохраняем начальный скролл
                    startY = window.scrollY;
                } else {
                    // иначе если нужно прервать анимацию или юзер держит палец на экране
                    if (this.needInterrupt === true || this.touchActive === true) {
                        // то устанавливаем что мы закончили анимацию
                        this.scrolling = false;
                        // и останавливаем анимацию не запускаем следующий фрейм анимации
                        return;
                    }
                }
                // меняем scrollCount значение сколько мы уже проскролили, будет меняется от 0 до PI
                // Math.PI множенное на (deltaTime деленное на продолжительность всей анимации)
                scrollCount += Math.PI * ((newTimestamp - oldTimestamp) / scrollDuration);

                // если мы достигли последнего фрейма
                if (scrollCount >= Math.PI) {
                    // то скроллим в конечную точку
                    window.scrollTo(0, position.y);
                } else {
                    // иначе скроллим в промежуточную позицию
                    window.scrollTo(0, Math.round(startY + delta * (1 - (Math.cos(scrollCount) + 1) / 2)));
                }

                // если мы достигли конечной точки
                if (window.scrollY === position.y) {
                    // то значит что анимация скроллинга уже закончилась
                    this.scrolling = false;
                    // и нужно остановить запрашивание следующего фрейма анимации
                    return;
                }

                // сохраняем время для вычисления deltaTime
                oldTimestamp = newTimestamp;

                // запрашиваем следующий фрейм анимации
                window.requestAnimationFrame(step);
            }

            // начинаем выполнение анимации скроллинга
            window.requestAnimationFrame(step);
        }
    }

    // если юзер держит палец на экране то этот параметр будет установлен в true
    touchActive = false

    //  начальное значение window.scrollY когда юзер приложил палец к экрану
    scrollYStart = 0

    // значение  window.scrollY на предыдущем фрейме когда юзер водит пальцем по экрану
    scrollYPrev = 0

    // значение  window.scrollY на предыдущем фрейме когда поднял палец с экрана
    scrollYEnd = 0


    touchStartHandler(e) {
        this.scrollYStart = window.scrollY;
        this.scrollYPrev = window.scrollY;
        this.touchActive = true
    }

    touchMoveHandler(e) {
        if (this.scrollYEnd !== window.scrollY) {
            this.scrollYPrev = this.scrollYEnd;
        }
        this.scrollYEnd = window.scrollY;
        this.touchActive = true
    }


    /**
     * обработчик события поднятия пальца с экрана
     * @param e
     */
    touchEndHandler(e) {
        console.log(e)
        let scrollYEnd = window.scrollY;
        this.touchActive = false
        // если юзер протянул пальцем хотя бы 10 пикселей
        if (Math.abs(scrollYEnd - this.scrollYPrev) > 10) {
            let currentPageId = null;
            // в этом цикле проверяем виден ли хоть один разрыв между страницами
            for (let i = 0; i < this.pages.length; i++) {
                let pageId = this.pages[i]
                let elem = document.getElementById(pageId);
                // получаем координаты элемента на странице
                let coords = this.getCoords(elem);

                // если верхняя часть блока видна на текущем экране
                if (coords.y >= window.scrollY
                    && coords.y < window.scrollY + window.innerHeight) {

                    // то сохраняем этот id
                    currentPageId = pageId;

                    // и выходим из цикла
                    break;
                }
            }

            // если на экране виден разрыв между страницами
            if (currentPageId !== null) {
                // то если мы пальцем вели вниз
                if (scrollYEnd < this.scrollYPrev) {
                    let elemIndex = this.clamp(this.pages.indexOf(currentPageId) - 1, 0, this.pages.length - 1);
                    // то скроллим к передыдущей странице
                    this.scrollToPage(e, this.pages[elemIndex], true);
                } else {
                    // иначе скроллим к текущей странице
                    this.scrollToPage(e, this.pages[this.pages.indexOf(currentPageId)]);
                }
            }

        } else {
            // иначе мы проверяем нужно ли проскроллить между страницами
            this.checkNeedPageScroll(e)
        }
    }

    /**
     * обрезает значения x если оно выходит за границы
     * @param x: number - значение
     * @param min: number - минимально допустимое значение
     * @param max: number - максимально допустимое значение
     * @returns {x - значение которое не выходит за пределы min - max}
     */
    clamp(x, min, max) {
        if (x < min) {
            return min;
        }
        if (x > max) {
            return max
        }
        return x
    }


    componentDidMount() {
        let elem = document.getElementById('simple-page-scroller');

        elem.ontouchstart = this.touchStartHandler.bind(this);
        elem.ontouchmove = this.touchMoveHandler.bind(this);
        elem.ontouchend = this.touchEndHandler.bind(this);
        elem.ontouchcancel = this.touchEndHandler.bind(this);

        document.addEventListener('scroll', this.bodyScrollHandler.bind(this));
        window.addEventListener('resize', this.bodyScrollHandler.bind(this));
    }


    scrolling = false;
    currentPage = 'header'

    componentWillMount() {
        this.pages = this.props.pages
        document.addEventListener("load", this.bodyScrollHandler.bind(this));
    }

    bodyScrollHandler(e) {
        if (!this.scrolling) {
            this.checkNeedPageScroll(e);
        }
    }

    /**
     * метод проверки нужно ли скроллить между страницами
     * @param e
     */
    checkNeedPageScroll(e) {

        // проходимся в цикле по всем страницам
        for (let i = 0; i < this.pages.length; i++) {

            let pageId = this.pages[i]
            let elem = document.getElementById(pageId);
            // получаем координаты элемента на странице
            let coords = this.getCoords(elem);
            // низ элемента
            let pageBottom = coords.y + elem.offsetHeight;
            // верх элемента
            let pageTop = coords.y;

            // Это когда листаем вниз то верх следующего блока появляеться внизу в нижней половине экрана
            if ((pageTop > window.scrollY + window.innerHeight / 2 && pageTop < (window.scrollY + window.innerHeight)) || pageTop === window.scrollY) {
                //console.log("NEED SCROLL TO" + pageId)
                this.currentPage = pageId;
                this.scrollToPage(e, pageId)
            }
            // Это когда листаем вверх то низ следующего блока появляеться вверху в верхней половине экрана
            if (pageBottom > window.scrollY + 2 && pageBottom < (window.scrollY + window.innerHeight / 2)) {
                // console.log("NEED SCROLL TO" + pageId)
                this.currentPage = pageId;
                this.scrollToPage(e, pageId, true)
            }
        }
    }


    render() {
        return (
            <div id={'simple-page-scroller'}>
                {this.props.children}
            </div>
        );
    }
}

SimplePageScroller.defaultProps = {
    duration:1000,
    pages:[]
}

export default SimplePageScroller;

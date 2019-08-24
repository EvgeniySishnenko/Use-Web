function scrollX() {
    let windWidth2 = window.innerWidth;
    const paralax = (function () {
        const about = document.querySelector('.about');
        const topics = document.querySelector('.topics');
        const test = document.querySelector('.test');

        const aboutOffset = $('.about').offset().top;
        const topicsOffset = $('.topics').offset().top;
        const testOffset = $('.test').offset().top;

        return {

            move: function (elem, wScroll, strafeEmount, scrollTop1, offset) {
                const rect = elem.getBoundingClientRect();

                const windowMargin = Math.ceil($(window).height() - 100);
                const topBorder = offset - scrollTop1 - windowMargin;

                const windWidth = window.innerWidth;
                const windWidth1 = windWidth - 80;
                
                const strafe = wScroll / strafeEmount + '%';
                const transformString = 'translate3d(' + strafe + ', -50%, 0)';

                let lastScrollTop = 0;
                let strafe1, transformString1, currentScroll;

                let style = elem.style;

                $(window).scroll(function (event) {
                    
                    let st = $(this).scrollTop();
                    if (st > lastScrollTop) {
                    // downscroll code
                    if (rect.right < windWidth1) {

                        if (topBorder <= 0) {
                            
                            style.transform = transformString;
                            style.webkitTransform = transformString;
                            currentScroll = wScroll;
  
                        }

                    }

                } else {
                    // upscroll code

                    if (wScroll <= currentScroll) {
                        strafe1 = currentScroll / -strafeEmount + '%';
                        transformString1 = 'translate3d(' + strafe1 + ', -50%, 0)';
                        // transformString1 = 'translateX(' + strafe1 + ')';
                        style.transform = transformString1;
                        style.webkitTransform = transformString1;

                    }


                }
                    lastScrollTop = st;
                });


            },
            init: function (wScroll, scrollTop) {
                let a, b,c;
        
                if (windWidth2 <= 1020) {
                    a = 5;
                    b = 6;
                    c = 25;
                }
                if (windWidth2 <= 1200) {
                    c = 23;
                }
                if (windWidth2 <= 1440) {
                    a = 5;
                    b = 6;
                    c = 20;
                }
                if (windWidth2 <= 1980) {
                    a = 4;
                    b = 4;
                    c = 18;
                }
                
                
                this.move(about, wScroll, a, scrollTop, aboutOffset);
                this.move(topics, wScroll, b, scrollTop, topicsOffset);
                this.move(test, wScroll, c, scrollTop, testOffset);
            }
        }

    }());

    window.onscroll = function () {
        const wScroll = window.pageYOffset;
        const scrollTop = $(window).scrollTop();
        
        if (windWidth2 >= 992) {
            paralax.init(wScroll, scrollTop);
        }
        


    }
}
module.exports = scrollX;
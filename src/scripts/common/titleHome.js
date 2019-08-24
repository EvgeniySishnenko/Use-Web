function titleHome () {
    $('.first-screen__text-wrap1').on('click', function(){
        $('.first-screen__text').toggleClass('first-screen__text-open');
    });

    setTimeout(() => {
        $('.first-screen__text').toggleClass('first-screen__text-open');
    }, 500);
}
module.exports = titleHome;
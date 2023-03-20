$(document).ready(function() {
    $('.sidenav').sidenav({
        draggable: true,
        preventScrolling: false
    });
    $('.modal').modal();
    $('.collapsible').collapsible();
    $('.tap-target').tapTarget();
    $('.tooltipped').tooltip();
    $('.parallax').parallax();
    $('select').formSelect();
});

AOS.init();

$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return false;
    });
});
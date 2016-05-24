function initNavbar() {

    var scrollSpeed = 750;
    var scrollOffset = 50;
    var easing = 'swing';

    $('#navbar-top .navbar-default ul.nav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: scrollSpeed,
        scrollOffset: scrollOffset,
        scrollThreshold: 0.5,
        filter: ':not(.external)',
        easing: easing
    });

    $('.nav-external').click(function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $($(this).attr("href")).offset().top - scrollOffset
        }, scrollSpeed, easing);
    });

    $('#navbar-top .navbar-default').affix({
        offset: {
            top: $('#home').height()
        }
    });
}
function centerHero () {


    $('#hero-img').css('margin-top', (($(window).height()/2 - $('#hero-img').height()/2))-55);


}
function initAnimations() {
    $('.animated').appear(function () {
        var el = $(this);
        var animation = el.data('animation');
        var delay = el.data('delay');
        if (delay) {
            setTimeout(function () {
                el.addClass(animation);
                el.addClass('showing');
                el.removeClass('hiding');
            }, delay);
        } else {
            el.addClass(animation);
            el.addClass('showing');
            el.removeClass('hiding');
        }
    }, {
        accY: -60
    });

    // Service hover animation
	$('.service').hover(function(){
		$('i', this).addClass('animated tada');
	},function(){	
        $('i', this).removeClass('animated tada');
	});
}


$(document).ready(function () {
    centerHero();
    initNavbar();
    backgroundColorHandler('#festival',90, 95, 128);
    //backgroundColorHandler('#programm',125, 160, 206);
    play_just_one_song_at_same_time();
    initAnimations();



});



function play_just_one_song_at_same_time(){
    $("audio").on("play", function() {
        $("audio").not(this).each(function(index, audio) {
            audio.pause();
        });
    });
};

//Navbar in Responisve Ansicht nach Auswahl eines Items schliessen
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});




$(window).load(function () {
    $(".loader .fading-line").fadeOut();
    $(".loader").fadeOut("slow");
});


function backgroundColorHandler(element,red, green, blue) {

    var softener = 300;
    var element_without_hash = element.replace("#","")

    $(window).scroll(function () {
        var height_viewport = $(window).height();
        var div = document.getElementById(element_without_hash);
        var rect = div.getBoundingClientRect();
        var distance_to_top = rect.top;
        var div_height = div.clientHeight;
        var delta = (height_viewport/2) - (distance_to_top + (div_height/2));
        var a_channel = (1 / (Math.abs(delta)/softener ));
        $(element).css('background', 'rgba(' + red + ',' + green + ',' + blue + ',' + a_channel + ')');
    });


}

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
function initPortfolio () {
    var portfolio = $('#portfolio');
    var items = $('.items', portfolio); 
    var filters = $('.filters li a', portfolio);

    $('#hero-img').css('margin-top', (($(window).height()/2 - $('#hero-img').height()/2))-55);

    items.imagesLoaded(function() {
        items.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows',
            transitionDuration: '0.7s'
        });
    });
    
    filters.click(function(){
        var el = $(this);
        filters.removeClass('active');
        el.addClass('active');
        var selector = el.attr('data-filter');
        items.isotope({ filter: selector });
        return false;
    });

    $('.item a', items).venobox({
        border: '0 10px',
        numeratio: true,
        infinigall: true
    }); 
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

function initTwitterFeed() {
    /* More about fetch params on http://www.jasonmayes.com/projects/twitterApi */
    twitterFetcher.fetch('500674157688782849', '', 1, true, false, false, '', true, handleTweets, false);
}
$(document).ready(function () {
    initNavbar();
    initPortfolio();
    initAnimations();
    backgroundColorHandler('#festival',90, 95, 128);
    //backgroundColorHandler('#programm',125, 160, 206);
    play_just_one_song_at_same_time();

});

function play_just_one_song_at_same_time(){
    $("audio").on("play", function() {
        $("audio").not(this).each(function(index, audio) {
            audio.pause();
        });
    });
};

//Navbar in Responisve Anischt nach Auswahl eines Items schliessen
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});




$(window).load(function () {
    $(".loader .fading-line").fadeOut();
    $(".loader").fadeOut("slow");
});
function handleTweets(tweets) {
    var element = document.getElementById('feed');
    if (element) {
        var x = tweets.length;
        var n = 0;
        var html = '<ul class="list-inline">';
        while (n < x) {
            html += '<li>' + tweets[n] + '</li>';
            n++;
        }
        html += '</ul>';
        element.innerHTML = html;
    }
}

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

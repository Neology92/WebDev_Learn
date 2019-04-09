jQuery(function($)
{
    $.scrollTo(0);

    $('#start').click(function(){ $.scrollTo('body',500); });
    $('#b1').click(function(){ $.scrollTo('#item1',500); });
    $('#b2').click(function(){ $.scrollTo('#item2',500); });
    $('#b3').click(function(){ $.scrollTo('#item3',500); });

    $('.scrollUp').click(function(){ $.scrollTo('body',500); });
});

$(window).scroll(function()
{

    if($(this).scrollTop() > 300)
    {
        $('.scrollUp').slideDown();
    }
    else                          
    {
        $('.scrollUp').fadeOut();
    }
});



$(document).ready(function()
{
    var NavY = $('.menu').offset().top;

    var stickyNav = function()
    {
        var ScrollY = $(window).scrollTop();
        if(ScrollY > NavY)
        {
            $('.menu').addClass('sticky');
        }
        else
        {
            $('.menu').removeClass('sticky');
        }
    };

    stickyNav();

    $(window).scroll(function()
    {
        stickyNav();
    });
});
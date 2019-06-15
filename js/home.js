$(document).ready(function () {
    var currentPage = window.location.href;
    var winWidth = $(window).width();
    var activeSlideIndex = 0;

    $(function () {
        var block_arr = $('.ticker li p').map(function () { return $(this).get(0); }).toArray();

        var ticker_item = $(block_arr[0]);
        $(".ticker").html(ticker_item);
        var ticker_width = $(".ticker").width();
        var text_x = ticker_width;

        //console.log(block_arr.indexOf(ticker_item.get(0)));
        //console.log(block_arr.length);

        scroll_ticker = function () {
            text_x--;
            ticker_item.css("left", text_x);
            if (text_x < -1 * ticker_item.width()) {
                ticker_item = $(block_arr[(block_arr.indexOf(ticker_item.get(0)) + 1 == block_arr.length) ? 0 : block_arr.indexOf(ticker_item.get(0)) + 1]);
                ticker_item.css("left", text_x);
                $(".ticker").html(ticker_item);
                text_x = ticker_width;
            }
        }
        setInterval(scroll_ticker, 12);

    });
    // forgot btn action
    $(document).on("click", ".login-forgot-btn", function () {
        $(".wrapper-state-login").toggleClass("show-active");
        var thisText = $(this).text();

        if ($(this).text() == "Forgot your unique code?") {
            $('#pLoginHeading').html("Enter your registered email address here");
            $(this).text("Enter Unique Code");
        }
        else {
            $(this).text("Forgot your unique code?");
            $('#pLoginHeading').html("Please enter the 'Unique Code' to stand a chance to own a Himalayan Sleet + Explorer Kit");
        }
        // $(".wrapper-uniq").toggleClass("show-active");
    });

    $(document).on('click', '#forgot-submit', function (e) {
        e.preventDefault();
        $('#formForgot').trigger('submit');
    });

    $('#formForgot').validate({
        submitHandler: function () {
            $('#forgot-submit').addClass('loader');
            var email = $('#txtForgotEmail').val();

            $.ajax({
                type: "post",
                url: siteUrl + "motorcycles/himalayan/sleet/ajax/himalayan-get-unique-code.aspx",
                data: { email: email },
            }).done(function (response) {
                $('#forgot-submit').removeClass('loader');
                $('#txtForgotEmail').val('');
                $('.login-forgot-btn').trigger('click');
                if (response == 1) {
                    ga('send', 'event', 'product himalayan sleet', 'email id submit button', 'book now page');
                    $.confirm({
                        icon: 'fa fa-question',
                        theme: 'white',
                        closeIcon: true,
                        animation: 'rotateXR',
                        closeAnimation: 'rotateXR',
                        closeButton: false,
                        type: 'orange',
                        title: 'Oops',
                        content: 'Unique code details mailed to your registered email id.'
                    });
                }
                else if (response == 2) {
                    $.confirm({
                        icon: 'fa fa-question',
                        theme: 'white',
                        closeIcon: true,
                        animation: 'rotateXR',
                        closeAnimation: 'rotateXR',
                        closeButton: false,
                        type: 'orange',
                        title: 'Oops',
                        content: 'This email id seems to be not registered with us. Please try again.'
                    });
                }
                else {
                    $.confirm({
                        icon: 'fa fa-question',
                        theme: 'white',
                        closeIcon: true,
                        animation: 'rotateXR',
                        closeAnimation: 'rotateXR',
                        closeButton: false,
                        type: 'orange',
                        title: 'Oops',
                        content: 'Sorry, could not submit request'
                    });
                }
            });
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "radDealers") {
                element.parent().parent().parent().parent().append(error);
            }
            else {
                element.parent().append(error);
            }
            $('.carousel-content').slick('reinit');
        },
        errorElement: 'div'
    });

    $(document).on('click', '#login-submit', function (e) {
        e.preventDefault();
        $('#formLogin').trigger('submit');
    });

    $('#formLogin').validate({
        submitHandler: function () {
            $('#login-submit').addClass('loader');
            var voucherCode = $('#txtCode').val();

            $.ajax({
                type: "post",
                url: siteUrl + "motorcycles/himalayan/sleet/ajax/himalayan_sleet_getinfo.aspx",
                data: { voucherCode: voucherCode },
            }).done(function (response) {
                $('#login-submit').removeClass('loader');
                if (response == 1) {
                    ga('send', 'event', 'product himalayan sleet', 'Unique Code - submit button', 'book now page');
                    window.location = siteUrl + "motorcycles/himalayan/sleet/summary/";
                }
                else if (response == 2) {
                    ga('send', 'event', 'product himalayan sleet', 'Invalid Voucher Code', 'book now page');
                    $.confirm({
                        icon: 'fa fa-question',
                        theme: 'white',
                        closeIcon: true,
                        animation: 'rotateXR',
                        closeAnimation: 'rotateXR',
                        closeButton: false,
                        type: 'orange',
                        title: 'Oops',
                        content: 'This voucher code appears to be invalid. Please try again.'
                    });
                }
                else if (response == 3) {
                    $.confirm({
                        icon: 'fa fa-question',
                        theme: 'white',
                        closeIcon: true,
                        animation: 'rotateXR',
                        closeAnimation: 'rotateXR',
                        closeButton: false,
                        type: 'orange',
                        title: 'Oops',
                        content: 'Congratulations! You are already on your way to riding home a Himalayan Sleet + Explorer Kit. You may not use the same voucher to participate again.'
                    });
                }
                else if (response == 4) {
                    $.confirm({
                        icon: 'fa fa-question',
                        theme: 'white',
                        closeIcon: true,
                        animation: 'rotateXR',
                        closeAnimation: 'rotateXR',
                        closeButton: false,
                        type: 'orange',
                        title: 'Oops',
                        content: 'Sorry! All 500 motorcycles have been sold out. Thank you for your interest.'
                    });
                }
                else {
                    $.confirm({
                        icon: 'fa fa-question',
                        theme: 'white',
                        closeIcon: true,
                        animation: 'rotateXR',
                        closeAnimation: 'rotateXR',
                        closeButton: false,
                        type: 'orange',
                        title: 'Oops',
                        content: 'Sorry, could not submit request'
                    });
                }
            });
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "radDealers") {
                element.parent().parent().parent().parent().append(error);
            }
            else {
                element.parent().append(error);
            }
            $('.carousel-content').slick('reinit');
        },
        errorElement: 'div'
    });

    $(function () {
        initialize();

        if (currentPage.indexOf('/book-now') > 0) {
            $(".slides").removeClass("slide-left").removeClass('bg-thanks');;
            $(".sleet-1").addClass("sleet-1-white");
            $(".sleet-2").addClass("sleet-2-white");
            $(".header-unpinned").addClass("header-pinned");
            $(".header-anchors").addClass("header-anchors-active");
            $(".howitworks-slide").removeClass("howitworks-slide-active");
            $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
            $(".register-slide").removeClass("register-slide-active");
            $('.login-slide').removeClass('login-slide-active');
            $(".tnc-slide").removeClass("tnc-slide-active");
            $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
            $(".thank-slide").removeClass("thank-slide-active");
            $('.login-slide').addClass('login-slide-active');
            ga('send', 'pageview', '/motorcycles/himalayan/sleet/book-now');
        }
        else if (currentPage.indexOf('/register/thank-you') > 0) {
            $(".sleet-1").addClass("sleet-1-white");
            $(".sleet-2").addClass("sleet-2-white");
            $(".slides").addClass("slide-left").addClass('bg-thanks');
            $(".header-unpinned").addClass("header-pinned");
            $(".header-anchors").addClass("header-anchors-active");
            $('.login-slide').removeClass('login-slide-active');
            $(".howitworks-slide").removeClass("howitworks-slide-active");
            $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
            $(".register-slide").removeClass("register-slide-active");
            $(".tnc-slide").removeClass("tnc-slide-active");
            $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
            $(".thank-slide").addClass("thank-slide-active");
            $.fn.fullpage.setAllowScrolling(false);
            ga('send', 'pageview', '/motorcycles/himalayan/sleet/register/thank-you');
        }
        else if (currentPage.indexOf('/register') > 0) {
            $(".sleet-1").addClass("sleet-1-white");
            $(".sleet-2").addClass("sleet-2-white");
            $(".slides").addClass("slide-left");
            $(".header-unpinned").addClass("header-pinned");
            $(".header-anchors").addClass("header-anchors-active");
            $('.login-slide').removeClass('login-slide-active');
            $(".howitworks-slide").removeClass("howitworks-slide-active");
            $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
            $(".register-slide").addClass("register-slide-active");
            $(".tnc-slide").removeClass("tnc-slide-active");
            $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
            $(".thank-slide").removeClass("thank-slide-active");
            $.fn.fullpage.setAllowScrolling(false);
            ga('send', 'pageview', '/motorcycles/himalayan/sleet/register');
        } else if (currentPage.indexOf('/how-it-works') > 0) {
            $(".slides").addClass("slide-left");
            $(".sleet-1").addClass("sleet-1-white");
            $(".sleet-2").addClass("sleet-2-white");
            $(".header-unpinned").addClass("header-pinned");
            $(".header-anchors").addClass("header-anchors-active");
            $('.login-slide').removeClass('login-slide-active');
            $(".howitworks-slide").addClass("howitworks-slide-active");
            $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
            $(".register-slide").removeClass("register-slide-active");
            $(".tnc-slide").removeClass("tnc-slide-active");
            $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
            $(".thank-slide").removeClass("thank-slide-active");
            $.fn.fullpage.setAllowScrolling(false);
            ga('send', 'pageview', '/motorcycles/himalayan/sleet/how-it-works');
        } else if (currentPage.indexOf('/terms-and-conditions') > 0) {
            $(".slides").addClass("slide-left");
            $(".sleet-1").addClass("sleet-1-white");
            $(".sleet-2").addClass("sleet-2-white");
            $(".slides").addClass("slide-left");
            $(".header-unpinned").addClass("header-pinned");
            $(".header-anchors").addClass("header-anchors-active");
            $('.login-slide').removeClass('login-slide-active');
            $(".howitworks-slide").removeClass("howitworks-slide-active");
            $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
            $(".register-slide").removeClass("register-slide-active");
            $(".tnc-slide").removeClass("tnc-slide-active");
            $(".tnc-slide-footer").addClass("tnc-slide-footer-active");
            $(".thank-slide").removeClass("thank-slide-active");
            $.fn.fullpage.setAllowScrolling(false);
            ga('send', 'pageview', '/motorcycles/himalayan/sleet/terms-and-conditions');
        }
    });

    $(window).on("resize", function () {
        initialize();
    });

    function initialize() {
        $(".sleet-1").addClass("sleet-1-white");
        $(".sleet-2").addClass("sleet-2-white");
        $(".header-unpinned").addClass("header-pinned");
        $(".header-anchors").addClass("header-anchors-active");

        if (winWidth < 991) {

        }
        else {
            $("#fullpage").fullpage({
                anchors: ['home', 'media-reviews', 'features', 'gallery']
            });
        }
    }

    $(".login-show").on("click", function () {
        $(".slides").removeClass("slide-left").removeClass('bg-thanks');
        $(".sleet-1").addClass("sleet-1-white");
        $(".sleet-2").addClass("sleet-2-white");
        $(".header-unpinned").addClass("header-pinned");
        $(".header-anchors").addClass("header-anchors-active");
        $(".howitworks-slide").removeClass("howitworks-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".register-slide").removeClass("register-slide-active");
        $('.login-slide').removeClass('login-slide-active');
        $(".tnc-slide").removeClass("tnc-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".thank-slide").removeClass("thank-slide-active");
        $('.login-slide').addClass('login-slide-active');

        ga('send', 'pageview', '/motorcycles/himalayan/sleet/book-now');
        $('title').html("Himalayan Sleet + Explorer Kit Sale - Book Now | Royal Enfield");
        if (!$.browser.msie) {
            currentPage = siteUrl + 'motorcycles/himalayan/sleet/book-now';
            window.history.pushState('BookNow', 'BookNow', currentPage);
        }
    });

    $('.login-slide-close').on('click', function () {
        ga('send', 'event', 'product himalayan sleet', 'book-now-popup-close', 'book now page');
        $(".slides").removeClass("slide-left").removeClass('bg-thanks');;
        $(".sleet-1").addClass("sleet-1-white");
        $(".sleet-2").addClass("sleet-2-white");
        $(".header-unpinned").addClass("header-pinned");
        $(".header-anchors").addClass("header-anchors-active");
        $(".howitworks-slide").removeClass("howitworks-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".register-slide").removeClass("register-slide-active");
        $('.login-slide').removeClass('login-slide-active');
        $(".tnc-slide").removeClass("tnc-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".thank-slide").removeClass("thank-slide-active");
        $('.login-slide').removeClass('login-slide-active');
        $('title').html("Royal Enfield Sleet + Explorer Kit");
        if (!$.browser.msie) {
            currentPage = siteUrl + 'motorcycles/himalayan/sleet/';
            window.history.pushState('Home', 'Home', currentPage);
        }
    });

    $(document).on('click', '#btnProceed', function () {
        $('#formtab1').trigger('submit');
    });

    $(document).on('click', '#btnSubmit', function () {
        $('#formtab2').trigger('submit');
    });

    $('#formtab1').validate({
        submitHandler: function () {
            ga('send', 'event', 'product himalayan sleet', 'proceed-term-and-conditions', 'registration');
            $(".register-slide").removeClass("register-slide-active");
            $(".tnc-slide").addClass("tnc-slide-active");
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "radDealers") {
                element.parent().parent().parent().parent().append(error);
            }
            else {
                element.parent().append(error);
            }
        },
        errorElement: 'div'
    });

    $('#formtab2').validate({
        submitHandler: function () {
            $('#btnSubmit').addClass('loader');
            var name = $('#txtName').val();
            var email = $('#txtEmail').val();
            var mobile = $('#txtMobile').val();
            var address = $('#txtAddress').val();
            var state = $('#selState').val();
            var city = $('#selCity').val();
            var pincode = $('#txtPincode').val();
            var dealer = $('input[name="radDealers"]:checked').val();

            $.ajax({
                type: "post",
                url: "ajax/himalayan_sleet_register.aspx",
                data: { name: name, email: email, mobile: mobile, address: address, state: state, city: city, pincode: pincode, dealer: dealer }
            }).done(function (response) {
                $('#btnSubmit').removeClass('loader');
                if (response == 1) {
                    ga('send', 'event', 'product himalayan sleet', 'term-and-conditions-submit button', 'registration');
                    window.location = siteUrl + 'motorcycles/himalayan/sleet/register/thank-you';
                }
                else if (response == 2) {
                    $.confirm({
                        icon: 'fa fa-question',
                        theme: 'white',
                        closeIcon: true,
                        animation: 'rotateXR',
                        closeAnimation: 'rotateXR',
                        closeButton: false,
                        type: 'orange',
                        title: 'Oops',
                        content: 'Your details seem to be registered with us already'
                    });
                }
                else {
                    $.confirm({
                        icon: 'fa fa-question',
                        theme: 'white',
                        closeIcon: true,
                        animation: 'rotateXR',
                        closeAnimation: 'rotateXR',
                        closeButton: false,
                        type: 'orange',
                        title: 'Oops',
                        content: 'Sorry, could not submit request'
                    });
                }
                //else {
                //    ga('send', 'event', 'product himalayan sleet', 'term-and-conditions-submit button', 'registration');
                //    $('<noscript><div style="display:inline;"><img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/880619584/?label=0dq7CJSNh2cQwOD0owM&amp;guid=ON&amp;script=0"/></div></noscript>').appendTo('body');
                //    $('<noscript><div style="display:inline;"><img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/845131254/?label=65qRCMW48XoQ9tv-kgM&amp;guid=ON&amp;script=0"/></div></noscript>').appendTo('body');
                //    $('.pricing').addClass('hide');
                //    $('#divDealers').removeAttr('style').addClass('divDealers');
                //    $('input').val('');
                //    //$('input[name="radDealers"]').attr('checked');
                //    //$('input:radio:checked').removeAttr("checked");
                //    $('input[type=radio].with-icon:checked').removeAttr('checked');
                //    $('input[type=radio]').removeClass('with-icon');
                //    $('#selState').val('');
                //    $('#selCity').val('');
                //    $('title').html("Thank You - Himalayan Sleet + Explorer Kit Registration Success");
                //    //if (!$.browser.msie) {
                //    //    currentPage = siteUrl + 'motorcycles/himalayan/sleet/register/thank-you';
                //    //    window.history.pushState('Thank You', 'Thank You', currentPage);
                //    //}
                //    window.location = siteUrl + 'motorcycles/himalayan/sleet/register/thank-you';
                //    $(".howitworks-slide").removeClass("howitworks-slide-active");
                //    $(".register-slide").removeClass("register-slide-active");
                //    $(".tnc-slide").removeClass("tnc-slide-active");
                //    $(".thank-slide").addClass("thank-slide-active");
                //    $('#plcRegCode').html(response);
                //}
            });
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "radDealers") {
                element.parent().parent().parent().parent().append(error);
            }
            else {
                element.parent().append(error);
            }
            $('.carousel-content').slick('reinit');
        },
        errorElement: 'div'
    });

    $('#txtName').on('change', function () {
        ga('send', 'event', 'product himalayan sleet', 'Enter Name', 'Registration Step 1 - Name');
    });

    $('#txtEmail').on('change', function () {
        ga('send', 'event', 'product himalayan sleet', 'Enter Email', 'Registration Step 2 - Email');
    });

    $('#txtMobile').on('change', function () {
        ga('send', 'event', 'product himalayan sleet', 'Enter Mobile', 'Registration Step 3 - Mobile');
    });

    $('#txtAddress').on('change', function () {
        ga('send', 'event', 'product himalayan sleet', 'Enter Address', 'Registration Step 4 - Address');
    });

    $('#txtPincode').on('change', function () {
        ga('send', 'event', 'product himalayan sleet', 'Enter Pin Code', 'Registration Step 7 - Pin Code');
    });

    $('.checkbox-agree').on('clikc', function () {
        ga('send', 'event', 'product himalayan sleet', 'I agree', 'Registration Step 8 - Agreement');
    });

    $(".register-show").on("click", function () {
        $(".slides").addClass("slide-left");
        $(".header-unpinned").addClass("header-pinned");
        $(".header-anchors").addClass("header-anchors-active");
        $(".sleet-1").addClass("sleet-1-white");
        $(".sleet-2").addClass("sleet-2-white");
        $(".howitworks-slide").removeClass("howitworks-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".register-slide").addClass("register-slide-active");
        $('.login-slide').removeClass('login-slide-active');
        $(".tnc-slide").removeClass("tnc-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".thank-slide").removeClass("thank-slide-active");
        $.fn.fullpage.setAllowScrolling(false);
        ga('send', 'pageview', '/motorcycles/himalayan/sleet/register');
        $('title').html("Royal Enfield Himalayan Sleet + Explorer KIt Registration");
        if (!$.browser.msie) {
            currentPage = siteUrl + 'motorcycles/himalayan/sleet/register';
            window.history.pushState('Register', 'Register', currentPage);
        }
    });

    $(".howitworks-show").on("click", function () {
        $(".slides").addClass("slide-left");
        $(".sleet-1").addClass("sleet-1-white");
        $(".sleet-2").addClass("sleet-2-white");
        $(".slides").addClass("slide-left");
        $(".header-unpinned").addClass("header-pinned");
        $(".header-anchors").addClass("header-anchors-active");
        $(".howitworks-slide").addClass("howitworks-slide-active");
        $('.login-slide').removeClass('login-slide-active');
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".register-slide").removeClass("register-slide-active");
        $(".tnc-slide").removeClass("tnc-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".thank-slide").removeClass("thank-slide-active");
        $.fn.fullpage.setAllowScrolling(false);
        ga('send', 'pageview', '/motorcycles/himalayan/sleet/how-it-works')
        $('title').html("Royal Enfield Sleet + Explorer Kit");
        if (!$.browser.msie) {
            currentPage = siteUrl + 'motorcycles/himalayan/sleet/how-it-works';
            window.history.pushState('How It Works', 'How It Works', currentPage);
        }
    });

    $(".tnc-footer-show").on("click", function () {
        $(".slides").addClass("slide-left");
        $(".sleet-1").addClass("sleet-1-white");
        $(".sleet-2").addClass("sleet-2-white");
        $(".slides").addClass("slide-left");
        $(".header-unpinned").addClass("header-pinned");
        $(".header-anchors").addClass("header-anchors-active");
        $('.login-slide').removeClass('login-slide-active');
        $(".howitworks-slide").removeClass("howitworks-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".register-slide").removeClass("register-slide-active");
        $(".tnc-slide").removeClass("tnc-slide-active");
        $(".tnc-slide-footer").addClass("tnc-slide-footer-active");
        $(".thank-slide").removeClass("thank-slide-active");
        $.fn.fullpage.setAllowScrolling(false);

        $('title').html("Royal Enfield Sleet + Explorer Kit");
        if (!$.browser.msie) {
            currentPage = siteUrl + 'motorcycles/himalayan/sleet/terms-and-conditions';
            window.history.pushState('Terms and Conditions', 'Terms and Conditions', currentPage);
        }
    });

    $(".slides-close a, .close-all-slides, .thank-submit a, .generic-close").on("click", function () {
        $(".slides").removeClass("slide-left").removeClass('bg-thanks');;
        $(".howitworks-slide").removeClass("howitworks-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".register-slide").removeClass("register-slide-active");
        $('.login-slide').removeClass('login-slide-active');
        $(".tnc-slide").removeClass("tnc-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".thank-slide").removeClass("thank-slide-active");
        if (activeSlideIndex == -1) {
            $(".sleet-1").removeClass("sleet-1-white");
            $(".sleet-2").removeClass("sleet-2-white");
        }
        $.fn.fullpage.setAllowScrolling(true);

        $('title').html("Royal Enfield Sleet + Explorer Kit");
        if (!$.browser.msie) {
            currentPage = siteUrl + 'motorcycles/himalayan/sleet/';
            window.history.pushState('Home', 'Home', currentPage);
        }
    });

    jQuery.browser = {};
    (function () {
        jQuery.browser.msie = false;
        jQuery.browser.version = 0;
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
        }
    })();

    function numberAnimation(id, start, end, speed) {
        $({ someValue: start }).animate({ someValue: end }, {
            duration: speed,
            step: function () {
                $(id).text(numberWithCommas(Math.floor(this.someValue)));
            },
            complete: function () {
                $(id).text(numberWithCommas(end));
            }
        });
    }

    function numberWithCommas(x) {
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    }

    $('#selState').on('change', function () {
        ga('send', 'event', 'product himalayan sleet', 'Enter State - ' + $("#selState option:selected").text(), 'Registration Step 5 - State');
        $('.divDealers').hide();
        $('.pricing').addClass('hide');
        var stateId = $(this).val();
        var countryId = 90;

        if (stateId === '') {
            $.confirm({
                icon: 'fa fa-question',
                theme: 'white',
                closeIcon: true,
                animation: 'rotateXR',
                closeAnimation: 'rotateXR',
                closeButton: false,
                type: 'orange',
                title: 'Oops',
                content: 'Please select state'
            });
        } else {
            var data = '?state=' + stateId + '&country=' + countryId;
            $.getJSON("ajax/fetch_himalayan_sleet_price.aspx" + data, function (data) {
                $('#tdPrice').empty();
                $.each(data.price, function (i, data) {
                    $('.pricing').removeClass('hide');
                    var start = parseInt($('#plcPrice').text().replace(/,/g, ''));
                    var end = data.offerPrice;
                    if (start != end) {
                        numberAnimation("#plcPrice", start, end, 500);
                    }
                });
            });

            $('#selCity').empty();
            $('<option value="">Loading...</option>').appendTo('#selCity');
            data = '?state=' + stateId;
            $.getJSON(siteUrl + "ajax/fetch_dealer_city.aspx" + data, function (data) {
                $('#selCity').empty();
                $.each(data.city, function (i, data) {
                    var htmlData = '<option value="' + data.id + '">' + data.name + '</option>';
                    $(htmlData).appendTo('#selCity');
                });
            });
        }
    });

    $('#selCity').on('change', function () {
        ga('send', 'event', 'product himalayan sleet', 'Enter City - ' + $("#selCity option:selected").text(), 'Registration Step 6 - City');
        $('.register-scroll').fadeOut();
        $('.divDealers').hide();
        var cityId = $(this).val();
        var stateId = $('#selState').val();
        var countryId = 90;
        if (cityId === '') {
            $.confirm({
                icon: 'fa fa-question',
                theme: 'white',
                closeIcon: true,
                animation: 'rotateXR',
                closeAnimation: 'rotateXR',
                closeButton: false,
                type: 'orange',
                title: 'Oops',
                content: 'Please select city'
            });
        } else {
            if (cityId != '' && stateId != '' && countryId != '') {
                var data = '?city=' + cityId + '&state=' + stateId + '&country=' + countryId;
                $.getJSON(siteUrl + "ajax/fetch_lp_campaign_dealers.aspx" + data, function (data) {
                    $('.register-scroll').fadeIn();
                    $('#divDealers').empty();
                    $('#divDealers').html('<p class="dealer-sub">Select a Dealer near you</p>');
                    var htmlData = '<div class="dealer-slider">';
                    $.each(data.dealer, function (i, data) {
                        htmlData += '<div class="dealer-desc"><div class="custom-radio"><input type="radio" data-msg-required="Please select a dealer" data-rule-required="true" name="radDealers" class="with-icon" id= "addr' + data.id + '" value= "' + data.id + '"><label for="addr' + data.id + '"><div class="addr-box"><h6>' + data.name + '</h6><p>' + data.address + '</p></div></label></div></div>';
                    });
                    htmlData += '</div>';
                    $(htmlData).appendTo('#divDealers');
                    initiateSlider();
                });
                $('.divDealers').fadeIn(500);
            }
        }
    });

    function initiateSlider() {
        $('.dealer-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            fade: false,
            infinite: false,
            loop: true,
            speed: 1000,
            touchThreshold: 15,
            prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"></button>',
            nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"></button>',
            responsive: [
                {
                    breakpoint: 1270,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        speed: 300,
                    }
                },
                {
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        speed: 150,
                    }
                },
                {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 150,
                        arrows: false
                    }
                }
            ]
        });
    }

    $(".show-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        infinite: true,
        speed: 1000,
        touchThreshold: 15,
        dots: true,
        dotsClass: "show-dots"
    });

    $(".gallery-slider").slick({
        centerMode: true,
        infinite: true,
        centerPadding: '32%',
        arrows: false,
        focusOnSelect: true,
        speed: 800,
        touchDrag: false,
        mouseDrag: false,
        dots: false,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    centerPadding: '20%',
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.sync-left').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.sync-right',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        verticalSwiping: true,
        vertical: true,
        initialSlide: 0,
    });

    $(".sync-right").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        infinite: true,
        speed: 300,
        touchThreshold: 15,
        dots: false,
        focusOnSelect: true,
        asNavFor: ".sync-left",
        prevArrow: "<a class='right-prev'><img src='images/prev-arrow.svg' /></a>",
        nextArrow: "<a class='right-next'><img src='images/next-arrow.svg' /></a>",
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    arrows: true,
                    autoplay: true,
                    autoplaySpeed: 4000,
                }
            }
        ]
    });

    $(".banner-icon a, .intro-icon a, .show-icon a").on("click", function () {
        $.fn.fullpage.moveSectionDown();
    });

    $(".logo-himalayan a, .logo-re a").on("click", function () {
        $(".slides").removeClass("slide-left").removeClass('bg-thanks');;
        $(".sleet-1").addClass("sleet-1-white");
        $(".sleet-2").addClass("sleet-2-white");
        $(".header-unpinned").addClass("header-pinned");
        $(".header-anchors").addClass("header-anchors-active");
        $('.login-slide').removeClass('login-slide-active');
        $(".howitworks-slide").removeClass("howitworks-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".register-slide").removeClass("register-slide-active");
        $(".tnc-slide").removeClass("tnc-slide-active");
        $(".tnc-slide-footer").removeClass("tnc-slide-footer-active");
        $(".thank-slide").removeClass("thank-slide-active");
        $('title').html("Royal Enfield Sleet + Explorer Kit");
        if (!$.browser.msie) {
            currentPage = siteUrl + 'motorcycles/himalayan/sleet/';
            window.history.pushState('Home', 'Home', currentPage);
        }
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.moveTo(1);
    });

    $(".sync-left a").on("click", function () {
        $(".sync-left-item").removeClass("slick-current-bg");
        $(".features-wrap").addClass("features-grey");
        $(".right-content").addClass("right-content-slide");
    }), $(".right-slide-close a").on("click", function () {
        $(".sync-left-item").addClass("slick-current-bg");
        $(".features-wrap").removeClass("features-grey");
        $(".right-content").removeClass("right-content-slide");
    });
});
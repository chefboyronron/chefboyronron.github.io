var _ = document;
var gno_ad = gno_ad || {};
var callbacks = {
    billboardEventHandler: function(){

        var billboardAd = {
            stopExe: false,
            isFixed: false,
            exeTime: 7000,
            iFrame: $("#mobile-leaderboard").find('iframe'),

            scrollEvent: function(){

                if(!billboardAd.stopExe && !billboardAd.isFixed && (window.parent.scrollY > 56) ){

                    gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'fixed'} );
                    $("#mobile-leaderboard .dfp_ad").animate({
                        'top': '56px',
                        'left': '0',
                        'right': '0',
                    }, 500);
                    billboardAd.isFixed = true;
                    gno_ad.call_child('#billboard-holder .billboard', {'display':'block'}, billboardAd.iFrame[0] );
                    // $("#billboard-holder").find(".billboard").show();
                    
                    setTimeout(function(){
                        gno_ad.call_child('#billboard-holder .billboard', {'display':'none'}, billboardAd.iFrame[0] );
                        window.parent.removeEventListener("scroll", billboardAd.scrollEvent, false);
                        billboardAd.stopExe = true;
                        gno_ad.call('#mobile-leaderboard .dfp_ad', { 'height' : $("#billboard-holder .billboard-holder-leaderboard").height() + 'px'});
                        $("#mobile-leaderboard .dfp_ad").animate({
                            'top': '0',
                        }, 500, function(){
                            gno_ad.call('#mobile-leaderboard  .dfp_ad', { 'position' : 'relative', 'z-index' : 2});
                        });
                    }, billboardAd.exeTime);
                    
                }

                if(!billboardAd.stopExe && billboardAd.isFixed && (window.parent.scrollY < 56)){
                    gno_ad.call('#mobile-leaderboard  .dfp_ad', { 'position' : 'relative', 'z-index' : 2});
                    billboardAd.isFixed = false;
                }

            },


            init: function(){
                $("#mobile-leaderboard").css('height', $("#mobile-leaderboard .dfp_ad").height()+'px');
                window.parent.addEventListener('scroll', billboardAd.scrollEvent, false); 
                billboardAd.scrollEvent();
            }

        };

        billboardAd.init();
        
    },

    sidekickEventHandler:function(){
        var position = 0;
        var windowHeight = window.parent.innerHeight;
        var windowWidth = window.parent.innerWidth;
        var sidekick = {
            iFrame: $("#mobile-leaderboard").find('iframe'),
            scrollEvent: function(){
                var scroll = $(this).scrollTop();

                if (scroll > position){
                    
                    // console.log('scroll down')
                    gno_ad.call('#mobile-leaderboard', {'position': 'fixed'} );
                    // gno_ad.call_child('.sidekick', {'top':'0px'}, nescafe.iFrame[0] );
                    gno_ad.call_child('.image-sidekick', {'display':'none'}, sidekick.iFrame[0] );
                    // gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'top':'-96px'}, sidekick.iFrame[0] );
                    gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'top':'-50px'});
                    
                }
                    
                if(window.scrollY == 0){
                    gno_ad.call_child('.image-sidekick', {'display':'block'}, sidekick.iFrame[0] );
                    gno_ad.call('#mobile-leaderboard', { 'position' : 'relative'});
                    gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'top':'0px'});

                }

                position = scroll;

            },

            init: function(){
                gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)',{'width':'100%','height': windowHeight + 'px'});
                gno_ad.call_child('.close-sidekick', {'margin-left':'-10px'}, sidekick.iFrame[0] );
                if(router == 'archives' || router == 'tracking' || router == 'home' || router == 'publicaffairs' || router == 'showbiz'){
                    $('div.container:eq(1)').addClass('sidekick-selector');
                    gno_ad.call('div.container.sidekick-selector' , {'width':'96%'});
                }

                // if(window.parent.scrollY < 56){
                //     gno_ad.call_child('.sidekick', {'top':'-100px'}, nescafe.iFrame[0] );
                // }
                // var iframeId = $('#mobile-leaderboard .dfp_ad div iframe:eq(0)').attr('id');
                window.parent.addEventListener('scroll', sidekick.scrollEvent, false); 
                sidekick.scrollEvent();
            }
            
        };

        sidekick.init();
    },

    bubbleEventHandler: function(){
        var bubbleAd = {
            isStarted: false,
            setTime: 7000,
            iFrame: $("#mobile-leaderboard").find('iframe'),
            timeStart: function(){
                setTimeout(function() {
                    // $bubbleContainer.css({"opacity":"0","transition":"1s"});
                    // gno_ad.call_child('#placeholder .bubble', {'opacity': 0, 'transition': '1s'}, bubbleAd.iFrame[0] );
                    bubbleAd.isStarted = true;
                    gno_ad.call_child('#placeholder .bubble', {'visibility': 'hidden'}, bubbleAd.iFrame[0] );
                    gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '50px'});
                }, bubbleAd.setTime); 
            },
            scrollEvent: function(){

                if(bubbleAd.isStarted == false){
                    gno_ad.call('#mobile-leaderboard', {'height': '', 'text-align': '', 'margin-bottom': ''} );
                    gno_ad.call('#mobile-leaderboard .dfp_ad div', {'width': '100%'});
                    // gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': ($(window.parent).height()) + 'px', 'width': '100% !important', 'display': 'block', 'z-index': '9999', 'position': 'relative'});
                    // gno_ad.call_child('#placeholder .bubble', {'display':'block'}, bubbleAd.iFrame[0] );
                }

                if (window.parent.scrollY > 56){

                    // $(".leaderboard").fadeOut();
                    // gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': ($(window.parent).height()) + 'px'});
                    gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '155px', 'width': '150px', 'bottom': '-1px', 'z-index': '9999', 'position': 'fixed'});
                    gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'fixed', 'z-index' : 5, 'width': '100%','top':'0'} );
                    gno_ad.call_child('#placeholder .leaderboard', {'display':'none'}, bubbleAd.iFrame[0] );
                    gno_ad.call_child('#placeholder .bubble', {'display':'block'}, bubbleAd.iFrame[0] );
                    $(".bubble").fadeIn();

                    bubbleAd.timeStart();
                    
                }else{
                    // $(".leaderboard").fadeIn();
                    // gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': ($(window.parent).height() - 109.45) + 'px'});
                    gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'bottom': '', 'height': '50px', 'width': '100%', 'z-index': '9999', 'position': 'relative'});
                    gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'relative', 'z-index' : 5, 'width': '100%'} );
                    gno_ad.call_child('#placeholder .bubble', {'display':'none'}, bubbleAd.iFrame[0] );
                    gno_ad.call_child('#placeholder .leaderboard', {'display':'block'}, bubbleAd.iFrame[0] );
                    // gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'display': 'block'});
                    $(".bubble").fadeOut();
                }

            },

            init: function(){
                $("#mobile-leaderboard").css('height', $("#mobile-leaderboard .dfp_ad").height()+'px');
                $(".mobile-leaderboard iframe").css('width', '100%');
                gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '50px', 'width': '100% !important', 'display': 'block', 'z-index': '9999', 'position': 'relative'});
                window.parent.addEventListener('scroll', bubbleAd.scrollEvent, false); 
                bubbleAd.scrollEvent();
            }
        };

        bubbleAd.init();
    },

    filmstripEventHandler: function(){
        // var windowHeight = $(window.parent).height();
        // var windowWidth = $(window.parent).width();
        var windowHeight = window.parent.innerHeight;
        var windowWidth = window.parent.innerWidth;

        var filmstripAd = {
            // iFrame: $('#mobile-leaderboard').find('iframe').contents().find('#mux_filmstrip_iframe'),
            iFrame: $('#mobile-leaderboard').find('iframe'),
            initParentFrame: function(){
                gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': windowHeight + 'px', 'width': windowWidth + 'px', 'z-index': 9999, 'position': 'fixed', 'top': '0', 'left': '0'});
                // gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0) iframe#mux_filmstrip_iframe', {'height': ($(window.parent).height()) + 'px', 'width': ($(window.parent).width()) + 'px', 'z-index': 9999, 'position': 'fixed', 'margin-top': '-104px'});
                gno_ad.call('#mobile-leaderboard', {'margin-bottom': '', 'position': 'relative', 'text-align': '', });
                gno_ad.call('#mobile-leaderboard .dfp_ad', {'width': '100%', 'z-index': 9999, 'position': 'fixed'});
                gno_ad.call('#mobile-leaderboard .dfp_ad div', {'width': '100%', 'height': '100%'});
            },
            clickEvent: function(){
                
            },
            init: function(){
                $(".mobile-leaderboard iframe").css('width', $(window).width() + 'px');
                $(".mobile-leaderboard iframe").removeAttr('width');
                $(".mobile-leaderboard iframe").removeAttr('height');
                filmstripAd.initParentFrame();
                // window.parent.addEventListener('click', filmstripAd.clickEvent, false); 
                // filmstripAd.clickEvent();
            }
        };
        
        filmstripAd.init();
    },

    topntailEventHandler: function(){
        var position = 0;
        var topntailAd = {
            scrollUp: false,
            scrollDown: false,
            setTime: 7000,
            iFrame: $("#mobile-leaderboard").find('iframe'),
            timeStartTopAd: function(){
                setTimeout(function() {
                    gno_ad.call('#mobile-leaderboard .dummy-top', {'visibility': 'hidden'});
                    gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '50px'});
                    gno_ad.call_child('#placeholder .top', {'visibility': 'hidden'}, topntailAd.iFrame[0] );
                }, topntailAd.setTime); 
            },
            timeStartTailAd: function(){
                setTimeout(function() {
                    gno_ad.call('#mobile-leaderboard .tail', {'visibility': 'hidden'});
                    gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '50px'});
                }, topntailAd.setTime); 
            },
            scrollEvent: function(){
                var userAgent = navigator.userAgent || navigator.vendor || window.opera
                var scroll = $(this).scrollTop();
                gno_ad.call('#mobile-leaderboard', {'height': '', 'text-align': '', 'margin-bottom': ''} );
                gno_ad.call('#mobile-leaderboard .dfp_ad div', {'width': '100%'});

                window.onload = function(){
                    // alert(1);
                    if(topntailAd.scrollUp == true){
                        topntailAd.scrollUp = false;
                        gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '50px', 'width': '', 'top': '', 'right': '', 'left': '', 'bottom': '', 'position': 'relative', 'display': 'block'});
                        gno_ad.call('#mobile-leaderboard .d6fp_ad', {'position': '', 'z-index' : '', 'width': '','top':''} );
                        gno_ad.call('#mobile-leaderboard .tail', {'display': 'none'});
                        gno_ad.call('#mobile-leaderboard .dummy-top', {'display': 'none'});
                        gno_ad.call_child('#placeholder .leaderboard', {'display':'block'}, topntailAd.iFrame[0] );
                        // gno_ad.call_child('#placeholder .top', {'display':'none'}, topntailAd.iFrame[0] );
                    }
                }

                if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                    
                    // alert("iOS");
                    $(window).scroll(function() {
                        // alert(2);
                        if (scroll > position){
                            topntailAd.scrollDown = true;
                            topntailAd.scrollUp = false;
                            
                            if($(".navbar-inverse").css('display') === 'block'){
                                // gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '59px', 'width': '140px', 'top': '106px', 'right': '0px', 'left': '', 'bottom': '', 'z-index': '9999', 'position': 'fixed'});
                                gno_ad.call('#mobile-leaderboard .dummy-top', {'display': 'block'});
                                // gno_ad.call_child('#placeholder .top', {'visibility':'hidden'}, topntailAd.iFrame[0] );
                            }

                            if($('.tail').css('display') === 'block'){
                                gno_ad.call('#mobile-leaderboard .dummy-top', {'display': 'none'});
                            }

                            if($('.redline').css('display') === 'block'){
                                gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '70px', 'width': '160px', 'top': '60px', 'right': '0px', 'left': '', 'bottom': '', 'z-index': '9999', 'position': 'fixed'});
                                gno_ad.call('#mobile-leaderboard .dummy-top', {'visibility': 'hidden'});
                                gno_ad.call_child('#placeholder .top', {'display':'block'}, topntailAd.iFrame[0] );
                            }
                            
                            gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'fixed', 'z-index' : 5, 'width': '100%','top':'0'} );
                            // gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'relative', 'width': '100%','top':'0'} );
                            gno_ad.call('#mobile-leaderboard .tail', {'display': 'none'});
                            gno_ad.call_child('#placeholder .leaderboard', {'display':'none'}, topntailAd.iFrame[0] );

                            topntailAd.timeStartTopAd();
                        }else{
                            topntailAd.scrollUp = true;
                            topntailAd.scrollDown = false;

                            gno_ad.call('#mobile-leaderboard .tail', {'display': 'block'});
                            // gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'fixed', 'z-index' : 5, 'width': '100%','top':'0'} );
                            // gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'relative', 'width': '100%','top':'0'} );
                            gno_ad.call('#mobile-leaderboard .dummy-top', {'display': 'none'});
                            gno_ad.call_child('#placeholder .leaderboard', {'display':'none'}, topntailAd.iFrame[0] );
                            gno_ad.call_child('#placeholder .top', {'display':'none'}, topntailAd.iFrame[0] );
                            
                            topntailAd.timeStartTailAd();

                            
                        }
                            
                        if(window.scrollY == 0){
                            // alert(1);
                            if($('.tail').css('display') === 'block'){
                                gno_ad.call('#mobile-leaderboard .dummy-top', {'display': 'none'});
                                gno_ad.call_child('#placeholder .top', {'display':'none'}, topntailAd.iFrame[0] );
                            }
                            
                            gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '50px', 'width': '100%', 'top': '', 'z-index': '9999', 'position': 'relative'});
                            gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'relative', 'z-index' : 5, 'width': '100%'} );
                            gno_ad.call('#mobile-leaderboard .tail', {'display': 'block'});
                            gno_ad.call('#mobile-leaderboard .dummy-top', {'display': 'none'});
                            gno_ad.call_child('#placeholder .leaderboard', {'display':'block'}, topntailAd.iFrame[0] );
                            gno_ad.call_child('#placeholder .top', {'display':'none'}, topntailAd.iFrame[0] );

                            // topntailAd.timeStartTailAd();
                        }

                        position = scroll;

                        // console.log(scroll);
                    });
                }else{
                    // alert("android");
                     window.onscroll = function(){
                        // alert(2);
                        if (scroll > position){
                            topntailAd.scrollDown = true;
                            // topntailAd.scrollUp = false;
                            
                            if($(".navbar-inverse").css('display') === 'block'){
                                // gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '59px', 'width': '140px', 'top': '106px', 'right': '0px', 'left': '', 'bottom': '', 'z-index': '9999', 'position': 'fixed'});
                                gno_ad.call('#mobile-leaderboard .dummy-top', {'display': 'block'});
                                // gno_ad.call_child('#placeholder .top', {'visibility':'hidden'}, topntailAd.iFrame[0] );
                            }

                            if($('.redline').css('display') === 'block'){
                                gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '70px', 'width': '160px', 'top': '60px', 'right': '0px', 'left': '', 'bottom': '', 'z-index': '9999', 'position': 'fixed'});
                                gno_ad.call('#mobile-leaderboard .dummy-top', {'visibility': 'hidden'});
                                gno_ad.call_child('#placeholder .top', {'display':'block'}, topntailAd.iFrame[0] );
                            }
                            
                            gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'fixed', 'z-index' : 5, 'width': '100%','top':'0'} );
                            gno_ad.call('#mobile-leaderboard .tail', {'display': 'none'});
                            gno_ad.call_child('#placeholder .leaderboard', {'display':'none'}, topntailAd.iFrame[0] );

                            topntailAd.timeStartTopAd();
                        }else{
                            topntailAd.scrollUp = true;
                            gno_ad.call('#mobile-leaderboard .tail', {'display': 'block'});
                            gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'fixed', 'z-index' : 5, 'width': '100%','top':'0'} );
                            gno_ad.call('#mobile-leaderboard .dummy-top', {'display': 'none'});
                            gno_ad.call_child('#placeholder .leaderboard', {'display':'none'}, topntailAd.iFrame[0] );
                            gno_ad.call_child('#placeholder .top', {'display':'none'}, topntailAd.iFrame[0] );
                            
                            topntailAd.timeStartTailAd();
                            // topntailAd.isTailVisible = false;

                            if(scroll == 0){
                                gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '50px', 'width': '100%', 'top': '', 'z-index': '9999', 'position': 'relative'});
                                gno_ad.call('#mobile-leaderboard .dfp_ad', {'position': 'relative', 'z-index' : 5, 'width': '100%'} );
                                gno_ad.call('#mobile-leaderboard .tail', {'display': 'block'});
                                gno_ad.call('#mobile-leaderboard .dummy-top', {'display': 'none'});
                                gno_ad.call_child('#placeholder .leaderboard', {'display':'block'}, topntailAd.iFrame[0] );
                                gno_ad.call_child('#placeholder .top', {'display':'none'}, topntailAd.iFrame[0] );

                                // topntailAd.timeStartTailAd();
                            }
                        }

                        position = scroll;

                        console.log(scroll);

                    }
                }
                
            },
            init: function(){
                $("#mobile-leaderboard").css('height', $("#mobile-leaderboard .dfp_ad").height() + 'px');
                $(".mobile-leaderboard iframe").css('width', '100%');
                gno_ad.call('#mobile-leaderboard .dfp_ad div iframe:eq(0)', {'height': '50px', 'width': '100% !important', 'display': 'block','position': 'relative'});
                gno_ad.call('#mobile-leaderboard .tail', {'position': 'fixed', 'z-index': 50, 'bottom': '-5px', 'left': '-1px'} );
                gno_ad.call('#mobile-leaderboard .dummy-top', {'position': 'fixed', 'z-index': '9999', 'top': '106px', 'right': '0px'} );
                window.parent.addEventListener('scroll', topntailAd.scrollEvent, false); 
                topntailAd.scrollEvent();
            }
        };

        topntailAd.init();

    }
}

try {

    if (typeof gno_ad !== "undefined")
    {

        gno_ad = {
            call: function(obj, css) {

                window.parent.postMessage({
                    id: (obj ? obj : ''),
                    css: (css ? css : '')
                }, "*");

            },
            call_child: function(obj, css, frame){
                // console.info(frame.contentWindow);
                frame.contentWindow.postMessage({
                    id: (obj ? obj : ''),
                    css: (css ? css : '')
                }, "*");

            },
            event: function(event, eventHandler){
                window.parent.postMessage({
                    event: (event ? event : ''),
                    eventHandler: (eventHandler ? eventHandler : ''),
                }, "*");
            },
            listen_child: function(){
                window.addEventListener("message", function(e) {
                    if (typeof e.data.id != 'undefined' || typeof e.data.css != 'undefined') {
                        $(e.data.id).css(e.data.css);
                    }

                }, false);
            },
            listen: function() {
                if (!loadHomeFull) {
                    window.parent.addEventListener("message", function(e) {

                        if (typeof e.data.id != 'undefined' || typeof e.data.css != 'undefined') {

                            if (e.data.id == ".related_content_story") {
                                $(".related_content_holder").each(function(k, v) {
                                    if (parseInt($(v).find(e.data.id).length) > 3) {
                                        $(v).find(e.data.id).eq(3).css({"display": "none"});
                                    }
                                });

                            } else if (e.data.id == ".top_picks_hidden") {
                                $(e.data.id).removeClass('top_picks_hidden').css(e.data.css);

                            } else {
                                $(e.data.id).css(e.data.css);
                            }
                        }


                        if (typeof e.data.event != 'undefined' || typeof e.data.eventHandler != 'undefined') {
                            callbacks[e.data.eventHandler]();
                        }

                    }, false);

                }
            },

        }

    }

    else
        console.log("Cannot find the master variable");

} catch (e) {

    console.log(e);

}

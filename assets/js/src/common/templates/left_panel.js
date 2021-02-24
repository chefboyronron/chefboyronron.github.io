var LeftPanel = {
    options : {
        defaultSelected: 'about'
    },
    dom : {
        profileInformation : function() {
            var html = '';

            html += '<div class="mb40">';
                html += '<a href="' + Header.githubURL + '" target="_blank" class="thumbnail">';
                    html += '<img src="'+Header.image+'" alt="chefboyronron">';
                html += '</a>';
                html += '<h4 class="text-center">' + Header.author + '</h4>';
                html += '<h6 class="subheader text-center">' + Header.nickname + '</h6>';
            html += '</div>';
            return html;
        },
        navigation : function() {
            var html = '',
                currentPage = window.location.hash.replace('#', ''),
                menuCounter = 0;
            
            Header.menus.forEach(function(menu){
                if( currentPage !== menu.id) {
                    menuCounter++;
                }
            });

            html += '<div class="desktop-nav">';
                html += '<ul class="vertical tabs" data-tabs id="chefboy-tabs">';
                    Header.menus.forEach(function(menu, i){

                        if( currentPage !== '' && menuCounter != Header.menus.length ) {
                            LeftPanel.options.defaultSelected = currentPage;
                        }

                        if( menu.id === LeftPanel.options.defaultSelected ) {
                            html += '<li class="content-selector menu-text tabs-title is-active"><a href="#' + menu.id + '" class="' + menu.id + '-label" aria-selected="true" data-toggle>' + menu.name + '</a></li>';
                        } else {
                            html += '<li class="content-selector menu-text tabs-title"><a href="#' + menu.id + '" class="' + menu.id + '-label">' + menu.name + '</a></li>';
                        } 
                    });
                html += '</ul>';
            html += '</div>';

            return html;
        },
        copyright : function() {
            var html = '';

            html += '<h6 class="text-center mt100">';
                html += '<small>Made with VanilaJS and Foundation CSS Framework &copy; ' + new Date().getFullYear() + '</small>';
            html += '</h6>';

            return html;
        }
    },

    event : {
        routeUrl : function() {
            var self = LeftPanel,
                link = '',
                elements = Header.menus;
            
            
            if( elements.length > 0 ) {
                var buttons = [].slice.call(elements);

                buttons.forEach(function(button){

                    link = document.getElementsByClassName(button.id + '-label');
                    var btn = [].slice.call(link);

                    if( link !== null ) {

                        btn.forEach(function(elem){
                            elem.addEventListener('click',function(e){
                                var gaCounter = 0;
                                // Set Page title
                                var page = e.srcElement.attributes['aria-controls'].value;
                                document.title = Header.author + ' | ' + page[0].toUpperCase() + page.slice(1);
                                window.history.pushState({"pageTitle": Header.author + ' | ' + 'Page title'}, "", '#' + page);

                                // Handle navigation menu to set same selected value
                                var menus = document.getElementsByClassName(page + '-label');
                                var pageMenus = [].slice.call(menus);
                                pageMenus.forEach(function(navs){
                                    if( navs.attributes['aria-selected'].value == 'false') {
                                        navs.click();
                                        gaCounter++;
                                    }
                                });

                                if( gaCounter === 2 ) {
                                    // GA Event
                                    if( typeof gtag !== 'undefined') {
                                        gtag('event', 'clicks', {
                                            'event_category': 'Menu clicked',
                                            'event_label': page
                                        });
                                    }
                                }
                            });
                        });
                    }
                });
            }
        }
    },

    render : {
        leftPanel : function() {
            var html = LeftPanel.dom.profileInformation();
            html += LeftPanel.dom.navigation();
            html += LeftPanel.dom.copyright();
            document.getElementById('left-panel').innerHTML = html;
        }
    },

    init : function() {
        var self = LeftPanel;
        $.when(self.render.leftPanel()).then(function(){
            self.event.routeUrl();
        });
    }
}

document.addEventListener('DOMContentLoaded', LeftPanel.init);
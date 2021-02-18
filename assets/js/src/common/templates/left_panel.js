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
                            html += '<li class="content-selector menu-text tabs-title is-active"><a href="#' + menu.id + '" aria-selected="true" data-toggle>' + menu.name + '</a></li>';
                        } else {
                            html += '<li class="content-selector menu-text tabs-title"><a href="#' + menu.id + '">' + menu.name + '</a></li>';
                        } 
                    });
                html += '</ul>';
            html += '</div>';

            return html;
        },
        copyright : function() {
            var html = '';

            html += '<h6 class="text-center mt100">';
                html += '<small>Made with VanilaJS and Foundation CSS Framework &copy; 2020</small>';
            html += '</h6>';

            return html;
        }
    },

    event : {
        routeUrl : function() {
            var self = LeftPanel;
            
            var elements = document.getElementsByClassName('content-selector');
            
            if( elements.length > 0 ) {
                var buttons = [].slice.call(elements);

                buttons.forEach(function(elem){
                    var link = elem.querySelector('a');
                    if( link !== null ) {
                        link.addEventListener('click',function(e){
                            var page = e.srcElement.attributes['aria-controls'].value;
                            document.title = Header.author + ' | ' + page[0].toUpperCase() + page.slice(1);
                            window.history.pushState({"pageTitle": Header.author + ' | ' + 'Page title'}, "", '#' + page);
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
        self.render.leftPanel();
        self.event.routeUrl();
    }
}

document.addEventListener('DOMContentLoaded', LeftPanel.init);
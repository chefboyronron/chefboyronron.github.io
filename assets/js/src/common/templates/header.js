var Header = {
    target : document.getElementById('navigation-menu'),
    author : 'Ron Seminiano',
    nickname : 'Manila Philippines',
    githubURL : 'https://github.com/chefboyronron',
    image : 'https://avatars3.githubusercontent.com/u/17059001?s=460&u=0727ff237b0c12484b88075658bd25a7e459346d&v=4',
    menus : [
        { id: 'about', name: 'About Me', content: ''},
        { id: 'experience', name: 'Experience', content: '' },
        { id: 'education', name: 'Education', content: '' },
        { id: 'skills', name: 'Skills', content: '' },
        { id: 'information', name: 'Additional Information', content: '' }
    ],
    loadingMessage : '<div class="loading">Please wait, while preparing the content to load.</div>',
    dom : {
        navigation : function() {
            var self = Header,
                html = '',
                currentPage = window.location.hash.replace('#', ''),
                menuCounter = 0;
            
            Header.menus.forEach(function(menu){
                if( currentPage !== menu.id) {
                    menuCounter++;
                }
            });

            html += '<div class="title-bar" data-responsive-toggle="chefboy-menu" data-hide-for="medium">';
                html += '<button class="menu-icon" type="button" data-toggle></button>';
                html += '<div class="title-bar-title title-bar-right"><span class="">RON</span> <span class="text-primary">SEMINIANO</span></div>';
            html += '</div>';
            
            html += '<div class="top-bar mobile-nav" id="chefboy-menu">';
                html += '<div class="top-bar-left">';
                    html += '<ul class="vertical tabs medium-horizontal" data-tabs id="chefboy-tabs">';
                        self.menus.forEach(function(menu, i){

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
            html += '</div>';
            return html;
        }
    },
    render : {
        navigation : function() {
            var self = Header;
            self.target.innerHTML = self.dom.navigation();
        }
    },
    event : {
        toggleMenu : function() {

            var mobileNavBtn = document.getElementsByClassName('content-selector');

            if( mobileNavBtn.length > 0 ) {

                var mobileMenu = [].slice.call(mobileNavBtn);

                mobileMenu.forEach(function(elem){
                    var remove_btn = elem.querySelector('a');
                    if( remove_btn !== null ) {
                        remove_btn.addEventListener('click',function(e){

                            // Set Page title
                            var page = e.srcElement.attributes['aria-controls'].value;
                            document.title = Header.author + ' | ' + page[0].toUpperCase() + page.slice(1);
                            window.history.pushState({"pageTitle": Header.author + ' | ' + 'Page title'}, "", '#' + page);

                            // Hide mobile nav on item click
                            document.querySelector('.mobile-nav').style.display = 'none';

                            // Handle navigation menu to set same selected value
                            var menus = document.getElementsByClassName(page + '-label');
                            var pageMenus = [].slice.call(menus);
                            pageMenus.forEach(function(btn){
                                btn.click();
                            });
                        });
                    }
                 });
            }
        }
    },
    init : function() {
        var self = Header;
        self.render.navigation();
        self.event.toggleMenu();
    }
}

document.addEventListener('DOMContentLoaded', Header.init);
const { gtag, install } = require("ga-gtag");
const $ = require('jquery');

export class LeftPanel {

    private header: any;

    constructor(Header: object) {
        this.header = Header;
        this.init();
    }

    options = {
        defaultSelected: 'about'
    };

    profileInformation = () => {
        var html = '',
            self = this;

        console.log();

        html += '<div class="mb40">';
            html += '<a href="' + self.header.githubURL + '" target="_blank" class="thumbnail">';
                html += '<img src="'+self.header.image+'" alt="chefboyronron">';
            html += '</a>';
            html += '<h4 class="text-center">' + self.header.author + '</h4>';
            html += '<h6 class="subheader text-center">' + self.header.nickname + '</h6>';
        html += '</div>';
        return html;
    }

    navigation = () => {
        var html = '',
            self = this,
            currentPage = window.location.hash.replace('#', ''),
            menuCounter = 0;
        
        self.header.menus.forEach(function(menu:any){
            if( currentPage !== menu.id) {
                menuCounter++;
            }
        });

        html += '<div class="desktop-nav">';
            html += '<ul class="vertical tabs" data-tabs id="chefboy-tabs">';
                self.header.menus.forEach(function(menu:any, i:any){

                    if( currentPage !== '' && menuCounter != self.header.menus.length ) {
                        self.options.defaultSelected = currentPage;
                    }

                    if( menu.id === self.options.defaultSelected ) {
                        html += '<li class="content-selector menu-text tabs-title is-active"><a href="#' + menu.id + '" class="' + menu.id + '-label" aria-controls="' + menu.id + '" aria-selected="true" data-toggle>' + menu.name + '</a></li>';
                    } else {
                        html += '<li class="content-selector menu-text tabs-title"><a href="#' + menu.id + '" class="' + menu.id + '-label" aria-controls="' + menu.id + '">' + menu.name + '</a></li>';
                    } 
                });
            html += '</ul>';
        html += '</div>';

        return html;
    }

    copyright = () => {
        var html = '';

        html += '<h6 class="text-center mt100">';
            html += '<small>Made with Typescript, webpack and Foundation CSS Framework &copy; ' + new Date().getFullYear() + '</small>';
        html += '</h6>';

        return html;
    }

    routeUrl = () => {
        var self = this,
            link = '',
            elements = self.header.menus;
        
        
        if( elements.length > 0 ) {
            var buttons = [].slice.call(elements);

            buttons.forEach(function(button:any){

                let link = document.getElementsByClassName(button.id + '-label');
                var btn = [].slice.call(link);

                if( link !== null ) {

                    btn.forEach(function(elem: any){
                        elem.addEventListener('click',function(e: any){
                            var gaCounter = 0;
                            // Set Page title
                            var page = (e.srcElement.attributes['aria-controls'] as HTMLInputElement).value;
                            document.title = self.header.author + ' | ' + page[0].toUpperCase() + page.slice(1);
                            window.history.pushState({"pageTitle": self.header.author + ' | ' + 'Page title'}, "", '#' + page);

                            // Handle navigation menu to set same selected value
                            var menus = document.getElementsByClassName(page + '-label');
                            var pageMenus = [].slice.call(menus);
                            pageMenus.forEach(function(navs: any){
                                if( (navs.attributes['aria-selected'] as HTMLInputElement).value == 'false') {
                                    navs.click();
                                    gaCounter++;
                                }
                            });

                            if( gaCounter === 0 ) {
                                // GA Event
                                if( typeof gtag !== 'undefined') {
                                    gtag('event', 'clicks', {
                                        'event_category' : 'Menu clicked',
                                        'event_label' : page,
                                        'send_to':'UA-190521278-1'
                                    });
                                    gtag('config', 'UA-190521278-1', {
                                        'page_path': '/#' + page,
                                        'send_to':'UA-190521278-1'
                                    });
                                }
                            }
                        });
                    });
                }
            });
        }
    }

    panel = () => {
        var html = this.profileInformation();
        html += this.navigation();
        html += this.copyright();
        document.getElementById('left-panel').innerHTML = html;
    }

    init = () => {
        var self = this;
        $.when(this.panel()).then(function(){
            self.routeUrl();
        });
    }
}
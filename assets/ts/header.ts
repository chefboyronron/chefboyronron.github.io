import { LeftPanel } from './left-panel';

export class Header  {
    public target = document.getElementById('navigation-menu');
    public author = 'Ron Seminiano';
    public nickname = 'Manila Philippines';
    public githubURL = 'https://github.com/chefboyronron';
    public image = 'https://avatars3.githubusercontent.com/u/17059001?s=460&u=0727ff237b0c12484b88075658bd25a7e459346d&v=4';
    public menus = [
        { id: 'about', name: 'About Me', content: ''},
        { id: 'experience', name: 'Experience', content: '' },
        { id: 'education', name: 'Education', content: '' },
        { id: 'skills', name: 'Skills', content: '' },
        // { id: 'portfolio', name: 'Projects', content: '' }
    ];
    public loadingMessage = '<div class="loading">Please wait, while preparing the content to load.</div>';

    public leftpanel: any;

    constructor() {
        this.leftpanel = new LeftPanel(this);
        this.init();
    }

    navigationDOM = () => {
        var self = this,
            html = '',
            currentPage = window.location.hash.replace('#', ''),
            menuCounter = 0;

        self.menus.forEach(function(menu){
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

                        if( currentPage !== '' && menuCounter != self.menus.length ) {
                            self.leftpanel.options.defaultSelected = currentPage;
                        }

                        if( menu.id === self.leftpanel.options.defaultSelected ) {
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

    navigation = () => {
        var self = this;
        self.target.innerHTML = self.navigationDOM();
    }

    toggleMenu = () => {

        let self = this,
            mobileNavBtn = self.menus,
            link = '';

        if( mobileNavBtn.length > 0 ) {
            var mobileMenu = [].slice.call(mobileNavBtn);

            mobileMenu.forEach( (button:any) => {

                let link = document.getElementsByClassName(button.id + '-label');
                var btn = [].slice.call(link);

                if( link !== null ) {
                    btn.forEach(function(elem: any){
                        elem.addEventListener('click',function(e:any){
                            // Set Page title
                            var page = e.srcElement.attributes['aria-controls'].value;
                            document.title = self.author + ' | ' + page[0].toUpperCase() + page.slice(1);
                            window.history.pushState({"pageTitle": self.author + ' | ' + 'Page title'}, "", '#' + page);

                            // Hide mobile nav on item click
                            (document.querySelector('.mobile-nav') as HTMLInputElement).style.display = 'none';

                            // Handle navigation menu to set same selected value
                            var menus = document.getElementsByClassName(page + '-label');
                            var pageMenus = [].slice.call(menus);
                            pageMenus.forEach(function(navs: any){
                                if( navs.attributes['aria-selected'].value == 'false') {
                                    navs.click();
                                }
                            });
                        });
                    });
                }
            });
        }
    }

    init = () => {
        var self = this;
        self.navigation();
        self.toggleMenu();
    }
}

let $ = require('jquery');

export class Content {

    private header: any;
    private leftpanel: any;
    private utility: any;

    constructor(Header: object, LeftPanel: object, Utility: object) {
        this.header = Header;
        this.leftpanel = LeftPanel;
        this.utility = Utility;
        this.init();
    }

    main_contentDOM = () => {
        var self = this,
            html = '',
            currentPage = window.location.hash,
            menuCounter = 0;

        self.header.menus.forEach(function(menu: any){
            if( currentPage !== menu.id) {
                menuCounter++;
            }
        });

        html += '<div class="tabs-content vertical" data-tabs-content="chefboy-tabs">';

        this.header.menus.forEach(function(menu: any ,i: any){

            if( currentPage !== '' && menuCounter != self.header.menus.length ) {
                self.leftpanel.options.defaultSelected = currentPage;
            }

            if( menu.id === self.leftpanel.options.defaultSelected ) {
                var output = self.httpRequest(i, menu.id);
                html += '<div class="tabs-panel is-active" id="' + menu.id + '">' + self.header.loadingMessage + '</div>';
            } else {
                var output = self.httpRequest(i, menu.id);
                html += '<div class="tabs-panel" id="' + menu.id + '">' + self.header.loadingMessage + '</div>';
            }
        });

        html += '</div>';

        return html;
    }

    map = (mapContainer: any) => {
        var html = '',
            self = this,
            endpoint = 'https://maps.google.com/maps?q=st%20jude%20college%20philippines&t=&z=17&ie=UTF8&iwloc=&output=embed',
            height = (self.utility.isMobile()) ? '300px' : '400px';

        html += '<div class="mapouter">';
            html += '<div class="gmap_canvas">';
                html += '<iframe id="sjc_map" height="'+ height +'" src="' + endpoint + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';
            html += '</div>';
        html += '</div>';

        mapContainer.innerHTML = html;
    }

    main_content = () => {
        let self = this,
            content = document.getElementById('content');

        content.innerHTML =  self.main_contentDOM();
    }

    httpRequest = (index: any, id: any) => {

        let self = this;

        return new Promise( function(resolve, reject) {
            let xhr = new XMLHttpRequest,
                output = '';

            xhr.open('GET', self.utility.base_url + self.utility.segments + 'contents/' + id + '.html', true);

            xhr.onload = function() {
                if( xhr.status === 200 && xhr.readyState === 4 ) {
                    self.header.menus[index].content = xhr.responseText;
                    resolve(xhr.responseText);
                }
                if( xhr.status === 404 ) {
                    self.header.menus[index].content = xhr.status;
                    reject(xhr.responseText);
                }
            }
            xhr.send();

        });
        
    }

    init = () => {
        var self = this;
        $.when(self.main_content()).then(function(){
            setTimeout(function(){
                $.when(
                    self.header.menus.forEach(function(menu: any){
                        var container = document.getElementById(menu.id);
                        container.innerHTML = menu.content;
                    })
                ).then(function(){
                    var mapContainer = document.getElementById('map-container');
                    mapContainer.innerHTML = 'Rendering Map, Please wait...';
                    self.map(mapContainer);
                })
            },2000);
        });
    }
}
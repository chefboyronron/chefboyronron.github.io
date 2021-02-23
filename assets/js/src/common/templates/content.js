var Content = {
    dom : {
        main_content: function() {
            var self = Content,
                html = '',
                currentPage = window.location.hash,
                menuCounter = 0;

            Header.menus.forEach(function(menu){
                if( currentPage !== menu.id) {
                    menuCounter++;
                }
            });

            html += '<div class="tabs-content vertical" data-tabs-content="chefboy-tabs">';

            Header.menus.forEach(function(menu ,i){

                if( currentPage !== '' && menuCounter != Header.menus.length ) {
                    LeftPanel.options.defaultSelected = currentPage;
                }

                if( menu.id === LeftPanel.options.defaultSelected ) {
                    var output = self.httpRequest(i, menu.id);
                    html += '<div class="tabs-panel is-active" id="' + menu.id + '">' + Header.loadingMessage + '</div>';
                } else {
                    var output = self.httpRequest(i, menu.id);
                    html += '<div class="tabs-panel" id="' + menu.id + '">' + Header.loadingMessage + '</div>';
                }
            });

            html += '</div>';

            return html;
        },

        map : function(mapContainer) {
            var html = '',
                endpoint = 'https://maps.google.com/maps?q=st%20jude%20college%20philippines&t=&z=17&ie=UTF8&iwloc=&output=embed',
                height = (Utility.isMobile()) ? '300px' : '400px';

            html += '<div class="mapouter">';
                html += '<div class="gmap_canvas">';
                    html += '<iframe id="sjc_map" height="'+ height +'" src="' + endpoint + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';
                html += '</div>';
            html += '</div>';

            mapContainer.innerHTML = html;
        }
    },

    render : {
        main_content : function() {
            var self = Content,
                content = document.getElementById('content');

            content.innerHTML =  self.dom.main_content();
        }
    },

    httpRequest : function(index, id) {

        return new Promise( function(resolve, reject) {
            var xhr = new XMLHttpRequest
            output = '';

            xhr.open('GET', Utility.base_url + Utility.segments + 'contents/' + id + '.html', true);

            xhr.onload = function() {
                if( xhr.status === 200 && xhr.readyState === 4 ) {
                    Header.menus[index].content = xhr.responseText;
                    resolve(xhr.responseText);
                }
                if( xhr.status === 404 ) {
                    Header.menus[index].content = xhr.status;
                    reject(xhr.responseText);
                }
            }
            xhr.send();

        });
        
    },

    init : function() {
        var self = Content;
        $.when(self.render.main_content()).then(function(){
            setTimeout(function(){
                $.when(
                    Header.menus.forEach(function(menu){
                        var container = document.getElementById(menu.id);
                        container.innerHTML = menu.content;
                    })
                ).then(function(){
                    var mapContainer = document.getElementById('map-container');
                    mapContainer.innerHTML = 'Rendering Map, Please wait...';
                    self.dom.map(mapContainer);
                })
            },2000);
        });
    }
}

document.addEventListener('DOMContentLoaded', Content.init);
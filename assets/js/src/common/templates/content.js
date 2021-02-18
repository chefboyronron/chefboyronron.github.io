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
                    var output = Content.httpRequest(i, menu.id);
                    html += '<div class="tabs-panel is-active" id="' + menu.id + '">' + Header.loadingMessage + '</div>';
                } else {
                    var output = Content.httpRequest(i, menu.id);
                    html += '<div class="tabs-panel" id="' + menu.id + '">' + Header.loadingMessage + '</div>';
                }
            });

            html += '</div>';

            return html;
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
                Header.menus.forEach(function(menu){
                    var container = document.getElementById(menu.id);
                    container.innerHTML = menu.content;
                });
            },5000);
        });
    }
}

document.addEventListener('DOMContentLoaded', Content.init);
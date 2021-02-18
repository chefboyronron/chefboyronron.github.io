var ThemeSwitcher = {
    dom : {
        darkmodeSwitcher : function() {
            var html = '';

            html += '<input class="switch-input" id="theme-switcher" type="checkbox" name="chefboy-theme" value="light">';
            html += '<label class="switch-paddle" for="theme-switcher">';
                html += '<span class="show-for-sr">Tiny Sandwiches Enabled</span>';
            html += '</label>';

            return html;
        }
    },

    render : {
        darkmodeSwitcher : function() {
            var self = ThemeSwitcher,
                container = document.getElementById('chefboy-theme-switcher');
            container.innerHTML = self.dom.darkmodeSwitcher();
        }
    },

    handler : {
        ThemeSwitcher : function() {
            var input = document.getElementById('theme-switcher'),
                body = document.getElementsByTagName('body');

            input.addEventListener('click', function(e){
                if( this.value == 'light' ) {
                    input.value = 'dark';
                    body[0].classList.remove('light');
                    body[0].classList.add('dark');
                } else {
                    input.value = 'light';
                    body[0].classList.remove('dark');
                    body[0].classList.add('light');
                }
            });
        }
    },

    init : function() {
        var self = ThemeSwitcher;
        self.render.darkmodeSwitcher();
        self.handler.ThemeSwitcher();
    }
}

document.addEventListener('DOMContentLoaded', ThemeSwitcher.init);
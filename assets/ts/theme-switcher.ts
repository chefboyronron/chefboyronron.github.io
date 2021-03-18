export class ThemeSwitcher {

    private store: any;
    
    constructor(Store: object) {
        this.store = Store;
        this.init();
    }

    darkmodeSwitcherDOM = () => {
        var html = '';

        html += '<input class="switch-input" id="theme-switcher" type="checkbox" name="chefboy-theme" value="light">';
        html += '<label class="switch-paddle" for="theme-switcher">';
            html += '<span class="show-for-sr">Tiny Sandwiches Enabled</span>';
        html += '</label>';

        return html;
    }

    darkmodeSwitcher = () =>     {
        var container = document.getElementById('chefboy-theme-switcher');
        container.innerHTML = this.darkmodeSwitcherDOM();
    }

    ThemeSwitcher = () => {
        var input = document.getElementById('theme-switcher') as HTMLInputElement,
            body = document.getElementsByTagName('body'),
            self = this;

        var theme = self.store.getValue('theme');
        var selected = (theme === null) ? 'light' : theme;

        body[0].classList.remove('light');
        body[0].classList.remove('dark');
        body[0].classList.add(selected);
        if( theme === 'dark' ) {
            input.setAttribute('checked', 'checked');
        }
        input.value = selected;

        input.addEventListener('click', function(e){
            if( this.value == 'light' ) {
                input.value = 'dark';
                body[0].classList.remove('light');
                body[0].classList.add('dark');
                self.store.addValue([{'key' : 'theme', 'value' : 'dark'}]);
            } else {
                input.value = 'light';
                body[0].classList.remove('dark');
                body[0].classList.add('light');
                self.store.addValue([{'key' : 'theme', 'value' : 'light'}]);
            }
        });
    }

    init = () => {
        this.darkmodeSwitcher();
        this.ThemeSwitcher();
    }
}
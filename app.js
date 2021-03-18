require('./assets/scss/main.scss');
import { Utility } from './assets/ts/common';
import { Store } from './assets/ts/local-storage';
import { Header } from './assets/ts/header';
import { LeftPanel } from './assets/ts/left-panel';
import { Content } from './assets/ts/content';
import { ThemeSwitcher } from './assets/ts/theme-switcher';
import { Foundation } from 'foundation-sites';
import jquery from 'jquery';

window.jQuery = jquery;
window.$ = jquery;
Foundation.addToJquery($);
jQuery(document).ready($ => ($(document).foundation()));

let utility = new Utility();
let store = new Store();
let header = new Header();
let leftpanel = new LeftPanel(header);
let content = new Content(header, leftpanel, utility);
let themeswitcher = new ThemeSwitcher(store);
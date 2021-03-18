export class Utility {

    public base_url = window.location.origin;
    public segments = window.location.pathname
    public defaultMobileSize = 600;

    constructor(){
        this.autoload();
    }

    isMobile = (width = 'undefined') => {
        var winWidth = window.innerWidth,
            maxWidthMobile = (typeof width === 'undefined' ? this.defaultMobileSize : width),
            isMobile = false;
            
            if (winWidth <= maxWidthMobile) {
                isMobile = true;
            }
        return isMobile;
    }

    fundationLibrary = () => {
        let $ = require('jquery');
        $(document).foundation();
    }

    autoload = () => {
        this.fundationLibrary();
    }

}
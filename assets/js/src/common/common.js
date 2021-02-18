var Utility = {
    base_url : window.location.origin,
    segments : window.location.pathname,
    defaultMobileSize: 600,
    isMobile: function(width) {

        var winWidth = window.innerWidth,
            maxWidthMobile = (typeof width === 'undefined' ? Utility.defaultMobileSize : width),
            isMobile = false;
            
            if (winWidth <= maxWidthMobile) {
                isMobile = true;
            }
        return isMobile;
    },
    fundationLibrary : function() {
        $(document).foundation();
    },
    autoload : function() {
        Utility.fundationLibrary();
    }
}

document.addEventListener('DOMContentLoaded', Utility.autoload);
var Store = {
    
    addValue : function(obj) {
        // Usage Store.addValue([{'key':'theme', 'value':'dark'}]);
        obj.map(function(item){
            localStorage.setItem(item.key, item.value);
        });
    },

    getValue : function(key) {
        var value = localStorage.getItem(key);
        return value;
    }
}

// document.addEventListener('DOMContentLoaded', Store.init);
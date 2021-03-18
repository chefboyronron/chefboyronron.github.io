export class Store {
    addValue = (obj: any) => {
        // Usage Store.addValue([{'key':'theme', 'value':'dark'}]);
        obj.map(function(item: any){
            localStorage.setItem(item.key, item.value);
        });
    }

    getValue = (key: any) => {
        var value = localStorage.getItem(key);
        return value;
    }
}
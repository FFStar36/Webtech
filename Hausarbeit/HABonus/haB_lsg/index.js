function foldRight(reducer) {
    if (this.length < 1) return null;
    else if (this.length==1) return this[0];
    let i = this.length - 1;
    value = this[i--];
    for(; i >= 0; i--){
        value = reducer(this[i], value);
    }
    return value;
}

Array.prototype.foldRight = foldRight

function calculateCost(list) {
    return list.map((a) => {
        let x = a.ordered == "None" ? 0 : a.ordered;
        let y = a.capacity - (a.inStock * a.size + x * a.size);
        return y * a.price
    }).reduce((a,b) => Math.round((a + b)*100)/100, 0)
}
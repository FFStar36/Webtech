function fib(n){
    var fn0 = 0;
    var fn1 = 1;
    var result = 0;
    if(!n) return 0;
    else if (n==1) return 1;
    else {
        for(var i=2; i<=n; i++){
            result = fn0 + fn1;
            fn0 = fn1;
            fn1 = result;
        }
    }
    return result;
}

function rfib(n){
    if(!n) return 0;
    if(n==1) return 1;
    if(n>=2) return rfib(n-1)+rfib(n-2);
}

console.log("Konventionell: " + fib(8));
console.log("Rekursiv: " + rfib(8));
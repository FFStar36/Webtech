var data = [
    { id: "a01-01", cmd: "one.foldRight((a,b)=>b+a)", expected:'"corona"'},
    { id: "a01-02", cmd: "two.foldRight((a,b)=>a/b)", expected:40},
    { id: "a01-03", cmd: "three.foldRight((a,b)=>a*b)", expected:null},
    { id: "a01-04", cmd: "four.foldRight((a,b)=>b/a)", expected:'"correct!"'},
    { id: "a02-01", cmd: "calculateCost(stock)", expected:165.45},
    { id: "a02-02", cmd: "calculateCost(stock.filter((a) => a.type === 'Beer'))", expected:41.12},
    { id: "a02-03", cmd: "calculateCost(stock.filter((a) => a.type === 'Soft Drink'))", expected:16.02},
    { id: "a02-04", cmd: "calculateCost(stock.filter((a) => a.type === 'Liquor'))", expected:108.31},
    
]
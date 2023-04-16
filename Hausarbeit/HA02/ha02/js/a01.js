function multiply(number1, number2) {
  if(number2 == undefined){
    return number1;
  }else {
    return number1 * number2;
  }
}

function multiplyAll(...parameters) {
  let result = 1;
  for(let i = 0; i < parameters.length; i++){
    result *= parameters[i];
  }
  return result;
}
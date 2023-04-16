let object = {
  a: "hund", b: "katze", c: "maus", d: "elefant", e: "schlange", f: "stachelschwein", g: "affe", h: "giraffe"
}

function addObjectElement(key, value) {
  key = checkName(key);
  let objectCopy = {...object, [key]: value};
  return objectCopy;
}

function checkName(key){
  let originalKey = key;
  let counter = 1;
  while(true){
    if(object.hasOwnProperty(key)){
      key = originalKey + "_" + counter;
    }else{
      break;
    }
    counter++;
  }
  return key;
}

function getObjectElements(keys) {
  let result = [];
  for(let i = 0; i < keys.length; i++){
    if(object.hasOwnProperty(keys[i])){
      result.push(object[keys[i]])

    }else{
      result.push("not found")
    }
  }
  return result;
}

function deleteObjectElements(keys) {
  let objectCopy = Object.assign({}, object)
  for(let i = 0; i < keys.length; i++){
    if(object.hasOwnProperty(keys[i])){
      delete objectCopy[keys[i]];
    }
  }
  return objectCopy;
}
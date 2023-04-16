let array = ["hund", "katze", "maus", "elefant", "schlange", "stachelschwein", "affe", "giraffe"];

function addArrayElement(element) {
  let arrayCopy = [...array];
  if(!arrayCopy.includes(element)){
    arrayCopy.push(element);
  }
  return arrayCopy;
}

function getArrayElements(number, startIndex) {
  let result = [];
  startIndex = startIndex % array.length;
  for(let i = startIndex; i < array.length; i++){
    if(i - startIndex < number){
      result.push(array[i])
    }
    else {
      break;
    }
  }
  return result;
}

function deleteArrayElements(number, startIndex, everyIth) {
  let arrayCopy = [...array];
  let removedItems = [];
  startIndex = startIndex % arrayCopy.length;
  for(let i = startIndex; i < arrayCopy.length; i++) {
    if (i == startIndex) {
      removedItems.push(arrayCopy[i]);
      arrayCopy[i] = null;
    } else if ((i - startIndex) % everyIth == 0 && (i - startIndex) < number) {
      removedItems.push(arrayCopy[i]);
      arrayCopy[i] = null;
    }
  }
  return {
    newResult: arrayCopy,
    removedItems: removedItems
  };
}
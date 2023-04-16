var message = "message"; // Die zu verschleiernde Nachricht.
var messageLength = message.length; // Die Länge der zu verschleiernden Nachricht.
var encoded = "";

for (var i = 1; i < messageLength; i++) {
  var hexChar = "0x" + message.charCodeAt(i).toString(16);
  encoded += hexChar;
}

var buffer = encoded.split("0x");
console.log(buffer);
var bufferLength = buffer.length;
var decoded = "";

for (var i = 1; i < bufferLength; i++) {
  var strChar = String.fromCharCode(parseInt(buffer[i], 16))
  decoded += strChar;
}

console.log(message, encoded, decoded);
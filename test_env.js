var window = {};
var document = {};
// Mocks
var cantosDB = {};
window.cantosDB = cantosDB;

// Read saas.js and motor_nodos.js
// Since jsc has no FS api by default, I will use python to concat them first!

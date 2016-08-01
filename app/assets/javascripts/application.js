
require('style-grid');
require('_stylesheets/application.styl');
let template = require('jade!_templates/body.jade');

let doc = document.querySelector('#document');

doc.innerHTML = template();

console.log('Welcome to lesson!');

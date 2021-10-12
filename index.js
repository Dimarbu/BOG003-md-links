#!/usr/bin/env node

const mdLinks = require('./md-links.js');
const path = require('path');

let route = process.argv[2];  //Obtiene la ruta 
route = path.normalize(route);
route = path.resolve(route);

let options = {
    validate: false,
    stats: false
}

const validateOptions = () => {
    if (process.argv.includes('--validate')) {
        options.validate = true;
        console.log(options.validate + ' soy --validate');
    }
    if (process.argv.includes('--stats')) {
        options.stats = true;
        console.log(options.stats + ' soy --stats');
    }
};
validateOptions();

//const route = 'C:/Users/Diana/Documentos/Laboratoria/MD-Links/BOG003-md-links/README.md';

mdLinks(route, options).then((res) => {

    console.log(res, 'Respuesta final');
});

module.exports = mdLinks;
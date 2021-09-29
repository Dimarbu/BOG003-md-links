#!/usr/bin/env node

// const mdLinks = require('./index.js');
const path = require('path');


let route = process.argv[2];  //Obtiene la ruta 
route = path.normalize(route);
console.log(route);

let options = {
    validate: false,
    stats: false
}

console.log(process.argv);


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



const somePath = route;  //Resuelve la ruta a absoluta
const resolvedPath = path.resolve(somePath);
console.log(resolvedPath + ' Ruta resuelta');



// mdLinks(route, options).then((response) => {

// });

// C:/Users/Diana/Documentos/Laboratoria/MD-Links/BOG003-md-links/README.md

// mdLinks('\Users\Diana\Documentos\Laboratoria\MD Links\BOG003-md-links\README.md');

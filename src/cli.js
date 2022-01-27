#!/usr/bin/env node
const mdLinks = require('./md-links.js');
const path = require('path');

console.log(` 
            📂     WELCOME TO MD-LINKS LIBRARY     📂
             ❕  DESARROLLADO POR DIANA BUITRAGO  ❕           
                                                            `);

let route = process.argv[2];  //Obtiene la ruta 
route = path.normalize(route);
route = path.resolve(route);

let options = {
    validate: false,
    stats: false
}

/* const validateOptions = () => { */
if (process.argv.includes('--validate' || '--v')) {
    options.validate = true;
    /* mdLinks(route, options)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    console.log(options.validate + ' soy --validate'); */
}
if (process.argv.includes('--stats')) {
    options.stats = true;
    //console.log(options.stats + ' soy --stats');
}

/* };
validateOptions(); */


/* mdLinks(route, options).then((res) => {

    if (options.validate && !options.stats) {
        let linksValidate = res.map((elemento) => chalk.black.bgGray(elemento.File) + " " + chalk.cyan(elemento.URL) + " " + chalk.white.bgRed(elemento.status) + " " + chalk.black.bgYellow(elemento.statusNumber) + " " + chalk.whiteBright(elemento.Text))
        return console.log(linksValidate.join("\n "));

    } else if (options.stats && !options.validate) {
        for (const i in res) {
            console.log(chalk.bgGray(`Archivo: ${res[i].File}`) + " " + chalk.cyanBright(`Links Unicos: ${res[i].Unique}`) + " " + chalk.redBright(`Links Totales: ${res[i].Total}`));
        };

    } else if (options.validate && options.stats) {
        for (const i in res) {
            console.log(chalk.bgGray(`Archivo: ${res[i].File}`) + " " + chalk.cyanBright(`Links Unicos: ${res[i].Unique}`) + " " + chalk.redBright(`Links Totales: ${res[i].Total}`) + " " + chalk.greenBright(`Links rotos: ${res[i].Broken}`));
        };

    } else if (process.argv[3] && process.argv[4] != options) {
        console.log(chalk.greenBright('Ingresa una opcion valida por favor'));

    } else if (options) {
        let links = res.map((elemento) => chalk.black.bgGray(elemento.File) + " " + chalk.cyanBright(elemento.URL) + " " + chalk.whiteBright(elemento.Text));
        return console.log(links.join("\n "));

    }
}).catch(err => console.error(`Ingresa unas opciones validas ${err}`)); */

//console.log(process.argv);


mdLinks(route, options).then((res) => {

    console.log(res, 'Respuesta final');
});

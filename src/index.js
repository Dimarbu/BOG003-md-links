//const mdLinks = require('./md-links.js');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

let route = process.argv[2];  //Obtiene la ruta 
route = path.normalize(route);
route = path.resolve(route);

const mainRoute = route => path.resolve(route);



const isDirectory = (route) => new Promise((resolve, reject) => { //Valida si es directorio
    fs.lstat(route, (error, stats) => {
        if (error) {
            reject('No se puede leer el directorio o el archivo suministrado')
        }
        if (stats) {
            resolve(stats.isDirectory()); ;
        }
    });
});

const readDir = (route) => new Promise((resolve, reject) => {  //Lee los directorios
    fs.readdir(route, (error, listFiles) => {
        console.log(listFiles);
        error ? reject('Error al leer el directorio o el archivo suministrado') : resolve(listFiles);
    });
});

// const recursion = (route) => new Promise((resolve, reject) => {
//     readDir(route)
//     .then((archivos) => {
//         let files = archivos.map((file) => {
//             return recursion(file)
//         })
//         resolve(files)
//     })
// })

// Extrae solo los archivos .md de las rutas
const extractFilesMd = (route) => new Promise((resolve, reject) => {
    readDir(route)
        .then((filesPath) => {
            const filesMd = [];
            let arrayFiles = filesPath.filter(filePath => path.extname(filePath) === '.md');
            arrayFiles.map((element) => {
                arrayFiles = path.join(route, element);
                filesMd.push(arrayFiles)
            });
            Promise.all(filesMd)
                .then(() => {
                    resolve(filesMd)
                })
                .catch((err) => {
                    reject(err, 'No se pudo leer el archivo suministrado');
                });
        });
});

const readFiles = (fileName) => new Promise((resolve, reject) => {  //Lee los archivos
    fs.readFile(fileName, 'UTF-8', (error, file) => {
        error ? reject('No se puede leer el archivo suministrado') : resolve(file)
    });
});

// Con expresiones regulares se extraen los links y el texto correspondiente
URL.totalLinks = (text, route) => {
    const regularExpression = /\[([a-zÀ-ÿ.—()\s-¿?,]+)\]\((http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,4}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)\)/gi;
    let totalLinks = text.match(regularExpression);
    let result = [];
    if (totalLinks == null) {
        return result;
    } else {
        for (let i = 0; i < totalLinks.length; i++) { // itero sobre la variable que contiene links y texto.
            result.push(
                {
                    href: totalLinks[i].substring(totalLinks[i].indexOf('(http')).replace(/[{()}]/g, ''),
                    text: totalLinks[i].replace(totalLinks[i].substring(totalLinks[i].indexOf('(http')), ''),
                    File: mainRoute(route),
                }
            );
            i++;
        }
        //console.log(result[0].href);
        //return JSON.stringify(result);
        return result;
    }
};

const getLinks = (route) => new Promise((resolve, reject) => {
    readFiles(route)
        .then((response) => {
            let arrayLink = [];
            arrayLink = URL.totalLinks(response, route);
            if (arrayLink.length == 0) {
                console.log('Entro array vacio');
                reject('No se encontraron links')
            } else {
                resolve(arrayLink);
            }
        })
        .catch(err => console.error(err));

});

// Realiza la petición HTTP con axios de los links encontrados
const validateLinks = (route) => new Promise((resolve, reject) => {
    getLinks(route)
        .then((links) => {
            let linkStatus = links.map((e) => {
                return axios.get(e.href)
                    .then((response) => {
                        if (response.status <= 299) {
                            e.status = "OK";
                            e.statusCode = response.status;
                        }
                    })
                    .catch((error) => {
                        if (error.response.status >= 300 && error.response.status <= 499) {
                            e.status = "FAIL";
                            e.statusCode = error.response.status;
                        }
                    });
            })
            Promise.all(linkStatus).then(() => {
                resolve(links);
                //console.log(links, 'links');
            });
        }).catch((err) => {
            reject(err);
        });
});

const optionStats = (route) => new Promise((resolve, reject) => {
    getLinks(route)
        .then((link) => {
            console.log(link, 'stats');
        })
})



//const route = 'C:/Users/Diana/Documentos/Laboratoria/MD-Links/BOG003-md-links/README.md';

/* mdLinks(route, options).then((res) => {

    console.log(res, 'Respuesta final');
}); */

module.exports =  {isDirectory, extractFilesMd, validateLinks, getLinks, optionStats};
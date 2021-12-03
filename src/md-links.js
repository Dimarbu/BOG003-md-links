// const mdLinks = require('./index.js');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const mainRoute = route => path.resolve(route);

const isDirectory = (route) => new Promise((resolve, reject) => { //Valida si es directorio
    fs.lstat(route, (error, stats) => {
        if (error) {
            console.log(error);
            reject('No se puede leer el directorio o el archivo suministrado')
        }
        if (stats) {
            resolve(stats.isDirectory());
        }
    });
});

const readDir = (route) => new Promise((resolve, reject) => {  //Lee los directorios
    fs.readdir(route, (error, listFiles) => {
        error ? reject('Error de prueba') : resolve(listFiles);
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
const extractFilesMd = (route) => new Promise((resolve, reject) => {
    readDir(route)
        .then((filesPath) => {
            const filesMd = [];
            let arrayFiles = filesPath.filter(filePath => path.extname(filePath) === '.md');
            arrayFiles.map((element) => {
                arrayFiles = path.join(route, element);
                filesMd.push(arrayFiles)
            });
            //console.log(filesMd, 'Soy varios archivos md');
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

URL.totalLinks = (text, route) => {
    const regularExpression = /\[([a-zÀ-ÿ.—()\s-¿?,]+)\]\((http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,4}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)\)/gi;
    let totalLinks = text.match(regularExpression);
    let result = [];
    //console.log(totalLinks, 'totalLinks');
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
            //console.log(arrayLink, 'soy array');
            if (arrayLink.length == 0) {
                console.log('Entro array vacio');
                reject('No se encontraron links')
            } else {
                resolve(arrayLink);
                //console.log(arrayLink, 'hola');
            }
        })
        .catch(err => console.error(err));

});

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
                        //console.log(error.response.status);
                        //console.log('Error con el link', error.statusCode);
                        //e.status = `Error en el servidor, no se encuentra la pagina => ${error}`;
                    });
            })
            Promise.all(linkStatus).then(() => {
                resolve(links);
                //console.log(links, 'links');
            })
        });
});

const optionStats = (route) => new Promise((resolve, reject) =>{
    getLinks(route)
    .then((link) => {
        console.log(link, 'stats');
    })
})

const mdLinks = (route, options) => {
    return new Promise((resolve, reject) => {
        isDirectory(route)
            .then((response) => {
                if (response) {
                    return extractFilesMd(route);
                } else {
                    //console.log([route], 'else');
                    return [route];
                }
            })
            .then((filesPath) => {
                const filesArray = filesPath;
                //console.log(filesArray, 'flies');
                let alternatives = filesArray.map((elem) => {
                    if (options.validate && !options.stats) {
                        return validateLinks(elem);
                    } else if (!options.validate && options.stats) {
                        return optionStats(elem);
                    } else if (options) {
                        return getLinks(elem);
                    }
                })
                Promise.all(alternatives).then((res) => {
                    //console.log(res, 'soy res final');
                    let finalArray = res.flatMap((final) => final);
                    //let finalArray = [].concat.apply([], res);
                    resolve(finalArray);
                }).catch(err => {
                    reject(err)
                })
            })


    })
};


module.exports = mdLinks;

// C:/Users/Diana/Documentos/Laboratoria/MD-Links/BOG003-md-links/README.md
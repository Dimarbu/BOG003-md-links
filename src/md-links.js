const { isDirectory, extractFilesMd, validateLinks, getLinks, optionStats, optionStatsValidate } = require('./index.js');
/* const { optionStats } = require('./statsoption.js'); */
//const func = require("./index.js");

const mdLinks = (route, options) => {
    return new Promise((resolve, reject) => {
        isDirectory(route)
            .then((response) => {
                if (response) {
                    return extractFilesMd(route);
                } else {
                    return [route];
                }
            })
            .then((filesPath) => {
                //const filesArray = filesPath;
                //console.log(filesArray, 'filesArray');
                let filesArray = filesPath.map((file) => {
                    return getLinks(file).then((links) => {
                        if (options.validate && !options.stats) {
                            return validateLinks(file);
                        }
                        if (!options.validate && options.stats) {
                            return optionStats(file);
                        }
                        if (!!options.validate && !!options.stats) {
                            return optionStatsValidate(file);
                        }
                        return links;

                    })

                    /* if (options.validate && !options.stats) {
                        return validateLinks(file)
                    } else if (!options.validate && options.stats) {
                        return optionStats(file);
                    } else if (options) {

                    } */
                })
                Promise.all(filesArray).then((res) => {
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

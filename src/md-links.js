//const func = require("./index.js");
const { isDirectory, extractFilesMd, validateLinks, getLinks, optionStats } = require('./index.js');



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
                let alternatives = filesArray.map((elem) => {
                    if (options.validate && !options.stats) {
                        return validateLinks(elem)
                    } else if (!options.validate && options.stats) {
                        return optionStats(elem);
                    } else if (options) {
                        return getLinks(elem);
                    }
                })
                Promise.all(alternatives).then((res) => {
                    console.log(res, 'soy res final');
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

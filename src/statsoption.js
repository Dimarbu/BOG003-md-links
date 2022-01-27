const getLinks = require('./index.js');

//Opcion --stats
/* const optionStats = route => {
    return new Promise((resolve, reject) => {
      getLinks(route).then((link) => {
        const linksUnique = new Set(link.map(elem => elem.URL))
        resolve({
          File: route,
          Unique: linksUnique.size,
          Total: link.length,
        })
      }).catch((err) => {
        reject(err);
      })
    })
  }
  
  // opcion --validate y --stats
  const optionStatsValidate = route => {
    return new Promise((resolve, reject) => {
      validateLinks(route).then((links) => {
        const linksUnique = new Set(links.map(elem => elem.URL))
        let content = 0;
        links.forEach((elem) => {
          if (elem.status !== 'OK') {
            content += 1;
          }
        })          
        resolve({
        File: rutaRelativa(route),
        Unique: linksUnique.size,
        Total: links.length,
        Broken: content,
        });
      }).catch((err) => {
        reject(err)
      })   
    })
  } */

  module.exports = { optionStats, optionStatsValidate };

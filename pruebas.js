const fs = require('fs');
const path = require('path');

// fs.readdir('./', (error, files) => { //Lee el directorio y realiza una lista de las carpetas y documentos
//   if (error) {
//     throw error;
//   }
//   // console.log(files);

//   fs.readFile('./README1.md', 'UTF-8', (error, file) => { // Lee el archivo e imprime en consola el contenido
//     if (error) {
//       throw error;
//     }
//     // console.log(file);
//   });
//   // console.log(process.argv[1]);
// });

// let path2 = 'C:\\Users\\Diana\\Documentos\\Laboratoria\\MD Links\\BOG003-md-links';
// fs.lstat(path2, (err, stats) => { // Identifica si la ruta es un archivo o directorio
//   if (err)
//     //return console.log(err);

//   // console.log(`Is file: ${stats.isFile()}`);
//   // console.log(`Is directory: ${stats.isDirectory()}`);
// });

const isDirectory = (path) => new Promise((resolve, reject) => {
  fs.lstat(path, (error, stats) => {
    if (error) {
      reject('No se puede leer el directorio especificado')
    }
    if (stats) {
      resolve(stats.isDirectory());
    }

  });
});
const isMdFile = (fileName) => false


const mdLinks = (path) => {
  isDirectory(path)
    .then((response) => {
      console.log(response);
      if (response == true) {
        console.log('Esto es un directorio');
      } else {
        return isMdFile(path);
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((msg) => {
      console.log('error', msg);
    })
};
mdLinks('./README1.md');


let doc = path.extname('README1.md') //Extrae la extensión del archivo
//console.log(doc);

let pathRelative = path.resolve('./README1.md');
//console.log(pathRelative);




//Hello();


// const [, , ...args] = process.argv;
// fs.stat(`${args}`, (err, stats) => {
//   console.log(`${args} ` + ' Soy Diana');
//   if (err)
//     return console.log(err);

//   console.log(`Is file: ${stats.isFile()}`);
// });


/*function Hello(){

  validarRuta(args[0]);
}

function validarRuta(ruta){
  console.log("ruta => "+ruta);
}*/


// if(fs.stat(`${arg}`)) {
//   console.log('El archivo existe');
// } else {
//   console.log('No existe');
// }
//console.log(arg);




// fs.readFile(require('path').resolve(__dirname, 'README1.md'),'utf8');

//  fs.readFile(process.cwd(), (err, data) => {
//      if(err) {
//          console.log(err)
//      } else {
//          console.log(data.toString());
//      }
//  });

// fs.readFile('archivo-inexistente.txt', 'utf-8', (err, data) => {
//     if(err) {
//       console.log('error: ', err);
//     } else {
//       console.log(data);
//     }
//   });
//   console.log('esto se ejecuta antes que esté el archivo');
//   let archivo = fs.readFileSync('archivo2.txt', 'utf-8');
//   console.log(archivo);
//   console.log('Esto se muestra después de haber leído el achivo2.txt (por el readFileSync)');



// { // respuesta de isDirectory - true o false
//     console.log(response, ' respuesta de isdirectory');
//     if (response == true) {
//         return readDir(path); // falta hacer recursividad
//     } else {
//         return isFile(path);
//     }
// })





// const filterMdFiles = (filename) => {
//     return filename.split('.')[1] === 'md';
// };
// const mdFiles = (listFiles) => new Promise((resolve, reject) => {
//     listFiles.filter((file), (error, files) => {
//         if (error) {
//             reject('No se puede leer el directorio suministrado')
//         }
//         if (path.extname(file).toLowerCase() === '.md') {
//             resolve(files) 
//         }
//     });
// });
// mdFiles(listFiles);

// const mdFile = (path) => new Promise((resolve, reject) => {
//     return path.extname(path, (error, files) => {
//         if (error) {
//             reject('No se puede leer el directorio suministrado')
//         }
//         if (files) {
//             resolve(files);
//         }
//     });
//     console.log(files, 'List');
// });


// const mdFile = (path) => {
//     let files = listFiles.filter((file) => {
//         return path.extname(file).toLowerCase() === '.md';
//     }); 
//     console.log(files, 'Extraigo los .md');
// }




// const isMdFile = (fileName) => new Promise((resolve, reject) => {
//     fs.lstat(path, (error, stats) => {
//         console.log(path + ' es archivo');
//         if (error) {
//             reject('No se puede leer el archivo suministrado')
//         }
//         if (stats) {
//             resolve(stats.isFile());
//         }
//     });
// });





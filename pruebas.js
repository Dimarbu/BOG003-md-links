const fs = require('fs');
const path = require('path');

fs.readdir('./', (error, files) => { //Lee el directorio y realiza una lista de las carpetas y documentos
    if(error) {
        throw error;
      }
      console.log(files);
    
  fs.readFile('./README1.md', 'UTF-8', (error, file) => { // Lee el archivo e imprime en consola el contenido
      if(error) {
        throw error;
      }
      console.log(file);
  });
  console.log(process.argv[1]);
});

let path2 = 'C:\\Users\\Diana\\Documentos\\Laboratoria\\MD Links\\BOG003-md-links';
fs.lstat(path2, (err, stats) => { // Identifica si la ruta es un archivo o directorio
    if(err)
        return console.log(err);

    console.log(`Is file: ${stats.isFile()}`);
    console.log(`Is directory: ${stats.isDirectory()}`);
});

let doc = path.extname('README1.md') //Extrae la extensión del archivo
console.log(doc);

let pathRelative = path.resolve('./README1.md');
console.log(pathRelative);




//Hello();


const [,, ... args] = process.argv;
fs.stat(`${args}`, (err, stats) => {
   console.log(`${args} ` + ' Soy Diana');
   if(err)
    return console.log(err);

   console.log(`Is file: ${stats.isFile()}`);
  });


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
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extencionesValidas = ['png', 'jpg', 'jpeg', 'git', 'svg'], carpeta = '' ) => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        // Validar la extencion
        if (!extencionesValidas.includes(extensionArchivo)) {
            return reject(`La extension ${extensionArchivo} no es valida, ${extencionesValidas}`)
        }

        const nombreTemp = uuidv4() + '.' + extensionArchivo;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {

            if (err) {
                reject( err );
            }

            resolve(nombreTemp)

        });

    });

}


module.exports = {
    subirArchivo
}
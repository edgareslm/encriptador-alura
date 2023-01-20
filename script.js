window.onload = function(){

// Seleccionamos nuestros elementos textarea 
const TXT_BASE = document.getElementById("txt_base");
const TXT_MENSAJE = document.getElementById("txt_mensaje");

// Encriptador de texto

const BTN_CODIFICAR = document.getElementById("btnCodificar");
      BTN_CODIFICAR.onclick=cifrarTexto;

        function cifrarTexto(){
            let datosBase = TXT_BASE.value;
            var datosModificados= datosBase.replace(/[aeiou]/g, remplazarVocal);    
            function remplazarVocal (vocal){
                switch(vocal){
                    case "a": return 'ai';
                    case "e": return 'enter';
                    case "i": return 'imes';
                    case "o": return 'over';
                    case "u": return 'ufat';
                }
            }
            TXT_MENSAJE.value=datosModificados;
            validarDatos();
        }
}
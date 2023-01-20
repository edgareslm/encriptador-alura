window.onload = function(){

// Seleccionamos nuestros elementos textarea 
    const TXT_BASE = document.getElementById("txt_base");
    const TXT_MENSAJE = document.getElementById("txt_mensaje");

// Aplicar un mensaje descriptivo

TXT_MENSAJE.placeholder="Ningún mensaje fue encontrado\n\nIngresa el texto que desees encriptar o desencriptar.";

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

//Bloque para desencriptar texto

    const BTN_DESCIFRAR = document.getElementById("btnDecodificar");
    BTN_DESCIFRAR.onclick=descifrarTexto;

    function descifrarTexto(){
        let datosBase = TXT_BASE.value;
        let datosModificados = datosBase.replaceAll(/ai|enter|imes|over|ufat/g, palabrasClave);

        function palabrasClave(palabra){
            if(palabra == "ai"){
                return "a";
            }        
            if(palabra == "enter"){
                return "e";
            }        
            if(palabra == "imes"){
                return "i";
            }        
            if(palabra == "over"){
                return "o";
            }       
            if(palabra == "ufat"){
                return "u";
            }
        }
        TXT_MENSAJE.value=datosModificados;
        validarDatos();
    }

// Bloque para copiar texto

    const BNT_COPIAR = document.getElementById("btnCopiar");
    BNT_COPIAR.onclick=copiarTexto;

    function copiarTexto(){
    var portaPapeles = TXT_MENSAJE.value;
    console.log(portaPapeles);
    navigator.clipboard.writeText(portaPapeles); // me genera un error
    }

// Bloque para controlar las clases de los elmentos boton y textarea si este ultimo continene datos

    TXT_MENSAJE.onblur=validarDatos;    

    function validarDatos(){
        var estado = TXT_MENSAJE.value ? true : false;
        if(estado){
            TXT_MENSAJE.classList.remove("valor");
            BNT_COPIAR.classList.add("activo");
        }else{
            TXT_MENSAJE.classList.add("valor");
            BNT_COPIAR.classList.remove("activo");
        }
    }

}
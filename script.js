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

// bloque para aplicar tema oscuro 

    const BTN_TEMA = document.getElementById("btn_tema"); 
    const ROOT = document.documentElement; // elemento raiz (root) html 

    BTN_TEMA.onclick=activarTema;

    function activarTema (){
        ROOT.classList.toggle("dark-theme");
        var tema = BTN_TEMA.checked ? "dark" : "light";
        localStorage.setItem("theme",tema);  // se crea una variable temporal local y se asigna un valor
    }

// bloque para comprobar si el tema esta activo

    validarTema();

    function validarTema (){
    var TEMA_ACTUAL = localStorage.getItem("theme"); // obtiene lel valor para comprobar si activar el tema oscuro
        if(TEMA_ACTUAL == "dark"){
            BTN_TEMA.checked=true;
            ROOT.classList.add("dark-theme");
        }else{
            BTN_TEMA.checked=false;
            ROOT.classList.remove("dark-theme");
        }
}

// Bloque para validar si se esta introduciendo letras MAYUSCULAS

TXT_BASE.oninput=validarTexto;

function validarTexto(){
    var texto = TXT_BASE.value;
    var alerta = document.getElementById("vtnAlerta");
    const regexp =/[A-Z]/g; // expresion regular indica un rango de letras mayusculas
    if(regexp.test(texto)){ // testea si existen coencidencias
        alerta.style.display="block"; // hace visible la ventana de alerta
    }else{
        alerta.style.display="none"; // oculta la ventana
    }
}


crearAlerta();

function crearAlerta(){
    var parrafoMensaje = document.createElement("p");
        parrafoMensaje.textContent="Solo se admite letras minusculas";

    var btn_cerrar =document.createElement("button");
        btn_cerrar.textContent="cerrar";
        btn_cerrar.onclick= () => ventanaAlerta.style.display="none";


    var btn_minuscula =document.createElement("button");
        btn_minuscula.textContent="minuscula";
        btn_minuscula.onclick= ()=>{ TXT_BASE.value = TXT_BASE.value.toLowerCase();};

    var ventanaAlerta = document.createElement("div");
        ventanaAlerta.id="vtnAlerta";
        ventanaAlerta.appendChild(parrafoMensaje);
        ventanaAlerta.insertAdjacentElement("beforeend", btn_cerrar);
        ventanaAlerta.insertAdjacentElement("beforeend", btn_minuscula);
        
        var style_btn = {
            width:40+"%",
            color:"#777",
            fontSize:12+"px",
            marginLeft:10+"px",
            fontWeight:"bold"
        };
        var style_txt = {
            width:100+"%",
            color:"#777",
            fontSize:12+"px",
        };
        var style_vtn = {           
            "display":"none",
            "position":"absolute",
            "top":"30%",
            "left":"20%",
            "z-index":"10",
            "width":"60%",
            "height":"50px",
            "border":"2px solid #dfdfdf",
            "background-color":"#7772",
            "border-radius":"10px",
            "text-align":"center",
            "font-weight":"bold"
        };
        
        Object.assign(btn_cerrar.style, style_btn);
        Object.assign(btn_minuscula.style, style_btn);
        Object.assign(parrafoMensaje.style,style_txt);
        Object.assign(ventanaAlerta.style,style_vtn);
    
        const PRINCIPAL = document.getElementById("cifrar");
         
        PRINCIPAL.insertBefore(ventanaAlerta,TXT_BASE);
}

}
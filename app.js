var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/json');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            /*Aquí deben procesar el JSON y mostrar la respuesta en el HTML*/

              //var xmldoc = http_request.responseXML;
            var datos ='[ {"titulo": "Shape of you","autor": "Ed Sheeran"},\
                           {"titulo": "Despacito","autor": "Luis Fonsi"},\
                           {"titulo": "Me enamoré","autor": "Shakira"}\
                         ]';
            var lista = JSON.parse(datos);
            var dato = document.getElementById('lista-canciones');
             for (var i = 0; i < lista.length; i++) {
                var li = document.createElement('li');
                var texto = document.createTextNode("Cancion: " + lista[i].titulo + "_______ Autor: "+ lista[i].autor);
                li.appendChild(texto);
                dato.appendChild(li);
             };


        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('datos.json');
    }
}

let esperaParaClick = 5000;

let fnEnviaelMensaje = () => {
    let elMensaje = document.getElementById('theMensaje').value;
    let losTelefonosElemento = document.getElementById('theTelefonos');
    let losTelefonos = losTelefonosElemento.value;
    let elTelefono = "";
    let elIframe = document.getElementById('theWsappIframe');
    let laUrl = "https://web.whatsapp.com/send?"; //phone="5493415473805&text=I%27m%20interested%20in%20your%20car%20for%20sale&source=&data=
    let elspan = document.getElementById('informandotel');
    

    if (!losTelefonos) {
        alert('Fin!');
        return;
    }

    losTelefonos = losTelefonos.split('\n');
    if (losTelefonos.length == 0) {
        alert('Fin!');
        return;
    }

    elTelefono = losTelefonos.shift();
    losTelefonos = losTelefonos.join('\n');
    losTelefonosElemento.value = losTelefonos;

    elspan.innerHTML = "Enviando a " + elTelefono;
    laUrl = laUrl + "phone=" + elTelefono;
    laUrl = laUrl + "&text=" + encodeURIComponent(elMensaje);
    laUrl = laUrl + "&source=&data="



    elIframe.src = laUrl;

    setTimeout(() => {
        intentarEnviarMensaje(elIframe);
    }, esperaParaClick);
}


let intentarEnviarMensaje = (pIframe) => {
    
    let elDocumento = pIframe.contentDocument;    

    if (!elDocumento) {
        setTimeout(() => {
            intentarEnviarMensaje(pIframe);
        }, esperaParaClick);

        return;
    }

    let elFooter = elDocumento.getElementsByTagName("footer");
    if (!elFooter) {
        setTimeout(() => {
            intentarEnviarMensaje(pIframe);
        }, esperaParaClick);

        return;
    }

    elFooter = elFooter[0];
    if (!elFooter) {
        setTimeout(() => {
            intentarEnviarMensaje(pIframe);
        }, esperaParaClick);

        return;
    }

    let elBoton = elFooter.getElementsByClassName('_3M-N-');
    if (!elBoton) {
        setTimeout(() => {
            intentarEnviarMensaje(pIframe);
        }, esperaParaClick);

        return;
    }

    elBoton = elBoton[0];
    if (!elBoton) {
        setTimeout(() => {
            intentarEnviarMensaje(pIframe);
        }, esperaParaClick);

        return;
    }

    elBoton.click();

    setTimeout(() => {
        fnEnviaelMensaje();
    }, esperaParaClick * 3);
}




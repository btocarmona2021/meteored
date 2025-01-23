const idUsuario = `nu29d6gecqb3`;

const continent = document.getElementById('continentes');
const paises = document.getElementById('paises');
const provinc = document.getElementById('provincias');
const localid = document.getElementById('localidades');
const datos = document.querySelector('.datos--tiempo');
const ciudad = document.getElementById('ciudad');

const api = axios.create({
    baseURL: `https://api.meteored.com.ar/index.php?api_lang=ar`,
})


const obtenerContinentes = async () => {

    const respuesta = await api.get(`&continente=0&affiliate_id=${idUsuario}`);

    const data = respuesta.data;

    const parser = new DOMParser();

    const xmldoc = parser.parseFromString(data, 'text/xml');

    const continentes = xmldoc.getElementsByTagName("data");

    for (let i = 0; i < continentes.length; i++) {
        const dataNode = continentes[i];

        // Obtener el nodo <name> y su atributo id
        const nameNode = dataNode.getElementsByTagName("name")[0];
        const id = nameNode.getAttribute("id");
        const nombre = nameNode.textContent;

        // Crear la plantilla para cada opción
        const plantilla = `<option value="${id}">${nombre}</option>`;

        // Agregar la opción a un elemento <select>
        continent.innerHTML += plantilla;
    }
}

const obtenerPaises = async () => {
    const idContinente = continent.value;
    const respuesta = await api.get(`&continente=${idContinente}&affiliate_id=${idUsuario}`);

    const data = respuesta.data;
    const parser = new DOMParser();
    const xmldoc = parser.parseFromString(data, 'text/xml');

    const paisesEncontrados = xmldoc.getElementsByTagName("data");
    paises.innerHTML = '';
    for (let i = 0; i < paisesEncontrados.length; i++) {
        const dataNode = paisesEncontrados[i];

        // Obtener el nodo <name> y su atributo id
        const nameNode = dataNode.getElementsByTagName("name")[0];
        const id = nameNode.getAttribute("id");
        const nombre = nameNode.textContent;

        // Crear la plantilla para cada opción
        const plantilla = `<option value="${id}">${nombre}</option>`;

        // Agregar la opción a un elemento <select>

        paises.innerHTML += plantilla;
    }
    obtenerProvincias().then()
}

const obtenerProvincias = async () => {
    const idPais = paises.value;
    const respuesta = await api.get(`&pais=${idPais}&affiliate_id=${idUsuario}`);

    const data = respuesta.data;
    const parser = new DOMParser();
    const xmldoc = parser.parseFromString(data, 'text/xml');


    const provinciasEncontradas = xmldoc.getElementsByTagName("data");
    provinc.innerHTML = '';
    for (let i = 0; i < provinciasEncontradas.length; i++) {
        const dataNode = provinciasEncontradas[i];

        // Obtener el nodo <name> y su atributo id
        const nameNode = dataNode.getElementsByTagName("name")[0];
        const id = nameNode.getAttribute("id");
        const nombre = nameNode.textContent;

        // Crear la plantilla para cada opción
        const plantilla = `<option value="${id}">${nombre}</option>`;
        // Agregar la opción a un elemento <select>

        provinc.innerHTML += plantilla;
    }
    obtenerLocalidades().then()
}

const obtenerLocalidades = async () => {
    const idProvincia = provinc.value;

    const respuesta = await api.get(`&division=${idProvincia}&affiliate_id=${idUsuario}`);

    const data = respuesta.data;
    const parser = new DOMParser();
    const xmldoc = parser.parseFromString(data, 'text/xml');

    const localidadesEncontradas = xmldoc.getElementsByTagName("data");
    localid.innerHTML = '';
    for (let i = 0; i < localidadesEncontradas.length; i++) {
        const dataNode = localidadesEncontradas[i];

        // Obtener el nodo <name> y su atributo id
        const nameNode = dataNode.getElementsByTagName("name")[0];
        const id = nameNode.getAttribute("id");
        const nombre = nameNode.textContent;

        // Crear la plantilla para cada opción
        const plantilla = `<option value="${id}">${nombre}</option>`;
        // Agregar la opción a un elemento <select>

        localid.innerHTML += plantilla;
    }
}

localid.addEventListener('change', async () => {
    const idLocalidad = localid.value;

    const respuesta = await api.get(`&localidad=${idLocalidad}&affiliate_id=${idUsuario}&v=3.0`)

    const day = Object.values(respuesta.data.day);
    let diasCompletos =[];
    datos.innerHTML = '';
    ciudad.innerText = respuesta.data.location.replace('[',' ').replace(']',' ');



    day.forEach((dia) => {
        diasCompletos.push(dia);
        const plantilla = `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card" style="width: 100%;">
            <div class="card-body text-center">
                <h5 class="card-title fw-bold">${dia.name}</h5>
                <img src="./galeria1/${dia.symbol_value}.png" alt="Icono de clima" class="img-fluid my-3" style="max-height: 100px;">
                <p>${dia.symbol_description}</p>
                <p class="card-text">Máxima: ${dia.tempmax}${dia.units.temp}</p>
                <p class="card-text">Mínima: ${dia.tempmin}${dia.units.temp}</p>
                <img src="./windgaleria2/${dia.wind.symbolB}.png" alt="Icono de viento" class="img-fluid my-3" style="max-height: 50px;">
                <p class="card-text">Vel. viento: ${dia.wind.speed} ${dia.units.wind}</p>
                <p class="card-text">Ráfagas: ${dia.wind.gusts} ${dia.units.wind}</p>
                <p>Presion Atmosferica: ${dia.pressure} ${dia.units.pressure}</p>
                <p>Precipitaciones: ${dia.rain} ${dia.units.rain}</p>
                
            </div>
        </div>
    </div>
    `;
        datos.innerHTML += plantilla;
        dia.hour.forEach((hora)=>{

        })
    })
    console.log(diasCompletos)
});


obtenerContinentes().then(r => {
    obtenerPaises().then()
})

continent.addEventListener('change', async (ev) => {
    obtenerPaises().then()
})

paises.addEventListener('change', async (ev) => {
    obtenerProvincias().then()
})

provinc.addEventListener('change', async (ev) => {
    obtenerLocalidades().then()
})

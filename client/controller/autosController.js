const getAutoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/autos/' + id
    }).done(res => res);
};

const getIdAuto = async id => {
    document.getElementById("id2_delete").value = id;
    console.log(id2_delete);
    console.log(document.getElementById("id2_delete").value);
};

const getInfoAuto = async id => {
    let auto = await getAutoById(id);
    var dateCreated = new Date(auto.auto[0].fechaRegistro).toLocaleString();

    if (auto.auto[0].fechaActualizacion == null) {
        var dateUpdated = "No hay fecha de actualización";
    } else {
        var dateUpdated = new Date(auto.auto[0].fechaActualizacion).toLocaleString();
    };

    document.getElementById('nombre1').value = auto.auto[0].nombre;
    document.getElementById('matricula').value = auto.auto[0].matricula;
    document.getElementById('verificacion').value = auto.auto[0].verificacion;
    document.getElementById('fechaRegistro').value = dateCreated;
    document.getElementById('fechaActualizacion').value = dateUpdated;
    document.getElementById('estado').value = auto.auto[0].estado ? "Activo" : "Inactivo";
    document.getElementById('marca').value = auto.auto[0].marca;
    console.log(auto);
};

const getInfoUpdateAuto = async id => {
    let auto = await getAutoById(id);

    var dateCreated = new Date(auto.auto[0].fechaRegistro).toISOString();
    if (auto.auto[0].fechaActualizacion == null) {
        var dateUpdated = "No hay fecha de actualización";
    } else {
        var dateUpdated = new Date(auto.auto[0].fechaActualizacion).toISOString();
    };
    document.getElementById('id2_update').value = id;
    document.getElementById('nombre1_update').value = auto.auto[0].nombre;
    document.getElementById('matricula_update').value = auto.auto[0].matricula;
    document.getElementById('verificacion_update').value = auto.auto[0].verificacion;
    document.getElementById('fechaRegistro_update').value = dateCreated;
    document.getElementById('fechaActualizacion_update').value = dateUpdated;
    document.getElementById('marca_update').value = auto.auto[0].marca;

    console.log(auto);

};
const getAuto = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/autos'
    }).done(res => {
        console.log(res.listAutos);

        let listAutos = res.listAutos;
        let table = $("#tabla2");
        table.append(
            "<tr class='table'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Nombre</th>" +
            "<th scope='col'>matrícula</th>" +
            "<th scope='col'>Verificación</th>" +
            "<th scope='col'>Fecha Registro</th>" +
            "<th scope='col'>Fecha Actualización</th>" +
            "<th scope='col'>Estado</th>" +
            "<th scope='col'>Marca</th>" +
            "<th scope='col'>Acciones</th>" +
            "</tr>")

        for (let i = 0; i < listAutos.length; i++) {
            var dateCreated = new Date(listAutos[i].fechaRegistro).toLocaleString();

            if (listAutos[i].fechaActualizacion == null) {
                var dateUpdated = "No hay fecha de actualización";
            } else {
                var dateUpdated = new Date(listAutos[i].fechaActualizacion).toLocaleString();
            };
            table.append(
                "<tr>" +
                "<td>" + listAutos[i].id + "</td>" +
                "<td>" + listAutos[i].nombre + "</td>" +
                "<td>" + listAutos[i].matricula + "</td>" +
                "<td>" + listAutos[i].verificacion + "</td>" +
                "<td>" + dateCreated + "</td>" +
                "<td>" + dateUpdated + "</td>" +
                "<td>" + listAutos[i].estado + "</td>" +
                "<td>" + listAutos[i].marca + "</td>" +
                "<td>" + '<button onclick="getInfoAuto(' + listAutos[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#details2"> Detalles</button> </td>' +
                "<td>" + '<button onclick="getInfoUpdateAuto(' + listAutos[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update2"> Modificar</button> </td>' +
                "<td>" + '<button onclick="getIdAuto(' + listAutos[i].id + ');" type="button" class="btn btn-danger text-dark" data-bs-toggle="modal" data-bs-target="#delete2"> Eliminar</button> </td>' +
                "</tr>")
        }
    });
};

const registerAuto = async () => {
    let nombre = document.getElementById('nombre1_register').value;
    let matricula = document.getElementById('matricula_register').value;
    let verificacion = document.getElementById('verificacion_register').value;
    var date = Date.now();
    let fechaRegistro = document.getElementById(date);
    let marca = document.getElementById('marca_register').value;

    await $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/autos/create',
        data: { nombre, matricula, verificacion, fechaRegistro, marca }
    }).done(function (res) {
        console.log(res);
    });
};

const updateAuto = async () => {

    let id = document.getElementById('id2_update').value;
    let nombre = document.getElementById('nombre1_update').value;
    let matricula = document.getElementById('matricula_update').value;
    let verificacion = document.getElementById('verificacion_update').value;
    var date = Date.now();
    let fechaActualizacion = document.getElementById(date);
    let marca = document.getElementById('marca_update').value;
    console.log(id);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/autos/update/' + id,
        data: { nombre, matricula, verificacion, fechaActualizacion, marca }
    }).done(function (res) {
        console.log(res);
    });
};

// const deleteAuto = async () => {
//     let id = document.getElementById("id2_delete").value;
//     await $.ajax({
//         type: 'GET',
//         url: 'http://localhost:4000/autos/delete/' + id
//     }).done(res => {
//         console.log(res);
//     });
// };

const deleteAuto = async () => {
    let id = document.getElementById("id2_delete").value;
    await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/autos/delete/' + id
    }).done(res => {
        console.log(res);
        //getoffice();
    });
};


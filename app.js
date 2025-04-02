document.getElementById('formularioPaciente').addEventListener('submit', function(evento) {
    evento.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const genero = document.getElementById('genero').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const sistemaIdentificacion = document.getElementById('sistemaIdentificacion').value;
    const valorIdentificacion = document.getElementById('valorIdentificacion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const codigoPostal = document.getElementById('codigoPostal').value;
    
    // Datos adicionales para la solicitud del estudio
    const tipoEstudio = document.getElementById('tipoEstudio').value;
    const medicoSolicitante = document.getElementById('medicoSolicitante').value;
    const prioridad = document.getElementById('prioridad').value;
    const motivoEstudio = document.getElementById('motivoEstudio').value;
    const fechaSolicitud = document.getElementById('fechaSolicitud').value;
    
    // Crear el objeto Paciente en formato FHIR
    const paciente = {
        resourceType: "Patient",
        name: [{
            use: "official",
            given: [nombre],
            family: apellido
        }],
        gender: genero,
        birthDate: fechaNacimiento,
        identifier: [{
            system: sistemaIdentificacion,
            value: valorIdentificacion
        }],
        telecom: [
            { system: "phone", value: telefono, use: "home" },
            { system: "email", value: correo, use: "home" }
        ],
        address: [{
            use: "home",
            line: [direccion],
            city: ciudad,
            postalCode: codigoPostal,
            country: "Colombia"
        }]
    };
    
    // Crear el objeto Solicitud de Servicio en formato FHIR
    const solicitudServicio = {
        resourceType: "ServiceRequest",
        status: "active",
        intent: "order",
        priority: prioridad,
        subject: paciente,
        code: { text: tipoEstudio },
        requester: { display: medicoSolicitante },
        reasonCode: [{ text: motivoEstudio }],
        authoredOn: fechaSolicitud
    };
    
    // Enviar los datos usando Fetch API
    fetch('https://hl7-fhir-ehr-omar.onrender.com/solicitudservicio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solicitudServicio)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Éxito:', data);
        alert('¡Solicitud de estudio creada exitosamente!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al crear la solicitud de estudio.');
    });
});
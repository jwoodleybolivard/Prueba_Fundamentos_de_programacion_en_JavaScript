$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();

        let valueInput = $("#heroInput").val();

        //Metodo AJAX
        $.ajax({
            type: "GET",
            url: "https://superheroapi.com/api.php/10226899660423713/" + valueInput,
            success: function (data) {

                //Verificar si nombre se encuentra en API
                if (data.response == 'error') {
                    document.querySelector('#error').innerHTML = `Ingrese id válido`
                } else {

                    limpiarError();

                    //Traer informacion desde API
                    let imagen = data.image.url;
                    let nombre = data.name;
                    let conexiones = data.connections;
                    let publicado = data.biography.publisher;
                    let ocupacion = data.work.occupation;
                    let primeraAparicion = data.biography;
                    let altura = data.appearance.height;
                    let peso = data.appearance.weight;
                    let alianzas = data.biography.aliases;
                    let id = data.id;

                    //Insertar en HTML la informacion de card
                    $('#heroCard').html(
                        `<h3>SuperHero Encontrado</h3>
                        <div class="card mb-3">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${imagen}" class="img-fluid" style=" " alt="">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title text-left">Nombre: ${nombre}<hr></h5>
                                        <p class="card-text text-left"">Conexiones: ${conexiones['group-affiliation']}<hr></p>
                                        <p class="card-text text-left"">Publicado por: ${publicado}<hr></p>
                                        <p class="card-text text-left"">Ocupacion: ${ocupacion}<hr></p>
                                        <p class="card-text text-left"">Primera Aparicion: ${primeraAparicion['first-appearance']}<hr></p>
                                        <p class="card-text text-left"">Altura: ${altura}<hr></p>
                                        <p class="card-text text-left"">Peso: ${peso}<hr></p>
                                        <p class="card-text text-left"">Alianzas: ${alianzas} </p>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    )

                    //Variable para Grafico Canvas
                    let estadisticas = [
                        { y: data.powerstats.intelligence, label: "Inteligencia" },
                        { y: data.powerstats.strength, label: "Fuerza" },
                        { y: data.powerstats.speed, label: "Velocidad" },
                        { y: data.powerstats.durability, label: "Durabilidad" },
                        { y: data.powerstats.power, label: "Poder" },
                        { y: data.powerstats.combat, label: "Combate" },
                    ];

                    //Grafico Canvas
                    let chart = new CanvasJS.Chart("heroGraf", {
                        theme: "light2",
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: `Estadisticas de Poder Para ${nombre}`
                        },
                        data: [{
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}",
                            dataPoints: estadisticas
                        }]
                    });
                    chart.render();

                }


            }
        });


    })
});

//Funcion para limpiar mensaje de error al escribir el nombre
function limpiarError() {
    document.querySelector('#error').innerHTML = ""
}
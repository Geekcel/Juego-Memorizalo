let tarjetasDestapadas = 0;
let movimientos = 0
let tarjeta1 = null
let tarjeta2 = null
let primerResultado = null
let segundoResultado = null
let aciertos = 0
let temporizador = false
let tiempoInicial = 30
let tiempo = 30 //valor desde que empieza a correr el temporizador
let cuentaRegresiva = null
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
let penitencias = ["Decir un versiculo llorando 😭", "Cantar un coro riendose 😆", "convertirte en un maniqui 🦿", "Hacer las dinamicas de un coro para niños 🕺🏼"]

const botones = document.querySelectorAll('.boton')
const mostrarMovimientos = document.getElementById('movimientos')
const mostraAciertos = document.getElementById('aciertos')
const mostrarTiempo = document.getElementById('t-restante')
const contenedorPenitencia = document.getElementById('contenedor-penitencia')
const penitencia = document.getElementById('penitencia')

numeros= numeros.sort(()=>{return Math.random()-0.5})//*?Generacion de numeros aleatorios
penitencias = penitencias[Math.floor(Math.random() * penitencias.length)]//? Genera penitencias aleatorias

const contarTiempo = ()=>{
    cuentaRegresiva = setInterval(()=>{
        tiempo--
        mostrarTiempo.innerHTML = `Tiempo: ${tiempo} segundos`
        if(tiempo === 0){
            clearInterval(cuentaRegresiva)
            bloquearTarjetas()
        }
    },1000)
}

const bloquearTarjetas = ()=>{
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.innerHTML= `<img src="images/${numeros[i]}.png">`
        tarjetaBloqueada.disabled = true
    }
penitencia.innerHTML = `Perdiste😭, Tu penitencia es : ${penitencias}`
}

// funcion para detectar los clicks en cada una de las tarjetas
const destapar = (seleccionado)=>{

    if(temporizador == false){
        contarTiempo()
        temporizador = true
    }

    let seleccion = seleccionado.target.id
    tarjetasDestapadas++
    console.log(seleccion)

    if(tarjetasDestapadas === 1){
        // mostrar primer numero
        tarjeta1 = document.getElementById(seleccion)
        primerResultado = numeros[seleccion]
        tarjeta1.innerHTML = `<img src="images/${primerResultado}.png">`
        //! Deshabilita primer boton
        tarjeta1.disabled=true

    }else if(tarjetasDestapadas == 2){
        // Mostrar segundo numero
        tarjeta2 = document.getElementById(seleccion)
        segundoResultado = numeros[seleccion]
        tarjeta2.innerHTML = `<img src="images/${segundoResultado}.png">`
        //! Deshabilita primer boton
        tarjeta2.disabled = true
        //? incrementar movimientos
        movimientos++
        mostrarMovimientos.innerHTML = ` Movimientos : ${movimientos}`

        if(primerResultado == segundoResultado){
            //reiniciar el contador de tarjetas
            tarjetasDestapadas = 0 

            // Aumentar aciertos
            aciertos++
            mostraAciertos.innerHTML = `Aciertos: ${aciertos}`

            if(aciertos == 8){
                clearInterval(cuentaRegresiva)
                mostraAciertos.innerHTML = `Aciertos: ${aciertos} `
                mostrarTiempo.innerHTML = `Genial 🎉 solo te demoraste ${tiempoInicial-tiempo} segundos`
                mostrarMovimientos.innerHTML = ` Movimientos : ${movimientos}`
            }

        }else{
            // Mostrar brevemente valores y tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' '
                tarjeta2.innerHTML = ' '
                tarjeta1.disabled = false
                tarjeta2.disabled = false
                tarjetasDestapadas = 0
            },800)
        }
    }
}

botones.forEach(boton => {
    boton.addEventListener('click', destapar)
});
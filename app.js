let tarjetasDestapadas = 0;
let movimientos = 0
let tarjeta1 = null
let tarjeta2 = null
let primerResultado = null
let segundoResultado = null
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]

const botones = document.querySelectorAll('.boton')
const mostrarMovimientos = document.getElementById('movimientos')

numeros= numeros.sort(()=>{return Math.random()-0.5})//*?Generacion de numeros aleatorios

// funcion para detectar los clicks en cada una de las tarjetas
const destapar = (seleccionado)=>{
    let seleccion = seleccionado.target.id
    tarjetasDestapadas++
    console.log(seleccion)
    if(tarjetasDestapadas===1){
        // mostrar primer numero
        tarjeta1 = document.getElementById(seleccion)
        primerResultado = numeros[seleccion]
        tarjeta1.innerHTML = primerResultado
        //! Deshabilita primer boton
        tarjeta1.disabled=true
    }else if(tarjetasDestapadas == 2){
        // Mostrar segundo numero
        tarjeta2 = document.getElementById(seleccion)
        segundoResultado = numeros[seleccion]
        tarjeta2.innerHTML = segundoResultado
        //! Deshabilita primer boton
        tarjeta2.disabled = true
        //? incrementar movimientos
        movimientos++
        mostrarMovimientos.innerHTML = ` Movimientos : ${movimientos}`
    }
}

botones.forEach(boton => {
    boton.addEventListener('click', destapar)
});

console.log(numeros)
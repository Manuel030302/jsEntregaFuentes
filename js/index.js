// Simulador de ahorro e inversion

class Instrumento{
    constructor(id,nombre,tasaInteres,gat){
        this.id = id
        this.nombre = nombre
        this.tasaInteres = tasaInteres
        this.gat = gat
    }
}

const cetesdirecto = new Instrumento(1,'cetesdirecto',.1104,.1162)
const compartamos_banco = new Instrumento(2,'compartamos_banco',.0960,.1003)
const bim = new Instrumento(3,'bim',.0895,.0933)
const ciBanco = new Instrumento(4,'ciBanco',.0755,.0782)
const banco_multiva = new Instrumento(5,'banco_multiva',.0725,.0750)
const banca_mifel = new Instrumento(6,'banca_mifel',.0690,.0712)
const abcCapital = new Instrumento(7,'abcCapital',.0545,.0559)
const banamex = new Instrumento(8,'banamex',.0502,.0514)
const banorte = new Instrumento(9,'banorte',.0386,.0393)
const bancomer = new Instrumento(10,'bancomer',.0225,.0227)

const Instrumentos = [cetesdirecto, compartamos_banco, bim, ciBanco, banco_multiva, banca_mifel, abcCapital, banamex, banorte, bancomer]

let infoInstrumentoElegido
let seleccionado = false

let instrumentoelegido = parseInt(prompt('Escoje el numero del Instrumento Financiero con el que deseas cotizar: \n 1.cetesdirecto \n 2.compartamos_banco  \n 3.bim  \n 4.ciBanco  \n 5.banco_multiva  \n 6.banca_mifel  \n 7.abcCapital  \n 8.banamex  \n 9.banorte  \n 10.bancomer'))

while(seleccionado === false){

    infoInstrumentoElegido = Instrumentos.find((infoInstrumentoElegido => infoInstrumentoElegido.id === instrumentoelegido))

    if(!infoInstrumentoElegido){
        instrumentoelegido = parseInt(prompt('Escoje un numero del Instrumento Financiero valido con el que deseas cotizar: \n 1.cetesdirecto \n 2.compartamos_banco  \n 3.bim  \n 4.ciBanco  \n 5.banco_multiva  \n 6.banca_mifel  \n 7.abcCapital  \n 8.banamex  \n 9.banorte  \n 10.bancomer'))
    } else{
        seleccionado = true
    }

}

console.log(infoInstrumentoElegido)

let montoInversion = parseFloat(prompt('Ingresa el monto inicial a invertir'))
let plazoInversion = parseInt(prompt('Ingresa el plazo en años de inversion'))
let depositos = 0
let periodicidad = 0
let da = false

while(da === false){

    let depositoadicional = prompt('desea hacer depositos adicionales? (selecciones "si" o "no")')

    if(depositoadicional == 'si'){
        depositos = parseFloat(prompt('Ingrese el monto de los depositos adicionales'))
        periodicidad = parseInt(prompt('Ingrese en dias la periodicidad de los montos adicionales'))
        da = true
    }else if (depositoadicional == 'no') {
        da = true
    } else {
        alert('Lo sentimos la opcion marcada no es valida, por favor seleccione una opcion valida')
    }
}


function calcularInversion(montoInicial, plazo, deposito, periodos, interes) {
    // convertir los periodos de dias a anos
    const frecuenciaDepositosAnuales = periodos / 365;
    // calcular el numero total de depositos
    const totalDeposits = Math.floor(plazo / frecuenciaDepositosAnuales);
    // Calcular el valor futuro de la inversion
    const valorFuturo = montoInicial * Math.pow(1 + interes, plazo);
    // calcular el valor futuro de los depositos
    const valorFuturoDepositos = deposito * ((Math.pow(1 + interes, plazo) - 1) / (interes / periodos));
    // calcular el valor futuro total
    const valorFuturoTotal = valorFuturo + valorFuturoDepositos;
  
    return valorFuturoTotal.toFixed(2); // return total future value rounded to 2 decimal places
  }

const montoFinalInvercion = calcularInversion(montoInversion,plazoInversion,depositos,periodicidad,infoInstrumentoElegido.tasaInteres)

alert(`El monto final obtenido por la inversion seria de: ${montoFinalInvercion}`)
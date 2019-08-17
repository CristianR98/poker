class Mano {
    constructor(cartas, element) {
        this.cartas = cartas
        this.element = element
        this.contador = 0
        this.results = []
        this.palo = false
        this.cartaAlta = {
            valor: 0,
            simbolo: '',
            palo: ''
        }
        this.escalera = false
        this.iguales = this.render()
        this.jugada
    }

    getJugada() {
        console.log(this.cartas)
        this.contador = 0
        this.getPaloJugada()
        for (let i = 0; i < this.cartas.length; i++) {
            if (this.cartaAlta.valor < this.cartas[i].valor) {
                this.cartaAlta = this.cartas[i]
            }
            this.getiguales(this.cartas[i].valor)
            this.contador = 0
        }
        this.getEscalera(this.cartaAlta)
        if (this.escalera && this.palo && this.cartaAlta.valor === 14) {
            this.render('escaleraReal')
            this.jugada = 'Escalera Real!!!'
        } else if (this.escalera && this.palo) {
            this.render('escaleraColor')
            this.jugada = 'Escalera Color!'
        } else if (this.escalera && !this.palo) {
            this.render('escalera')
            this.jugada = 'Escalera!'
        } else if (!this.escalera && this.palo) {
            this.render('color')
            this.jugada = 'Color!'
        } else {
            if (!this.iguales) {
                this.render('cartaAlta')
                this.jugada = 'Carta Alta!'
            } else {
                this.render('iguales')
                this.jugada = this.iguales
            }
        }
        this.contador = 0
    }

    getPaloJugada() {
        let result = this.cartas.map((carta) => {
            if (carta.palo == this.cartas[0].palo) {
                return true
            } else {
                return false
            }
        })
        if (result.indexOf(false) > -1) {
            this.palo = false
        } else {
            this.palo = true
        }
    }

    render(tipo) {
        if (this.element.children[0]) {
            this.element.children[0].remove()
        }
        let cartas = '',
            container = document.createElement('div')
        container.classList.add('jugada')
        for (let i = 0; i < this.cartas.length; i++) {
            if (i == 4) {
                cartas += `${this.cartas[i].element}`
            } else {
                cartas += `${this.cartas[i].element}, `
            }
        }
        switch (tipo) {
            case 'cartaAlta':
                container.innerHTML = `Carta Alta: ${this.cartaAlta.element} (${cartas})`
                break;
            case 'iguales':
                container.innerHTML = `Jugada: ${this.iguales} (${cartas})`
                break;
            case 'escalera':
                container.innerHTML = `Escalera!!! (${cartas})`
                break;
            case 'color':
                container.innerHTML = `<span class="${this.cartas[0].color}">Color!</span> (${cartas})`
                break;
            case 'escaleraColor':
                container.innerHTML = `<span class="${this.cartas[0].color}">Escallera color!!!</span> (${cartas})`
                break;
            case 'escaleraReal':
                container.innerHTML = `<span class="${this.cartas[0].color}">¡¡¡Escallera Real!!!</span> (${cartas})`
                break;
        }
        this.element.appendChild(container)
    }

    getEscalera(cartaMasAlta) {
        let result = this.cartas.find((carta) => {
            return cartaMasAlta.valor - 1 == carta.valor
        })
        if (result && this.contador < 4) {
            this.contador++
                this.getEscalera(result)
        } else if (this.contador == 4) {
            this.escalera = true
        } else {
            this.escalera = false
        }
    }

    getiguales(carta) {
        for (let i = 0; i < this.cartas.length; i++) {
            if (carta == this.cartas[i].valor) {
                this.contador++
            }
        }

        if (this.contador === 4) {
            this.results.push('poker')
        } else if (this.contador === 3) {
            this.results.push('trio')
        } else if (this.contador === 2) {
            this.results.push('pareja')
        }

        if (this.results.indexOf('poker') > -1) {
            this.iguales = "Poker!"
        } else if (this.results.indexOf('trio') > -1) {
            if (this.results.indexOf('pareja') > -1) {
                this.iguales = "Full!"
            } else {
                this.iguales = "Trio!"
            }
        } else if (this.results.indexOf('pareja') > -1) {
            let parejas = 0
            for (let y = 0; y < this.results.length; y++) {
                if (this.results[y] == 'pareja') {
                    parejas++
                }
            }
            if (parejas > 2) {
                this.iguales = "Doble pareja!"
            } else {
                this.iguales = "Pareja!"
            }
        } else {
            this.jugada = null
        }
    }
}

class Carta {
    constructor() {
        this.valor = Math.ceil(Math.random() * 13) + 1
        this.simbolo = this.getSimbolo()
        this.palo = this.getPalo()
        this.color = this.getColor()
        this.element = `${this.simbolo}<span class="${this.color}">${this.palo}</span>`
    }


    getSimbolo() {
        let simbolo
        switch (this.valor) {
            case 13:
                simbolo = 'K'
                break
            case 12:
                simbolo = 'Q'
                break
            case 11:
                simbolo = 'J'
                break
            case 14:
                simbolo = 'A'
                break
            default:
                simbolo = this.valor
        }
        return simbolo
    }

    getPalo() {
        let num = Math.ceil(Math.random() * 4),
            palo
        switch (num) {
            case 1:
                palo = '♥'
                break
            case 2:
                palo = '♦'
                break
            case 3:
                palo = '♣'
                break
            case 4:
                palo = '♠'
                break
        }
        return palo
    }

    getColor() {
        if (this.palo == '♥' || this.palo == '♦') {
            return 'red'
        } else {
            return 'black'
        }
    }

}

let getHandBtn = document
    .querySelector('.btn-gethand')
getHandBtn.onclick = () => {
    let cartas = []
    const crearCarta = () => {
        let carta = new Carta(),
            repetida = []
        for (let j = 0; j < cartas.length; j++) {
            if (carta.valor == cartas[j].valor &&
                carta.palo == cartas[j].palo
            ) {
                repetida.push(true)
            } else {
                repetida.push(false)
            }
        }
        if (repetida.indexOf(true) > -1) {
            return crearCarta()
        } else {
            return carta
        }
    }

    for (let i = 0; i < 5; i++) {
        cartas.push(crearCarta())
    }
    // cartas = [{
    //         valor: 11,
    //         simbolo: 'Q',
    //         palo: '♥',
    //         color: 'red'
    //     },
    //     {
    //         valor: 11,
    //         simbolo: 10,
    //         palo: '♥',
    //         color: 'red'
    //     },
    //     {
    //         valor: 11,
    //         simbolo: 'A',
    //         palo: '♥',
    //         color: 'red'
    //     },
    //     {
    //         valor: 11,
    //         simbolo: 'K',
    //         palo: '',
    //         color: 'red'
    //     },
    //     {
    //         valor: 12,
    //         simbolo: 'J',
    //         palo: '♥',
    //         color: 'red'
    //     }
    // ]
    let mano = new Mano(cartas, document.querySelector('.container-hand'))
    mano.getJugada()
}
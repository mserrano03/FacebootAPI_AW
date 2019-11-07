module.exports = {
    get ROCK() { return "Rock"; },
    get RAP() { return "Rap"; },
    get POP() { return "Pop"; },
    get ELECTRO() { return "Electro"; },
    get SOUL() { return "Soul"; },
    get BLUES() { return "Blues"; },
    get CUMBIA() { return "Cumbia"; },
    get JAZZ() { return "Jazz"; },
    get REGGAE() { return "Reggae"; },
    get SALSA() { return "Salsa"; },
    get PUNK() { return "Punk"; },
    get COUNTRY() { return "Country"; },
    get CORRIDOS() { return "Corridos"; },
    get DISCO() { return "Disco"; },
    get FUNK() { return "Funk"; },
    get HEAVYMETAL() { return "Heavy Metal"; },
    get REGGAETON() { return "Regggaeton"; },
    get TANGO() { return "Tango"; },
    getAll() {
        return [this.ROCK, this.RAP, this.POP, this.ELECTRO, this.SOUL, this.BLUES, this.CUMBIA, this.JAZZ, this.REGGAE,
        this.SALSA, this.PUNK, this.COUNTRY, this.CORRIDOS, this.DISCO, this.FUNK, this.HEAVYMETAL, this.REGGAETON, this.TANGO];
    }
};
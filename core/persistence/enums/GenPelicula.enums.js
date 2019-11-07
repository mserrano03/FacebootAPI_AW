module.exports = {
    get TERROR() { return "Terror"; },
    get SUSPENSO() { return "Suspenso"; },
    get COMEDIA() { return "Comedia"; },
    get ACCION() { return "Accion"; },
    get CIENCIAFICCION() { return "Ciencia Ficcion"; },
    get ROMANTICAS() { return "Romanticas"; },
    get DRAMA() { return "Dramas"; },
    get MUSICALES() { return "Musicales"; },
    get INFANTILES() { return "Infantiles"; },
    get ADULTOS() { return "Adultos"; },
    getAll() {
        return [this.TERROR, this.SUSPENSO, this.COMEDIA, this.ACCION, this.CIENCIAFICCION, this.ROMANTICAS,
        this.DRAMA, this.MUSICALES, this.INFANTILES, this.ADULTOS];
    }
};
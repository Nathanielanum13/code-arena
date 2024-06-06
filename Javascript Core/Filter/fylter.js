export default class Fylter {
    constructor() {
        this.tables = []
    }
    appendData(data) {
        if (!Array.isArray(data)) return
        this.tables = [...this.tables, data]
        return this
    }
    merge() {
        this.tables = this.tables.flat()
        return this
    }
    trim(trimParams = []) {
        let newTables = []
        let uniqueParams = []
        this.tables.forEach(table => {
            if (!uniqueParams.some(param => )) {
                uniqueParams = [...uniqueParams, table[]]
                newTables = [...newTables, table]
            }
        })
    }
    tabulateData() {
        console.table(this.tables)
        return this
    }
}
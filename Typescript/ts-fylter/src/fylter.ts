import { FylterInterface, FylterDataOptionInterface } from "./@types/Fylter"

export class Fylter<T> implements FylterInterface<T> {
    #tablePrefix = "table_";
    #table: Array<T> = new Array<T>;
    #tables: { name: string, data: Array<T>, spread: boolean }[] = new Array;
    #counter = 0
    constructor(table: Array<T> = new Array<T>, options: FylterDataOptionInterface = {}) {
        if (table.length !== 0) {
            this.#tables = [...this.#tables, { name: options.name || `${this.#tablePrefix}${this.#counter}`, data: table,  spread: options.spread || true}]
            this.#counter++
        } else {
            this.#table = table
        }
    }
    append(data: Array<T>, options: FylterDataOptionInterface = {}) {
        this.#tables = [...this.#tables, { name: options.name || `${this.#tablePrefix}${this.#counter}`, data: data,  spread: options.spread || true}]
        this.#counter++
        this.#table = [...this.#table, ...data]
        return this
    }
    groupBy <U extends string[]>(params: U) {
        let grouppedTable = []
        let localTable = [...this.#table]
        let previousInsertParamIDs = []; 

        this.#table.forEach(dataTable => {
            params.forEach(param => {
                if (grouppedTable.length !== 0) {
                    localTable = grouppedTable
                    grouppedTable = []
                }
                localTable.forEach(tableObject => {
                    if (grouppedTable.length === 0) {
                        previousInsertParamIDs = [...previousInsertParamIDs, tableObject[param]]
                        grouppedTable = [...grouppedTable, tableObject]
                    } else {
                        let isAlreadyInserted = previousInsertParamIDs.find(previousID => previousID === tableObject[param])
                        if (typeof isAlreadyInserted === "undefined") {
                            previousInsertParamIDs = [...previousInsertParamIDs, tableObject[param]]
                            grouppedTable = [...grouppedTable, tableObject]
                        } else {
                            let insertIndex = grouppedTable.findIndex(item => item[param] === isAlreadyInserted)
                            let newTableObject = {...grouppedTable[insertIndex]}
                            Object.keys(tableObject).forEach(key => {
                                newTableObject[key] = tableObject[key]
                            })
                            grouppedTable[insertIndex] = newTableObject
                        }
                    }
                })
                previousInsertParamIDs = []
            })
        })
        this.#table = grouppedTable
        return this
    }
    getTable() {
        return this.#table
    }
}
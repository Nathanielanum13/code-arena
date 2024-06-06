
import Fylter from './fylter.js'

let FilteredData = new Fylter()

FilteredData
    .appendData([{ id: 1, name: 'Nathaniel' }, { id: 3, name: 'Yaw' }])
    .appendData([{ id: 3, name: 'Fred' }])
    .merge()
    .trim(['id', 'name'])
    .tabulateData()
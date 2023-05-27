import Table from "./Table";
import {saveAs} from 'file-saver';
import {write, utils} from 'xlsx';
import {IColumn, IData} from "../../types/index";
import {isElemnt} from '../utils/util'

export interface IOption {
    fileName: string
    target?: Element
    columns?: IColumn[]
    dataSource?: IData[]
}

export function createTable(columns: IColumn[], dataSource: IData[]): HTMLTableElement {
    return Table.create(columns, dataSource);
}

export function getBytes(option: IOption) {
    if (option.target && !isElemnt(option.target)) {
        throw new Error('[Type Error]prop target is no a Element.');
        return;
    }

    let table = null;

    if (option.target) {
        table = option.target;
    } else {
        table = createTable(option.columns || [], option.dataSource || []);
    }

    const workbook = utils.table_to_book(table);
    const bytes = write(workbook, {bookType: 'xlsx', bookSST: true, type: 'array'});
    return bytes;
}

export function getExcel(option: IOption) {
    const fileName = option.fileName + '.xlsx';
    const bytes = getBytes(option);

    if (!bytes) return;

    try {
        const type = 'application/octet-stream';
        saveAs(new Blob([bytes], {type}), fileName);
    } catch (e) {
        if (typeof e !== "undefined") console.log(e, bytes);
    }
}

export function getExcelAsync(option: IOption) {
    const fileName = option.fileName + '.xlsx';
    const bytes = getBytes(option);

    return new Promise(async (resolve, reject) => {
        if (!bytes) reject(bytes);

        try {
            const type = 'application/octet-stream';
            saveAs(new Blob([bytes], {type}), fileName);
            resolve(bytes)
        } catch (e) {
            if (typeof e !== "undefined") console.log(e, bytes);
            reject(bytes)
        }
    });
}

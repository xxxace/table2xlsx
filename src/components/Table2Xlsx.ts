import Table from "./Table";
import FileSaver from 'file-saver';
import {write, utils} from 'xlsx';
import {IColumn, IData} from "../../types/index";

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
    const table = option.target || createTable(option.columns || [], option.dataSource || []);
    const workbook = utils.table_to_book(table);
    const bytes = write(workbook, {bookType: 'xlsx', bookSST: true, type: 'array'});
    return bytes
}

export function getExcel(option: IOption) {
    const fileName = option.fileName + '.xlsx';
    const bytes = getBytes(option);

    try {
        const type = 'application/octet-stream';
        FileSaver.saveAs(new Blob([bytes], {type}), fileName);
    } catch (e) {
        if (typeof e !== "undefined") console.log(e, bytes);
    }
}

export function getExcelSync(option: IOption) {
    const fileName = option.fileName + '.xlsx';
    const bytes = getBytes(option);

    return new Promise(async (resolve, reject) => {
        try {
            const type = 'application/octet-stream';
            FileSaver.saveAs(new Blob([bytes], {type}), fileName);
            resolve(bytes)
        } catch (e) {
            if (typeof e !== "undefined") console.log(e, bytes);
            reject(bytes)
        }
    });
}

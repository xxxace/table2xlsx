import Table from "./Table";
import FileSaver from 'file-saver';
import xlsx from 'xlsx';
import {IColumn, IData} from "../../types/index";

export interface IOption {
    fileName: string
    columns: IColumn[]
    dataSource: IData[]
}

export class Table2Xlsx {

    static createTable(columns: IColumn[], dataSource: IData[]): HTMLTableElement {
        return Table.create(columns, dataSource);
    }

    static getExcel(option: IOption) {
        const fileName = option.fileName + '.xlsx';
        const table = this.createTable(option.columns, option.dataSource);
        const workbook = xlsx.utils.table_to_book(table);
        const bytes = xlsx.write(workbook, {bookType: 'xlsx', bookSST: true, type: 'array'});

        try {
            const type = 'application/octet-stream';
            FileSaver.saveAs(new Blob([bytes], {type}), fileName);
        } catch (e) {
            if (typeof e !== "undefined") console.log(e, bytes);
        }

        return bytes;
    }
}

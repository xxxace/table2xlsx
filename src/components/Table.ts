import { convertToRows, createElement as h } from "../utils/util";
import { IColumn, IData } from "../../types/index"

export default class Table {
    static columns: Array<IColumn> = []
    static dataSource: Array<object> = []

    private constructor() {
    }

    static create(columns: Array<IColumn>, dataSource: Array<IData>): HTMLTableElement {
        this.columns = columns;
        this.dataSource = dataSource;
        const table = h("table");
        const thead = this.createThead(columns);
        const tbody = this.createTbody(this.getDataColumns(columns), dataSource);

        table.append(thead);
        table.append(tbody);
        return table;
    }

    static createThead(columns: Array<IColumn>): HTMLTableSectionElement {
        const trList: HTMLTableRowElement[] = [];
        const rows = convertToRows(columns);

        rows.forEach(row => {
            const thList: HTMLTableCellElement[] = [];

            row.forEach(column => {
                const { width, align, colSpan, rowSpan, title } = column;
                thList.push(h("th", { width, align, colSpan, rowSpan }, [title]));
            });

            trList.push(h("tr", null, thList));
        })

        return h("thead", null, trList);
    }

    static createTbody(columns: Array<IColumn>, dataSource: Array<IData>): HTMLTableSectionElement {
        const trList: HTMLTableRowElement[] = [];

        dataSource.forEach(data => {
            const tdList: HTMLTableCellElement[] = [];

            columns.forEach(column => {
                const { dataIndex } = column;
                tdList.push(h("td", null, [data[dataIndex!]]));
            });

            trList.push(h("tr", null, tdList));
        });

        return h("tbody", null, trList);
    }

    static getDataColumns(originColumns: Array<IColumn>): Array<IColumn> {
        const dataColumns: IColumn[] = []

        originColumns.forEach(oc => {
            if (oc.dataIndex) {
                dataColumns.push(oc)
            } else if (oc.children) {
                dataColumns.push(...Table.getDataColumns(oc.children))
            }
        });
        
        return dataColumns
    }
}

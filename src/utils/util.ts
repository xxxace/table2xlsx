import {IAttributes, IStyle} from "../../types/util";
import {IColumn} from "../../types/index";

function checkReserve(key: string): string {
    const keyMap: { [k: string]: string } = {
        className: 'class'
    }
    return keyMap[key] || key;
}

export function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: IAttributes | null, children?: Array<HTMLElement | string | any>): HTMLElementTagNameMap[K] {
    const el: HTMLElementTagNameMap[K] = document.createElement(tagName);

    if (props) {
        const keys = Object.keys(props);
        keys.forEach(key => {
            if (key === 'style') {
                const style = props[key] as IStyle
                for (let k in style) {
                    el.style.setProperty(k, style[k] || '');
                }
            } else {
                el.setAttribute(checkReserve(key), props[key]);
            }
        })
    }

    if (children && children.length) {
        children.forEach(c => {
            if (c) {
                if (c instanceof HTMLElement) {
                    el.insertAdjacentElement("beforeend", c);
                } else {
                    el.insertAdjacentText("beforeend", c.toString());
                }
            }
        })
    }
    return el;
}

type ColumnArray = Array<IColumn>
const getFlatColumns = (columns: ColumnArray): ColumnArray => {
    const result: ColumnArray = [];

    columns.forEach(col => {
        if (col.children) {
            result.push(col);
            result.push.apply(result, getFlatColumns(col.children));
        } else {
            result.push(col);
        }
    });

    return result;
};

export const convertToRows = (originColumns: ColumnArray): Array<ColumnArray> => {
    let maxLevel = 1;

    const traverse = (column: IColumn, parent?: IColumn) => {
        if (parent) {
            column.level = parent.level + 1;
            if (maxLevel < column.level) {
                maxLevel = column.level;
            }
        }

        if (column.children) {
            let colSpan = 0;

            column.children.forEach(subColumn => {
                traverse(subColumn, column);
                colSpan += subColumn.colSpan;
            })

            column.colSpan = colSpan;
        } else {
            column.colSpan = 1;
        }
    }

    originColumns.forEach(column => {
        column.level = 1;
        traverse(column);
    });

    const rows: ColumnArray[] = [];
    for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
    }

    const allColumns = getFlatColumns(originColumns);
    allColumns.forEach(column => {
        if (column.children) {
            column.rowSpan = 1;
        } else {
            column.rowSpan = maxLevel - column.level + 1;
        }
        rows[column.level - 1].push(column);
    });

    return rows
}

export function isElemnt(target: Element | any | undefined) {
    if (!target) return false;
    if (typeof target !== 'object') return false;
    if (target.nodeName && target.nodeType && target.tagName) {
        return true;
    } else {
        return false;
    }
}


import * as util from './util'

export {util}

export declare interface IColumn {
    title: string
    width?: string | number
    align?: "left" | 'center' | 'right'
    dataIndex?: string
    children?: IColumn[]

    [key: string]: any
}

export declare interface IData {
    [index: string]: any
}

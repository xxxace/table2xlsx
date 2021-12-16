declare interface IColumn {
    title: string
    width?: string | number
    align?: "left" | 'center' | 'right'
    dataIndex?: string
    children?: IColumn[]

    [key: string]: any
}


export declare interface IStyle extends Partial<CSSStyleDeclaration> {
    [index: string]: any
}

export declare interface IAttributes {
    [key: string]: any

    className?: string
    style?: IStyle
}

# table2xlsx
html表格导出xlsx文件,无需渲染dom.  
html table to export xlsx without render dom.

当前版本只支持导出 ```.xlsx```  
Currently, only ```.xlsx``` is supported!!!

**install:**  
````npm i table2xlsx````
or
````yran add table2xlsx````

**usage:**
````
import table2xlsx from "table2xlsx";

const columns = [{
    title: 'col1',
    dataIndex: 'col1'
}, {
    title: 'col2',
    dataIndex: 'col2'
}, {
    title: 'col3',
    dataIndex: 'col3'
}]

const dataSource = [{
    col1: 1,
    col2: 2,
    col3: 3,
}, {
    col1: 11,
    col2: 21,
    col3: 31,
}, {
    col1: 12,
    col2: 22,
    col3: 32,
}]

table2xlsx.getExcel({
    fileName: "a_ce is cool",
    columns: columns,
    dataSource: dataSource
});
````
**getExcel(option:IOption)**  
````
interface IOption {
    fileName: string
    columns: {
         title: string
         width?: string | number
         align?: "left" | 'center' | 'right'
         dataIndex?: string
         children?: IColumn[]
         [key: string]: any
     }[]
    dataSource:  {[index: string]: any}[]
}
```` 

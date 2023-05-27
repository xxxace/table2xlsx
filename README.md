# table2xlsx
html表格导出xlsx文件,无需渲染dom,基于``xlsx`` 和 ``file-saver``  
export xlsx file using html table without render dom. based on ``xlsx`` and ``file-saver``.

当前版本只支持导出 ```.xlsx```  
Currently, only ```.xlsx``` is supported!!!

**install:**  
````npm i table2xlsx````
or
````yarn add table2xlsx````

**usage:**
browser side
```
   table2xlsx.getExcel({
        fileName: "a_ce is cool",
        columns: columns,
        dataSource: dataSource
    });
```
esm
````
import * as table2xlsx from "table2xlsx";

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
or
````
table2xlsx.getExcel({
    target: document.querySelector('#export') as HTMLElement,
    fileName: "a_ce is cool"
});
````
**getBytes(option: IOption):any**  
```` 
const fileName = option.fileName + '.xlsx';
const bytes = getBytes(columns, dataSource)

try {
    const type = 'application/octet-stream';
    FileSaver.saveAs(new Blob([bytes], {type}), fileName);
} catch (e) {
    if (typeof e !== "undefined") console.log(e, bytes);
}
```` 
**getExcel(option:IOption)**  
````
interface IOption {
    fileName: string
    target?: Element
    columns?: {
         title: string
         width?: string | number
         align?: "left" | 'center' | 'right'
         dataIndex?: string
         children?: IColumn[]
         [key: string]: any
     }[]
    dataSource?:  {[index: string]: any}[]
}
```` 
**getExcelAsync(option:IOption):Promise\<unknown>**  
```` 
// 在调用"fliveSave.saveAs"后立即调用resolve,所以不会太精准
// "resolve" fire immediately after "fliveSave.saveAs" fired so it won't be precise
getExcelAsync({fileName: 'a_ce is dope', columns, dataSource}).then(res => {
    console.log('success')
}).catch(err => {
    console.log('error')
});
```` 
**createTable(columns: IColumn[], dataSource: IData[]):HTMLTableElement**  

如果此项目对你有帮助欢迎star！！！
<br/>
如果你有兴趣或对我的代码实在看不下去欢迎来参与建设改造
<br/>


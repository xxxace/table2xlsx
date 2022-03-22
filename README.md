# table2xlsx
html表格导出xlsx文件,无需渲染dom,基于``xlsx`` 和 ``file-saver``  
html table to export xlsx without render dom. based on ``xlsx`` and ``file-saver``.

当前版本只支持导出 ```.xlsx```  
Currently, only ```.xlsx``` is supported!!!

**install:**  
````npm i table2xlsx````
or
````yarn add table2xlsx````

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
**getBytes(columns:IColumn[],dataSource: IData[]):any**  
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
**getExcelSync(option:IOption):Promise\<unknown>**  
```` 
// 在调用"fliveSave.saveAs"后立即调用resolve,所以不会太精准
// "resolve" fire immediately after "fliveSave.saveAs" fired so it won't be precise
getExcelSync({fileName: 'a_ce is dope', columns, dataSource}).then(res => {
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
欢迎加群交流，群过期了欢迎加我个人微信进群（备注：t2x）
<br/>
<img src="https://raw.githubusercontent.com/xxxace/table2xlsx/main/qrcode_ace.jpg" width="260"  alt="微信小程序"/>
<img src="https://raw.githubusercontent.com/xxxace/table2xlsx/main/qrcode_group.jpg" width="268"  alt="微信小程序"/><br/>


import {getExcel,getExcelSync} from "./components/Table2Xlsx";
import {IColumn, IData} from "../types/index";

const columns: IColumn[] = [{
    title: 'col1',
    dataIndex: 'col1'
}, {
    title: 'col2',
    dataIndex: 'col2'
}, {
    title: 'col3',
    dataIndex: 'col3'
}]

const dataSource: IData[] = [{
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

// setTimeout(() => {
//     console.log('start')
//     getExcelSync({fileName: '測試測試', columns, dataSource}).then(res => {
//         console.log('success')
//     }).catch(err => {
//         console.log('error')
//     });
// }, 2000)

window.onload= ()=>{
    let exportBtn = document.querySelector('#export') as HTMLElement

    exportBtn.addEventListener('click',()=>{
        // getExcelSync({
        //     fileName:'ace_is_me',
        //     target:document.querySelector('#tb') as HTMLElement
        // }).then(res=>{
        //     console.log('success')
        // }).catch(err=>{
        //     console.log('error')
        // })


        getExcelSync({fileName: '測試測試', columns, dataSource}).then(res => {
        console.log('success')
    }).catch(err => {
        console.log('error')
    });
    })
}

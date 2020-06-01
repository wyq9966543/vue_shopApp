//ajax请求函数模块

import axios from 'axios'

export default function ajax (url, data={}, type='get') {
    
    /*return new Promise(function (resolve, reject) {
        // 执行异步ajax请求
        let promise
        if (type === 'GET') {
            // 准备url query参数数据
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送get请求
            promise = axios.get(url)
        } else {
            // 发送post请求
            promise = axios.post(url, data)
        }
        promise.then(function (response) {
            // 成功了调用resolve()
            resolve(response.data)
        }).catch(function (error) {
            //失败了调用reject()
            reject(error)
        })
    })*/
    
    return new Promise((resolve, reject) => {
        let promise
        // 1. 执行异步ajax请求
        if(type==='GET') { // 发GET请求
            promise = axios.get(url, { // 配置对象
                params: data // 指定请求参数
            })
        } else { // 发POST请求
            promise = axios.post(url, data)
        }
        // 2. 如果成功了, 调用resolve(value)
        promise.then(response => {
            resolve(response.data)
            // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            reject(error)
            // message.error('请求出错了: ' + error.message)
        })
    })
    
}
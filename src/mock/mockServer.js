//使用mockjs提供mock数据接口

import Mock from 'mockjs'
import data from './data'

//返回goods的接口
Mock.mock('/goods', {code:0, data:data.goods})

//返回info
Mock.mock('/info', {code:0, data:data.info})

//返回ratings
Mock.mock('/ratings', {code:0,data:data.ratings})
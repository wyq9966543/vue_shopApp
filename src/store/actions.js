
import  {RECEIVE_ADDRESSXY, RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutation-types'
import {reqAddress, reqAddressXY, reqFoodCategorys, reqShops} from '../api'

export default {
    //获取经纬度
    async getAddressXY ({commit , state}) {
        const result = await reqAddressXY()
        const addressXY = result
        commit(RECEIVE_ADDRESSXY, {addressXY})
    },
    
    //异步获取地址
    async getAddress ({commit, state}) {
        //发送异步ajax请求
        const result1 = await reqAddressXY()
        const geohash = result1.y + ',' + result1.x
        // const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        // 提交一个mutation
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, {address})
        }
    },
    //获取食品列表
    async getFoodCategarys ({commit, state}) {
        //发送异步ajax请求
        const result = await reqFoodCategorys()
        // 提交一个mutation
        if(result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, {categorys})
        }
    },
    //获取商家
    async getShops ({commit, state}) {
        const result1 = await reqAddressXY()
        const result = await reqShops(result1.y,result1.x)
        // 提交一个mutation
        if(result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, {shops})
        }
    },
}
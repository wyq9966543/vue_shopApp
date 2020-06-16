
import  {
    RECEIVE_ADDRESSXY,
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECIVE_INFO,
    RECIVE_RATINGS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART
} from './mutation-types'
import {reqAddress,
    reqAddressXY,
    reqFoodCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopGoods,
    reqShopInfo,
    reqShopRatings} from '../api'

export default {
    //异步获取经纬度
    async getAddressXY ({commit}) {
        const result = await reqAddressXY()
        const addressXY = result
        commit(RECEIVE_ADDRESSXY, {addressXY})
    },
    
    //异步获取地址
    async getAddress ({commit}) {
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
    
    //异步获取食品列表
    async getFoodCategarys ({commit}) {
        //发送异步ajax请求
        const result = await reqFoodCategorys()
        // 提交一个mutation
        if(result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, {categorys})
        }
    },
    
    //异步获取商家
    async getShops ({commit}) {
        const result1 = await reqAddressXY()
        const result = await reqShops(result1.y,result1.x)
        // 提交一个mutation
        if(result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, {shops})
        }
    },
    
    // 同步记录用户信息
    recordUser ({commit}, userInfo) {
        commit(RECIVE_USER_INFO, {userInfo})
    },
    
    //异步获取用户信息
    async getUserInfo({commit}) {
        const result = await reqUserInfo()
        if(result.code===0) {
            const userInfo = result.data
            commit(RECIVE_USER_INFO, {userInfo})
        }
    },
    //异步登出
    async logout({commit}) {
        const result = await reqLogout()
        if(result.code===0) {
            commit(RESET_USER_INFO)
        }
    },
    //异步获取商品列表
    async getShopGoods({commit}, callback) {
        const result = await reqShopGoods()
        if(result.code===0) {
            const goods = result.data
            commit(RECEIVE_GOODS, {goods})
            //数据更新通知一下组件
            callback && callback()
        }
    },
    //异步获取商家信息
    async getShopInfo({commit}) {
        const result = await reqShopInfo()
        if(result.code===0) {
            const info = result.data
            commit(RECIVE_INFO, {info})
        }
    },
    //异步获取商家评价
    async getShopRatings({commit}) {
        const result = await reqShopRatings()
        if(result.code===0) {
            const ratings = result.data
            commit(RECIVE_RATINGS, {ratings})
        }
    },
    //同步更新food中的count数量
    updateFoodCount({commit}, {isAdd, food}) {
        if(isAdd) {
            commit(INCREMENT_FOOD_COUNT, {food})
            //console.log(food.count)
        }else {
            commit(DECREMENT_FOOD_COUNT, {food})
        }
    },
    //同步清空购物车
    clearCart({commit}){
        commit(CLEAR_CART)
    }
    
    
    
}
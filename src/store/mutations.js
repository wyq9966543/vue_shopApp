
import Vue from 'vue'
import {RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_ADDRESSXY,
    RECIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECIVE_INFO,
    RECIVE_RATINGS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART
} from './mutation-types'

export default {
    [RECEIVE_ADDRESSXY] (state, {addressXY}) {state.addressXY = addressXY},
    [RECEIVE_ADDRESS] (state, {address}) {state.address = address},
    [RECEIVE_CATEGORYS] (state, {categorys}) {state.categorys = categorys},
    [RECEIVE_SHOPS] (state, {shops}) {state.shops = shops},
    [RECIVE_USER_INFO] (state, {userInfo}) {state.userInfo = userInfo},
    [RESET_USER_INFO] (state) {state.userInfo = {}},
    [RECEIVE_GOODS] (state, {goods}) {state.goods = goods},
    [RECIVE_INFO] (state, {info}) {state.info = info},
    [RECIVE_RATINGS] (state, {ratings}) {state.ratings = ratings},
    [INCREMENT_FOOD_COUNT] (state, {food}) {
        if(!food.count) {
            //food.count =1
            Vue.set(food, 'count' ,1)//让新增的属性也有数据绑定
            //将food添加到cartFoods中
            state.cartFoods.push(food)
        }else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT] (state, {food}) {
        if(food.count) {
            food.count--
            if(food.count === 0) {
                //将food从cartFoods中移除
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [CLEAR_CART] (state) {
        //清除food中的count
        state.cartFoods.forEach(food => food.count = 0)
        //清除购物车
        state.cartFoods = []
    }
}
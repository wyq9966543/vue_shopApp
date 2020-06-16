//接口请求函数
import jsonp from 'jsonp'

import ajax from "./ajax";
// const BASE = 'http://localhost:3000'
const BASE = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE}/position/${geohash}`,{geohash})

// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE +'/index_category')

// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE +'/shops',{longitude, latitude})

// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE + '', {geohash, keyword})

// 5、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE +'/login_pwd', {name, pwd,captcha}, 'POST')

// 6、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE + '/sendcode',{phone})

// 7、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE + '/login_sms', {phone, code}, 'POST')

// 8、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE + '/userinfo')

// 9、用户登出
export const reqLogout = () => ajax(BASE + '/logout')


// 10、获取经纬度
export const reqAddressXY = () => {
    return new Promise((resolve, reject) => {
        const url = 'http://api.map.baidu.com/location/ip?ak=qMWYde01zmutPcoaM3zT5CwLs69Uz8YK&coor=bd09ll'     // 发送jsonp请求
        jsonp(url, {}, (err,data) => {
            //console.log('jsonp()',err, data)
            // 如果成功了
            if (!err && data.status === 0) {
                // 取出需要的数据
                const {x,y} = data.content.point
                resolve({x,y})
            } else {
                // 如果失败了
                alert('获取地址信息失败!')
            }
        })
    })
}

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-07 15:00:00
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-07 22:33:57
 */
import * as http from './index';

export default {
    login: params => {
        return http.POST('/users/login', params)
    },
    register: params => {
        return http.POST('/users/register', params)
    },
    updateShoppingCartList: params => {
        return http.POST('/users/updateShoppingCartList', params)
    },
    getShoppingCartList: params => {
        return http.POST('/users/getShoppingCartList', params)
    },
    updateReceiverInfo: params => {
        return http.POST('/users/updateReceiverInfo', params)
    },
    getUserInfo: params => {
        return http.POST('/users/getUserInfo', params)
    }
}
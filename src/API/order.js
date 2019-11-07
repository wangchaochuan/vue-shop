/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-08 06:17:56
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 06:42:56
 */
import * as http from './index';

export default {
    createOrder: params => {
        return http.POST('/order/createOrder', params)
    },
    updateState: params => {
        return http.POST('/order/updateState', params)
    }
}
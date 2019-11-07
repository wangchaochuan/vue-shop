/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-07 15:01:22
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 03:41:46
 */
import Vue from 'vue'

export const store = Vue.observable({
    userName: '',
    count: 0
})
export const mutations = {
    setUserName(userName) {
        store.userName = userName;
    },
    setCount(count) {
        store.count = count;
    }
}
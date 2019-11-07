<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-07 11:04:23
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 02:41:44
 -->
<template>
  <div id="app" class="container">
    <HeaderComponent />
    <router-view />
    <FootComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import FootComponent from "@/components/Footer.vue";
export default {
  name: "app",
  components: {
    HeaderComponent,
    FootComponent
  }
};
</script>

<style>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
}
.page-title-normal {
  font-family: moderat, sans-serif;
  color: #333;
}

.checkout-title h2 {
  padding: 20px 0;
  font-size: 16px;
  color: #605f5f;
}
</style>

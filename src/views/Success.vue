<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-08 06:43:40
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 06:49:44
 -->
<template>
  <div class="success">
    <Breadcrumb title="订单已完成"></Breadcrumb>
    <Progress :step="step"></Progress>
    <div class="page-title-normal checkout-title">
      <h2>
        <span>恭喜，订单已完成！</span>
      </h2>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import Progress from "../components/Progress";
export default {
  name: "Success",
  data() {
    return {
        step:4
    };
  },
  components:{
      Breadcrumb,
      Progress
  }
};
</script>

<style scoped>
</style>

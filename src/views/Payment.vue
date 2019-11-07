<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-08 04:13:48
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 06:48:21
 -->
<template>
  <div class="payment">
    <Breadcrumb title="订单确认"></Breadcrumb>
    <Progress :step="step"></Progress>
    <div class="page-title-normal checkout-title">
      <h2>
        <span>订单已生成，请在30分钟内支付！</span>
      </h2>
    </div>
    <div>
      <el-radio v-model="radio" label="1">支付宝支付</el-radio>
      <el-radio v-model="radio" label="2">微信支付</el-radio>
    </div>
    <div class="next-btn-wrap">
      <el-button-group>
        <el-button type="success" @click.native="goToSuccess()">支付完成</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import Progress from "../components/Progress";
import Order from "../API/order";
export default {
  name: "Payment",
  data() {
    return {
      step: 3,
      radio: "1"
    };
  },
  components: {
    Breadcrumb,
    Progress
  },
  methods: {
    goToSuccess() {
      let orderId = this.$route.params.orderId;
      Order.updateState({ orderId }).then(res => {
        if (res.state == "0000") {
          this.$router.push("/success");
        } else {
          this.$message({
            message: "支付失败，请重新支付！",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.next-btn-wrap {
  margin-top: 20px;
  text-align: right;
  box-shadow: 0 -3px 0 #dcdcdc;
}
</style>

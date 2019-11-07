<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-08 02:30:24
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 06:36:49
 -->
<template>
  <div class="confirmOrder">
    <Breadcrumb title="订单确认"></Breadcrumb>
    <Progress :step="step"></Progress>
    <div class="page-title-normal checkout-title">
      <h2>
        <span>填写并核对订单信息</span>
      </h2>
    </div>
    <div class="item-list-wrap confirm-item-list-wrap">
      <div class="cart-item order-item">
        <div class="cart-item-head">
          <ul>
            <li>商品</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
          </ul>
        </div>
        <ul class="cart-item-list">
          <li v-for="product in params.checkedList" :key="product.productId">
            <div class="cart-tab-1">
              <div class="cart-item-pic">
                <img :alt="product.productName" v-lazy="product.productImage" />
              </div>
              <div class="cart-item-title">
                <div class="item-name">{{product.productName}}</div>
              </div>
            </div>
            <div class="cart-tab-2">
              <div class="item-price">{{product.salePrice|currency}}</div>
            </div>
            <div class="cart-tab-3">
              <div class="item-quantity">
                <div class="select-self">
                  <div class="select-self-area">
                    <span class="select-ipt">×{{product.num}}</span>
                  </div>
                </div>
                <div class="item-stock item-stock-no">有货</div>
              </div>
            </div>
            <div class="cart-tab-4">
              <div class="item-price-total">{{product.totalPrice|currency}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="price-count-wrap">
      <div class="price-count">
        <ul>
          <li>
            <span>商品总额:</span>
            <span>{{params.totalPrice|currency}}</span>
          </li>
          <li>
            <span>运费:</span>
            <span>+￥18.00</span>
          </li>
          <li>
            <span>优惠:</span>
            <span>-{{params.totalPrice*0.2|currency}}</span>
          </li>
          <li>
            <span>纳税:</span>
            <span>+{{params.totalPrice*0.1|currency}}</span>
          </li>
          <li class="order-total-price">
            <span>应付总额:</span>
            <span>{{totalPrice|currency}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="next-btn-wrap">
      <el-button-group>
        <el-button type="primary" @click.native="goBack()">返 回</el-button>
        <el-button type="danger" @click.native="goToPay()">去支付</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import Progress from "../components/Progress";
import { store, mutations } from "../store/store";
import User from "../API/user";
import Order from "../API/order";
export default {
  name: "ConfirmOrder",
  data() {
    return {
      step: 2,
      params: {}
    };
  },
  components: {
    Breadcrumb,
    Progress
  },
  computed: {
    userName() {
      return store.userName;
    },
    totalPrice() {
      return this.params.totalPrice * 0.9 + 18;
    }
  },
  methods: {
    init() {
      this.getParams();
    },
    getParams() {
      this.params = this.$route.params;
    },
    goBack() {
      this.$router.go(-2);
    },
    goToPay() {
      let userName = this.userName,
        shoppingCartList = this.params.unCheckedList;
      User.updateShoppingCartList({ userName, shoppingCartList })
        .then(res => {
          if (res.state == "0000") {
            console.log("购物车更新成功");
          }
        })
        .then(() => {
          let req = {
            productList: this.params.checkedList,
            receiverInfo: this.params.receiver,
            totalPrice: this.params.totalPrice
          };
          Order.createOrder(req).then(res => {
            if (res.state == "0000") {
              mutations.setCount(shoppingCartList.length);
              this.$router.push({
                name: "payment",
                params:{
                    orderId:res.data.orderId
                }
              });
            }
          });
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.checkout-order .item-list-wrap {
  margin-bottom: 40px;
}
.cart-item {
  display: table;
  width: 100%;
}
.cart-item-head {
  display: table-header-group;
  width: 100%;
}
.cart-item-head ul {
  display: table-row;
  width: 100%;
}
.cart-item-head li {
  display: table-cell;
  height: 40px;
  line-height: 40px;
  background: #605f5f;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  font-family: moderat, sans-serif;
  letter-spacing: 0.25em;
}

.cart-item-head li:nth-child(2),
.cart-item-head li:nth-child(3),
.cart-item-head li:nth-child(4),
.cart-item-head li:nth-child(5) {
  padding: 0 10px;
}
.cart-item-list {
  display: table-row-group;
}
.cart-item-list > li {
  position: relative;
  display: table-row;
  padding: 32px 0;
  background: #fff;
}
.cart-item-list > li > div {
  position: relative;
  display: table-cell;
  text-align: center;
  vertical-align: top;
  border-bottom: 1px solid #e9e9e9;
  height: 100%;
}
.cart-item-list .cart-tab-1 {
  min-height: 72px;
  padding: 32px 0;
  text-align: left;
  border-left: 1px solid #e9e9e9;
}
.cart-item-list .cart-tab-2 {
  padding-top: 64px;
}
.cart-item-list .cart-tab-3 {
  padding-top: 48px;
}

.cart-item-list .cart-tab-4 {
  padding-top: 64px;
}
.cart-item-list .cart-item-pic {
  float: left;
  width: 80px;
  height: 80px;
  margin-left: 20px;
  border: 1px solid #e9e9e9;
  overflow: hidden;
}

.cart-item-list .cart-item-pic img {
  width: 100%;
}

.cart-item-list .cart-item-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 76px;
  padding: 0 20px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.cart-item-list .cart-item-title .item-name {
  width: 100%;
  line-height: 76px;
  color: #000;
  font-family: moderat, sans-serif;
  font-weight: 700;
}

.cart-item-list .cart-item-title .item-count-down {
  margin-top: 10px;
  font-size: 12px;
}
.cart-item-list .item-price {
  font-size: 16px;
  color: #333;
}
.cart-item-list .item-price-total {
  color: #d1434a;
  font-size: 16px;
}
.price-count-wrap {
  margin-top: 20px;
  margin-bottom: 20px;
}
.price-count ul {
  display: table;
  width: 100%;
}
.price-count li {
  display: table-row;
  font-size: 18px;
}
.price-count li span {
  display: table-cell;
  height: 36px;
  padding-right: 10px;
  vertical-align: top;
  text-align: right;
}

.price-count li span:first-child {
  color: #999;
}

.price-count li span:last-child {
  width: 20px;
  padding-left: 10px;
  white-space: nowrap;
}

.price-count .order-total-price span:last-child {
  color: #d1434a;
  font-size: 1.125em;
  font-weight: 700;
}
.next-btn-wrap {
  margin-top: 20px;
  text-align: right;
  box-shadow: 0 -3px 0 #dcdcdc;
}
</style>

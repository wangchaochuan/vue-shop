<template coments>
  <div class="home">
    <!--面包屑导航组件-->
    <Breadcrumb title="商品列表"></Breadcrumb>
    <div class="accessory-result-page">
      <div class="container1">
        <div class="filter-nav">
          <div class="product-name">
            <label>商品名</label>
            <el-input v-model="form.productName" placeholder="请输入商品名"></el-input>
          </div>
          <div class="product-name">
            <label>价格区间</label>
            <el-select v-model="form.priceLevel" placeholder="请选择价格区间">
              <el-option label="全部" value="all"></el-option>
              <el-option label="0-100元" value="1"></el-option>
              <el-option label="100元-500元" value="2"></el-option>
              <el-option label="500元-1000元" value="3"></el-option>
              <el-option label="1000元-2000元" value="4"></el-option>
            </el-select>
          </div>
          <div class="query-wrap">
            <el-button type="primary" @click="queryProductByName">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="product-list-wrap">
      <div class="container1">
        <ul class="product-list">
          <li class="list-item" v-for="product in productList" :key="product.productId">
            <Card :product="product" @addShoppingCart="addShoppingCart(product)"></Card>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog :visible.sync="listed" width="400px" :center="true">
      <div style="text-align: center;">
        <i class="el-icon-success" style="color: #67C23A;"></i>&nbsp;
        <span>加入购物车成功！</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="listed = false">继续购物</el-button>
        <el-button type="primary" @click="goToShoppingCart">查看购物车</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="unListed" width="400px" :center="true">
      <div style="text-align: center;">
        <i class="el-icon-error" style="color: #F56C6C;"></i>&nbsp;
        <span>请先登录,否则无法加入到购物车中！</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unListed = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";
import Card from "@/components/Card.vue";
import product from "@/API/product.js";
import User from "@/API/user.js";
import { store, mutations } from "@/store/store.js";

export default {
  name: "home",
  components: {
    Breadcrumb,
    Card
  },
  data() {
    return {
      form: {
        productName: "",
        priceLevel: ""
      },
      productList: [],
      currentPage: 1,
      loading: false,
      unListed: false,
      listed: false,
      user: {},
      num: 0
    };
  },
  computed: {
    userName() {
      return store.userName;
    },
    count() {
      return store.count;
    }
  },
  methods: {
    init() {
      let req = {
        page: 1,
        pageSize: 10
      };
      this.queryProductList(req);
      if (this.userName) {
        User.getUserInfo({ userName: this.userName }).then(res => {
          if (res.state == "0000") {
            this.user = res.data;
          }
        });
      }
    },
    queryProductList(queryObj, flag = false) {
      product
        .findProductList(queryObj)
        .then(res => {
          let result;
          if (res.state == "0000") {
            result = res.result;
            result.forEach(product => {
              let baseUrl = "http://localhost:3000/images/";
              product.productImage = baseUrl + product.productImage;
            });
            if (flag) {
              this.loading = false;
              if (result.length < 10) this.busy = true;
              result = this.productList.concat(result);
            }
            this.productList = result;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    queryProductByName() {
      let req = {
        page: 1,
        pageSize: 10,
        productName: this.form.productName,
        priceLevel: this.form.priceLevel
      };
      this.queryProductList(req);
    },
    goToShoppingCart() {
      this.$router.push("/shoppingCart");
    },
    productInList(product) {
      let shoppingCartList = this.user.shoppingCartList,
        exist = false;
      shoppingCartList.forEach(item => {
        if (item.productId == product.productId) {
          exist = true;
          item.num++;
          product.num = item.num;
          product.totalPrice = product.salePrice * product.num;
        }
      });
      if (!exist) {
        product.num = 1;
        product.totalPrice = product.salePrice;
      }
      return product.num;
    },
    addShoppingCart(product) {
      if (this.userName) {
        this.listed = true;
        product.checked = true;
        let num = this.productInList(product);
        if (num == 1) {
          this.user.shoppingCartList.push(product);
        }
        this.num = this.count;
        mutations.setCount(++this.num);
      } else {
        this.unListed = true;
      }
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    let req = this.user;
    User.updateShoppingCartList(req);
  },
  beforeRouteLeave(to, from, next) {
    if (this.userName) {
      next();
    } else {
      this.$message.error("请先登录！");
      next(false);
    }
  }
};
</script>

<style scoped>
.filter-nav {
  height: 55px;
  line-height: 55px;
  margin: 40px 0 20px;
  padding: 0 20px;
  background: #fff;
  text-align: right;
  overflow: hidden;
}

.product-name {
  float: left;
  width: 45%;
}

.query-wrap {
  float: right;
}

.el-input,
.el-select {
  width: 80%;
}

label {
  margin-right: 8px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.list-item {
  width: 19%;
  margin-top: 1%;
  margin-right: 1.25%;
}

.list-item:nth-child(5n) {
  margin-right: 0;
}

.container1 {
  overflow-y: hidden;
}

.loading {
  height: 100px;
}
</style>

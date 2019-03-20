<template>
  <div>
    <router-view></router-view>
    <mt-tabbar v-model="tabSelected">
      <mt-tab-item id="home">
        首页
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        购物车
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabSelected: 'home'
    }
  },
  watch: {
    tabSelected (newValue, oldValue) {
      this.$router.push({
        name: newValue
      })
    }
  },
  created(){
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
     //请求'/user/userinfo'接口
      this.$axios.get('/user/userinfo')
      .then(({data})=>{
        //打印mock data
        console.log(data);
        if(data.error === 0){
          this.userInfo = data.data;
        }else{
          this.userInfo = {};
        }
        
      });
    }
  }
}
</script>

<style>
@import './assets/css/reset.less'; 
</style>

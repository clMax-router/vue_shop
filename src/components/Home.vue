<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
        :collapse-transition="false"
        :collapse="isCollapse"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        router
        :default-active="activePath"
        unique-opened>
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in meunList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 字体图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item @click="saveNavState('/' + subItem.path)" :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <!-- 字体图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.getMenuList()
    this.activePath = sessionStorage.getItem('activePath')
  },
  data () {
    return {
      // 左侧列表数组
      meunList: [],
      iconObj: {
        125: 'iconfont icon-group-fill',
        103: 'iconfont icon-lifangtilitiduomiantifangkuai2',
        101: 'iconfont icon-gouwushangpinliwushoutidaimianxing',
        102: 'iconfont icon-danju-tianchong',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res)
      this.meunList = res.data
    },
    // 点击按钮实现菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 点击左侧菜单保存 path 保存激活状态
    saveNavState (activePath) {
      sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
.el-header {
  background-color: #373d41;
}

.el-aside {
  background-color: #333744;

  .el-menu{
    border-right: 0;
  }

  .toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    letter-spacing: .2em;
    cursor: pointer;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont{
  margin-right: 10px;
}
</style>

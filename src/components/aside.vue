<template>
  <el-aside
    width="200px"
    height="100%"
    style="background-color: rgb(238, 241, 246)"
  >
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"
          ><i class="el-icon-notebook-2"></i>文章</template
        >

        <el-menu-item index="1-1">
          <router-link to="/home/add-article">写文章</router-link>
        </el-menu-item>

        <el-menu-item index="1-2">
          <router-link to="/home/list-article">文章列表</router-link>
        </el-menu-item>

        <el-menu-item index="1-3">
          <router-link to="/home/list-tags">标签管理</router-link>
        </el-menu-item>
        <el-menu-item index="1-4">
          <router-link to="/home/list-topics">主题管理</router-link>
        </el-menu-item>

      </el-submenu>

      <el-submenu index="2">
        <template slot="title"
          ><i class="el-icon-user"></i>会员</template
        >

        <el-menu-item index="2-1">
          <router-link to="/home/list-user">会员列表</router-link>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"
          ><i class="el-icon-user-solid"></i>管理员</template
        >

        <el-menu-item index="3-1">
          <router-link to="/home/list-admin">管理员列表</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Aside",
};
</script>

<style>
.el-aside {
  color: #333;
}
.el-aside a {
  display: inline-block;
  width: 100%;
}
</style>
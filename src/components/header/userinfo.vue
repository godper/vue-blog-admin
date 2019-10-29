<template>
  <el-popover
    placement="bottom-end"
    width="150"
    trigger="click"
    v-model="visible"
  >
    <div class="user">
      <div class="userdetail">
        <div class="userinfo-el">
          <img :src="userAvatar" alt="" class="big-avater" />
        </div>
        <div class="userinfo-el">
          <p>{{userNickname}}</p>
        </div>
      </div>
      <div>
        <el-button class="btn" @click="logout">退出登录</el-button>
      </div>
    </div>
    <div slot="reference">
      <img :src="userAvatar" alt="" class="reference-avater" />
    </div>
  </el-popover>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: 'Userinfo',
  data() {
    return {
      visible: false,
      userAvatar: require("../../assets/goavatar.jpg"),
      userNickname: "",
    };
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  methods: {
    ...mapMutations(["userLogOut"]),
    logout() {
      this.userLogOut();
      this.$message({
        message: "已退出登录",
        type: "success"
      });
      this.visible = false;
      this.$router.push({ path: `/login` })
    }
  },
  created () {
      if (this.userinfo != null) {
          if (this.userinfo.avatar != "") {
              this.userAvatar = this.userinfo.avatar;
          }
          if (this.userinfo.nickname != "") {
              this.userNickname = this.userinfo.nickname;
          } else {
              this.userNickname = this.userinfo.adminname;
          }
      } 
  }
};
</script>

<style>
.userinfo-el {
  margin: 5px, 0;
}
.userdetail {
  text-align: center;
  margin-bottom: 10px;
}
.user {
  margin: auto, 10%;
}
.btn {
  width: 100%;
  color: #41bddc;
}
.reference-avater {
  line-height: 30px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
}
.big-avater {
  line-height: 60px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
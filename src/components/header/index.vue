<template>
  
    <div id="site-header" class="site-header">
      <div class="top-bar-block">
        <div class="top-bar-left" @click="setAside" v-if="!foldbar"><i class="el-icon-s-unfold"></i></div>
        <div class="top-bar-left" @click="setAside" v-if="foldbar"><i class="el-icon-s-fold"></i></div>
        <div class="top-bar-left top-bar-left-com" >
          <p class="com">
            <router-link to="/" :style="{ color: '#41BDDC' }"
              >Godper.com</router-link
            >
          </p>
        </div>

        <div>
          <div class="userinfo top-bar-right">
            <Userinfo />
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import Userinfo from "@/components/header/userinfo.vue";
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      foldbar: 1,
    }
  },
  components: {
    Userinfo
  },
  methods: {
    setAside(){
      if (this.foldbar == 1) {
        console.log(this.foldbar)
        this.foldbar = 0;
        console.log(this.foldbar)
        this.closeAside();
      } else if (this.foldbar == 0) {
        this.foldbar = 1;
        this.openAside();
      }
    }
  },
  computed: {
    ...mapState(["userstatus"])
  },
  inject: ["closeAside","openAside"]
};
</script>

<style>
.site-header {
  padding: 0px 5.5556% 0px 0;
  height: 30px;
  line-height: 30px;
}
.top-bar-left {
  float: left;
}
.top-bar-left-com {
  margin-left: 30px
}
.top-bar-right {
  float: right;
  margin-left: 10px;
  height: 30px;
  line-height: 30px;
}
.top-bar-block:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}
.com {
  color: #41bddc;
}
</style>
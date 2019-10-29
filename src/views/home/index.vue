<template>
  <div :style="mainstyle">
    <el-container :style="mainstyle">
      <el-header style="height:30px;line-height:30px">
        <Header />
      </el-header>

      <el-container :style="nexttyle">
        <transition name="slide-fade">
          <Aside v-if="aside" />
        </transition>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
import Aside from "@/components/aside.vue";

export default {
  components: {
    Header,
    Aside
  },
  data() {
    return {
      aside: 1
    };
  },
  computed: {
    getheight() {
      var winHeight;
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight;
      }
      return winHeight;
    },
    mainstyle() {
      return { maxHeight: this.getheight + "px", overflowY: "auto" };
    },
    nexttyle() {
      return { maxHeight: this.getheight - 30 + "px", overflowY: "auto" };
    }
  },
  methods: {
    closeAside() {
      this.aside = 0;
    },
    openAside() {
      this.aside = 1;
    }
  },
  provide: function() {
    return {
      closeAside: this.closeAside,
      openAside: this.openAside
    };
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 30px;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: rgba(240, 240, 240, 1);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
  border-radius: 10px;
  background-color: rgba(240, 240, 240, 0.5);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
  background-color: rgba(240, 240, 240, 0.5);
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
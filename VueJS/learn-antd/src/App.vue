<!-- <template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template> -->
<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <div class="logo" />
    <a-layout-sider v-model="sliderStatus" collapsible :class="['slider', slideIn ? 'reset-slider' : '']">
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1" style="margin-top: 0">
          <a-icon type="home" />
          <span>Home</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="search" />
          <span>Search</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="info" />
            <span>News</span>
          </span>

          <a-menu-item key="3">
            <a-icon type="user" />
            <span>All</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="user" />
            <span>Actors</span>
          </a-menu-item>
          <a-menu-item key="5">
            <a-icon type="user" />
            <span>Actress</span>
          </a-menu-item>

        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>Team</span></span>
          <a-menu-item key="6">
            Team 1
          </a-menu-item>
          <a-menu-item key="8">
            Team 2
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <a-icon type="file" />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout id="main-layout">
      <a-layout-header style="background: #fff; padding: 0">
        <a-menu
            mode="horizontal"
            :default-selected-keys="['2']"
            :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            TV Series
          </a-menu-item>
          <a-menu-item key="2">
            Movies
          </a-menu-item>
          <a-menu-item key="3">
            Anime
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px" id="app-content">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }" id="app-content">
          Bill is a cat.
        </div>
        <a-button type="primary" :class="['drawer-trigger', slideIn ? 'opened' : 'closed', !sliderStatus ? 'opened-full' : '']" shape="circle" @click="slideIn = !slideIn">
          <a-icon v-if="!slideIn" type="right" />
          <a-icon v-if="slideIn" type="left" />
        </a-button>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      sliderStatus: false,
      slideIn: false
    }
  },
  methods: {
    runAfterFiveSecond () {
      setTimeout(() => {
        console.log('Yes it did')
      }, 5000)
    }
  },
  mounted() {
    this.runAfterFiveSecond()
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main {
  width: 100%;
  height: 100vh;
}

.logo {
  height: 32px;
  background: url("assets/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-block: 16px;
}

.drawer-trigger {
  display: none !important;
  position: fixed;
  bottom: 15%;
  left: 5%;
  transition: all .5s ease;
}

.drawer-trigger.opened {
  left: 20%;
}

.drawer-trigger.opened-full {
  left: calc(40% + 1vw);
}

.drawer-trigger.closed {
  left: 5%;
}

#app-content {
  height: calc(90% + 1vh);
}

.reset-slider {
  left: 0 !important;
}
@media screen and (max-width: 768px) {

  #main-layout {
    flex: 0 0 100%;
  }

  .slider {
    position: absolute !important;
    height: 100vh;
    z-index: 10;
    left: -100%;
  }

  .drawer-trigger {
    display: block !important;
  }
}
</style>

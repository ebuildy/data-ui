<template>
  <div id="app">
    <header class="ui menu light fixed">
      <div class="ui container">
        <a href="#" class="header item">
          <i class="icon diamond"></i>
          dataUI
        </a>
        <router-link :to="{path: '/'}" exact class="item" active-class="active"><i class="icon code"></i> SQL Editor</router-link>
        <router-link :to="{name: 'DataSources'}" class="item" active-class="active"><i class="icon database"></i> Data Sources</router-link>
        <router-link :to="{path : 'about', exact: true}" class="item" active-class="active"><i class="icon talk"></i> About</router-link>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
  .menu .icon.diamond
  {
    font-size: 1.2em;
    color: cornflowerblue;
  }
</style>

<style lang="scss">

  .ui
  {
    &.main {
      position: absolute;
      top: 40px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  > .container
  {
    margin-top: 60px;
  }
}
</style>

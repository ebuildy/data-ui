<template>
  <div class="ui main container">
    <br />
    <div class="ui piled segment">
      <h1>dataUI + dataAPI</h1>
      <h2>You got the data, we provide the API & the UI!</h2>
      <p>
        Made with:
      </p>
      <ul class="ui list">
        <li>Java spring</li>
        <li>vueJS + webpack</li>
      </ul>
      <p>
        Made by Thomas Decaux
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

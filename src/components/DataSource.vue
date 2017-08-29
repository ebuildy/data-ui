<template>
    <div class="ui container">
        <h2>Data Sources > Tables</h2>

        <table class="ui table">
            <thead>
                <tr>
                    <th>Table</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="table in tables">
                    <td>{{ table.tableName }}</td>
                </tr>
            </tbody>
        </table>

        <div class="ui active centered inline loader text" v-if="loading">Loading</div>

    </div>
</template>

<script>
  /* eslint-disable key-spacing */

  export default {
    name: 'DataSource',
    data() {
      return {
        loading: true,
        tables: []
        }
    },
    methods: {
      fetchTables ()
      {
        const self = this

        this.loading = true

        this.$http.get('/info/tables').then(response => {
            self.tables = response.body
            self.loading = false
          },
          response => {
            self.loading = false

            alert(response.bodyText)
          })
      }
    },
    mounted()
    {
      this.fetchTables()
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

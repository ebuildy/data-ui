<template>
    <div class="ui container">

        <div>
            <h2>Data Sources</h2>
            <button class="ui button primary" v-on:click="showAddForm=!showAddForm">Add</button>
        </div>

        <div class="ui inverted segment" v-if="showAddForm">
            <h3>New source</h3>
            <form class="ui form inverted">
                <div class="inline fields">
                    <label>ID</label>
                    <div class="ten wide field">
                        <input type="text" name="id">
                    </div>
                </div>
                <div class="inline fields">
                    <label>Driver</label>
                    <div class="ten wide field">
                        <input type="text" name="driver">
                    </div>
                </div>
                <div class="inline fields">
                    <label>URL</label>
                    <div class="ten wide field">
                        <input type="text" name="url">
                    </div>
                </div>
                <div class="inline fields">
                    <label>Authentication</label>
                    <div class="five wide field">
                        <input type="text" name="user" placeholder="user">
                    </div>
                    <div class="five wide field">
                        <input type="text" name="password" placeholder="password">
                    </div>
                </div>

                <button class="ui button warning" v-on:click="showAddForm = false">Cancel</button>
                <button class="ui button success primary" type="submit">Submit</button>
            </form>
        </div>

        <table class="ui table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="source in sources">
                    <td><router-link :to="{ name: 'DataSource', params: { id : source.id}}">{{ source.id }}</router-link></td>
                    <td>{{ source.url }}</td>
                </tr>
            </tbody>
        </table>

        <div class="ui active centered inline loader text" v-if="loading">Loading</div>

    </div>
</template>

<script>
    import sources from "@/services/DataSourceService"

  export default {
    name: 'DataSources',
    data() {
      return {
        loading: true,
        showAddForm: false,
        sources: sources.get()
        }
    },
    methods: {

      fetchTables ()
      {
        const self = this

        this.loading = false
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
    label
    {
        width: 100px !important;
    }
</style>

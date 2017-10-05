<template>
    <div class="ui main">
        <vue-tabs v-on:tab-change="handleTabChange">
            <v-tab v-for="tab in tabs" :title="tab.title">
                <div slot="title">{{tab.title}} <span @click.stop="removeTab(index)" class="ti-close tab-close"></span></div>
                <dashboard-panel></dashboard-panel>
            </v-tab>
            <v-tab title="+">

            </v-tab>
        </vue-tabs>
    </div>
</template>

<script>
    import DashboardPanel from './DashboardPanel.vue'
    import {VueTabs, VTab} from 'vue-nav-tabs'
    import 'vue-nav-tabs/themes/vue-tabs.css'

    export default {
      components: {
        VueTabs,
        VTab,
        DashboardPanel
      },
      name: 'Dashboard',
      computed: {

      },
      data () {
        return {
          tabs: [{title: 'Tab 1'}]
        }
      },
      methods: {
        handleTabChange(tabIndex, newTab, oldTab) {
          if (tabIndex === this.tabs.length) {
            this.tabs.push({ title: 'Tab ' + tabIndex})
          }
        },
        removeTab(index){
          this.tabs.splice(index, 1)
        }
      }
    }
</script>

<style>
    .vue-tabs, .tab-content, .tab-container
    {
        height: 100%;
    }
</style>
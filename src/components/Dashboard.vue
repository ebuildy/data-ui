<template>
    <div class="ui main">
        <vue-tabs ref="main" v-on:tab-change="handleTabChange">
            <v-tab v-for="(tab, index) in tabs" :title="tab.title">
                <div slot="title">
					<a v-if="! tab.change" @dblclick.stop="updateTitle(index, true)">{{tab.title}}</a>
					<div class="ui mini input" v-if="tab.change">
						<input type="text" ref="title" v-model="_title" @keyup.enter="updateTitle(index, false)" @blur="updateTitle(index, false)" />
					</div>
					
					<a @click.stop="updateTitle(index, true, this)" class="tab-icon" v-show="! tab.change"><i class="blue edit icon"></i></a>
					<a @click.stop="removeTab(index)" class="tab-icon" v-show="! tab.change"><i class="red remove circle icon"></i></a>
					<a @click.stop="updateTitle(index, false)" class="tab-icon" v-show="tab.change"><i class="green check circle icon"></i></a>
				</div>
                <dashboard-panel v-on:executeSQL="updateSQL" :title="tab.title" :sql="tab.sql" :index="index" ref="dashboard"></dashboard-panel>
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
	  mounted () {
		// default value here
	    this.tabs = this.$ls.get('tabs', [{title: 'Tab 1', sql: 'SHOW TABLES'}])
		this.tabIndex = this.$ls.get('tabIndex', 0)
		
		// processSize
		this.$nextTick(function () {
		  this.$refs.main.navigateToTab(this.tabIndex)
		  this.$refs.dashboard[this.tabIndex].$refs.editor.processSize()
		  this.$refs.main.renderTabs()
		})
	  },
      name: 'Dashboard',
      computed: {

      },
	  watch: {
		tabs: function () {
		  //console.log(this.tabs)
		}
	  },	  
      data () {
        return {
          tabs: [],
		  tabIndex: 0,
		  _title: ''
        }
      },
      methods: {
		updateSQL(sql) {
		  this.tabs[this.tabIndex].sql = sql
		  this.updateStorage()
		},
        handleTabChange(tabIndex, newTab, oldTab) {
          if (tabIndex === this.tabs.length) {
            this.tabs.push({ title: 'Tab ' + (tabIndex + 1), sql: 'SHOW TABLES'})
		    this.updateStorage()
          }
		  // processSize
		  this.$nextTick(function () {
			this.$refs.dashboard[tabIndex].$refs.editor.processSize()
		  })
		  
		  this.tabIndex = tabIndex
		  this.$ls.set('tabIndex', tabIndex)
        },
        removeTab(index){
          this.tabs.splice(index, 1)
		  this.updateStorage()
        },
        updateTitle(index, status, el){
		  // render tabs
		  //this.$refs.main.renderTabs()
		  this.tabs[index].title = this.tabs[index].title +' '
		
		  this.tabs[index].change = status
		  
		  if (status == false) {
		     this.tabs[index].title = this._title.trim()
		  } else {
		     this._title = this.tabs[index].title.trim()
			 // focus input
		     this.$nextTick(function () {
			   this.$refs.title[0].focus()		  
		     })			 
		  }
		  
		  this.tabs[index].title.trim()
		  this.updateStorage()
        },
		updateStorage(){
		  this.$ls.set('tabs', this.tabs)
		}
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .ui.main
    {
		top: 55px;
    }
	.tab-icon {
		display: none;
		margin-left: 4px;
		cursor: pointer;
	}
	.active_tab .tab-icon {
		display: inline-block;
	}
	.vue-tabs, .vue-tabs .tab-content, .tab-container, .tab-container > div {
		height: 100%;
	}
</style>
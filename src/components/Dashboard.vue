<template>
    <div class="ui main">
        <vue-tabs ref="main" v-on:tab-change="handleTabChange">
            <v-tab v-for="(tab, index) in tabs" :title="tab.title">
                <div slot="title">
					<a v-if="! tab.change">{{tab.title}}</a>
					<div class="ui mini input" v-if="tab.change">
						<input type="text" v-model="title" @blur="updateTitle(index, false)" />
					</div>
					
					<a @click.stop="updateTitle(index, true)" class="tab-icon" v-show="! tab.change"><i class="blue edit icon"></i></a>
					<a @click.stop="removeTab(index)" class="tab-icon" v-show="! tab.change"><i class="red remove circle icon"></i></a>
					<a @click.stop="updateTitle(index, false)" class="tab-icon" v-show="tab.change"><i class="green check circle icon"></i></a>
				</div>
                <dashboard-panel v-bind:sql="tab.sql"></dashboard-panel>
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
	    this.tabs = this.$ls.get('tabs', [{title: 'Tab 1'}]);
	  },
      name: 'Dashboard',
      computed: {

      },
	  watch: {
		tabs: function () {
		  console.log(this.tabs);
		}
	  },	  
      data () {
        return {
          tabs: [],
		  title: ''
        }
      },
      methods: {
        handleTabChange(tabIndex, newTab, oldTab) {
          if (tabIndex === this.tabs.length) {
            this.tabs.push({ title: 'Tab ' + (tabIndex + 1), sql: 'SHOW TABLES'});
          }
		  this.updateStorage();
        },
        removeTab(index){
          this.tabs.splice(index, 1);
		  this.updateStorage();
        },
        updateTitle(index, status){
		  // render tabs
		  //this.$ref.main.renderTabs();
		  this.tabs[index].title = this.tabs[index].title +' ';
		
		  this.tabs[index].change = status;
		  if (status == false) {
		     this.tabs[index].title = this.title;
		  } else {
		     this.title = this.tabs[index].title.toString();
		  }
		  
		  this.tabs[index].title.trim();
        },
		updateStorage(){
		  this.$ls.set('tabs', this.tabs);
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
</style>
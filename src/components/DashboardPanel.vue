<template>
    <div class="dashboard--panel">
        <div id="rowEditor">
        <div class="rowEditor" :id="'rowEditor'+ index">
            <sql-editor ref="editor" v-model="sqlQuery" v-on:execute="execute()"></sql-editor>
        </div>
        <div class="rowResults" :id="'rowResults'+ index" data-sticky-container="true">
            <div id="rowActions">
                <button v-on:click="execute()" class="ui button green"><i class="icon play"></i> Run {{ title }}</button>
                <button v-on:click="download('csv')" class="ui button primary basic"><i class="icon download"></i> Download as CSV</button>
                <span id="executionSummary">{{ execution_summary }}</span>
            </div>
            <div class="ui active centered inline loader text" v-if="loading">Loading</div>
            <div id="resultsWrapper">
                <table class="ui table very basic collapsing celled sortable" v-if="!loading && error === null">
                    <thead class="toto">
                    <tr>
                        <th v-for="column in results_header">{{ column }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in results_data">
                        <td v-for="(column, index) in row" v-bind:class="[fieldTDClass[index]]">{{ column | formatField(index) }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="!loading && error !== null">
                <div id="serverErrorMessage" class="ui negative message"><div class="header">Error occured server side</div><p>{{ error }}</p></div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
  import SqlEditor from './SqlEditor.vue'
  import Split from 'split.js'
  import moment from 'moment'
  
  const CSVParser = require('@/services/papaparse').Papa

  const numberFormat = new Intl.NumberFormat()
  const fieldFormatters = {}

  const API_ROOT = 'https://data.datahub.prod.qwant.infra/'

  export default {
    components: {
      SqlEditor
    },
    name: 'Dashboard',
    computed: {

    },
    data () {
      return {
        loading: false,
        results_header: [],
        results_data: [],
        error: null,
        fieldTDClass: {},
        execution_summary: '',
        sqlQuery: this.sql
      }
    },
    filters: {
      formatField (value, column) {
        return fieldFormatters.hasOwnProperty(column) ? fieldFormatters[column](value) : value
      }
    },
    props: ['sql', 'index', 'title'],
    methods: {
      download (format) {
        window.open(API_ROOT + '_query?disposition=attachment&query=' + encodeURIComponent(this.sqlQuery) + '&format=' + encodeURIComponent(format))
      },
      execute () {
        const self = this
        const startDate = new Date().getTime()
		
		// emit to model
		this.$emit('executeSQL', this.sqlQuery)
		  
        this.loading = true
        this.error = null
        this.execution_summary = 'Executing ..'

        this.$http.get(API_ROOT + '_query?format=csv&limit=500&query=' + encodeURIComponent(this.sqlQuery)).then(response => {
            const buffer = CSVParser.parse(response.bodyText, {
              delimiter: ';',
              quoteChar: '"',
              header: true
            })

            const duration = new Date().getTime() - startDate

            if (buffer.data.length > 0) {
              buffer.data.pop()
            }

            self.results_header = buffer.meta.fields
            self.results_data = buffer.data

            if (self.results_data.length > 0) {
              self.results_header.forEach(column =>
              {
                const sample = self.results_data[0][column]

                if (isNaN(sample)) {

                } else {
                  fieldFormatters[column] = value => numberFormat.format(value)
                  self.fieldTDClass[column] = 'field-number'
                }
              })
            }
			
			this.notify('Your results are ready ! ' + this.title, 'Query success')

            self.execution_summary = 'Executed in ' + moment.duration(duration).humanize() + ', ' + moment().format('HH:mm MMM Do')

            self.loading = false
          },
          response => {
            self.execution_summary = ''
			self.loading = false
			
			this.notify('Error in your query - '+ this.title, 'Query error')
			
            if (response.status === 0) {
              self.error = 'Cannot reach server!'
            } else if (response.body && response.body.hasOwnProperty('error')) {
              self.error = response.body.error
            }
            else {
              self.error = response.bodyText
            }
          })
      },
	  notify (message, title) {
		if(('Notification' in window) ){
			Notification.requestPermission(function(permission){
  			  var notification = new Notification(title, {body: message,icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Crystal_Clear_app_database.png/64px-Crystal_Clear_app_database.png', dir:'auto'});
			  setTimeout(function(){
				notification.close();
			  }, 4000);
		    })
		}	  
	  }
    },
    mounted () {
      const self = this

      Split(['#rowEditor' + this.index, '#rowResults' + this.index], {
        direction: 'vertical',
        gutterSize: 40,
        onDragEnd () {
          self.$refs.editor.processSize()
        },
        elementStyle: function (dimension, size, gutterSize) {
          return { height: size + '%' }
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .dashboard--panel
    {
        height: 100%;
    }

    #resultsWrapper
    {
        overflow: auto;
        position: absolute;
        top: 46px;
        left: 0;
        right: 0;
        bottom: 0;
    }

    sql-editor
    {
        width: 100%;
    }

    .rowEditor
    {
        overflow: hidden;
        position: relative;
    }

    #rowActions
    {
        background: #F0F0F0;
        padding: 5px;
    }

    .rowResults
    {
        position: relative;

        .loader
        {
            margin-top: 20px;
        }

        table
        {
            min-width: 100%;

            thead
            {
                th
                {
                    position: sticky;
                    top: 0;
                    background: #f0f0f0;
                }
            }

            tbody
            {
                td.field-number
                {
                    text-align: right;
                }
            }
        }
    }

    #serverErrorMessage
    {
        max-width: 500px;
        margin: auto;
        margin-top: 40px;
    }
</style>

<style>
    .split, .split-flex {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        overflow-y: auto;
        overflow-x: hidden;
    }

    .gutter {
        background-color: #eee;

        background-repeat: no-repeat;
        background-position: 50%;

    }

    .gutter-horizontal {
        background-image: url('/assets/gutter_vertical.png');
        cursor: ew-resize;
    }

    .gutter-vertical {
        background-image: url('../assets/gutter_horizontal.png');
        cursor: ns-resize;
        height: 40px;
        width: 100px;
        margin: auto auto -40px;
        z-index: 1;
        position: relative;
    }
</style>

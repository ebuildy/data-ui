<template>
    <div ref="container">
        <codemirror ref="myEditor" :options="editorOption" v-model="content"></codemirror>
    </div>
</template>

<script>
    import { codemirror, CodeMirror } from 'vue-codemirror'

    require('codemirror/addon/hint/show-hint.css')

    require('codemirror/addon/hint/show-hint.js')
    require('codemirror/addon/hint/sql-hint.js')
    require('codemirror/addon/selection/active-line.js')
    require('codemirror/addon/selection/mark-selection.js')

    export default {
      components: {codemirror},
      name: 'SqlEditor',
      computed: {
        editor () {
          return this.$refs.myEditor.editor
        }
      },
      methods: {
        processSize () {
          this.editor.setSize('100%', this.$refs.container.parentElement.clientHeight + 'px')
        }
      },
      mounted () {
        this.processSize()
      },
      data () {
        const self = this

        return {
          content: this.value,
          editorOption: {
            tabSize: 4,
            styleActiveLine: true,
            line: true,
            lineWrapping: true,
            mode: 'text/x-mysql',
            theme: 'neo',
            extraKeys: {
              'Ctrl-Space': 'autocomplete',
              'Shift-Enter': instance => {
                self.$emit('execute')
              }
            }, // To invoke the auto complete
            hint: CodeMirror.hint.sql
          }
        }
      },
      props: ['value'],
      watch: {
        content (val) {
          this.$emit('input', val)
          this.$emit('change')
        }
      }
    }
</script>
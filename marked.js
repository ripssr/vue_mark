'use strict';

const store = new Vuex.Store({
    state: {
        input: '# hello'
    },
    mutations: {
        newInput: (state, payload) => state.input = payload.newInput
    },
    actions: {
        onInput ({commit}, newInput) {
            commit('newInput', newInput);
        }
    }
})

const appl = new Vue({
    el: '#app',
    store,
    computed: Object.assign({}, Vuex.mapState({
        input: state => state.input
        }), {
        compiledMarkdown: function() {
            return marked(this.input, { sanitize: true });
        }
    }),
    methods: {
        update: _.debounce(function(e) {
            this.$store.dispatch("onInput", {newInput: e.target.value});
        })
    },
    template: `
    <div id="editor">
      <textarea
        :value="input"
        @input="update">
      </textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
    `
})
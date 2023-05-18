import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state() {
        return {
            "theme": {
                "layout": "dark",
                "switchedLayout": false,
                "loaded": false,
                "apiConnected": false
            },
            "widgets": []
        }
    },
    mutations: {

        updateWidgets(state, payload){

            state.widgets = payload
        },
        updateApiConnected(state, payload){

            state.theme.apiConnected = payload
        },
        updateLayout(state, payload){

            state.theme.layout = payload
        },
        updateSwitchedLayout(state, payload){

            state.theme.switchedLayout = payload
        },
        updateThemeLoaded(state, payload){

            state.theme.loaded = payload
        }
    },
    getters: {
        singleProject: (state) => (url) => {

            return state.widgets[0].projects.find(project => project.url === url)
        }
    },
 /*
    plugins: [createPersistedState({
        paths: ['widgets'],
    })]
    */
})

export default store
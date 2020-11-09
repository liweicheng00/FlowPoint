// initial state

import axios from "axios"

// shape: [{ id, quantity }]
const state = () => ({
    blockStyles: [],
})

// getters
const getters = {
    defaultBlockStyles: state => {
        return state.blockStyles
    }
}

// actions
const actions = {
    getBlockStyles({ commit }) {
        axios.get("api/styles").then((res) => {
            commit("addStyles", res.data)
        }).catch(error => {
            console.log(error)
        });
    },
}

// mutations
const mutations = {
    addStyles(state, styles) {
        state.blockStyles = styles
    },

}





export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
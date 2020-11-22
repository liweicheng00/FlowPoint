// initial state

import axios from "axios"

// shape: [{ id, quantity }]
const state = () => ({
    styles: [],
    userInfo: {
        info: {},
        filesName: []
    }
})

// getters
const getters = {
    getDefaultStyles: state => {
        return state.styles
    }
}

// actions
const actions = {

    userLogin({ commit }, { login_type, id_token }) {
        axios.post("api/login", {
            token: id_token,
            login_type: login_type
        }).then((res) => {
            console.log(res)
            commit('setUserInfo', { userInfo: res.data })

        }).catch(error => {
            console.log(error)

        })
    },
    getUserFile() {
        // commit alldata
        // commit addStyles
    },
    saveFile({ rootState }) {
        let fileName = fileName ? fileName : "undefined"
        if (fileId) {
            // upload with fileId
        } else {
            // upload and get fileId
        }

        console.log(rootState.editor.alldata)
        let { ...uploadData } = rootState.editor.alldata
        console.log(uploadData)
        console.log(uploadData.childs === rootState.editor.alldata.childs)
    },
    getBlockStyles({ commit }) {
        axios.get("api/styles", { timeout: 3000 }).then((res) => {
            commit("addStyles", res.data)
            console.log(JSON.stringify(res.data))
        }).catch(error => {
            console.log(error)
            let f = [
                {
                    "_id": {
                        "$oid": "5fa8abe8468520300fb2eeac"
                    },
                    "name": "default_p1",
                    "content": "<div><p>put something graceful</p></div>",
                    "style": {
                        "div": {
                            "padding": "5%",
                            "justify-content": "flex-start"
                        },
                        "p": {
                            "font-size": "2em",
                            "text-align": "left"
                        }
                    }
                },
                {
                    "_id": {
                        "$oid": "5fa8abe8468520300fb2eead"
                    },
                    "name": "default_p2",
                    "content": "<div><p>put something meaningful</p></div>",
                    "style": {
                        "div": {
                            "padding": "5%",
                            "justify-content": "flex-start"
                        },
                        "p": {
                            "font-size": "1em",
                            "text-align": "left"
                        }
                    }
                },
                {
                    "_id": {
                        "$oid": "5fa8abe8468520300fb2eeae"
                    },
                    "name": "default_h_p",
                    "content": "<div><h2>head</h2><p>put something meaningful</p></div>",
                    "style": {
                        "div": {
                            "padding": "5%",
                            "justify-content": "flex-start"
                        },
                        "h2": {
                            "font-size": "2em",
                            "text-align": "left"
                        },
                        "p": {
                            "font-size": "1em",
                            "text-align": "left"
                        }
                    }
                }
            ]
            commit("addStyles", f)
        });
    },
}

// mutations
const mutations = {
    addStyles(state, styles) {
        styles.map((item => {
            let css = ""
            for (var tag in item.style) {
                css = css + `.${item.name} ${tag} {`;
                for (var style in item.style[tag]) {
                    css = css + `${style}: ${item.style[tag][style]};`;
                }
                css = css + "} ";
            }
            item.style = css
        }))
        // state.blockStyles = styles
        state.blockStyles = state.blockStyles.concat(styles)
    },
    setUserInfo(state, { userInfo }) {
        state.userInfo = userInfo

    },
    clearUserInfo() {
        // logout
    }

}





export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
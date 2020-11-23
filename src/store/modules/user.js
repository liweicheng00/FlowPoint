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
    getUserFile({ commit }, data) {
        // commit alldata
        commit("editor/clearAllData", null, { root: true })
        commit("editor/setAllData", data, { root: true })
        commit("editor/clearFileName", null, { root: true })
        commit("addStyle", data)

        // commit addStyles
    },
    saveFile({ commit, state, rootState }) {
        console.log("user/saveFile")
        console.log(rootState)
        let fileName = rootState.editor.fileName ? rootState.editor.fileName : null
        let fileId = rootState.editor.fileId ? rootState.editor.fileId : null
        console.log("rootState fileName:", fileName, "fileId:", fileId)
        console.log("allData", rootState.editor.alldata)
        let { ...uploadData } = rootState.editor.alldata
        uploadData.file_id = fileId
        uploadData.file_name = fileName
        uploadData.user_id = state.userInfo.info.userId || "None"
        uploadData.styles = []
        if (fileId || fileName) {
            if (fileId) {
                // upload with fileId
                axios.put("api/file", uploadData).then(res => {
                    console.log("saveFile complete", res)
                    commit("editor/setSaveTime", null, { root: true })

                }).catch(error => {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                })
            } else {
                // upload and get fileId
                // uploadData.fileId = "None"
                axios.put("api/file", uploadData).then(res => {
                    console.log("saveFile complete", res)
                    commit("editor/setFileId", null, { root: true })
                    commit("editor/setSaveTime", null, { root: true })

                }).catch(error => {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                })
            }
        } else {
            console.log("saveFile: Nothing to save!")
        }



    },
    getBlockStyles({ commit }) {
        axios.get("api/styles", { timeout: 3000 }).then((res) => {
            commit("addStyles", res.data)
            console.log(JSON.stringify(res.data))
        }).catch(error => {
            console.log(error)

        }).then(function () {
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
        state.styles = state.styles.concat(styles)
    },
    setUserInfo(state, { userInfo }) {
        state.userInfo = userInfo

    },
    clearUserInfo() {
        // logout
    },


}





export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
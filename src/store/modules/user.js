// initial state

import axios from "axios"

// shape: [{ id, quantity }]
const state = () => ({
    styles: [],
    userInfo: {
        info: {},
        filesInfo: []
    }
})

// getters
const getters = {
    getDefaultStyles: state => {
        return state.styles
    },
    getUserId: state => state.userInfo.info.userId
}

// actions
const actions = {

    userLogin({ commit }, { login_type, id_token }) {
        axios.post("api/login", {
            token: id_token,
            login_type: login_type
        }).then((res) => {
            commit('setUserInfo', { userInfo: res.data })

        }).catch(error => {
            console.log(error)

        })

    },
    userLogout({ commit }) {
        commit("clearUserInfo")
    },
    getUserFile({ commit, getters }, fileId) {
        console.log(`dispatch getUserFile: File id: ${fileId}, User id: ${getters.getUserId}`)
        axios.post("api/file", { file_id: [fileId], user_id: getters.getUserId }).then(res => {
            // console.log(res)
            commit("editor/clearAllData", null, { root: true })
            commit("editor/setAllData", res.data.data.data, { root: true })
            commit("editor/setFileId", res.data.data["_id"]["$oid"], { root: true })
            commit("editor/setFileName", res.data.data.file_name, { root: true })

            commit("addStyles", res.data.styles)
        }).catch(error => {
            console.log(error)
        })
        // commit alldata


        // commit addStyles
    },
    saveFile({ commit, state, rootState }) {
        let fileName = rootState.editor.fileName ? rootState.editor.fileName : null
        let fileId = rootState.editor.fileId ? rootState.editor.fileId : null

        let uploadData = {}
        uploadData.data = rootState.editor.alldata.parseJson()
        uploadData.file_id = fileId
        uploadData.file_name = fileName
        uploadData.user_id = state.userInfo.info.userId || null
        uploadData.styles = []
        console.log("dispatch user/saveFile: fileName:", fileName, "fileId:", fileId, "data:", uploadData)

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
                    commit("editor/setFileId", res.data.file_info.file_id, { root: true })
                    commit("editor/setSaveTime", null, { root: true })
                    commit("addFilesInfo", res.data.file_info)

                }).catch(error => {
                    console.log(error)

                })
            }
        } else {
            console.log("saveFile: Nothing to save!")
        }



    },
    getBlockStyles({ commit }) {
        axios.get("api/styles", { timeout: 3000 }).then((res) => {
            commit("addStyles", res.data)
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
        state.userInfo.info = { userId: userInfo.user_id, userName: userInfo.username }
        state.userInfo.filesInfo = userInfo.files_name

    },
    addFilesInfo(state, filesInfo) {
        state.userInfo.filesInfo.unshift(filesInfo)
    },

    clearUserInfo(state) {
        state.userInfo.info = {}
        state.userInfo.filesInfo = []
    },


}





export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
<template>
  <!-- Two-way Data-Binding -->
  <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange"
  />
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      content: "<h2>Choose a block!</h2>",
      focusId: null,
      editorOption: {
        modules: {
          toolbar: ["bold", "italic", "underline", "strike"],
        },
      },
    };
  },
  created: function () {
    this.$bus.$on("Block:focus", (content, id) => {
      this.content = content;
      this.focusId = id;
    });
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {},
    onEditorChange({ html }) {
      // this.content = html;
      // console.log("html", quill);
      this.$bus.$emit("TextEditor:change", html, this.focusId);
      // this.$bus.$emit("TextEditor:change", quill.getText(), this.focusId);
      // this.$bus.$emit("TextEditor:change", quill.getContents(), this.focusId);
      // this.$bus.$emit("TextEditor:change", this.content);
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  },
};
</script>
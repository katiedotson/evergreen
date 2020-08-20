<template>
  <div id="quill" ref="editor" v-html="value"></div>
</template>

<script>
import Quill from "quill";

export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    setTimeout(() => {
      this.editor = new Quill(document.getElementById("quill"), this.editorOpts);
      this.editor.on("text-change", () => this.update());
    }, 200);
  },
  methods: {
    update() {
      this.$emit("value-input", this.$refs.editor.querySelector(".ql-editor").innerHTML);
    }
  },
  data() {
    return {
      editor: null,
      editorOpts: {
        debug: "debug",
        readOnly: false,
        bounds: "#quill",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
            ["link", "image", "video"],
            [{ direction: "rtl" }]
          ]
        },
        theme: "snow"
      }
    };
  }
};
</script>

<style lang="scss">
.ql-editor {
  height: calc(100vh - 200px);
  font-family: "Merriweather";
}
</style>

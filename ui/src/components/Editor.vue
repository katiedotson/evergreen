<template>
  <div id="quill" ref="editor" v-html="value"></div>
</template>

<script>
import Quill from "quill";
import session from "../session";

export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    setTimeout(() => {
      this.editor = new Quill("#quill", this.editorOpts);
      this.editor.on("text-change", () => this.update());
      const toolbar = this.editor.getModule("toolbar");
      toolbar.addHandler("image", this.imageUpload);
    }, 500);
  },
  methods: {
    update() {
      this.$emit("value-input", this.$refs.editor.querySelector(".ql-editor").innerHTML);
    },
    imageUpload() {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      const handleUpload = async input => {
        if (input !== null) {
          const file = input.files.item(0);
          if (file) {
            session
              .storeImage(file, "postBody")
              .then(fileLocation => {
                const range = this.editor.getSelection();
                this.editor.insertEmbed(range.index, "image", fileLocation);
              })
              .catch(() => {
                this.$emit("img-error");
              });
          }
        }
      };
      handleUpload.bind(this);
      input.onchange = () => {
        handleUpload(input);
      };
    }
  },
  data() {
    return {
      editor: {},
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
            ["link", "image"],
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
  height: calc(100vh - 390px);
  font-family: "Barlow";
}
#quill {
  p {
    img {
      width: 100%;
    }
  }
}
</style>

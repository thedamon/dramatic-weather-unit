<template>
  <div class="poetry">
    <div v-if="!text" class="slot">
      <slot></slot>
    </div>
    <div v-html="md(text)"></div>
  </div>
</template>

<script>
import marked from "marked";

export default {
  name: "poetry",
  data() {
    return { text: "" };
  },
  methods: {
    md(text) {
      return marked(text.replace(/&gt;+/g, ">"));
    }
  },
  mounted() {
    this.text = this.$el.querySelector(".slot").innerHTML;
  }
};
</script>

<style>
.slot {
  display: none;
}
</style>

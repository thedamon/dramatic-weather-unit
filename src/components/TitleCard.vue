<template>
<div class="title-card">
  <h1 class="title" :style="{fontSize: 90 / lines.length+'vh' }">
    <span v-for="(line, i) in lines" :key="i" :class="['line', 'line'+i]">{{ line }}</span>
  </h1>
</div>
</template>

<script>
export default {
  name: 'title-card',
  data() {
    return {
      text: ''
    };
  },
  props: {
    splitter: {
      type: String,
      default: ' '
    }
  },
  computed: {
    lines() {
      return typeof this.text === 'string' && this.text.split(this.splitter);
    }
  },
  mounted() {
    this.text = this.$slots.default ? this.$slots.default[0].text : '';
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  line-height: 1;
}
.title-card {
  height: 80vh;
}
.line {
  display: block;
  text-align: center;
}
</style>

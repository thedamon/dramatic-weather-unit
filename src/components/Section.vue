
<template>
  <Poetry>
    <slot></slot>
  </Poetry>
</template>

<script>
import Poetry from "./Poetry";

export default {
  name: "section",
  components: { Poetry },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>

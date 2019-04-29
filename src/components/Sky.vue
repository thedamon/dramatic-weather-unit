<docs>
# Name

What it does.
</docs>

<template>
  <div class="the-sky">
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  mixins: [],
  props: {
    timeOfDay: {
      type: String,
      validator() {
        val => ["day", "night", "morning", "evening"].includes(val);
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    sunIsUp() {
      return this.timeOfDay === "day";
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
$color-night: #011042;
$color-day: #81e6ff;
$color-sunrise: rgb(255, 170, 59);
$color-sunset: rgb(248, 136, 31);
</style>
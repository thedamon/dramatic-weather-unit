<template>
  <div class="phrase">
    <p v-html="text"></p>
  </div>
</template>

<script>
const phrases = [
  `A stranger stranded in the mist.`,
  `A ray of sunlight acts as a spotlight.`,
  `Sheets and sheets and sheets of rain.`,
  `A light in the fog.`,
  `A thick pillow of snow to suppress the cries.`,
  `Heavy news on such a heavy day`,
  `(Oh, the humidity!)`
];

export default {
  name: "",
  components: {},
  mixins: [],
  props: {
    weatherConditions: { type: String, default: "clear" }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>

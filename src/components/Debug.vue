<template>
  <div v-if="debugMode">
    <div
      v-if="location.city && realWeatherSummary && realWeatherSummary.condition"
      class="floater-box"
    >
      🐞
      <p>{{realWeatherSummary.internal.icon.emoji}} {{ location.city }}, {{location.country}}</p>
      <p>{{ realWeatherSummary.temp }}°, {{realWeatherSummary.description}}</p>
      {{ realWeatherSummary }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import hotkeys from "hotkeys-js";

export default {
  name: "debug-view",
  data() {
    return {
      debugMode: false
    };
  },
  computed: {
    ...mapGetters(["location", "realWeatherSummary"])
  },
  currentConditions() {
    if (this.realWeatherSummary && this.realWeatherSummary.condition) {
      return this.realWeatherSummary.condition;
    } else {
      return "Rain";
    }
  },
  mounted() {
    hotkeys("q+w+o+p", () => {
      console.log("DEEBUGGGGGzzzz!!!r kaming!! 🐞");
      this.debugMode = !this.debugMode;
      console.log(this.debugMode);
    });
  },
  destroyed() {
    hotkeys.unbind("q+w+o+p");
  }
};
</script>

<style lang="scss">
.floater-box {
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 10px;
  right: 10px;
  width: 240px;
  font-size: 10px;
  border: 1px solid white;
  padding: 5px 10px;
  opacity: 0.4;
  z-index: 10;

  p {
    margin: 10px 0;
    line-height: 1.2;
  }
}
</style>
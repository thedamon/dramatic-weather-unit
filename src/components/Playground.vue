
<template>
  <div class="playground-section">
    <Weather :weatherConditions="weatherConditions" cloudArray></Weather>
    <Poetry class="-c">
      <slot></slot>
    </Poetry>
    <WeatherConditionsInput class="weather-input" v-model="weatherConditions"></WeatherConditionsInput>
  </div>
</template>

<script>
import Poetry from "./Poetry";
import Weather from "./Weather";
import WeatherConditionsInput from "./WeatherConditionsInput";

export default {
  name: "playground-",
  components: { Poetry, Weather, WeatherConditionsInput },
  mixins: [],
  props: {},
  data() {
    return {
      weatherConditions: "clear"
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style>
.playground-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.weather-input {
  position: absolute;
  z-index: 20;
  bottom: 10px;
  right: 10px;
}
</style>
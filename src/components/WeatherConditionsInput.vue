<template>
  <div :class="`weather-conditions-input-${format}`">
    <button v-if="format === 'randomBtn' || format === 'all'" 
      type="button" 
      @click="randomWeather"
    >Change weather</button>
    <select v-if="format === 'select' || format === 'all'" :value="value" @input="$emit('input', $event.target.value)">
      <option v-for="c in conditions" :key="c">{{c}}</option>
    </select>
  </div>
</template>

<script>
import sample from "lodash.sample";
import { banish } from "../utils";
import { weatherConditions } from "../weather";

export default {
  name: "",
  components: {},
  mixins: [],
  props: {
    value: { type: String },
    format: { type: String }
  },
  data() {
    return {
      conditions: weatherConditions
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    randomWeather() {
      const newWeather = sample(
        weatherConditions.filter(i => i !== this.value)
      );
      this.$emit("input", newWeather);
    }
  }
};
</script>

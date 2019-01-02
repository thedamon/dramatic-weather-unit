<template>
  <div class="weather-conditions-input">
    <select :value="value" @input="$emit('input', $event.target.value)">
      <option v-for="c in conditions" :key="c">{{c}}</option>
    </select>
  </div>
</template>

<script>
import { weatherConditions } from "../weather";

export default {
  name: "",
  components: {},
  mixins: [],
  props: {
    value: { type: String }
  },
  data() {
    return {
      conditions: weatherConditions
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div id="app">
    <Debug></Debug>
    <Intro></Intro>
    <TheText />
  </div>
</template>

<script>
// TODO: react to live weather data and day/night.
import Intro from "./components/Intro";
import Debug from "./components/Debug";
import TheText from "./components/TheText";
import store from "./store/store";
import weather from "./weather";
import { mapGetters } from "vuex";

// <link rel="icon" type="image/png" sizes="96x96" href="/assets/static/src/favicon.png?width=96" data-vue-tag="true">

export default {
  name: "dramatic-weather-unit",
  metaInfo() {
    return {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: `./weather-emoji/${this.emojiWeatherPath}.png`
        }
      ]
    };
  },
  components: { Intro, TheText, Debug },
  computed: {
    ...mapGetters(["realWeatherSummary"]),
    emojiWeatherPath() {
      if (this.realWeatherSummary && this.realWeatherSummary.internal) {
        return this.realWeatherSummary.internal.icon.path;
      }
      return "thunder-cloud-and-rain";
    }
  },
  mounted() {}
};
</script>

<style>
.forthcoming-illustration {
  width: 80vw;
  height: 80vh;
  border: 1px solid #adbfc7;
  margin: 40px auto;
}
</style>
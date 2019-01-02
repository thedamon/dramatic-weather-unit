<template>
  <div class="weather-container" :class="`weather-${weatherConditions}`">
    <div class="stats" v-if="stats">
      <span v-if="sunny">sun, </span>
      <span v-if="raining">rain, </span>
      <span v-if="snowing">snow, </span>
      <span v-if="windy">wind, </span>
      {{ clouds.length }} clouds,
      <span v-if="limitedVisibility">limited visibility, </span>
      cloud cover: <progress :value="cloudCover" max="1">,
    </div>
    <div v-if="sunny" class="sun-container">
      <img class="the-sun" src="../assets/sun.svg">
    </div>
    <div v-if="cloudCover > 0" class="cloud-container">
      <RainCloud class="big-rain-cloud" :raining="raining" bob :track="windy"></RainCloud>
    </div>
    <div v-if="cloudCover > 0 && cloudArray" class="clouds-countainer">
      <div v-for="cloud in clouds" :key="cloud.scale" class="array-cloud"           :style="{left: cloud.left+'%'}" >
        <RainCloud 
          class="array-of-cloud"
          :raining="raining" 
          bob 
          :track="windy" 
          :size="cloud.scale" 
        ></RainCloud>
      </div>
    </div>
    <div v-if="limitedVisibility" class="fog"></div>
  </div>
</template>

<script>
import RainCloud from "./RainCloud";
import weather, { somewhereBtwn } from "./../weather";

export default {
  name: "weather-",
  components: { RainCloud },
  data() {
    return {
      stats: true,
      text: ""
    };
  },
  props: {
    weatherConditions: { type: String, default: "clear" },
    cloudArray: { type: Boolean }
  },
  computed: {
    raining() {
      return weather.isRaining(this.weatherConditions);
    },
    sunny() {
      return weather.isSunny(this.weatherConditions);
    },
    snowing() {
      return weather.isSnowing(this.weatherConditions);
    },
    windy() {
      return weather.isWindy(this.weatherConditions);
    },
    limitedVisibility() {
      return weather.isLimitedVisibility(this.weatherConditions);
    },
    cloudCover() {
      return weather.cloudCover(this.weatherConditions);
    },
    clouds() {
      const clouds = [];
      if (this.cloudCover > 0) {
        let i = 0;
        let defaultSpacing = this.cloudCover;
        let coverage = 0;
        while (coverage < this.cloudCover && i < 200) {
          let scale = weather.somewhereBtwn(0.5, 2);
          let left = (i + 1) * defaultSpacing * 10;
          let cloud = {
            scale,
            left
          };
          clouds.push(cloud);
          i++;
          coverage += scale / 10;
        }
      }
      return clouds;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  line-height: 12vh;
  font-size: calc(10px + 4vh);
}
.weather-container {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.clouds-container {
  position: relative;
}

.array-cloud {
  position: absolute;
  top: 0;
  width: 20vw;
}

.big-rain-cloud {
  position: absolute;
  top: -10vw;
  right: 0vw;
  width: 50vw;
}

.fog {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(194, 194, 194, 0.836)
  );
}

.stats {
  position: absolute;
  bottom: 5px;
  left: 5px;
  font-size: 12px;
  br {
    margin-bottom: 0;
  }
}
</style>

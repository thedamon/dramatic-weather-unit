<template>
  <div class="little-puffy-clouds">
    <RainCloud bob :size=".7" :raining="raining"></RainCloud>
    <RainCloud bob flipX :raining="raining"></RainCloud>
    <RainCloud bob :size="2.1" :raining="raining"></RainCloud>
    <RainCloud bob :size=".8" :raining="raining"></RainCloud>
    <RainCloud bob flipX :size=".3" :raining="raining"></RainCloud>
  </div>
</template>

<script>
import RainCloud from "./RainCloud";

export default {
  name: "little-fluffy-clouds",
  components: { RainCloud },
  props: {
    raining: Boolean
  }
};
</script>

<style lang="scss">
.little-puffy-clouds {
  position: relative;
  .rain-cloud-container {
    position: absolute;
    top: -60px;
    width: calc(15vw + 120px);
    &:nth-child(1) {
      left: 0;
    }
    &:nth-child(2) {
      left: 12%;
    }
    &:nth-child(3) {
      left: 26%;
    }
    &:nth-child(4) {
      left: 40%;
    }
    &:nth-child(5) {
      left: 80%;
    }
  }
}
</style>

<template>
  <header class="intro">
    <StaggerIn
      class="teaser"
      tag="div"
      :stepDelay="2500"
      :delayStart="1000"
    >
      <p
        v-for="(line, i) in lines"
        :key="i"
        :data-index="i"
      >{{line}}</p>
    </StaggerIn>
    <TitleCard>This is the Dramatic Weather Agency.</TitleCard>
  </header>
</template>

<script>
import TitleCard from "./TitleCard";
import StaggerIn from "./StaggerIn";
import store from "../store/store";

export default {
  name: "intro",
  components: { TitleCard, StaggerIn },
  data() {
    return {
      q: "What"
    };
  },
  computed: {
    currentTime() {
      return (
        store.state.now &&
        store.state.now.toLocaleTimeString([], { timeStyle: "short" })
      );
    },
    city() {
      return store.state.location && store.state.location.city;
    },
    lines() {
      return (
        store.state.now && [
          `It's ${this.currentTime}.`,
          `Somewhere just outside ${this.city}`
        ]
      );
    }
  }
};
</script>

<style>
.teaser {
  width: 400px;
  left: calc(50% - 200px);
  margin: 3vh auto;
}
</style>
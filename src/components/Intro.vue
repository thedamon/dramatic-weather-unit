<template>
  <header class="intro">
    <StaggerIn
      class="teaser"
      tag="div"
    >
      <p
        key="time"
        data-index="0"
      >It's {{ currentTime }}.</p>
      <p
        key="city"
        data-index="1"
      >Somewhere just outside {{ city }}.</p>
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
    }
  }
};
</script>

<style>
.teaser {
  position: absolute;
  width: 400px;
  left: calc(50% - 200px);
  margin: 5vh auto;
}
</style>
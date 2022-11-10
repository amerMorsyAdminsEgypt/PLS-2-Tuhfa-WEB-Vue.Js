<template>
  <div class="auth-layout">
    <div class="page-content">
      <div class="navbare">
        <div class="logo">logo</div>
        <div class="page-actions">page-actions</div>
        <div class="page-info">page-info</div>
      </div>
      <div class="content">content</div>
      <div class="footer">footer</div>
    </div>
    <div class="sidebar">sidebar</div>
  </div>
</template>

<script>
// import src from "@/assets/audio/SoundHelix-Song-1.mp3";
export default {
  name: "Test",
  components: {},
  data() {
    return {
      // src: src,
    };
  },
  computed: {},
  methods: {},

  async created() {},
};
</script>
<style lang="scss">
.auth-layout {
  display: grid;
  grid-template-columns: 1.6fr 0.4fr;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "page-content sidebar";
}

.page-content {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 2.7fr 0.1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "navbare"
    "content"
    "footer";
  grid-area: page-content;
}

.navbare {
  display: grid;
  grid-template-columns: 0.3fr 1.7fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-area: navbare;
}

.logo {
  grid-area: 1 / 1 / 2 / 2;
}

.page-actions {
  grid-area: 1 / 2 / 2 / 4;
}

.page-info {
  grid-area: 1 / 3 / 2 / 4;
}

.content {
  grid-area: content;
}

.footer {
  grid-area: footer;
}

.sidebar {
  grid-area: sidebar;
}
</style>

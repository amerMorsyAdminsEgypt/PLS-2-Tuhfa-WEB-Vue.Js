<template>
  <ul
    class="circular-menu"
    :class="`${className} ${toggle ? 'active' : ''}`"
    :style="`--circular-menu-total: ${actions.length}`"
    @blur="loog($event)"
  >
    <div class="toggle" @click="toggle = !toggle" @blur="loog($event)">
      <i class="fa fa-cog"></i>
    </div>
    <li
      v-for="(action, index) in actions"
      :key="index"
      :style="`--i: ${index}`"
    >
      <a :href="action.href" :title="action.title">
        <img :src="require('@/assets/images/' + action.icon)" />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    loog(text = "zzzzzzzzzzzz") {
      console.log(text);
    },
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  watch: {},
  created() {},
};
</script>

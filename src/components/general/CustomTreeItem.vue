<template>
  <li>
    <div :class="isFolder ? 'is-folder' : 'is-not-folder'">
      <div class="item-tree" @click="toggle">
        <span
          v-if="isFolder"
          class="collapse-icon"
          :class="isOpen ? ' item-open' : ' item-close'"
        >
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
        <span v-if="item.image" class="image-container">
          <img :src="item.image" />
        </span>
        <span>{{ item.name }}</span>
      </div>

      <div v-if="item.actions && item.actions.length > 0" class="actions">
        <FloatingMenu>
          <li v-for="(action, index) in item.actions" :key="index">
            <router-link
              v-if="action.type == CUSTOM_TREE_ACTION_TYPE.link"
              :to="action.route"
              :title="action.title"
            >
              <img :src="action.icon" />
            </router-link>
            <button
              v-else-if="action.type == CUSTOM_TREE_ACTION_TYPE.bottomSheet"
              @click="
                $emit('emitData', action.data);
                openBottomSheet(action.actionName);
              "
              :title="action.title"
            >
              <img :src="action.icon" />
            </button>
            <button
              v-else-if="action.type == CUSTOM_TREE_ACTION_TYPE.modal"
              v-b-modal="action.actionName"
              :title="action.title"
              @click="$emit('emitData', action.data)"
            >
              <img :src="action.icon" />
            </button>
          </li>
        </FloatingMenu>
      </div>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <CustomTreeItem
        class="item"
        v-on:emitData="$emit('emitData', $event)"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      ></CustomTreeItem>
    </ul>
  </li>
</template>

<script>
import FloatingMenu from "./FloatingMenu.vue";
import { CUSTOM_TREE_ACTION_TYPE } from "./../../utils/constantLists";
import generalMixin from "./../../utils/generalMixin";

export default {
  name: "CustomTreeItem",
  mixins: [generalMixin],
  components: { FloatingMenu },
  props: {
    item: Object,
  },
  data() {
    return {
      isOpen: false,
      CUSTOM_TREE_ACTION_TYPE,
    };
  },
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length;
    },
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
  },
};
</script>

<template>
  <li>
    <div :class="isFolder ? 'is-folder' : 'is-not-folder'">
      <div class="icon" @click="toggle">
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
      </div>
      <div class="main">
        <div class="header">
          <span class="name">{{ $t("projectName") }} - </span>
          <span class="date"> {{ $t("projectPhone1") }}</span>
        </div>
        <div class="description">
          <p>{{ $t("copyRight") }}</p>
        </div>
        <div class="footer" v-if="item.reacts && item.reacts.length > 0">
          <div class="react" v-for="(react, index) in item.reacts" :key="index">
            <template v-if="react.type == CUSTOM_TREE_ACTION_TYPE.other">
              <img :src="react.icon" :title="react.title" />
              <span>{{ react.count }}</span>
            </template>
            <template
              v-else-if="react.type == CUSTOM_TREE_ACTION_TYPE.bottomSheet"
            >
              <img
                @click="
                  $emit('emitData', react.data);
                  openBottomSheet(react.actionName);
                "
                :src="react.icon"
                :title="react.title"
              />
              <span>{{ react.count }}</span>
            </template>
          </div>
        </div>
      </div>
      <div class="actions" v-if="item.actions && item.actions.length > 0">
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
import FloatingMenu from "@/components/general/FloatingMenu.vue";
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

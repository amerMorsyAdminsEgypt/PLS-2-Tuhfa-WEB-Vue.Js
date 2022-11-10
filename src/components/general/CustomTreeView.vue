<template>
  <div v-if="treeData" class="custom-tree-view">
    <CustomTreeItem
      class="item"
      :item="treeData"
      v-on:emitData="$emit('emitData', $event)"
    />
  </div>
</template>

<script>
import CustomTreeItem from "./CustomTreeItem.vue";

export default {
  name: "CustomTreeView",
  components: { CustomTreeItem },
  props: { treeData: { type: Object, required: true } },
};
</script>

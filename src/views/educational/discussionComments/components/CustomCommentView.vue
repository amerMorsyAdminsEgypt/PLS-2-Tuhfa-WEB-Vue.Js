<template>
  <div v-if="treeData" class="custom-comment-view">
    <CustomCommentItem
      class="item"
      :item="treeData"
      v-on:emitDataInternalAction="$emit('emitDataInternalAction', $event)"
      v-on:emitData="$emit('emitData', $event)"
    />
  </div>
</template>

<script>
import CustomCommentItem from "./CustomCommentItem.vue";

export default {
  name: "CustomCommentView",
  components: { CustomCommentItem },
  props: { treeData: { type: Object, required: true } },
};
</script>

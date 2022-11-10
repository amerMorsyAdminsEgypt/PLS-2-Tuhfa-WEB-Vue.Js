<template>
  <div class="row custom-cards">
    <CustomCard
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :imagePath="imagePath"
      :defaultImg="defaultImg"
      :wrapperHeight="`100px`"
      :withTitle="false"
      :withDescription="false"
      :withIndex="false"
    >
      <li>
        <button :title="$t('edit')" @click="updateItemImage()">
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <!-- <li>
        <button :title="$t('delete')" @click="deleteItemImage()">
          <img src="@/assets/images/trash.svg" />
        </button>
      </li> -->
    </CustomCard>
  </div>
</template>

<script>
import CustomCard from "./../../../../components/general/CustomCard.vue";

export default {
  components: {
    CustomCard,
  },
  props: ["imagePath", "defaultImg"],
  methods: {
    updateItemImage() {
      this.$emit("updateItemImage");
    },
    // deleteItemImage() {
    //   this.$emit("deleteItemImage");
    // },
  },
};
</script>

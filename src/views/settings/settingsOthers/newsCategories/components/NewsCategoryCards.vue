<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(newsCategory, index) in newsCategoriesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="newsCategory.newsCategoryNameCurrent"
      :description="newsCategory.fullCode"
      :imagePath="newsCategory.newsCategoryImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setNewsCategoryData(newsCategory);
            openBottomSheet('NewsCategoryInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setNewsCategoryData(newsCategory);
            openBottomSheet('NewsCategoryQRCode');
          "
          :title="$t('NewsCategories.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasNewsCategoryEdit())">
        <button
          @click="
            setNewsCategoryData(newsCategory);
            openBottomSheet('NewsCategoryUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasNewsCategoryFinaleDelete())">
        <button
          v-b-modal.NewsCategoryDelete
          :title="$t('delete')"
          @click="setNewsCategoryData(newsCategory)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasNewsCategoryChangeActivationType())">
        <button
          v-b-modal.NewsCategoryChangeActivationType
          :title="$t('changeActivationType')"
          @click="setNewsCategoryData(newsCategory)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setNewsCategoryData(newsCategory);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../../utils/functions";
import {
  hasNewsCategoryEdit,
  hasNewsCategoryFinaleDelete,
  hasNewsCategoryChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["newsCategoriesData", "filterData", "defaultImg"],
  methods: {
    setNewsCategoryData(newsCategory) {
      this.$emit("setNewsCategoryData", newsCategory);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasNewsCategoryEdit,
    hasNewsCategoryFinaleDelete,
    hasNewsCategoryChangeActivationType,
  },
};
</script>

<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(educationalRating, index) in educationalRatingsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="educationalRating.educationalRatingTitleCurrent"
      :description="educationalRating.fullCode"
      :imagePath="educationalRating.educationalRatingImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setEducationalRatingData(educationalRating);
            openBottomSheet('EducationalRatingInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setEducationalRatingData(educationalRating);
            openBottomSheet('EducationalRatingQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasEducationalRatingEdit())">
        <button
          @click="
            setEducationalRatingData(educationalRating);
            openBottomSheet('EducationalRatingUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasEducationalRatingFinaleDelete())">
        <button
          v-b-modal.EducationalRatingDelete
          :title="$t('delete')"
          @click="setEducationalRatingData(educationalRating)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasEducationalRatingChangeActivationType())">
        <button
          v-b-modal.EducationalRatingChangeActivationType
          :title="$t('changeActivationType')"
          @click="setEducationalRatingData(educationalRating)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setEducationalRatingData(educationalRating);
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
} from "./../../../../utils/functions";
import {
  hasEducationalRatingEdit,
  hasEducationalRatingFinaleDelete,
  hasEducationalRatingChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["educationalRatingsData", "filterData", "defaultImg"],
  methods: {
    setEducationalRatingData(educationalRating) {
      this.$emit("setEducationalRatingData", educationalRating);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalRatingEdit,
    hasEducationalRatingFinaleDelete,
    hasEducationalRatingChangeActivationType,
  },
};
</script>

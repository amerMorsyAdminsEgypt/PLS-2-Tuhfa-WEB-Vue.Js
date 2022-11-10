<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(educationalStage, index) in educationalStagesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="educationalStage.educationalStageNameCurrent"
      :description="educationalStage.fullCode"
      :imagePath="educationalStage.educationalStageImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setEducationalStageData(educationalStage);
            openBottomSheet('EducationalStageInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setEducationalStageData(educationalStage);
            openBottomSheet('EducationalStageQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasEducationalStageEdit())">
        <button
          @click="
            setEducationalStageData(educationalStage);
            openBottomSheet('EducationalStageUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasEducationalStageFinaleDelete())">
        <button
          v-b-modal.EducationalStageDelete
          :title="$t('delete')"
          @click="setEducationalStageData(educationalStage)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasEducationalStageChangeActivationType())">
        <button
          v-b-modal.EducationalStageChangeActivationType
          :title="$t('changeActivationType')"
          @click="setEducationalStageData(educationalStage)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setEducationalStageData(educationalStage);
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
  hasEducationalStageEdit,
  hasEducationalStageFinaleDelete,
  hasEducationalStageChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["educationalStagesData", "filterData", "defaultImg"],
  methods: {
    setEducationalStageData(educationalStage) {
      this.$emit("setEducationalStageData", educationalStage);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalStageEdit,
    hasEducationalStageFinaleDelete,
    hasEducationalStageChangeActivationType,
  },
};
</script>

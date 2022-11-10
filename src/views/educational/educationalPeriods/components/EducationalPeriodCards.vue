<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(educationalPeriod, index) in educationalPeriodsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="educationalPeriod.educationalPeriodNameCurrent"
      :description="educationalPeriod.fullCode"
      :imagePath="educationalPeriod.educationalPeriodImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setEducationalPeriodData(educationalPeriod);
            openBottomSheet('EducationalPeriodInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setEducationalPeriodData(educationalPeriod);
            openBottomSheet('EducationalPeriodQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasEducationalPeriodEdit())">
        <button
          @click="
            setEducationalPeriodData(educationalPeriod);
            openBottomSheet('EducationalPeriodUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasEducationalPeriodFinaleDelete())">
        <button
          v-b-modal.EducationalPeriodDelete
          :title="$t('delete')"
          @click="setEducationalPeriodData(educationalPeriod)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasEducationalPeriodChangeActivationType())">
        <button
          v-b-modal.EducationalPeriodChangeActivationType
          :title="$t('changeActivationType')"
          @click="setEducationalPeriodData(educationalPeriod)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setEducationalPeriodData(educationalPeriod);
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
  hasEducationalPeriodEdit,
  hasEducationalPeriodFinaleDelete,
  hasEducationalPeriodChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["educationalPeriodsData", "filterData", "defaultImg"],
  methods: {
    setEducationalPeriodData(educationalPeriod) {
      this.$emit("setEducationalPeriodData", educationalPeriod);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalPeriodEdit,
    hasEducationalPeriodFinaleDelete,
    hasEducationalPeriodChangeActivationType,
  },
};
</script>

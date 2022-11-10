<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(gradingPlan, index) in gradingPlansData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="gradingPlan.gradingPlanNameCurrent"
      :description="gradingPlan.fullCode"
      :imagePath="gradingPlan.gradingPlanImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setGradingPlanData(gradingPlan);
            openBottomSheet('GradingPlanInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setGradingPlanData(gradingPlan);
            openBottomSheet('GradingPlanQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasGradingPlanEdit())">
        <button
          @click="
            setGradingPlanData(gradingPlan);
            openBottomSheet('GradingPlanUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasGradingPlanFinaleDelete())">
        <button
          v-b-modal.GradingPlanDelete
          :title="$t('delete')"
          @click="setGradingPlanData(gradingPlan)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasGradingPlanChangeActivationType())">
        <button
          v-b-modal.GradingPlanChangeActivationType
          :title="$t('changeActivationType')"
          @click="setGradingPlanData(gradingPlan)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setGradingPlanData(gradingPlan);
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
  hasGradingPlanEdit,
  hasGradingPlanFinaleDelete,
  hasGradingPlanChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["gradingPlansData", "filterData", "defaultImg"],
  methods: {
    setGradingPlanData(gradingPlan) {
      this.$emit("setGradingPlanData", gradingPlan);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasGradingPlanEdit,
    hasGradingPlanFinaleDelete,
    hasGradingPlanChangeActivationType,
  },
};
</script>

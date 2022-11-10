<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(reminderPlan, index) in reminderPlansData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="reminderPlan.reminderPlanNameCurrent"
      :description="reminderPlan.fullCode"
      :imagePath="reminderPlan.reminderPlanImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setReminderPlanData(reminderPlan);
            openBottomSheet('ReminderPlanInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setReminderPlanData(reminderPlan);
            openBottomSheet('ReminderPlanQRCode');
          "
          :title="$t('ReminderPlans.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasReminderPlanEdit())">
        <button
          @click="
            setReminderPlanData(reminderPlan);
            openBottomSheet('ReminderPlanUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasReminderPlanFinaleDelete())">
        <button
          v-b-modal.ReminderPlanDelete
          :title="$t('delete')"
          @click="setReminderPlanData(reminderPlan)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasReminderPlanChangeActivationType())">
        <button
          v-b-modal.ReminderPlanChangeActivationType
          :title="$t('changeActivationType')"
          @click="setReminderPlanData(reminderPlan)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setReminderPlanData(reminderPlan);
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
  hasReminderPlanEdit,
  hasReminderPlanFinaleDelete,
  hasReminderPlanChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["reminderPlansData", "filterData", "defaultImg"],
  methods: {
    setReminderPlanData(reminderPlan) {
      this.$emit("setReminderPlanData", reminderPlan);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasReminderPlanEdit,
    hasReminderPlanFinaleDelete,
    hasReminderPlanChangeActivationType,
  },
};
</script>

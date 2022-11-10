<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(interestFollowUp, index) in interestFollowUpsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="interestFollowUp.interestFollowUpTitleCurrent"
      :description="interestFollowUp.fullCode"
      :imagePath="interestFollowUp.interestFollowUpImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setInterestFollowUpData(interestFollowUp);
            openBottomSheet('InterestFollowUpInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInterestFollowUpData(interestFollowUp);
            openBottomSheet('InterestFollowUpQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInterestFollowUpEdit())">
        <button
          @click="
            setInterestFollowUpData(interestFollowUp);
            openBottomSheet('InterestFollowUpUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInterestFollowUpFinaleDelete())">
        <button
          v-b-modal.InterestFollowUpDelete
          :title="$t('delete')"
          @click="setInterestFollowUpData(interestFollowUp)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInterestFollowUpChangeActivationType())">
        <button
          v-b-modal.InterestFollowUpChangeActivationType
          :title="$t('changeActivationType')"
          @click="setInterestFollowUpData(interestFollowUp)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInterestFollowUpData(interestFollowUp);
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
  hasInterestFollowUpEdit,
  hasInterestFollowUpFinaleDelete,
  hasInterestFollowUpChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["interestFollowUpsData", "filterData", "defaultImg"],
  methods: {
    setInterestFollowUpData(interestFollowUp) {
      this.$emit("setInterestFollowUpData", interestFollowUp);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInterestFollowUpEdit,
    hasInterestFollowUpFinaleDelete,
    hasInterestFollowUpChangeActivationType,
  },
};
</script>

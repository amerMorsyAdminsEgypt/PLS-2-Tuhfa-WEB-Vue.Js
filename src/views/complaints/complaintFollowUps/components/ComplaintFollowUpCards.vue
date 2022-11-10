<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(complaintFollowUp, index) in complaintFollowUpsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="complaintFollowUp.complaintFollowUpTextCurrent"
      :description="complaintFollowUp.fullCode"
      :imagePath="complaintFollowUp.complaintFollowUpMediaPath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setComplaintFollowUpData(complaintFollowUp);
            openBottomSheet('ComplaintFollowUpInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setComplaintFollowUpData(complaintFollowUp);
            openBottomSheet('ComplaintFollowUpQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintFollowUpEdit())">
        <button
          @click="
            setComplaintFollowUpData(complaintFollowUp);
            openBottomSheet('ComplaintFollowUpUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>

      <li v-if="checkPrivilege(hasComplaintFollowUpFinaleDelete())">
        <button
          v-b-modal.ComplaintFollowUpDelete
          :title="$t('delete')"
          @click="setComplaintFollowUpData(complaintFollowUp)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintFollowUpChangeActivationType())">
        <button
          v-b-modal.ComplaintFollowUpChangeActivationType
          :title="$t('changeActivationType')"
          @click="setComplaintFollowUpData(complaintFollowUp)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setComplaintFollowUpData(complaintFollowUp);
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
  hasComplaintFollowUpEdit,
  hasComplaintFollowUpFinaleDelete,
  hasComplaintFollowUpChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { COMPLAINT_STATUS_TYPE } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["complaintFollowUpsData", "filterData", "defaultImg"],
  data() {
    return {
      COMPLAINT_STATUS_TYPE: COMPLAINT_STATUS_TYPE,
    };
  },
  methods: {
    setComplaintFollowUpData(complaintFollowUp) {
      this.$emit("setComplaintFollowUpData", complaintFollowUp);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasComplaintFollowUpEdit,
    hasComplaintFollowUpFinaleDelete,
    hasComplaintFollowUpChangeActivationType,
  },
};
</script>

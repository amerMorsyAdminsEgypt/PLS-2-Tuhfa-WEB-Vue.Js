<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(complaint, index) in complaintsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="complaint.complaintTitleCurrent"
      :description="complaint.fullCode"
      :imagePath="complaint.complaintMediaPath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="checkPrivilege(hasComplaintReport())">
        <button
          @click="
            setComplaintData(complaint);
            openBottomSheet('ComplaintReportFilter');
          "
          :title="$t('Reports.complaints')"
        >
          <img src="@/assets/images/reports.svg" />
        </button>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setComplaintData(complaint);
            openBottomSheet('ComplaintInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setComplaintData(complaint);
            openBottomSheet('ComplaintQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintEdit())">
        <button
          @click="
            setComplaintData(complaint);
            openBottomSheet('ComplaintUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>

      <li v-if="checkPrivilege(hasComplaintFinaleDelete())">
        <button
          v-b-modal.ComplaintDelete
          :title="$t('delete')"
          @click="setComplaintData(complaint)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintChangeActivationType())">
        <button
          v-b-modal.ComplaintChangeActivationType
          :title="$t('changeActivationType')"
          @click="setComplaintData(complaint)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setComplaintData(complaint);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
      <li
        v-if="
          checkPrivilege(hasCloseComplaint()) &&
          complaint.complaintStatusTypeToken != COMPLAINT_STATUS_TYPE.Closed
        "
      >
        <button
          v-b-modal.ComplaintClose
          :title="$t('Complaints.close')"
          @click="setComplaintData(complaint)"
        >
          <img src="@/assets/images/close.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintFollowUp())">
        <router-link
          :to="{
            name: 'ComplaintFollowUps',
            params: {
              complaintToken: complaint.complaintToken,
            },
          }"
          :title="$t('ComplaintFollowUps.modelName')"
        >
          <img src="@/assets/images/complaintFollowUps.svg" />
        </router-link>
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
  hasComplaintEdit,
  hasComplaintReport,
  hasCloseComplaint,
  hasComplaintFollowUp,
  hasComplaintFinaleDelete,
  hasComplaintChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { COMPLAINT_STATUS_TYPE } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["complaintsData", "filterData", "defaultImg"],
  data() {
    return {
      COMPLAINT_STATUS_TYPE: COMPLAINT_STATUS_TYPE,
    };
  },
  methods: {
    setComplaintData(complaint) {
      this.$emit("setComplaintData", complaint);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasComplaintEdit,
    hasComplaintReport,
    hasCloseComplaint,
    hasComplaintFollowUp,
    hasComplaintFinaleDelete,
    hasComplaintChangeActivationType,
  },
};
</script>

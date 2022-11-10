<template>
  <CustomBottomSheet
    :refName="'EducationalJoiningApplicationChangeApproveRejected'"
    size="md"
    @opened="
      educationalJoiningApplicationApprove.approvalTypeToken =
        APPROVAL_TYPE_TOKENS.Rejected
    "
    :headerText="$t('EducationalJoiningApplications.reject')"
    :headerIcon="icon"
  >
    <div class="row">
      <TextArea
        :className="'col-md-6'"
        id="rejectReasonAr"
        :value="educationalJoiningApplicationApprove.rejectReasonAr"
        v-on:changeValue="
          educationalJoiningApplicationApprove.rejectReasonAr = $event
        "
        :isDisabled="
          educationalJoiningApplicationApprove.approvalTypeToken !=
          APPROVAL_TYPE_TOKENS.Rejected
        "
        :title="$t('EducationalJoiningApplications.rejectReasonAr')"
        :imgName="'reason.svg'"
      />
      <TextArea
        :className="'col-md-6'"
        id="rejectReasonEn"
        :value="educationalJoiningApplicationApprove.rejectReasonEn"
        v-on:changeValue="
          educationalJoiningApplicationApprove.rejectReasonEn = $event
        "
        :isDisabled="
          educationalJoiningApplicationApprove.approvalTypeToken !=
          APPROVAL_TYPE_TOKENS.Rejected
        "
        :title="$t('EducationalJoiningApplications.rejectReasonEn')"
        :imgName="'reason.svg'"
      />
      <TextArea
        :className="'col-md-6'"
        id="rejectReasonUnd"
        :value="educationalJoiningApplicationApprove.rejectReasonUnd"
        v-on:changeValue="
          educationalJoiningApplicationApprove.rejectReasonUnd = $event
        "
        :isDisabled="
          educationalJoiningApplicationApprove.approvalTypeToken !=
          APPROVAL_TYPE_TOKENS.Rejected
        "
        :title="$t('EducationalJoiningApplications.rejectReasonUnd')"
        :imgName="'reason.svg'"
      />
      <TextArea
        :className="'col-md-6'"
        id="approvalNote"
        :value="educationalJoiningApplicationApprove.approvalNote"
        v-on:changeValue="
          educationalJoiningApplicationApprove.approvalNote = $event
        "
        :isDisabled="
          educationalJoiningApplicationApprove.approvalTypeToken !=
          APPROVAL_TYPE_TOKENS.Rejected
        "
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="changeApprove()">
        <img src="@/assets/images/check-icon.svg" :title="$t('yes')" />
      </div>
      <div
        @click.prevent="
          closeBottomSheet('EducationalJoiningApplicationChangeApproveRejected')
        "
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/cancel.svg";
import { STATUS } from "./../../../../utils/constants";
import { APPROVAL_TYPE_TOKENS } from "./../../../../utils/constantLists";
import { objectToFormData } from "./../../../../utils/functions";
import EducationalJoiningApplicationApprove from "./../../../../models/educational/educationalJoiningApplications/EducationalJoiningApplicationApprove";
import apiEducationalJoiningApplication from "./../../../../api/educational/educationalJoiningApplications";
import { getPriceListsDialog } from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      educationalJoiningApplicationApprove:
        new EducationalJoiningApplicationApprove(),
      icon,
      APPROVAL_TYPE_TOKENS,
    };
  },

  computed: {},
  components: {
    CustomBottomSheet,
    TextArea,
  },
  props: ["educationalJoiningApplication"],
  methods: {
    async getPriceListsDialog() {
      this.isLoading = true;
      this.priceListTokenOptions = await getPriceListsDialog();
      this.isLoading = false;
    },
    async changeApprove() {
      this.$emit("isLoading", true);

      try {
        this.educationalJoiningApplicationApprove.token =
          this.educationalJoiningApplication.educationalJoiningApplicationToken;
        let formData = objectToFormData(
          this.educationalJoiningApplicationApprove
        );

        const response = await apiEducationalJoiningApplication.changeApprove(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet(
            "EducationalJoiningApplicationChangeApproveRejected"
          );
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }

      this.$emit("isLoading", false);
    },
  },
};
</script>

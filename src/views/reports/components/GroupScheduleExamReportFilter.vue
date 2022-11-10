<template>
  <CustomBottomSheet
    :refName="'GroupScheduleExamReportFilter'"
    size="xl"
    :headerText="$t('Reports.GroupScheduleExams')"
    :headerIcon="icon"
    @opened="getDialogs"
  >
    <div class="row">
      <template v-if="!token">
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`educationalGroupToken`"
          :value="groupScheduleExams.filterData.educationalGroupToken"
          :options="educationalGroupTokenOptions"
          v-on:changeValue="
            groupScheduleExams.filterData.educationalGroupToken = $event;
            getGroupScheduleExamsDialog();
          "
          :title="$t('EducationalGroups.select')"
          :imgName="'EducationalGroups.svg'"
        />

        <CustomSelectBox
          :className="'col-md-12'"
          :id="'token'"
          :value="groupScheduleExams.filterData.token"
          :options="groupScheduleExamTokenOptions"
          v-on:changeValue="groupScheduleExams.filterData.token = $event"
          :title="$t('GroupScheduleExams.select')"
          :imgName="'GroupScheduleExams.svg'"
        />
      </template>

      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="groupScheduleExams.filterData.sendTo"
        v-on:changeValue="groupScheduleExams.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />
      <CustomCheckbox
        :className="'col-md-12'"
        :value="groupScheduleExams.filterData.isModelAnswers"
        v-on:changeValue="groupScheduleExams.filterData.isModelAnswers = $event"
        :title="$t('GroupScheduleExams.answers')"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>

      <div
        @click.prevent="closeBottomSheet('GroupScheduleExamReportFilter')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import CustomCheckbox from "./../../../components/general/CustomCheckbox.vue";
import generalMixin from "./../../../utils/generalMixin";
import { STATUS } from "./../../../utils/constants";
import icon from "@/assets/images/SimpleExamModels.svg";
import GroupScheduleExams from "./../../../models/educational/groupScheduleExams/GroupScheduleExams";
import apiGroupScheduleExams from "./../../../api/educational/groupScheduleExams";
import { viewFileFromServer } from "./../../../utils/functions";
import {
  getEducationalGroupsDialog,
  getGroupScheduleExamsDialog,
} from "./../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      bottomSheetOpened: false,
      icon,
      groupScheduleExams: new GroupScheduleExams(),
      educationalGroupTokenOptions: [],
      groupScheduleExamTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInput,
    CustomCheckbox,
  },
  props: {
    token: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getDialogs() {
      if (this.token) {
        this.groupScheduleExams.filterData.token = this.token;
      } else {
        if (!this.bottomSheetOpened) {
          this.getEducationalGroupsDialog();
          this.getGroupScheduleExamsDialog();
        }
      }
      this.bottomSheetOpened = true;
    },

    async getEducationalGroupsDialog() {
      this.$emit("isLoading", true);
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.$emit("isLoading", false);
    },

    async getGroupScheduleExamsDialog() {
      this.$emit("isLoading", true);
      let params = {
        educationalGroupToken:
          this.groupScheduleExams.filterData.educationalGroupToken,
      };
      this.groupScheduleExamTokenOptions = await getGroupScheduleExamsDialog(
        params
      );
      this.$emit("isLoading", false);
    },

    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiGroupScheduleExams.getReport(
          this.groupScheduleExams.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("GroupScheduleExamReportFilter");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch") + error);
      }
      this.$emit("isLoading", false);
    },
  },
};
</script>

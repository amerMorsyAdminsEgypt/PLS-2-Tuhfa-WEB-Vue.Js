<template>
  <CustomBottomSheet
    :refName="'ComplaintReportFilter'"
    size="xl"
    :headerText="$t('Reports.complaints')"
    :headerIcon="icon"
    @opened="getDialogs"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="'userTypeToken'"
        :value="complaints.filterData.userTypeToken"
        :options="userTypeTokenOptions"
        v-on:changeValue="
          complaints.filterData.userTypeToken = $event;
          getUsersDialog();
        "
        :title="$t('Users.selectType')"
        :imgName="'type.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`complainingPersonUserToken`"
        :value="complaints.filterData.complainingPersonUserToken"
        :options="userTokenOptions"
        v-on:changeValue="
          complaints.filterData.complainingPersonUserToken = $event;
          getComplaintsDialog();
        "
        :title="$t('Complaints.complainingPersonUser')"
        :imgName="'user.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="'token'"
        :value="complaints.filterData.token"
        :options="complaintTokenOptions"
        v-on:changeValue="complaints.filterData.token = $event"
        :title="$t('Complaints.select')"
        :imgName="'complaints.svg'"
      />
      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="complaints.filterData.sendTo"
        v-on:changeValue="complaints.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
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
        @click.prevent="closeBottomSheet('ComplaintReportFilter')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import generalMixin from "@/utils/generalMixin";
import icon from "@/assets/images/complaints.svg";
import { STATUS } from "@/utils/constants";
import Complaints from "@/models/complaints/complaints/Complaints";
import apiComplaint from "@/api/complaint/complaints";
import { viewFileFromServer } from "@/utils/functions";
import { getUsersDialog, getComplaintsDialog } from "@/utils/dialogsOfApi";
import { USER_TYPE } from "@/utils/constantLists";
import { getDialogOfUserTypes } from "@/utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      complaints: new Complaints(),
      icon,
      userTokenOptions: [],
      complaintTokenOptions: [],
      userTypeTokenOptions: getDialogOfUserTypes(),
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInput,
  },
  props: {
    complainingPersonUserToken: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getDialogs() {
      if (this.complainingPersonUserToken) {
        this.complaints.filterData.complainingPersonUserToken =
          this.complainingPersonUserToken;
      }
      if (this.token) {
        this.complaints.filterData.token = this.token;
      }
      this.getUsersDialog();
      this.getComplaintsDialog();
    },
    async getUsersDialog() {
      this.isLoading = true;
      this.$emit("isLoading", true);
      let params = {};
      switch (this.complaints.filterData.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          params = {
            modelName: "adminsEgypt",
            userTypeToken: USER_TYPE.AdminsEgypt,
          };
          break;
        case USER_TYPE.MasterAdmin:
          params = {
            modelName: "masterAdmins",
            userTypeToken: USER_TYPE.MasterAdmin,
          };
          break;
        case USER_TYPE.Employee:
          params = {
            modelName: "employees",
            userTypeToken: USER_TYPE.Employee,
          };
          break;
        case USER_TYPE.Student:
          params = {
            modelName: "students",
            userTypeToken: USER_TYPE.Student,
          };
          break;
        case USER_TYPE.Supplier:
          params = {
            modelName: "suppliers",
            userTypeToken: USER_TYPE.Supplier,
          };
          break;
        case USER_TYPE.Parent:
          params = {
            modelName: "parents",
            userTypeToken: USER_TYPE.Parent,
          };
          break;
        case USER_TYPE.Client:
          params = {
            modelName: "clients",
            userTypeToken: USER_TYPE.Client,
          };
          break;
      }
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
      this.$emit("isLoading", false);
    },

    async getComplaintsDialog() {
      this.$emit("isLoading", true);
      let params = {
        complainingPersonUserToken:
          this.complaints.filterData.complainingPersonUserToken,
      };
      this.complaintTokenOptions = await getComplaintsDialog(params);
      this.$emit("isLoading", false);
    },
    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiComplaint.getReport(
          this.complaints.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ComplaintReportFilter");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.$emit("isLoading", false);
    },
    async created() {},
  },
};
</script>

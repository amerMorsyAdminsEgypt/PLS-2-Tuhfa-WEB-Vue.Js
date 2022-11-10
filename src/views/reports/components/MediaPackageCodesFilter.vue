<template>
  <CustomBottomSheet
    :refName="'MediaPackageCodesFilter'"
    size="xl"
    :headerText="$t('Reports.mediaPackageCodes')"
    :headerIcon="icon"
    @opened="
      mediaPackageCodes.filterData.setInitialValue();
      setFilter();
    "
  >
    <div class="row">
      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="mediaPackageCodes.filterData.sendTo"
        v-on:changeValue="mediaPackageCodes.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />
      <!-- parent -->
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`mediaPackageToken`"
        :value="mediaPackageCodes.filterData.mediaPackageToken"
        :options="mediaPackageTokenOptions"
        v-on:changeValue="
          mediaPackageCodes.filterData.mediaPackageToken = $event
        "
        :title="$t('MediaPackages.select')"
        :imgName="'mediaPackages.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`mediaPackageCodeToken`"
        :value="mediaPackageCodes.filterData.mediaPackageCodeToken"
        :options="mediaPackageCodeTokenOptions"
        v-on:changeValue="
          mediaPackageCodes.filterData.mediaPackageCodeToken = $event
        "
        :title="$t('MediaPackageCodes.select')"
        :imgName="'mediaPackageCodes.svg'"
      />
      <!-- parent -->
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`joinInEducationalGroupToken`"
        :value="mediaPackageCodes.filterData.joinInEducationalGroupToken"
        :options="educationalGroupTokenOptions"
        v-on:changeValue="
          mediaPackageCodes.filterData.joinInEducationalGroupToken = $event
        "
        :title="$t('EducationalGroups.select')"
        :imgName="'EducationalGroups.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`userToken`"
        :value="mediaPackageCodes.filterData.userToken"
        :options="studentTokensOptions"
        v-on:changeValue="mediaPackageCodes.filterData.userToken = $event"
        :title="$t('students.select')"
        :imgName="'students.svg'"
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
        @click.prevent="closeBottomSheet('MediaPackageCodesFilter')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import generalMixin from "@/utils/generalMixin";
import icon from "@/assets/images/mediaPackageCodes.svg";
import { STATUS } from "@/utils/constants";
import MediaPackageCodes from "@/models/mediaPackageCodes/MediaPackageCodes";
import apiMediaPackageCode from "@/api/mediaPackageCode";
import { getLanguage, viewFileFromServer } from "@/utils/functions";
import {
  getMediaPackagesDialog,
  getMediaPackageCodesDialogCustomized,
  getEducationalGroupsDialog,
  getEducationalGroupStudentsDialog,
} from "@/utils/dialogsOfApi";

export default {
  mixins: [generalMixin],
  components: {
    CustomBottomSheet,
    CustomInput,
    CustomSelectBox,
  },

  props: {
    mediaPackageToken: {
      type: String,
      default: "",
    },
    mediaPackageCodeToken: {
      type: String,
      default: "",
    },
    joinInEducationalGroupToken: {
      type: String,
      default: "",
    },
    userToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      mediaPackageCodes: new MediaPackageCodes(),
      icon,
      mediaPackageTokenOptions: [],
      mediaPackageCodeTokenOptions: [],
      educationalGroupTokenOptions: [],
      studentTokensOptions: [],
    };
  },
  watch: {
    "mediaPackageCodes.filterData.joinInEducationalGroupToken": function () {
      this.getEducationalGroupStudentsDialog();
    },
    "mediaPackageCodes.filterData.mediaPackageToken": function () {
      this.getMediaPackageCodesDialog();
    },
  },
  methods: {
    //#region dialogs
    async getDialogs() {
      this.getEducationalGroupsDialog();
      this.getEducationalGroupStudentsDialog();
      this.getMediaPackagesDialog();
      this.getMediaPackageCodesDialog();
    },
    async setFilter() {
      this.mediaPackageCodes.filterData.mediaPackageToken =
        this.mediaPackageToken;
      this.mediaPackageCodes.filterData.mediaPackageCodeToken =
        this.mediaPackageCodeToken;
      this.mediaPackageCodes.filterData.joinInEducationalGroupToken =
        this.joinInEducationalGroupToken;
      this.mediaPackageCodes.filterData.userToken = this.userToken;
      this.getDialogs();
    },

    async getEducationalGroupsDialog() {
      this.$emit("isLoading", true);
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.$emit("isLoading", false);
    },
    async getEducationalGroupStudentsDialog() {
      this.$emit("isLoading", true);
      let params = {
        educationalGroupToken:
          this.mediaPackageCodes.filterData.joinInEducationalGroupToken,
      };
      this.studentTokensOptions = await getEducationalGroupStudentsDialog(
        params
      );
      this.$emit("isLoading", false);
    },

    async getMediaPackagesDialog() {
      this.$emit("isLoading", true);
      this.mediaPackageTokenOptions = await getMediaPackagesDialog();
      this.$emit("isLoading", false);
    },
    async getMediaPackageCodesDialog() {
      this.$emit("isLoading", true);
      let params = {
        mediaPackageToken: this.mediaPackageCodes.filterData.mediaPackageToken,
      };

      const [options, error] = await getMediaPackageCodesDialogCustomized(
        params
      );

      this.mediaPackageCodeTokenOptions = options;
      this.exceptionMsg = error;
      this.$emit("isLoading", false);
    },

    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiMediaPackageCode.getReport(
          this.mediaPackageCodes.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("MediaPackageCodesFilter");
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

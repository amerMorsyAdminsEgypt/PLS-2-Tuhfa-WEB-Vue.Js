<template>
  <CustomBottomSheet
    :refName="'StudentCardIdsReportFilter'"
    size="xl"
    :headerText="$t('Reports.studentCardIdsReport')"
    :headerIcon="icon"
    @opened="getDialogs"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`userToken`"
        :value="users.filterData.userToken"
        :options="userTokenOptions"
        v-on:changeValue="users.filterData.userToken = $event"
        :title="$t('students.select')"
        :imgName="'students.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`religionToken`"
        :value="users.filterData.religionToken"
        :options="religionTokenOptions"
        v-on:changeValue="users.filterData.religionToken = $event"
        :title="$t('Religions.select')"
        :imgName="'religions.svg'"
      />

      <CustomInput
        :className="'col-md-6'"
        :id="`yearFrom`"
        :value="users.filterData.yearFrom"
        v-on:changeValue="users.filterData.yearFrom = $event"
        :title="$t('Reports.yearFrom')"
        :imgName="'year.svg'"
      />
      <CustomInput
        :className="'col-md-6'"
        :id="`yearTo`"
        :value="users.filterData.yearTo"
        v-on:changeValue="users.filterData.yearTo = $event"
        :title="$t('Reports.yearTo')"
        :imgName="'year.svg'"
      />

      <CustomSelectBox
        :className="'col-md-6'"
        :id="`educationalStageToken`"
        :value="users.filterData.educationalStageToken"
        :options="educationalStageTokenOptions"
        v-on:changeValue="users.filterData.educationalStageToken = $event"
        :title="$t('EducationalStages.select')"
        :imgName="'educationalStages.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`specialtieToken`"
        :value="users.filterData.specialtieToken"
        :options="specialtieTokenOptions"
        v-on:changeValue="users.filterData.specialtieToken = $event"
        :title="$t('Specialties.select')"
        :imgName="'specialties.svg'"
      />

      <CustomSelectBox
        :className="'col-md-6'"
        :id="`nationalityCountryToken`"
        :value="users.filterData.nationalityCountryToken"
        :options="nationalityCountryTokenOptions"
        v-on:changeValue="users.filterData.nationalityCountryToken = $event"
        :title="$t('Countries.selectNationality')"
        :imgName="'countries.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`socialStatuseToken`"
        :value="users.filterData.socialStatuseToken"
        :options="socialStatuseTokenOptions"
        v-on:changeValue="users.filterData.socialStatuseToken = $event"
        :title="$t('SocialStatuses.select')"
        :imgName="'socialStatuses.svg'"
      />

      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="users.filterData.sendTo"
        v-on:changeValue="users.filterData.sendTo = $event"
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
        @click.prevent="closeBottomSheet('StudentCardIdsReportFilter')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import icon from "@/assets/images/cards.svg";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import generalMixin from "@/utils/generalMixin";
import { STATUS } from "@/utils/constants";
import Users from "@/models/users/Users";
import apiUser from "@/api/user";
import { getLanguage, viewFileFromServer } from "@/utils/functions";
import {
  getUsersDialog,
  getEducationalStagesDialog,
  getSpecialtiesDialog,
  getCountriesDialog,
  getSocialStatusesDialog,
  getReligionsDialog,
} from "@/utils/dialogsOfApi";
import { USER_TYPE } from "@/utils/constantLists";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      users: new Users("students"),
      icon,
      userTokenOptions: [],
      educationalStageTokenOptions: [],
      specialtieTokenOptions: [],
      nationalityCountryTokenOptions: [],
      socialStatuseTokenOptions: [],

      religionTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInput,
  },
  props: {
    userToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getDialogs() {
      this.users.setInitialValue("students");
      if (this.userToken) {
        this.users.filterData.userToken = this.userToken;
      }
      this.getStudentsDialog();
      this.getEducationalStagesDialog();
      this.getSpecialtiesDialog();
      this.getCountriesDialog();
      this.getSocialStatusesDialog();

      this.getReligionsDialog();
    },
    async getStudentsDialog() {
      this.$emit("isLoading", true);
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.$emit("isLoading", false);
    },
    async getEducationalStagesDialog() {
      this.$emit("isLoading", true);
      this.educationalStageTokenOptions = await getEducationalStagesDialog();
      this.$emit("isLoading", false);
    },
    async getSpecialtiesDialog() {
      this.$emit("isLoading", true);
      this.specialtieTokenOptions = await getSpecialtiesDialog();
      this.$emit("isLoading", false);
    },
    async getCountriesDialog() {
      this.$emit("isLoading", true);
      this.nationalityCountryTokenOptions = await getCountriesDialog();
      this.$emit("isLoading", false);
    },
    async getSocialStatusesDialog() {
      this.$emit("isLoading", true);
      this.socialStatuseTokenOptions = await getSocialStatusesDialog();
      this.$emit("isLoading", false);
    },
    async getReligionsDialog() {
      this.$emit("isLoading", true);
      this.religionTokenOptions = await getReligionsDialog();
      this.$emit("isLoading", false);
    },

    async getReport() {
      this.$emit("isLoading", true);
      this.users.filterData.userTypeToken = USER_TYPE.Student;
      try {
        const response = await apiUser.getCardIdReport(this.users.filterData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("StudentCardIdsReportFilter");
          if (response.data.reportPath)
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

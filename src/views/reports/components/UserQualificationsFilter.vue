<template>
  <CustomBottomSheet
    :refName="'UserQualificationsFilter'"
    size="xl"
    :headerText="$t('Reports.userQualifications')"
    :headerIcon="icon"
    @opened="getDialogs"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`userToken`"
        :value="userQualifications.filterData.userToken"
        :options="userTokenOptions"
        v-on:changeValue="
          userQualifications.filterData.userToken = $event;
          getQualificationsDialog();
          getClassificationDegreesDialog();
          userQualifications.filterData.userQualificationToken = '';
          userQualifications.filterData.classificationDegreeToken = '';
        "
        :title="$t('students.select')"
        :imgName="'students.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="'userQualificationToken'"
        :value="userQualifications.filterData.userQualificationToken"
        :options="userQualificationTokenOptions"
        v-on:changeValue="
          userQualifications.filterData.userQualificationToken = $event
        "
        :title="$t('Qualifications.select')"
        :imgName="'qualifications.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="'classificationDegreeToken'"
        :value="userQualifications.filterData.classificationDegreeToken"
        :options="userClassificationDegreeTokenOptions"
        v-on:changeValue="
          userQualifications.filterData.classificationDegreeToken = $event
        "
        :title="$t('ClassificationDegrees.select')"
        :imgName="'classificationDegrees.svg'"
      />
      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="userQualifications.filterData.sendTo"
        v-on:changeValue="userQualifications.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />

      <DateTimePicker
        class="col-md-6"
        id="obtainingDateTimeFrom"
        type="dateTime"
        :value="userQualifications.filterData.obtainingDateTimeFrom"
        v-on:changeValue="
          userQualifications.filterData.obtainingDateTimeFrom = $event.dateTime
        "
        :title="$t('UserQualifications.obtainingDateTimeFrom')"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        id="obtainingDateTimeTo"
        type="dateTime"
        :value="userQualifications.filterData.obtainingDateTimeTo"
        v-on:changeValue="
          userQualifications.filterData.obtainingDateTimeTo = $event.dateTime
        "
        :title="$t('UserQualifications.obtainingDateTimeTo')"
        :language="language"
      />

      <DateTimePicker
        class="col-md-6"
        id="joiningDateTimeFrom"
        type="dateTime"
        :value="userQualifications.filterData.joiningDateTimeFrom"
        v-on:changeValue="
          userQualifications.filterData.joiningDateTimeFrom = $event.dateTime
        "
        :title="$t('UserQualifications.joiningDateTimeFrom')"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        id="joiningDateTimeTo"
        type="dateTime"
        :value="userQualifications.filterData.joiningDateTimeTo"
        v-on:changeValue="
          userQualifications.filterData.joiningDateTimeTo = $event.dateTime
        "
        :title="$t('UserQualifications.joiningDateTimeTo')"
        :language="language"
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
        @click.prevent="closeBottomSheet('UserQualificationsFilter')"
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
import DateTimePicker from "@/components/general/DateTimePicker.vue";
import generalMixin from "@/utils/generalMixin";
import icon from "@/assets/images/UserQualifications.svg";
import { STATUS } from "@/utils/constants";
import UserQualifications from "@/models/usersPersonalData/userQualifications/UserQualifications";
import apiUserQualification from "@/api/usersPersonalData/userQualifications";
import { getLanguage, viewFileFromServer } from "@/utils/functions";
import {
  getQualificationsDialog,
  getClassificationDegreesDialog,
  getUsersDialog,
} from "@/utils/dialogsOfApi";
import { USER_TYPE } from "@/utils/constantLists";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      userQualifications: new UserQualifications(),
      icon,
      userTokenOptions: [],
      userQualificationTokenOptions: [],
      userClassificationDegreeTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInput,
    DateTimePicker,
  },
  methods: {
    async getDialogs() {
      this.getStudentsDialog();
      this.getQualificationsDialog();
      this.getClassificationDegreesDialog();
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
    async getQualificationsDialog() {
      this.$emit("isLoading", true);
      let params = {
        userToken: this.userQualifications.filterData.userToken,
      };
      this.userQualificationTokenOptions = await getQualificationsDialog(
        params
      );
      this.$emit("isLoading", false);
    },
    async getClassificationDegreesDialog() {
      this.$emit("isLoading", true);
      let params = {
        userToken: this.userQualifications.filterData.userToken,
      };
      this.userClassificationDegreeTokenOptions =
        await getClassificationDegreesDialog(params);
      this.$emit("isLoading", false);
    },
    async getReport() {
      this.$emit("isLoading", true);
      this.userQualifications.filterData.userTypeToken = USER_TYPE.Student;
      try {
        const response = await apiUserQualification.getReport(
          this.userQualifications.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserQualificationsFilter");
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

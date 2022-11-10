<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalGroupAttendance.userNameCurrent"
            :title="userTitle"
            :imgName="userImg"
          />
          <!-- <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-userToken`"
            :value="educationalGroupAttendance.userToken"
            :options="userTokenOptions"
            v-on:changeValue="educationalGroupAttendance.userToken = $event"
            :title="userTitle"
            :imgName="userImg"
          /> -->
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-attendanceTypeToken`"
            :value="educationalGroupAttendance.attendanceTypeToken"
            :options="attendanceTypeTokenOptions"
            v-on:changeValue="
              educationalGroupAttendance.attendanceTypeToken = $event
            "
            :title="$t('ConstantsListSelect.AttendanceTypes')"
            :imgName="'AttendanceTypes.svg'"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-attendFromDateTime`"
            type="dateTime"
            :value="educationalGroupAttendance.attendFromDateTime"
            :title="$t('from')"
            v-on:changeValue="
              educationalGroupAttendance.attendFromDateTime = $event.dateTime
            "
            :language="language"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-attendToDateTime`"
            type="dateTime"
            :value="educationalGroupAttendance.attendToDateTime"
            :title="$t('to')"
            v-on:changeValue="
              educationalGroupAttendance.attendToDateTime = $event.dateTime
            "
            :language="language"
          />

          <TextArea
            :className="'col-md-12'"
            :id="`${id}-educationalGroupAttendanceNotes`"
            :value="educationalGroupAttendance.educationalGroupAttendanceNotes"
            v-on:changeValue="
              educationalGroupAttendance.educationalGroupAttendanceNotes =
                $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import {
  bottomSheetScrollToTop,
  fullPathFileFromServer,
  getLanguage,
} from "./../../../../utils/functions";
import { USER_TYPE } from "./../../../../utils/constantLists";
import TextArea from "./../../../../components/general/TextArea.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import { getEducationalScheduleTimesDialogCustomized } from "./../../../../utils/dialogsOfApi";
import { getDialogOfAttendanceTypes } from "./../../../../utils/dialogsOfConstantsLists";
import employeesImg from "@/assets/images/employees.svg";
import studentsImg from "@/assets/images/students.svg";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    TextArea,
    DataLabelGroup,
    CustomSelectBox,
    DateTimePicker,
  },
  data() {
    return {
      language: getLanguage(),
      educationalScheduleTimeTokenOptions: [],
      employeeTokenOptions: [],
      studentTokenOptions: [],
      userTokenOptions: [],
      attendanceTypeTokenOptions: getDialogOfAttendanceTypes(),
    };
  },
  computed: {
    userTitle: function () {
      if (this.educationalGroupAttendance.userTypeToken != USER_TYPE.Student)
        return this.$t("employees.name");
      else return this.$t("students.name");
    },
    userImg: function () {
      if (this.educationalGroupAttendance.userTypeToken != USER_TYPE.Student)
        return "employees.svg";
      else return "students.svg";
    },
  },
  props: {
    educationalGroupAttendance: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getEducationalScheduleTimesDialogCustomized() {
      this.isLoading = true;
      let params = {
        employeesDataInclude: true,
        studentsDataInclude: true,
      };
      this.educationalScheduleTimeTokenOptions =
        await getEducationalScheduleTimesDialogCustomized(params);
      this.isLoading = false;
    },

    async educationalScheduleTimeChanged() {
      let index = this.educationalScheduleTimeTokenOptions.findIndex(
        (x) =>
          x.value ==
          this.educationalGroupAttendance.educationalScheduleTimeToken
      );

      if (index > -1) {
        this.getEmployeesDialog(
          this.educationalScheduleTimeTokenOptions[index].employeesData
        );
        this.getStudentsDialog(
          this.educationalScheduleTimeTokenOptions[index].studentsData
        );
      } else {
        this.getEmployeesDialog([]);
        this.getStudentsDialog([]);
      }
    },
    async getEmployeesDialog(itemsData = []) {
      let options = [];
      if (itemsData.length > 0) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["employeeUserToken"],
            text: itemsData[item]["employeeUserInfoData"]["userNameCurrent"],
            image: fullPathFileFromServer(
              itemsData[item]["employeeUserInfoData"]["userImagePath"],
              employeesImg
            ),
          });
        }
      }
      this.employeeTokenOptions = options;
      if (this.educationalGroupAttendance.userTypeToken != USER_TYPE.Student) {
        this.userTokenOptions = options;
      }
    },
    async getStudentsDialog(itemsData = []) {
      let options = [];
      if (itemsData.length > 0) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["studentUserToken"],
            text: itemsData[item]["studentUserInfoData"]["userNameCurrent"],
            image: fullPathFileFromServer(
              itemsData[item]["studentUserInfoData"]["userImagePath"],
              studentsImg
            ),
          });
        }
      }
      this.studentTokenOptions = options;
      if (this.educationalGroupAttendance.userTypeToken == USER_TYPE.Student) {
        this.userTokenOptions = options;
      }
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$emit("submitForm");
    },
  },
  watch: {
    "educationalGroupAttendance.educationalScheduleTimeToken": function () {
      this.educationalScheduleTimeChanged();
    },
  },
  created() {
    this.getEducationalScheduleTimesDialogCustomized();
  },
};
</script>

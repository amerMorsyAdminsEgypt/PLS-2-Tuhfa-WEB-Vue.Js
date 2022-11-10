<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-educationalGroupToken`"
            :value="educationalGroupAttendance.educationalGroupToken"
            :options="educationalGroupTokenOptions"
            v-on:changeValue="
              educationalGroupAttendance.educationalGroupToken = $event;
              getEducationalScheduleTimesDialogCustomized();
            "
            :title="$t('EducationalGroups.select')"
            :imgName="'EducationalGroups.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-educationalScheduleTimeToken`"
            :errors="errors_educationalScheduleTimeToken"
            :value="educationalGroupAttendance.educationalScheduleTimeToken"
            :options="educationalScheduleTimeTokenOptions"
            v-on:changeValue="
              educationalGroupAttendance.educationalScheduleTimeToken = $event;
              $v.educationalGroupAttendance.educationalScheduleTimeToken.$touch();
              educationalScheduleTimeChanged($event);
            "
            :title="$t('EducationalScheduleTimes.select')"
            :imgName="'EducationalScheduleTimes.svg'"
          />

          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-educationalGroupTokenAlternative`"
            :value="educationalGroupAttendance.educationalGroupTokenAlternative"
            :options="educationalGroupTokenOptions"
            v-on:changeValue="
              educationalGroupAttendance.educationalGroupTokenAlternative =
                $event;
              getEducationalScheduleTimesDialog();
            "
            :title="$t('EducationalGroups.select')"
            :imgName="'EducationalGroups.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-alternativeEducationalScheduleTimeToken`"
            :value="
              educationalGroupAttendance.alternativeEducationalScheduleTimeToken
            "
            :options="alternativeEducationalScheduleTimeTokenOptions"
            v-on:changeValue="
              educationalGroupAttendance.alternativeEducationalScheduleTimeToken =
                $event
            "
            :title="$t('EducationalScheduleTimes.selectAlternative')"
            :imgName="'EducationalScheduleTimes.svg'"
          />
        </div>
      </div>

      <div class="my-card">
        <span class="my-card-title">{{ $t("employees.modelName") }}</span>

        <div
          v-if="educationalGroupAttendance.employeesList.length == 0"
          class="my-card-no-content"
        >
          {{ $t("employees.thereAreNoOne") }}
        </div>
        <template v-else>
          <div
            class="my-card"
            v-for="(user, index) in educationalGroupAttendance.employeesList"
            :key="index"
          >
            <span class="my-card-title">{{ index + 1 }}</span>

            <span class="remove-slice-container">
              <button
                @click="removeSliceEmployee(index)"
                type="button"
                class="btn btn-remove-slice"
              >
                ×
              </button>
            </span>

            <div class="row">
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}]employee[userToken]`"
                :value="user.userToken"
                :options="employeeTokenOptions"
                v-on:changeValue="user.userToken = $event"
                :title="$t('employees.select')"
                :imgName="'employees.svg'"
              />
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}]employee[attendanceTypeToken]`"
                :value="user.attendanceTypeToken"
                :options="attendanceTypeTokenOptions"
                v-on:changeValue="user.attendanceTypeToken = $event"
                :title="$t('ConstantsListSelect.AttendanceTypes')"
                :imgName="'AttendanceTypes.svg'"
              />

              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}]employee[attendFromDateTime]`"
                type="dateTime"
                :value="user.attendFromDateTime"
                :title="$t('from')"
                v-on:changeValue="user.attendFromDateTime = $event.dateTime"
                :language="language"
              />
              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}]employee[attendToDateTime]`"
                type="dateTime"
                :value="user.attendToDateTime"
                :title="$t('to')"
                v-on:changeValue="user.attendToDateTime = $event.dateTime"
                :language="language"
              />

              <TextArea
                :className="'col-md-12'"
                :id="`${id}-[${index}]employee[educationalGroupAttendanceNotes]`"
                :value="user.educationalGroupAttendanceNotes"
                v-on:changeValue="user.educationalGroupAttendanceNotes = $event"
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />
            </div>
          </div>
        </template>
        <div class="add-slice-container">
          <button
            @click="addSliceEmployee()"
            type="button"
            class="btn btn-add-slice"
            :title="$t('add')"
          >
            +
          </button>
        </div>
      </div>

      <div class="my-card">
        <span class="my-card-title">{{ $t("students.modelName") }}</span>

        <div
          v-if="educationalGroupAttendance.studentsList.length == 0"
          class="my-card-no-content"
        >
          {{ $t("students.thereAreNoOne") }}
        </div>
        <template v-else>
          <div
            class="my-card"
            v-for="(user, index) in educationalGroupAttendance.studentsList"
            :key="index"
          >
            <span class="my-card-title">{{ index + 1 }}</span>

            <span class="remove-slice-container">
              <button
                @click="removeSliceStudent(index)"
                type="button"
                class="btn btn-remove-slice"
              >
                ×
              </button>
            </span>

            <div class="row">
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}]student[userToken]`"
                :value="user.userToken"
                :options="studentTokenOptions"
                v-on:changeValue="user.userToken = $event"
                :title="$t('students.select')"
                :imgName="'students.svg'"
              />
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}]student[attendanceTypeToken]`"
                :value="user.attendanceTypeToken"
                :options="attendanceTypeTokenOptions"
                v-on:changeValue="user.attendanceTypeToken = $event"
                :title="$t('ConstantsListSelect.AttendanceTypes')"
                :imgName="'AttendanceTypes.svg'"
              />

              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}]student[attendFromDateTime]`"
                type="dateTime"
                :value="user.attendFromDateTime"
                :title="$t('from')"
                v-on:changeValue="user.attendFromDateTime = $event.dateTime"
                :language="language"
              />
              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}]student[attendToDateTime]`"
                type="dateTime"
                :value="user.attendToDateTime"
                :title="$t('to')"
                v-on:changeValue="user.attendToDateTime = $event.dateTime"
                :language="language"
              />

              <TextArea
                :className="'col-md-12'"
                :id="`${id}-[${index}]student[educationalGroupAttendanceNotes]`"
                :value="user.educationalGroupAttendanceNotes"
                v-on:changeValue="user.educationalGroupAttendanceNotes = $event"
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />
            </div>
          </div>
        </template>
        <div class="add-slice-container">
          <button
            @click="addSliceStudent()"
            type="button"
            class="btn btn-add-slice"
            :title="$t('add')"
          >
            +
          </button>
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
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import {
  getEducationalGroupsDialog,
  getEducationalScheduleTimesDialogCustomized,
  getEducationalScheduleTimesDialog,
} from "./../../../../utils/dialogsOfApi";
import { getDialogOfAttendanceTypes } from "./../../../../utils/dialogsOfConstantsLists";
import EducationalGroupAttendanceUser from "./../../../../models/educational/educationalGroupAttendances/EducationalGroupAttendanceUser";
import employeesImg from "@/assets/images/employees.svg";
import studentsImg from "@/assets/images/students.svg";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    TextArea,
    CustomSelectBox,
    DateTimePicker,
  },
  data() {
    return {
      language: getLanguage(),
      educationalGroupTokenOptions: [],
      educationalScheduleTimeTokenOptions: [],
      alternativeEducationalScheduleTimeTokenOptions: [],
      employeeTokenOptions: [],
      studentTokenOptions: [],
      attendanceTypeTokenOptions: getDialogOfAttendanceTypes(),
    };
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
  validations: {
    educationalGroupAttendance: {
      educationalScheduleTimeToken: { required },
    },
  },
  computed: {
    errors_educationalScheduleTimeToken() {
      let errors = [];
      if (
        this.$v.educationalGroupAttendance.educationalScheduleTimeToken.$error
      ) {
        if (
          !this.$v.educationalGroupAttendance.educationalScheduleTimeToken
            .required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    addSliceEmployee() {
      this.educationalGroupAttendance.employeesList.push(
        new EducationalGroupAttendanceUser()
      );
    },
    removeSliceEmployee(index) {
      this.educationalGroupAttendance.employeesList.splice(index, 1);
    },
    addSliceStudent() {
      this.educationalGroupAttendance.studentsList.push(
        new EducationalGroupAttendanceUser()
      );
    },
    removeSliceStudent(index) {
      this.educationalGroupAttendance.studentsList.splice(index, 1);
    },

    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.isLoading = false;
    },
    async getEducationalScheduleTimesDialogCustomized() {
      this.isLoading = true;
      let params = {
        educationalGroupTokens:
          this.educationalGroupAttendance.educationalGroupToken,
        employeesDataInclude: true,
        studentsDataInclude: true,
      };
      if (params.educationalGroupTokens)
        this.educationalScheduleTimeTokenOptions =
          await getEducationalScheduleTimesDialogCustomized(params);
      else this.educationalScheduleTimeTokenOptions = [];
      this.isLoading = false;
    },
    async getEducationalScheduleTimesDialog() {
      this.isLoading = true;
      let params = {
        educationalGroupTokens:
          this.educationalGroupAttendance.educationalGroupTokenAlternative,
      };
      if (params.educationalGroupTokens)
        this.alternativeEducationalScheduleTimeTokenOptions =
          await getEducationalScheduleTimesDialog(params);
      else this.alternativeEducationalScheduleTimeTokenOptions = [];
      this.isLoading = false;
    },

    async educationalScheduleTimeChanged(token) {
      let index = this.educationalScheduleTimeTokenOptions.findIndex(
        (x) => x.value == token
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
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.educationalGroupAttendance.educationalScheduleTimeToken.required
      ) {
        this.$emit("submitForm");
      }
    },
  },
  created() {
    this.getEducationalGroupsDialog();
    this.getEducationalScheduleTimesDialogCustomized();
    // this.educationalScheduleTimeChanged();
  },
};
</script>

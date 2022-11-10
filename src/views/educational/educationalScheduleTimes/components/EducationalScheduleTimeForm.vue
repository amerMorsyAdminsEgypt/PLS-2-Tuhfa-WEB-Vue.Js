<template>
  <div class="">
    <form autocomplete="off" v-if="enquiryStatus">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-educationalGroupToken`"
            :value="filterEnquiry.educationalGroupToken"
            :options="educationalGroupTokenOptions"
            v-on:changeValue="filterEnquiry.educationalGroupToken = $event"
            :title="$t('EducationalGroups.select')"
            :imgName="'EducationalGroups.svg'"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-dateTimeFrom`"
            type="dateTime"
            :value="filterEnquiry.dateTimeFrom"
            :title="$t('EducationalGroups.startDateTime')"
            v-on:changeValue="filterEnquiry.dateTimeFrom = $event.dateTime"
            :language="language"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-dateTimeTo`"
            type="dateTime"
            :value="filterEnquiry.dateTimeTo"
            :title="$t('EducationalGroups.endDateTime')"
            v-on:changeValue="filterEnquiry.dateTimeTo = $event.dateTime"
            :language="language"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="enquiry"
        >
          {{ $t("EducationalScheduleTimes.enquiry") }}
        </button>
        <button
          class="btn btn-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
          @click.prevent
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </form>

    <form
      autocomplete="off"
      v-if="educationalScheduleTime.educationalScheduleTimesData.length != 0"
    >
      <div
        v-for="(
          scheduleTime, index
        ) in educationalScheduleTime.educationalScheduleTimesData"
        :key="index"
        class="container-collapse"
      >
        <b-button
          v-b-toggle="`id-${index}`"
          class="btn btn-lg btn-collapse collapse-data"
        >
          {{
            `[${formateDateTimeLang(
              scheduleTime.dateTimeFromDate,
              scheduleTime.dateTimeFromTime
            )}] - [${formateDateTimeLang(
              scheduleTime.dateTimeToDate,
              scheduleTime.dateTimeToTime
            )}]`
          }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse :id="`id-${index}`">
          <div class="my-card">
            <div class="row">
              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}][dateTimeFrom]`"
                type="dateTime"
                :value="scheduleTime.dateTimeFromCustomized"
                :title="$t('dateTimeStart')"
                v-on:changeValue="
                  scheduleTime.dateTimeFromCustomized = $event.dateTime;
                  scheduleTime.dateTimeFrom = $event.dateTime;
                "
                :language="language"
              />
              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}][dateTimeTo]`"
                type="dateTime"
                :value="scheduleTime.dateTimeToCustomized"
                :title="$t('dateTimeEnd')"
                v-on:changeValue="
                  scheduleTime.dateTimeToCustomized = $event.dateTime;
                  scheduleTime.dateTimeTo = $event.dateTime;
                "
                :language="language"
              />

              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}][fullCode]`"
                :value="scheduleTime.fullCode"
                v-on:changeValue="scheduleTime.fullCode = $event"
                :title="$t('EducationalScheduleTimes.code')"
                :imgName="'code.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}][educationalScheduleTimeNameAr]`"
                :value="scheduleTime.educationalScheduleTimeNameAr"
                v-on:changeValue="
                  scheduleTime.educationalScheduleTimeNameAr = $event
                "
                :title="$t('EducationalScheduleTimes.nameAr')"
                :imgName="'EducationalScheduleTimes.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}][educationalScheduleTimeNameEn]`"
                :value="scheduleTime.educationalScheduleTimeNameEn"
                v-on:changeValue="
                  scheduleTime.educationalScheduleTimeNameEn = $event
                "
                :title="$t('EducationalScheduleTimes.nameEn')"
                :imgName="'EducationalScheduleTimes.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}][educationalScheduleTimeNameUnd]`"
                :value="scheduleTime.educationalScheduleTimeNameUnd"
                v-on:changeValue="
                  scheduleTime.educationalScheduleTimeNameUnd = $event
                "
                :title="$t('EducationalScheduleTimes.nameUnd')"
                :imgName="'EducationalScheduleTimes.svg'"
              />

              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}][educationalScheduleTimeDescriptionAr]`"
                :value="scheduleTime.educationalScheduleTimeDescriptionAr"
                v-on:changeValue="
                  scheduleTime.educationalScheduleTimeDescriptionAr = $event
                "
                :title="$t('EducationalScheduleTimes.descriptionAr')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}][educationalScheduleTimeDescriptionEn]`"
                :value="scheduleTime.educationalScheduleTimeDescriptionEn"
                v-on:changeValue="
                  scheduleTime.educationalScheduleTimeDescriptionEn = $event
                "
                :title="$t('EducationalScheduleTimes.descriptionEn')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}][educationalScheduleTimeDescriptionUnd]`"
                :value="scheduleTime.educationalScheduleTimeDescriptionUnd"
                v-on:changeValue="
                  scheduleTime.educationalScheduleTimeDescriptionUnd = $event
                "
                :title="$t('EducationalScheduleTimes.descriptionUnd')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}][educationalScheduleTimeNotes]`"
                :value="scheduleTime.educationalScheduleTimeNotes"
                v-on:changeValue="
                  scheduleTime.educationalScheduleTimeNotes = $event
                "
                :title="$t('EducationalScheduleTimes.link')"
                :imgName="'link.svg'"
              />

              <!-- v-on:valueLoaded="getPlacesDialog(scheduleTime.placeTypeToken)" -->
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}][${scheduleTime.placeTypeToken}]`"
                :value="scheduleTime.placeTypeToken"
                :options="placeTypeTokenOptions"
                v-on:changeValue="
                  scheduleTime.placeTypeToken = $event;
                  setPlacesDialog(index, scheduleTime.placeTypeToken);
                "
                :title="$t('Places.type')"
                :imgName="'type.svg'"
              />
              <CustomSelectBox
                :key="placeTokenOptionsKey"
                :className="'col-md-6'"
                :id="`${id}-[${index}][${scheduleTime.placeToken}]`"
                :value="scheduleTime.placeToken"
                :options="
                  placeTokenOptions.length ? placeTokenOptions[index] : []
                "
                v-on:changeValue="scheduleTime.placeToken = $event"
                :title="$t('Places.select')"
                :imgName="'places.svg'"
              />

              <CustomSelectBoxMultiple
                :className="'col-md-12'"
                :id="`${id}-[${index}][employeesTokens]`"
                :value="scheduleTime.employeesTokens"
                :options="userTokenOptions"
                v-on:changeValue="scheduleTime.employeesTokens = $event"
                :title="$t('lecturers.select')"
                :imgName="'lecturers.svg'"
                :returnArrayOfObjects="false"
              />
            </div>
          </div>
        </b-collapse>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="submitForm"
        >
          {{ submitName }}
        </button>
        <button
          class="btn btn-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
          @click.prevent
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// import { STATUS } from "./../../../../utils/constants";
import {
  bottomSheetScrollToTop,
  getLanguage,
  formateDateTimeLang,
} from "./../../../../utils/functions";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomSelectBoxMultiple from "./../../../../components/general/CustomSelectBoxMultiple.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import {
  getEducationalGroupsDialog,
  getPlacesDialog,
  getUsersDialog,
} from "./../../../../utils/dialogsOfApi";
import { getDialogOfPlaceType } from "./../../../../utils/dialogsOfConstantsLists";
import {
  USER_TYPE,
  USER_ACTIVITY_TYPE_TOKEN,
} from "./../../../../utils/constantLists";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomInput,
    TextArea,
    CustomSelectBox,
    CustomSelectBoxMultiple,
    DateTimePicker,
  },
  data() {
    return {
      language: getLanguage(),
      educationalGroupTokenOptions: [],
      placeTokenOptions: [],
      userTokenOptions: [],
      placeTypeTokenOptions: getDialogOfPlaceType() || [],
      placeTokenOptionsKey: 0,
    };
  },
  props: {
    educationalScheduleTime: {
      type: Object,
    },
    enquiryStatus: {
      type: Boolean,
      default: true,
    },
    filterEnquiry: {
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
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.isLoading = false;
    },
    async setPlacesDialog(index, placeTypeToken) {
      this.isLoading = true;
      let params = { placeTypeToken: placeTypeToken };
      this.placeTokenOptions[index] = [];
      this.placeTokenOptions[index] = await getPlacesDialog(params);
      this.placeTokenOptionsKey = Date.now();
      this.isLoading = false;
    },
    async getUsersDialog() {
      this.isLoading = true;
      let params = {
        modelName: "employees",
        userTypeToken: USER_TYPE.Employee,
        userActivityTypeToken: USER_ACTIVITY_TYPE_TOKEN.Lecturer,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$emit("submitForm");
    },
    async enquiry() {
      this.$emit("enquiry");
    },
    async setPlaceTokenOptions() {
      if (this.educationalScheduleTime.educationalScheduleTimesData) {
        for (const [
          i,
          element,
        ] of this.educationalScheduleTime.educationalScheduleTimesData.entries()) {
          await this.setPlacesDialog(i, element.placeTypeToken);
        }
      } else {
        this.placeTokenOptions.push([]);
      }
    },

    checkPrivilege,
    formateDateTimeLang,
  },
  watch: {
    // "educationalScheduleTime.educationalScheduleTimesData": function (val) {
    //   if (val.length) {
    //     console.log("watch", val);
    //     this.setPlaceTokenOptions();
    //   }
    // },
  },
  created() {
    this.getEducationalGroupsDialog();
    this.setPlaceTokenOptions();
    this.getUsersDialog();
  },
};
</script>

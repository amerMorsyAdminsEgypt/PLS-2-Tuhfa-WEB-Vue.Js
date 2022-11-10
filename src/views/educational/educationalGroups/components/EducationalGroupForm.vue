<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <!-- <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="educationalGroup.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              educationalGroup.educationalGroupImagePath,
              educationalGroup.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !educationalGroup.educationalGroupImageIsDefault &&
            checkPrivilege(hasEducationalGroupDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div> -->

      <!-- #region MainData -->
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="educationalGroup.fullCode"
            v-on:changeValue="educationalGroup.fullCode = $event"
            :title="$t('EducationalGroups.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalGroupNameAr`"
            :errors="errors_educationalGroupNameAr"
            :value="educationalGroup.educationalGroupNameAr"
            v-on:changeValue="
              educationalGroup.educationalGroupNameAr = $event;
              $v.educationalGroup.educationalGroupNameAr.$touch();
            "
            :title="$t('EducationalGroups.nameAr')"
            :imgName="'EducationalGroups.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalGroupNameEn`"
            :errors="errors_educationalGroupNameEn"
            :value="educationalGroup.educationalGroupNameEn"
            v-on:changeValue="
              educationalGroup.educationalGroupNameEn = $event;
              $v.educationalGroup.educationalGroupNameEn.$touch();
            "
            :title="$t('EducationalGroups.nameEn')"
            :imgName="'EducationalGroups.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalGroupNameUnd`"
            :value="educationalGroup.educationalGroupNameUnd"
            v-on:changeValue="educationalGroup.educationalGroupNameUnd = $event"
            :title="$t('EducationalGroups.nameUnd')"
            :imgName="'EducationalGroups.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalGroupDescriptionAr`"
            :errors="errors_educationalGroupDescriptionAr"
            :value="educationalGroup.educationalGroupDescriptionAr"
            v-on:changeValue="
              educationalGroup.educationalGroupDescriptionAr = $event;
              $v.educationalGroup.educationalGroupDescriptionAr.$touch();
            "
            :title="$t('EducationalGroups.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalGroupDescriptionEn`"
            :errors="errors_educationalGroupDescriptionEn"
            :value="educationalGroup.educationalGroupDescriptionEn"
            v-on:changeValue="
              educationalGroup.educationalGroupDescriptionEn = $event;
              $v.educationalGroup.educationalGroupDescriptionEn.$touch();
            "
            :title="$t('EducationalGroups.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalGroupDescriptionUnd`"
            :value="educationalGroup.educationalGroupDescriptionUnd"
            v-on:changeValue="
              educationalGroup.educationalGroupDescriptionUnd = $event
            "
            :title="$t('EducationalGroups.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalGroupNotes`"
            :value="educationalGroup.educationalGroupNotes"
            v-on:changeValue="educationalGroup.educationalGroupNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-educationalGroupStartDateTime`"
            :errors="errors_educationalGroupStartDateTime"
            type="dateTime"
            :value="educationalGroup.educationalGroupStartDateTime"
            :title="$t('EducationalGroups.startDateTime')"
            v-on:changeValue="
              educationalGroup.educationalGroupStartDateTime = $event.dateTime;
              $v.educationalGroup.educationalGroupStartDateTime.$touch();
            "
            :language="language"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-educationalGroupEndDateTime`"
            :errors="errors_educationalGroupEndDateTime"
            type="dateTime"
            :value="educationalGroup.educationalGroupEndDateTime"
            :title="$t('EducationalGroups.endDateTime')"
            v-on:changeValue="
              educationalGroup.educationalGroupEndDateTime = $event.dateTime;
              $v.educationalGroup.educationalGroupEndDateTime.$touch();
            "
            :language="language"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-educationalGroupTimeZoneToken`"
            :errors="errors_educationalGroupTimeZoneToken"
            :value="educationalGroup.educationalGroupTimeZoneToken"
            :options="timeZoneTokenOptions"
            v-on:changeValue="
              educationalGroup.educationalGroupTimeZoneToken = $event
            "
            :title="$t('ConstantsListSelect.TimeZones')"
            :imgName="'TimeZones.svg'"
          />

          <CustomInputInt
            :className="'col-md-6'"
            :id="`${id}-educationalGroupMaximumStudentsNumber`"
            :value="educationalGroup.educationalGroupMaximumStudentsNumber"
            v-on:changeValue="
              educationalGroup.educationalGroupMaximumStudentsNumber = $event
            "
            :title="$t('EducationalGroups.maximumNumberOfStudents')"
            :imgName="'number.svg'"
          />
          <CustomInputInt
            :className="'col-md-6'"
            :id="`${id}-educationalGroupMinimumStudentsNumber`"
            :value="educationalGroup.educationalGroupMinimumStudentsNumber"
            v-on:changeValue="
              educationalGroup.educationalGroupMinimumStudentsNumber = $event
            "
            :title="$t('EducationalGroups.minimumNumberOfStudents')"
            :imgName="'number.svg'"
          />

          <BaseTree
            :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
            :treeModel="getTreeModel"
            v-on:changeValue="baseTreeChanged($event)"
            :disableAllinputs="disableAllinputs"
            :showParent="true"
            :filterParentDirect="true"
          />
        </div>
      </div>
      <!-- #endregion MainData -->

      <CustomCheckbox
        v-if="fixedScheduleStatus"
        :className="'col-12'"
        :value="educationalGroup.fixedScheduleStatus"
        v-on:changeValue="educationalGroup.fixedScheduleStatus = $event"
        :title="$t('EducationalGroups.fixedSchedule')"
        :centerStatus="true"
      />

      <!-- #region fixedSchedule -->
      <template v-if="educationalGroup.fixedScheduleStatus">
        <CustomCheckboxMultiple
          :className="'col-md-12'"
          :value="educationalGroup.fixedScheduleDays"
          :options="educationalGroup.fixedScheduleDaysOptions"
          v-on:changeValue="educationalGroup.fixedScheduleDays = $event"
          :title="$t('general.selectDays')"
          :imgName="'week.svg'"
        />

        <div class="my-card">
          <!-- <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-[fixed][dayWorkTypeToken]`"
            :value="educationalGroup.fixedSchedule.dayWorkTypeToken"
            :options="dayWorkTypeTokenOptions"
            v-on:changeValue="
              educationalGroup.fixedSchedule.dayWorkTypeToken = $event
            "
            :title="$t('ConstantsListSelect.DayWorkStatus')"
            :imgName="'DayWorkStatus.svg'"
          /> -->

          <div
            v-if="
              educationalGroup.fixedSchedule.educationalGroupPlacesData
                .length == 0
            "
            class="my-card-no-content"
          >
            {{ $t("EducationalGroups.thereAreNoSlidesPlaces") }}
          </div>
          <template v-else>
            <div
              class="my-card"
              v-for="(educationalGroupPlace, indexPlace) in educationalGroup
                .fixedSchedule.educationalGroupPlacesData"
              :key="indexPlace"
            >
              <span class="my-card-title">{{ indexPlace + 1 }}</span>

              <span class="remove-slice-container">
                <button
                  @click="removeSlicePlaceFixed(indexPlace)"
                  type="button"
                  class="btn btn-remove-slice"
                >
                  ×
                </button>
              </span>

              <div class="row">
                <CustomSelectBox
                  :className="'col-md-6'"
                  :id="`${id}-[fixed][${indexPlace}][placeTypeToken]`"
                  :value="educationalGroupPlace.placeTypeToken"
                  :options="placeTypeTokenOptions"
                  v-on:changeValue="
                    educationalGroupPlace.placeTypeToken = $event;
                    getPlacesDialogFixed(
                      educationalGroupPlace.placeTypeToken,
                      indexPlace
                    );
                  "
                  :title="$t('Places.type')"
                  :imgName="'type.svg'"
                />
                <CustomSelectBox
                  :key="placeTokenOptionsFixedKey"
                  :className="'col-md-6'"
                  :id="`${id}-[fixed][${indexPlace}][placeToken]`"
                  :value="educationalGroupPlace.placeToken"
                  :options="
                    placeTokenOptionsFixed.length
                      ? placeTokenOptionsFixed[indexPlace]
                      : []
                  "
                  v-on:changeValue="educationalGroupPlace.placeToken = $event"
                  :title="$t('Places.select')"
                  :imgName="'places.svg'"
                />
              </div>

              <div
                v-if="
                  educationalGroupPlace.educationalGroupTimesData.length == 0
                "
                class="my-card-no-content"
              >
                {{ $t("EducationalGroups.thereAreNoSlidesTimes") }}
              </div>
              <template v-else>
                <div
                  class="my-card"
                  v-for="(
                    groupTime, indexGroupTime
                  ) in educationalGroupPlace.educationalGroupTimesData"
                  :key="indexGroupTime"
                >
                  <span class="my-card-title">{{ indexGroupTime + 1 }}</span>

                  <span class="remove-slice-container">
                    <button
                      @click="
                        removeSliceGroupTimeFixed(indexPlace, indexGroupTime)
                      "
                      type="button"
                      class="btn btn-remove-slice"
                    >
                      ×
                    </button>
                  </span>
                  <div class="row">
                    <DateTimePicker
                      class="col-md-6"
                      :id="`${id}-[fixed][${indexPlace}][${indexGroupTime}][timeFrom]`"
                      type="time"
                      :value="groupTime.timeFromUTC"
                      :title="$t('EducationalGroups.time.from')"
                      v-on:changeValue="
                        groupTime.timeFromUTC = $event.dateTime;
                        groupTime.timeFrom = $event.timeCustomized;
                      "
                      :language="language"
                      :imgName="'time.svg'"
                    />
                    <DateTimePicker
                      class="col-md-6"
                      :id="`${id}-[fixed][${indexPlace}][${indexGroupTime}][timeTo]`"
                      type="time"
                      :value="groupTime.timeToUTC"
                      :title="$t('EducationalGroups.time.to')"
                      v-on:changeValue="
                        groupTime.timeToUTC = $event.dateTime;
                        groupTime.timeTo = $event.timeCustomized;
                      "
                      :language="language"
                      :imgName="'time.svg'"
                    />

                    <CustomSelectBox
                      :className="'col-md-6'"
                      :id="`${id}-[fixed][${indexPlace}][${indexGroupTime}][timeZoneToken]`"
                      :value="groupTime.timeZoneToken"
                      :options="timeZoneTokenOptions"
                      v-on:changeValue="groupTime.timeZoneToken = $event"
                      :title="$t('ConstantsListSelect.TimeZones')"
                      :imgName="'TimeZones.svg'"
                    />
                    <CustomSelectBox
                      :className="'col-md-6'"
                      :id="`${id}-[fixed][${indexPlace}][${indexGroupTime}][appointmentTypeToken]`"
                      :value="groupTime.appointmentTypeToken"
                      :options="appointmentTypeTokenOptions"
                      v-on:changeValue="groupTime.appointmentTypeToken = $event"
                      :title="$t('ConstantsListSelect.AppointmentTypes')"
                      :imgName="'AppointmentTypes.svg'"
                    />

                    <CustomSelectBoxMultiple
                      :className="'col-md-12'"
                      :id="`${id}-[fixed][${indexPlace}][${indexGroupTime}][employeesTokens]`"
                      :value="groupTime.employeesTokens"
                      :options="userTokenOptions"
                      v-on:changeValue="groupTime.employeesTokens = $event"
                      :title="$t('lecturers.select')"
                      :imgName="'lecturers.svg'"
                      :returnArrayOfObjects="false"
                    />
                  </div>
                </div>
              </template>

              <div class="add-slice-container">
                <button
                  @click="addSliceGroupTimeFixed(indexPlace)"
                  type="button"
                  class="btn btn-add-slice"
                  :title="$t('addSlice')"
                >
                  +
                </button>
              </div>
            </div>
          </template>
          <div class="add-slice-container">
            <button
              @click="addSlicePlaceFixed()"
              type="button"
              class="btn btn-add-slice"
              :title="$t('addSlice')"
            >
              +
            </button>
          </div>
        </div>
      </template>
      <!-- #endregion fixedSchedule -->

      <!-- #region WeekDays -->
      <template v-if="!educationalGroup.fixedScheduleStatus">
        <div
          v-for="(
            weekDay, index
          ) in educationalGroup.educationalGroupWeekDayData"
          :key="index"
          class="container-collapse"
        >
          <b-button
            v-b-toggle="`id-${index}`"
            class="btn btn-lg btn-collapse collapse-data"
          >
            {{ `${weekDay.dayNameCurrent}` }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </b-button>
          <b-collapse :id="`id-${index}`">
            <div class="my-card">
              <CustomSelectBox
                :className="'col-md-12'"
                :id="`${id}-[${index}][dayWorkTypeToken]`"
                :value="weekDay.dayWorkTypeToken"
                :options="dayWorkTypeTokenOptions"
                v-on:changeValue="weekDay.dayWorkTypeToken = $event"
                :title="$t('ConstantsListSelect.DayWorkStatus')"
                :imgName="'DayWorkStatus.svg'"
              />
              <div
                v-if="weekDay.educationalGroupPlacesData.length == 0"
                class="my-card-no-content"
              >
                {{ $t("EducationalGroups.thereAreNoSlidesPlaces") }}
              </div>
              <template v-else>
                <div
                  class="my-card"
                  v-for="(
                    educationalGroupPlace, indexPlace
                  ) in weekDay.educationalGroupPlacesData"
                  :key="indexPlace"
                >
                  <span class="my-card-title">{{ indexPlace + 1 }}</span>

                  <span class="remove-slice-container">
                    <button
                      @click="removeSlicePlace(index, indexPlace)"
                      type="button"
                      class="btn btn-remove-slice"
                    >
                      ×
                    </button>
                  </span>
                  <div class="row">
                    <CustomSelectBox
                      :className="'col-md-6'"
                      :id="`${id}-[${index}][${indexPlace}][placeTypeToken]`"
                      :value="educationalGroupPlace.placeTypeToken"
                      :options="placeTypeTokenOptions"
                      v-on:changeValue="
                        educationalGroupPlace.placeTypeToken = $event;
                        getPlacesDialogWeek(
                          educationalGroupPlace.placeTypeToken,
                          indexPlace,
                          index
                        );
                      "
                      v-on:valueLoaded="
                        getPlacesDialogWeek(
                          educationalGroupPlace.placeTypeToken,
                          indexPlace,
                          index
                        )
                      "
                      :title="$t('Places.type')"
                      :imgName="'type.svg'"
                    />
                    <CustomSelectBox
                      :key="placeTokenOptionsWeekKey"
                      :className="'col-md-6'"
                      :id="`${id}-[${index}][${indexPlace}][placeToken]`"
                      :value="educationalGroupPlace.placeToken"
                      :options="
                        placeTokenOptionsWeek[index].length
                          ? placeTokenOptionsWeek[index][indexPlace]
                          : []
                      "
                      v-on:changeValue="
                        educationalGroupPlace.placeToken = $event
                      "
                      :title="$t('Places.select')"
                      :imgName="'places.svg'"
                    />
                  </div>

                  <div
                    v-if="
                      educationalGroupPlace.educationalGroupTimesData.length ==
                      0
                    "
                    class="my-card-no-content"
                  >
                    {{ $t("EducationalGroups.thereAreNoSlidesTimes") }}
                  </div>
                  <template v-else>
                    <div
                      class="my-card"
                      v-for="(
                        groupTime, indexGroupTime
                      ) in educationalGroupPlace.educationalGroupTimesData"
                      :key="indexGroupTime"
                    >
                      <span class="my-card-title">{{
                        indexGroupTime + 1
                      }}</span>

                      <span class="remove-slice-container">
                        <button
                          @click="
                            removeSliceGroupTime(
                              index,
                              indexPlace,
                              indexGroupTime
                            )
                          "
                          type="button"
                          class="btn btn-remove-slice"
                        >
                          ×
                        </button>
                      </span>
                      <div class="row">
                        <DateTimePicker
                          class="col-md-6"
                          :id="`${id}-[${index}][${indexPlace}][${indexGroupTime}][timeFrom]`"
                          type="time"
                          :value="groupTime.timeFromUTC"
                          :title="$t('EducationalGroups.time.from')"
                          v-on:changeValue="
                            groupTime.timeFromUTC = $event.dateTime;
                            groupTime.timeFrom = $event.timeCustomized;
                          "
                          :language="language"
                          :imgName="'time.svg'"
                        />
                        <DateTimePicker
                          class="col-md-6"
                          :id="`${id}-[${index}][${indexPlace}][${indexGroupTime}][timeTo]`"
                          type="time"
                          :value="groupTime.timeToUTC"
                          :title="$t('EducationalGroups.time.to')"
                          v-on:changeValue="
                            groupTime.timeToUTC = $event.dateTime;
                            groupTime.timeTo = $event.timeCustomized;
                          "
                          :language="language"
                          :imgName="'time.svg'"
                        />

                        <CustomSelectBox
                          :className="'col-md-6'"
                          :id="`${id}-[${index}][${indexPlace}][${indexGroupTime}][timeZoneToken]`"
                          :value="groupTime.timeZoneToken"
                          :options="timeZoneTokenOptions"
                          v-on:changeValue="groupTime.timeZoneToken = $event"
                          :title="$t('ConstantsListSelect.TimeZones')"
                          :imgName="'TimeZones.svg'"
                        />
                        <CustomSelectBox
                          :className="'col-md-6'"
                          :id="`${id}-[${index}][${indexPlace}][${indexGroupTime}][appointmentTypeToken]`"
                          :value="groupTime.appointmentTypeToken"
                          :options="appointmentTypeTokenOptions"
                          v-on:changeValue="
                            groupTime.appointmentTypeToken = $event
                          "
                          :title="$t('ConstantsListSelect.AppointmentTypes')"
                          :imgName="'AppointmentTypes.svg'"
                        />

                        <CustomSelectBoxMultiple
                          :className="'col-md-12'"
                          :id="`${id}-[${index}][${indexPlace}][${indexGroupTime}][employeesTokens]`"
                          :value="groupTime.employeesTokens"
                          :options="userTokenOptions"
                          v-on:changeValue="groupTime.employeesTokens = $event"
                          :title="$t('lecturers.select')"
                          :imgName="'lecturers.svg'"
                          :returnArrayOfObjects="false"
                        />
                      </div>
                    </div>
                  </template>
                  <div class="add-slice-container">
                    <button
                      @click="addSliceGroupTime(index, indexPlace)"
                      type="button"
                      class="btn btn-add-slice"
                      :title="$t('addSlice')"
                    >
                      +
                    </button>
                  </div>
                </div>
              </template>
              <div class="add-slice-container">
                <button
                  @click="addSlicePlace(index)"
                  type="button"
                  class="btn btn-add-slice"
                  :title="$t('addSlice')"
                >
                  +
                </button>
              </div>
            </div>
          </b-collapse>
        </div>
      </template>
      <!-- #endregion WeekDays -->

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
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
  checkPrivilege,
  getLanguage,
} from "./../../../../utils/functions";
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
// import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomInputInt from "./../../../../components/general/CustomInputInt.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomSelectBoxMultiple from "./../../../../components/general/CustomSelectBoxMultiple.vue";
import CustomCheckboxMultiple from "./../../../../components/general/CustomCheckboxMultiple.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import BaseTree from "./../../../../components/general/BaseTree.vue";
import {
  getDialogOfTimeZones,
  getDialogOfDayWorkStatus,
  getDialogOfAppointmentTypes,
  getDialogOfPlaceType,
} from "./../../../../utils/dialogsOfConstantsLists";
import {
  getPlacesDialog,
  getUsersDialog,
} from "./../../../../utils/dialogsOfApi";
import EducationalGroupPlace from "./../../../../models/educational/educationalGroups/EducationalGroupPlace";
import EducationalGroupTime from "./../../../../models/educational/educationalGroups/EducationalGroupTime";
import { hasEducationalGroupDeleteImage } from "./../../../../utils/privilegeHelper";
import {
  SYSTEM_TYPE,
  USER_TYPE,
  USER_ACTIVITY_TYPE_TOKEN,
} from "./../../../../utils/constantLists";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    // CustomFileInput,
    CustomInput,
    CustomInputInt,
    TextArea,
    PreLoader,
    CustomSelectBox,
    CustomSelectBoxMultiple,
    CustomCheckboxMultiple,
    DateTimePicker,
    CustomCheckbox,
    BaseTree,
  },
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      timeZoneTokenOptions: getDialogOfTimeZones(),
      dayWorkTypeTokenOptions: getDialogOfDayWorkStatus(),
      appointmentTypeTokenOptions: getDialogOfAppointmentTypes(),
      placeTypeTokenOptions: getDialogOfPlaceType() || [],
      placeTokenOptionsFixedKey: 0,
      placeTokenOptionsFixed: [],
      placeTokenOptionsWeekKey: 0,
      placeTokenOptionsWeek: [],
      userTokenOptions: [],
    };
  },
  props: {
    educationalGroup: {
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
    fixedScheduleStatus: {
      type: Boolean,
      default: false,
    },
  },
  watch: {},
  validations: {
    educationalGroup: {
      educationalGroupTimeZoneToken: { required },
      educationalGroupNameAr: { isValidTextAr },
      educationalGroupNameEn: { isValidTextEn },
      educationalGroupDescriptionAr: { isValidTextAr },
      educationalGroupDescriptionEn: { isValidTextEn },
      educationalGroupStartDateTime: { required },
      educationalGroupEndDateTime: { required },
    },
  },
  computed: {
    disableAllinputs() {
      return this.submitName == this.$t("edit");
    },
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.educationalGroup.educationalCategoryData
            .systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken:
          this.educationalGroup.educationalCategoryData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: this.educationalGroup.educationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.select"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
    errors_educationalGroupNameAr() {
      let errors = [];
      if (this.$v.educationalGroup.educationalGroupNameAr.$error) {
        if (!this.$v.educationalGroup.educationalGroupNameAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalGroupNameEn() {
      let errors = [];
      if (this.$v.educationalGroup.educationalGroupNameEn.$error) {
        if (!this.$v.educationalGroup.educationalGroupNameEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalGroupDescriptionAr() {
      let errors = [];
      if (this.$v.educationalGroup.educationalGroupDescriptionAr.$error) {
        if (
          !this.$v.educationalGroup.educationalGroupDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalGroupDescriptionEn() {
      let errors = [];
      if (this.$v.educationalGroup.educationalGroupDescriptionEn.$error) {
        if (
          !this.$v.educationalGroup.educationalGroupDescriptionEn.isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalGroupTimeZoneToken() {
      let errors = [];
      if (this.$v.educationalGroup.educationalGroupTimeZoneToken.$error) {
        if (!this.$v.educationalGroup.educationalGroupTimeZoneToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalGroupStartDateTime() {
      let errors = [];
      if (this.$v.educationalGroup.educationalGroupStartDateTime.$error) {
        if (!this.$v.educationalGroup.educationalGroupStartDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalGroupEndDateTime() {
      let errors = [];
      if (this.$v.educationalGroup.educationalGroupEndDateTime.$error) {
        if (!this.$v.educationalGroup.educationalGroupEndDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    async setPlaceTokenOptions() {
      if (this.educationalGroup.fixedScheduleStatus) {
        // placeTokenOptionsFixed
        this.educationalGroup.fixedSchedule.educationalGroupPlacesData.forEach(
          () => {
            this.placeTokenOptionsFixed.push([]);
          }
        );
      } else {
        // placeTokenOptionsWeek
        let placeTokenOptionsWeek = this.placeTokenOptionsWeek;
        this.educationalGroup.educationalGroupWeekDayData.forEach(function (
          day,
          indexDay
        ) {
          placeTokenOptionsWeek.push([]);
          day.educationalGroupPlacesData.forEach(() => {
            placeTokenOptionsWeek[indexDay].push([]);
          });
        });
      }
    },
    async getPlacesDialog() {
      if (this.educationalGroup.fixedScheduleStatus) {
        // placeTokenOptionsFixed
        for (const [
          index,
          element,
        ] of this.educationalGroup.fixedSchedule.educationalGroupPlacesData.entries()) {
          await this.getPlacesDialogFixed(element.placeTypeToken, index);
        }
      } else {
        // placeTokenOptionsWeek
        for (const [
          indexDay,
          day,
        ] of this.educationalGroup.educationalGroupWeekDayData.entries()) {
          for (const [
            index,
            element,
          ] of day.educationalGroupPlacesData.entries()) {
            await this.getPlacesDialogWeek(
              element.placeTypeToken,
              index,
              indexDay
            );
          }
        }
      }
    },

    async getPlacesDialogFixed(placeTypeToken, index) {
      this.isLoading = true;
      let params = { placeTypeToken: placeTypeToken };
      this.placeTokenOptionsFixed[index] = [];
      this.placeTokenOptionsFixed[index] = await getPlacesDialog(params);
      this.placeTokenOptionsFixedKey = Date.now();
      this.isLoading = false;
    },
    async getPlacesDialogWeek(placeTypeToken, index, indexDay) {
      this.isLoading = true;
      let params = { placeTypeToken: placeTypeToken };
      this.placeTokenOptionsWeek[indexDay][index] = [];
      this.placeTokenOptionsWeek[indexDay][index] = await getPlacesDialog(
        params
      );
      this.placeTokenOptionsWeekKey = Date.now();
      this.isLoading = false;
    },

    addSlicePlaceFixed() {
      this.placeTokenOptionsFixed.push([]);
      this.educationalGroup.fixedSchedule.educationalGroupPlacesData.push(
        new EducationalGroupPlace()
      );
    },
    removeSlicePlaceFixed(indexPlace) {
      this.placeTokenOptionsFixed.splice(indexPlace, 1);
      this.educationalGroup.fixedSchedule.educationalGroupPlacesData.splice(
        indexPlace,
        1
      );
    },
    // week
    addSlicePlace(index) {
      this.placeTokenOptionsWeek[index].push([]);
      this.educationalGroup.educationalGroupWeekDayData[
        index
      ].educationalGroupPlacesData.push(new EducationalGroupPlace());
    },
    removeSlicePlace(index, indexPlace) {
      this.placeTokenOptionsWeek[index].splice(indexPlace, 1);
      this.educationalGroup.educationalGroupWeekDayData[
        index
      ].educationalGroupPlacesData.splice(indexPlace, 1);
    },

    addSliceGroupTime(index, indexPlace) {
      this.educationalGroup.educationalGroupWeekDayData[
        index
      ].educationalGroupPlacesData[indexPlace].educationalGroupTimesData.push(
        new EducationalGroupTime()
      );
    },
    removeSliceGroupTime(index, indexPlace, indexGroupTime) {
      this.educationalGroup.educationalGroupWeekDayData[
        index
      ].educationalGroupPlacesData[indexPlace].educationalGroupTimesData.splice(
        indexGroupTime,
        1
      );
    },
    addSliceGroupTimeFixed(indexPlace) {
      this.educationalGroup.fixedSchedule.educationalGroupPlacesData[
        indexPlace
      ].educationalGroupTimesData.push(new EducationalGroupTime());
    },
    removeSliceGroupTimeFixed(indexPlace, indexGroupTime) {
      this.educationalGroup.fixedSchedule.educationalGroupPlacesData[
        indexPlace
      ].educationalGroupTimesData.splice(indexGroupTime, 1);
    },

    baseTreeChanged(data) {
      this.educationalGroup.educationalCategoryData.systemComponentHierarchyToken =
        data.hierarchyToken;
      this.educationalGroup.educationalCategoryData.systemComponentToken =
        data.componentToken;
      this.educationalGroup.educationalCategoryToken = data.parentToken;
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
      this.$v.$touch();
      if (
        (this.$v.educationalGroup.educationalGroupNameAr.isValidTextAr ||
          this.$v.educationalGroup.educationalGroupNameEn.isValidTextEn) &&
        this.$v.educationalGroup.educationalGroupDescriptionAr.isValidTextAr &&
        this.$v.educationalGroup.educationalGroupDescriptionEn.isValidTextEn &&
        this.$v.educationalGroup.educationalGroupTimeZoneToken.required &&
        this.$v.educationalGroup.educationalGroupStartDateTime.required &&
        this.$v.educationalGroup.educationalGroupEndDateTime.required
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasEducationalGroupDeleteImage,
    fullPathFileFromServer,
  },
  async created() {
    await this.setPlaceTokenOptions();
    await this.getPlacesDialog();
    await this.getUsersDialog();
  },
};
</script>

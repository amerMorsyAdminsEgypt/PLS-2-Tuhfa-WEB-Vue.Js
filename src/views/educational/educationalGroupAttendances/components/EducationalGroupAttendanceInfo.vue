<template>
  <CustomBottomSheet
    :refName="'EducationalGroupAttendanceInfo'"
    size="xl"
    :headerText="$t('EducationalGroupAttendances.data')"
    :headerIcon="educationalGroupAttendance.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroupAttendance.fullCode"
        :title="$t('EducationalGroupAttendances.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroupAttendance.attendanceTypeNameCurrent"
        :title="$t('EducationalGroupAttendances.status')"
        :imgName="'EducationalGroupAttendances.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            educationalGroupAttendance.attendFromDate,
            educationalGroupAttendance.attendFromTime
          )
        "
        :title="$t('from')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            educationalGroupAttendance.attendToDate,
            educationalGroupAttendance.attendToTime
          )
        "
        :title="$t('to')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroupAttendance.durationCurrent"
        :title="$t('general.duration')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroupAttendance.educationalGroupAttendanceNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <div class="my-card col-12">
        <span class="my-card-title">{{ $t("Users.data") }}</span>

        <div class="row">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalGroupAttendance.userInfoData.fullCode"
            :title="$t('Users.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalGroupAttendance.userInfoData.userNameCurrent"
            :title="$t('Users.name')"
            :imgName="'users.svg'"
          />
        </div>
      </div>

      <div class="my-card col-12">
        <span class="my-card-title">{{
          $t("EducationalScheduleTimes.data")
        }}</span>

        <div class="row">
          <DataLabelGroup
            :className="'col-md-12'"
            :value="
              educationalGroupAttendance.educationalScheduleTimeInfoData
                .educationalScheduleTimeNameCurrent
            "
            :title="$t('EducationalScheduleTimes.name')"
            :imgName="'EducationalScheduleTimes.svg'"
          />
          <DataLabelGroup
            :className="'col-md-12'"
            :value="
              educationalGroupAttendance
                .alternativeEducationalScheduleTimeInfoData
                .educationalScheduleTimeNameCurrent
            "
            :title="$t('EducationalScheduleTimes.alternative')"
            :imgName="'EducationalScheduleTimes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalGroupAttendance.educationalScheduleTimeInfoData
                .fullCode
            "
            :title="$t('general.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalGroupAttendance.educationalScheduleTimeInfoData
                .appointmentTypeNameCurrent
            "
            :title="$t('ConstantsListSelect.AppointmentTypesName')"
            :imgName="'AppointmentTypes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-4'"
            :value="
              formateDateTimeLang(
                educationalGroupAttendance.educationalScheduleTimeInfoData
                  .dateTimeFromDate,
                educationalGroupAttendance.educationalScheduleTimeInfoData
                  .dateTimeFromTime
              )
            "
            :title="$t('from')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-4'"
            :value="
              formateDateTimeLang(
                educationalGroupAttendance.educationalScheduleTimeInfoData
                  .dateTimeToDate,
                educationalGroupAttendance.educationalScheduleTimeInfoData
                  .dateTimeToTime
              )
            "
            :title="$t('to')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-4'"
            :value="
              educationalGroupAttendance.educationalScheduleTimeInfoData
                .durationCurrent
            "
            :title="$t('general.duration')"
            :imgName="'dateAndTime.svg'"
          />
        </div>
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["educationalGroupAttendance"],
  methods: {
    formateDateTimeLang,
  },
};
</script>

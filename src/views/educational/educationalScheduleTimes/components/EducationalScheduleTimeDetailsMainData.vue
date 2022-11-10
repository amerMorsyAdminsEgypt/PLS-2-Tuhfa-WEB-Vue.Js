<template>
  <div class="user-card-info mt-4">
    <span v-b-toggle.educationalScheduleTime class="collapse-title">
      {{ $t("EducationalScheduleTimes.data") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </span>
    <b-collapse id="educationalScheduleTime">
      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalScheduleTime.educationalGroupInfoData
              .educationalGroupNameCurrent
          "
          :title="$t('EducationalGroups.name')"
          :imgName="'EducationalGroups.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalScheduleTime.placeInfoData.placeNameCurrent"
          :title="$t('Places.name')"
          :imgName="'places.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalScheduleTime.fullCode"
          :title="$t('EducationalScheduleTimes.code')"
          :imgName="'code.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalScheduleTime.appointmentTypeNameCurrent"
          :title="$t('ConstantsListSelect.AppointmentTypesName')"
          :imgName="'AppointmentTypes.svg'"
        />

        <DataLabelGroup
          :className="'col-md-4'"
          :value="
            formateDateTimeLang(
              educationalScheduleTime.dateTimeFromDate,
              educationalScheduleTime.dateTimeFromTime
            )
          "
          :title="$t('EducationalScheduleTimes.from')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-4'"
          :value="
            formateDateTimeLang(
              educationalScheduleTime.dateTimeToDate,
              educationalScheduleTime.dateTimeToTime
            )
          "
          :title="$t('EducationalScheduleTimes.to')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-4'"
          :value="educationalScheduleTime.durationCurrent"
          :title="$t('EducationalScheduleTimes.duration')"
          :imgName="'dateAndTime.svg'"
        />
      </div>
    </b-collapse>
  </div>
</template>

<script>
import {
  isDataExist,
  formateDateTimeLang,
} from "./../../../../utils/functions";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";

export default {
  name: "EducationalScheduleTimeDetailsMainData",
  props: ["educationalScheduleTime"],
  components: {
    DataLabelGroup,
  },
  methods: {
    isDataExist,
    formateDateTimeLang,
  },
};
</script>

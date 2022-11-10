<template>
  <CustomBottomSheet
    :refName="'EducationalGroupStudentInfo'"
    size="lg"
    :headerText="$t('EducationalGroupStudents.data')"
    :headerIcon="educationalGroupStudent.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          educationalGroupStudent.studentUserInfoDate
            ? educationalGroupStudent.studentUserInfoDate.userNameCurrent
            : ''
        "
        :title="$t('students.name')"
        :imgName="'students.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          educationalGroupStudent.educationalGroupInfoData
            ? educationalGroupStudent.educationalGroupInfoData
                .educationalGroupNameCurrent
            : ''
        "
        :title="$t('EducationalGroups.name')"
        :imgName="'EducationalGroups.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          educationalGroupStudent.educationalJoiningApplicationInfoDate
            ? educationalGroupStudent.educationalJoiningApplicationInfoDate
                .educationalJoiningApplicationNameCurrent
            : ''
        "
        :title="$t('EducationalJoiningApplications.name')"
        :imgName="'EducationalJoiningApplications.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            educationalGroupStudent.creationDate,
            educationalGroupStudent.creationTime
          )
        "
        :title="$t('actionsData.dateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="educationalGroupStudent.certificateStatusNameCurrent"
        :title="$t('general.certificateStatus')"
        :imgName="'type.svg'"
      />
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
  props: ["educationalGroupStudent"],
  methods: {
    formateDateTimeLang,
  },
};
</script>

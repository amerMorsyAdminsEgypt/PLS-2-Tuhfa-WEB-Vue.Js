<template>
  <CustomBottomSheet
    :refName="'StudentScheduleExamTimeInfo'"
    size="xl"
    :headerText="$t('StudentScheduleExamTimes.data')"
    :headerIcon="studentScheduleExamTime.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="studentScheduleExamTime.studentUserInfoData.userNameCurrent"
        :title="$t('students.name')"
        :imgName="'user.svg'"
      />
      <DataLabelGroup
        class="phone-number"
        :className="'col-md-6'"
        :value="studentScheduleExamTime.studentUserInfoData.userPhoneWithCC"
        :title="$t('Users.phone')"
        :imgName="'phone.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="studentScheduleExamTime.fullCode"
        :title="$t('StudentScheduleExamTimes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          studentScheduleExamTime.simpleExamModelInfoData
            .simpleExamModelTitleCurrent
        "
        :title="$t('SimpleExamModels.title')"
        :imgName="'SimpleExamModels.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["studentScheduleExamTime"],
};
</script>

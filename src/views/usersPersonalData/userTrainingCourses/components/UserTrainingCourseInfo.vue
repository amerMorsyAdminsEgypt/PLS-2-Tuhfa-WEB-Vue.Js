<template>
  <CustomBottomSheet
    :refName="'UserTrainingCourseInfo'"
    size="xl"
    :headerText="$t('UserTrainingCourses.data')"
    :headerIcon="userTrainingCourse.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.fullCode"
        :title="$t('UserTrainingCourses.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.userTrainingCourseNameAr"
        :title="$t('UserTrainingCourses.nameAr')"
        :imgName="'UserTrainingCourses.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.userTrainingCourseNameEn"
        :title="$t('UserTrainingCourses.nameEn')"
        :imgName="'UserTrainingCourses.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.userTrainingCourseNameUnd"
        :title="$t('UserTrainingCourses.nameUnd')"
        :imgName="'UserTrainingCourses.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.certificateData.certificateNameCurrent"
        :title="$t('Certificates.name')"
        :imgName="'certificates.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.trainingCourseDurationCurrent"
        :title="$t('general.duration')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userTrainingCourse.joiningDate,
            userTrainingCourse.joiningTime
          )
        "
        :title="$t('UserTrainingCourses.joiningDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userTrainingCourse.obtainingDate,
            userTrainingCourse.obtainingTime
          )
        "
        :title="$t('UserTrainingCourses.obtainingDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.userTrainingCourseDescriptionAr"
        :title="$t('UserTrainingCourses.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.userTrainingCourseDescriptionEn"
        :title="$t('UserTrainingCourses.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.userTrainingCourseDescriptionUnd"
        :title="$t('UserTrainingCourses.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userTrainingCourse.userTrainingCourseNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
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
  props: ["userTrainingCourse"],
  methods: {
    formateDateTimeLang,
  },
};
</script>

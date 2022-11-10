<template>
  <CustomBottomSheet
    :refName="'GroupScheduleExamInfo'"
    size="xl"
    :headerText="$t('GroupScheduleExams.data')"
    :headerIcon="groupScheduleExam.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="groupScheduleExam.fullCode"
        :title="$t('GroupScheduleExams.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="groupScheduleExam.groupScheduleExamNameAr"
        :title="$t('GroupScheduleExams.nameAr')"
        :imgName="'GroupScheduleExams.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="groupScheduleExam.groupScheduleExamNameEn"
        :title="$t('GroupScheduleExams.nameEn')"
        :imgName="'GroupScheduleExams.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="groupScheduleExam.groupScheduleExamNameUnd"
        :title="$t('GroupScheduleExams.nameUnd')"
        :imgName="'GroupScheduleExams.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="groupScheduleExam.groupScheduleExamDescriptionAr"
        :title="$t('GroupScheduleExams.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="groupScheduleExam.groupScheduleExamDescriptionEn"
        :title="$t('GroupScheduleExams.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="groupScheduleExam.groupScheduleExamDescriptionUnd"
        :title="$t('GroupScheduleExams.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="groupScheduleExam.groupScheduleExamNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            groupScheduleExam.startExamDate,
            groupScheduleExam.startExamTime
          )
        "
        :title="$t('from')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            groupScheduleExam.endExamDate,
            groupScheduleExam.endExamTime
          )
        "
        :title="$t('to')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="groupScheduleExam.durationCurrent"
        :title="$t('general.duration')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          groupScheduleExam.educationalGroupInfoData.educationalGroupNameCurrent
        "
        :title="$t('EducationalGroups.name')"
        :imgName="'EducationalGroups.svg'"
      />

      <div class="my-card col-12">
        <div class="row">
          <span class="my-card-title">{{ $t("SimpleExamModels.data") }}</span>

          <DataLabelGroup
            :className="'col-md-12'"
            :value="
              groupScheduleExam.simpleExamModelInfoData
                .simpleExamModelTitleCurrent
            "
            :title="$t('SimpleExamModels.title')"
            :imgName="'SimpleExamModels.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              groupScheduleExam.simpleExamModelInfoData.examTypeNameCurrent
            "
            :title="$t('ConstantsListSelect.ExamTypesName')"
            :imgName="'ExamTypes.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              groupScheduleExam.simpleExamModelInfoData.simpleExamModelDegree
            "
            :title="$t('SimpleExamModels.examDegree')"
            :imgName="'number.svg'"
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
  props: ["groupScheduleExam"],
  methods: {
    formateDateTimeLang,
  },
};
</script>

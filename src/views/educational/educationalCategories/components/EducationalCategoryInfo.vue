<template>
  <CustomBottomSheet
    :refName="'EducationalCategoryInfo'"
    size="xl"
    :headerText="$t('EducationalCategories.data')"
    :headerIcon="educationalCategory.icon"
    @opened="getDetails()"
  >
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg
      v-if="exceptionMsg"
      :msg="exceptionMsg"
      :image="exceptionImg"
    />

    <div v-else class="row">
      <DataLabelGroup
        :className="'col-md-6 col-lg-4'"
        :value="
          educationalCategory.systemComponentsHierarchyData
            .systemComponentsHierarchyNameCurrent
        "
        :title="$t('SystemComponentsHierarchies.educationalActivity')"
        :imgName="'systemComponentsHierarchies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6 col-lg-4'"
        :value="
          educationalCategory.systemComponentData.systemComponentNameCurrent
        "
        :title="$t('SystemComponents.educationalActivity')"
        :imgName="'systemComponents.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12 col-lg-4'"
        :value="
          educationalCategory.parentEducationalCategoryData
            .educationalCategoryNameCurrent
        "
        :title="$t('EducationalCategories.parent')"
        :imgName="'EducationalCategories.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.fullCode"
        :title="$t('EducationalCategories.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryNameAr"
        :title="$t('EducationalCategories.nameAr')"
        :imgName="'EducationalCategories.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryNameEn"
        :title="$t('EducationalCategories.nameEn')"
        :imgName="'EducationalCategories.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryNameUnd"
        :title="$t('EducationalCategories.nameUnd')"
        :imgName="'EducationalCategories.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryDescriptionAr"
        :title="$t('EducationalCategories.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryDescriptionEn"
        :title="$t('EducationalCategories.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryDescriptionUnd"
        :title="$t('EducationalCategories.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.gradingPlanData.gradingPlanNameCurrent"
        :title="$t('GradingPlans.name')"
        :imgName="'GradingPlans.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategorySuccessDegree"
        :title="$t('EducationalCategories.successDegree')"
        :imgName="'number.svg'"
      />

      <div class="my-card-main col-12 row">
        <div class="my-card-title-main">
          <CustomCheckbox
            class="my-card-title-main-check"
            :value="educationalCategory.finalExamStatus"
            :title="$t('EducationalCategories.finalExam')"
            :showAsInfo="true"
          />
        </div>
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCategory.finalExamSuccessDegree"
          :title="$t('EducationalCategories.successDegree')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCategory.finalExamFinalDegree"
          :title="$t('EducationalCategories.FinalDegree')"
          :imgName="'number.svg'"
        />
      </div>

      <div class="my-card-main col-12 row">
        <div class="my-card-title-main">
          <CustomCheckbox
            class="my-card-title-main-check"
            :value="educationalCategory.attendanceStatus"
            :title="$t('EducationalCategories.attendance')"
            :showAsInfo="true"
          />
        </div>
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCategory.attendanceSuccessDegree"
          :title="$t('EducationalCategories.successDegree')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCategory.attendanceFinalDegree"
          :title="$t('EducationalCategories.FinalDegree')"
          :imgName="'number.svg'"
        />
      </div>

      <div class="my-card-main col-12 row">
        <div class="my-card-title-main">
          <CustomCheckbox
            class="my-card-title-main-check"
            :value="educationalCategory.midtermExamStatus"
            :title="$t('EducationalCategories.midtermExam')"
            :showAsInfo="true"
          />
        </div>
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCategory.midtermExamSuccessDegree"
          :title="$t('EducationalCategories.successDegree')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCategory.midtermExamFinalDegree"
          :title="$t('EducationalCategories.FinalDegree')"
          :imgName="'number.svg'"
        />
      </div>

      <div class="my-card-main col-12 row">
        <div class="my-card-title-main">
          <CustomCheckbox
            class="my-card-title-main-check"
            :value="educationalCategory.oralExamStatus"
            :title="$t('EducationalCategories.oralExam')"
            :showAsInfo="true"
          />
        </div>
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCategory.oralExamSuccessDegree"
          :title="$t('EducationalCategories.successDegree')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCategory.oralExamFinalDegree"
          :title="$t('EducationalCategories.FinalDegree')"
          :imgName="'number.svg'"
        />
      </div>

      <div class="my-card-main col-12 row">
        <div class="my-card-title-main">
          <CustomCheckbox
            class="my-card-title-main-check"
            :value="educationalCategory.periodicalExamStatus"
            :title="$t('EducationalCategories.periodicalExam')"
            :showAsInfo="true"
          />
        </div>
        <DataLabelGroup
          :className="'col-md-4'"
          :value="educationalCategory.periodicalExamCount"
          :title="$t('EducationalCategories.examCount')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-4'"
          :value="educationalCategory.periodicalExamSuccessDegree"
          :title="$t('EducationalCategories.successDegree')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-4'"
          :value="educationalCategory.periodicalExamFinalDegree"
          :title="$t('EducationalCategories.FinalDegree')"
          :imgName="'number.svg'"
        />
      </div>

      <div class="my-card-main col-12 row">
        <div class="my-card-title-main">
          <CustomCheckbox
            class="my-card-title-main-check"
            :value="educationalCategory.reExamStatus"
            :title="$t('EducationalCategories.reExam')"
            :showAsInfo="true"
          />
        </div>
        <DataLabelGroup
          :className="'col-md-12'"
          :value="educationalCategory.maxCountNumberReExam"
          :title="$t('EducationalCategories.maxCountNumberReExam')"
          :imgName="'number.svg'"
        />
      </div>

      <div class="my-card col-12 row">
        <DataLabelGroup
          :className="'col-md-4'"
          :value="educationalCategory.totalFailureEducationalCategory"
          :title="$t('EducationalCategories.totalFailureEducationalCategory')"
          :imgName="'number.svg'"
        />
        <CustomCheckbox
          class="col-md-4"
          :value="educationalCategory.calculationInGrandTotalStatus"
          :title="$t('EducationalCategories.calculationInGrandTotalStatus')"
          :showAsInfo="true"
        />
        <CustomCheckbox
          class="col-md-4"
          :value="educationalCategory.failingStatusOnParentEducationalCategory"
          :title="
            $t('EducationalCategories.failingStatusOnParentEducationalCategory')
          "
          :showAsInfo="true"
        />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import EducationalCategoryMixin from "./EducationalCategoryMixin";

export default {
  mixins: [EducationalCategoryMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
    CustomCheckbox,
  },
};
</script>

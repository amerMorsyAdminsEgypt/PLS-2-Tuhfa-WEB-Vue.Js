<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="educationalCategory.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              educationalCategory.educationalCategoryImagePath,
              educationalCategory.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !educationalCategory.educationalCategoryImageIsDefault &&
            checkPrivilege(hasEducationalCategoryDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <BaseTree
            :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
            :treeModel="getTreeModel"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="false"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="educationalCategory.fullCode"
            v-on:changeValue="educationalCategory.fullCode = $event"
            :title="$t('EducationalCategories.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalCategoryNameAr`"
            :errors="errors_educationalCategoryNameAr"
            :value="educationalCategory.educationalCategoryNameAr"
            v-on:changeValue="
              educationalCategory.educationalCategoryNameAr = $event;
              $v.educationalCategory.educationalCategoryNameAr.$touch();
            "
            :title="$t('EducationalCategories.nameAr')"
            :imgName="'EducationalCategories.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalCategoryNameEn`"
            :errors="errors_educationalCategoryNameEn"
            :value="educationalCategory.educationalCategoryNameEn"
            v-on:changeValue="
              educationalCategory.educationalCategoryNameEn = $event;
              $v.educationalCategory.educationalCategoryNameEn.$touch();
            "
            :title="$t('EducationalCategories.nameEn')"
            :imgName="'EducationalCategories.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalCategoryNameUnd`"
            :value="educationalCategory.educationalCategoryNameUnd"
            v-on:changeValue="
              educationalCategory.educationalCategoryNameUnd = $event
            "
            :title="$t('EducationalCategories.nameUnd')"
            :imgName="'EducationalCategories.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalCategoryDescriptionAr`"
            :errors="errors_educationalCategoryDescriptionAr"
            :value="educationalCategory.educationalCategoryDescriptionAr"
            v-on:changeValue="
              educationalCategory.educationalCategoryDescriptionAr = $event;
              $v.educationalCategory.educationalCategoryDescriptionAr.$touch();
            "
            :title="$t('EducationalCategories.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalCategoryDescriptionEn`"
            :errors="errors_educationalCategoryDescriptionEn"
            :value="educationalCategory.educationalCategoryDescriptionEn"
            v-on:changeValue="
              educationalCategory.educationalCategoryDescriptionEn = $event;
              $v.educationalCategory.educationalCategoryDescriptionEn.$touch();
            "
            :title="$t('EducationalCategories.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalCategoryDescriptionUnd`"
            :value="educationalCategory.educationalCategoryDescriptionUnd"
            v-on:changeValue="
              educationalCategory.educationalCategoryDescriptionUnd = $event
            "
            :title="$t('EducationalCategories.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalCategoryNotes`"
            :value="educationalCategory.educationalCategoryNotes"
            v-on:changeValue="
              educationalCategory.educationalCategoryNotes = $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-gradingPlanToken`"
            :errors="errors_gradingPlanToken"
            :value="educationalCategory.gradingPlanToken"
            :options="gradingPlanTokenOptions"
            v-on:changeValue="educationalCategory.gradingPlanToken = $event"
            :title="$t('GradingPlans.select')"
            :imgName="'GradingPlans.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-educationalCategorySuccessDegree`"
            :value="educationalCategory.educationalCategorySuccessDegree"
            v-on:changeValue="
              educationalCategory.educationalCategorySuccessDegree = $event
            "
            :title="$t('EducationalCategories.successDegree')"
            :imgName="'number.svg'"
          />

          <div class="my-card-main col-12 row">
            <div class="my-card-title-main">
              <CustomCheckbox
                class="my-card-title-main-check"
                :value="educationalCategory.finalExamStatus"
                v-on:changeValue="educationalCategory.finalExamStatus = $event"
                :title="$t('EducationalCategories.finalExam')"
              />
            </div>
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-finalExamSuccessDegree`"
              :value="educationalCategory.finalExamSuccessDegree"
              v-on:changeValue="
                educationalCategory.finalExamSuccessDegree = $event
              "
              :title="$t('EducationalCategories.successDegree')"
              :imgName="'number.svg'"
            />

            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-finalExamFinalDegree`"
              :value="educationalCategory.finalExamFinalDegree"
              v-on:changeValue="
                educationalCategory.finalExamFinalDegree = $event
              "
              :title="$t('EducationalCategories.FinalDegree')"
              :imgName="'number.svg'"
            />
          </div>

          <div class="my-card-main col-12 row">
            <div class="my-card-title-main">
              <CustomCheckbox
                class="my-card-title-main-check"
                :value="educationalCategory.attendanceStatus"
                v-on:changeValue="educationalCategory.attendanceStatus = $event"
                :title="$t('EducationalCategories.attendance')"
              />
            </div>
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-attendanceSuccessDegree`"
              :value="educationalCategory.attendanceSuccessDegree"
              v-on:changeValue="
                educationalCategory.attendanceSuccessDegree = $event
              "
              :title="$t('EducationalCategories.successDegree')"
              :imgName="'number.svg'"
            />

            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-attendanceFinalDegree`"
              :value="educationalCategory.attendanceFinalDegree"
              v-on:changeValue="
                educationalCategory.attendanceFinalDegree = $event
              "
              :title="$t('EducationalCategories.FinalDegree')"
              :imgName="'number.svg'"
            />
          </div>

          <div class="my-card-main col-12 row">
            <div class="my-card-title-main">
              <CustomCheckbox
                class="my-card-title-main-check"
                :value="educationalCategory.midtermExamStatus"
                v-on:changeValue="
                  educationalCategory.midtermExamStatus = $event
                "
                :title="$t('EducationalCategories.midtermExam')"
              />
            </div>
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-midtermExamSuccessDegree`"
              :value="educationalCategory.midtermExamSuccessDegree"
              v-on:changeValue="
                educationalCategory.midtermExamSuccessDegree = $event
              "
              :title="$t('EducationalCategories.successDegree')"
              :imgName="'number.svg'"
            />

            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-midtermExamFinalDegree`"
              :value="educationalCategory.midtermExamFinalDegree"
              v-on:changeValue="
                educationalCategory.midtermExamFinalDegree = $event
              "
              :title="$t('EducationalCategories.FinalDegree')"
              :imgName="'number.svg'"
            />
          </div>

          <div class="my-card-main col-12 row">
            <div class="my-card-title-main">
              <CustomCheckbox
                class="my-card-title-main-check"
                :value="educationalCategory.oralExamStatus"
                v-on:changeValue="educationalCategory.oralExamStatus = $event"
                :title="$t('EducationalCategories.oralExam')"
              />
            </div>
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-oralExamSuccessDegree`"
              :value="educationalCategory.oralExamSuccessDegree"
              v-on:changeValue="
                educationalCategory.oralExamSuccessDegree = $event
              "
              :title="$t('EducationalCategories.successDegree')"
              :imgName="'number.svg'"
            />

            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-oralExamFinalDegree`"
              :value="educationalCategory.oralExamFinalDegree"
              v-on:changeValue="
                educationalCategory.oralExamFinalDegree = $event
              "
              :title="$t('EducationalCategories.FinalDegree')"
              :imgName="'number.svg'"
            />
          </div>

          <div class="my-card-main col-12 row">
            <div class="my-card-title-main">
              <CustomCheckbox
                class="my-card-title-main-check"
                :value="educationalCategory.periodicalExamStatus"
                v-on:changeValue="
                  educationalCategory.periodicalExamStatus = $event
                "
                :title="$t('EducationalCategories.periodicalExam')"
              />
            </div>
            <CustomInputInt
              :className="'col-md-4'"
              :id="`${id}-periodicalExamCount`"
              :value="educationalCategory.periodicalExamCount"
              v-on:changeValue="
                educationalCategory.periodicalExamCount = $event
              "
              :title="$t('EducationalCategories.examCount')"
              :imgName="'number.svg'"
            />

            <CustomInputFloat
              :className="'col-md-4'"
              :id="`${id}-periodicalExamSuccessDegree`"
              :value="educationalCategory.periodicalExamSuccessDegree"
              v-on:changeValue="
                educationalCategory.periodicalExamSuccessDegree = $event
              "
              :title="$t('EducationalCategories.successDegree')"
              :imgName="'number.svg'"
            />
            <CustomInputFloat
              :className="'col-md-4'"
              :id="`${id}-periodicalExamFinalDegree`"
              :value="educationalCategory.periodicalExamFinalDegree"
              v-on:changeValue="
                educationalCategory.periodicalExamFinalDegree = $event
              "
              :title="$t('EducationalCategories.FinalDegree')"
              :imgName="'number.svg'"
            />
          </div>

          <div class="my-card-main col-12 row">
            <div class="my-card-title-main">
              <CustomCheckbox
                class="my-card-title-main-check"
                :value="educationalCategory.reExamStatus"
                v-on:changeValue="educationalCategory.reExamStatus = $event"
                :title="$t('EducationalCategories.reExam')"
              />
            </div>
            <CustomInputInt
              :className="'col-md-12'"
              :id="`${id}-maxCountNumberReExam`"
              :value="educationalCategory.maxCountNumberReExam"
              v-on:changeValue="
                educationalCategory.maxCountNumberReExam = $event
              "
              :title="$t('EducationalCategories.maxCountNumberReExam')"
              :imgName="'number.svg'"
            />
          </div>

          <div class="my-card col-12 row">
            <CustomInputInt
              :id="`${id}-totalFailureEducationalCategory`"
              :value="educationalCategory.totalFailureEducationalCategory"
              v-on:changeValue="
                educationalCategory.totalFailureEducationalCategory = $event
              "
              :title="
                $t('EducationalCategories.totalFailureEducationalCategory')
              "
              :imgName="'number.svg'"
              :className="'col-md-4'"
            />

            <CustomCheckbox
              :value="educationalCategory.calculationInGrandTotalStatus"
              v-on:changeValue="
                educationalCategory.calculationInGrandTotalStatus = $event
              "
              :title="$t('EducationalCategories.calculationInGrandTotalStatus')"
              class="col-md-4"
            />
            <CustomCheckbox
              :value="
                educationalCategory.failingStatusOnParentEducationalCategory
              "
              v-on:changeValue="
                educationalCategory.failingStatusOnParentEducationalCategory =
                  $event
              "
              :title="
                $t(
                  'EducationalCategories.failingStatusOnParentEducationalCategory'
                )
              "
              class="col-md-4"
            />
          </div>
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
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomInputInt from "./../../../../components/general/CustomInputInt.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import BaseTree from "./../../../../components/general/BaseTree.vue";
import { getGradingPlansDialog } from "./../../../../utils/dialogsOfApi";
import { hasEducationalCategoryDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import { SYSTEM_TYPE } from "./../../../../utils/constantLists";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomInputInt,
    CustomInputFloat,
    TextArea,
    CustomCheckbox,
    CustomSelectBox,
    BaseTree,
  },
  data() {
    return {
      gradingPlanTokenOptions: [],
    };
  },
  props: {
    educationalCategory: {
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
    educationalCategory: {
      gradingPlanToken: { required },
      educationalCategoryNameAr: { required, isValidNameAr },
      educationalCategoryNameEn: { required, isValidNameEn },
      educationalCategoryDescriptionAr: { isValidTextAr },
      educationalCategoryDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.educationalCategory.systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken: this.educationalCategory.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: this.educationalCategory.parentEducationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.selectParent"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
    errors_gradingPlanToken() {
      let errors = [];
      if (this.$v.educationalCategory.gradingPlanToken.$error) {
        if (!this.$v.educationalCategory.gradingPlanToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalCategoryNameAr() {
      let errors = [];
      if (this.$v.educationalCategory.educationalCategoryNameAr.$error) {
        if (
          !this.$v.educationalCategory.educationalCategoryNameAr.required &&
          !this.$v.educationalCategory.educationalCategoryNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalCategory.educationalCategoryNameAr.required &&
          !this.$v.educationalCategory.educationalCategoryNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalCategoryNameEn() {
      let errors = [];
      if (this.$v.educationalCategory.educationalCategoryNameEn.$error) {
        if (
          !this.$v.educationalCategory.educationalCategoryNameAr.required &&
          !this.$v.educationalCategory.educationalCategoryNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalCategory.educationalCategoryNameEn.required &&
          !this.$v.educationalCategory.educationalCategoryNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalCategoryDescriptionAr() {
      let errors = [];
      if (this.$v.educationalCategory.educationalCategoryDescriptionAr.$error) {
        if (
          !this.$v.educationalCategory.educationalCategoryDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalCategoryDescriptionEn() {
      let errors = [];
      if (this.$v.educationalCategory.educationalCategoryDescriptionEn.$error) {
        if (
          !this.$v.educationalCategory.educationalCategoryDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getGradingPlansDialog() {
      this.isLoading = true;
      this.gradingPlanTokenOptions = await getGradingPlansDialog();
      this.isLoading = false;
    },
    baseTreeChanged(data) {
      this.educationalCategory.systemComponentHierarchyToken =
        data.hierarchyToken;
      this.educationalCategory.systemComponentToken = data.componentToken;
      this.educationalCategory.parentEducationalCategoryToken =
        data.parentToken;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.educationalCategory.educationalCategoryNameAr.required &&
          this.$v.educationalCategory.educationalCategoryNameAr
            .isValidNameAr) ||
          (this.$v.educationalCategory.educationalCategoryNameEn.required &&
            this.$v.educationalCategory.educationalCategoryNameEn
              .isValidNameEn)) &&
        this.$v.educationalCategory.educationalCategoryDescriptionAr
          .isValidTextAr &&
        this.$v.educationalCategory.educationalCategoryDescriptionEn
          .isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasEducationalCategoryDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getGradingPlansDialog();
  },
};
</script>

<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="jobGrade.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              jobGrade.jobGradeImagePath,
              jobGrade.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !jobGrade.jobGradeImageIsDefault &&
            checkPrivilege(hasJobGradeDeleteImage())
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
            :enableEdit="isEditting"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="jobGrade.fullCode"
            v-on:changeValue="jobGrade.fullCode = $event"
            :title="$t('JobGrades.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-jobGradeNameAr`"
            :errors="errors_jobGradeNameAr"
            :value="jobGrade.jobGradeNameAr"
            v-on:changeValue="
              jobGrade.jobGradeNameAr = $event;
              $v.jobGrade.jobGradeNameAr.$touch();
            "
            :title="$t('JobGrades.nameAr')"
            :imgName="'jobGrade.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-jobGradeNameEn`"
            :errors="errors_jobGradeNameEn"
            :value="jobGrade.jobGradeNameEn"
            v-on:changeValue="
              jobGrade.jobGradeNameEn = $event;
              $v.jobGrade.jobGradeNameEn.$touch();
            "
            :title="$t('JobGrades.nameEn')"
            :imgName="'jobGrade.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-jobGradeNameUnd`"
            :value="jobGrade.jobGradeNameUnd"
            v-on:changeValue="jobGrade.jobGradeNameUnd = $event"
            :title="$t('JobGrades.nameUnd')"
            :imgName="'jobGrade.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-jobGradeDescriptionAr`"
            :errors="errors_jobGradeDescriptionAr"
            :value="jobGrade.jobGradeDescriptionAr"
            v-on:changeValue="
              jobGrade.jobGradeDescriptionAr = $event;
              $v.jobGrade.jobGradeDescriptionAr.$touch();
            "
            :title="$t('JobGrades.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-jobGradeDescriptionEn`"
            :errors="errors_jobGradeDescriptionEn"
            :value="jobGrade.jobGradeDescriptionEn"
            v-on:changeValue="
              jobGrade.jobGradeDescriptionEn = $event;
              $v.jobGrade.jobGradeDescriptionEn.$touch();
            "
            :title="$t('JobGrades.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-jobGradeDescriptionUnd`"
            :value="jobGrade.jobGradeDescriptionUnd"
            v-on:changeValue="jobGrade.jobGradeDescriptionUnd = $event"
            :title="$t('JobGrades.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-jobGradeNotes`"
            :value="jobGrade.jobGradeNotes"
            v-on:changeValue="jobGrade.jobGradeNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
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
} from "./../../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../../utils/validationHelper";
import CustomFileInput from "./../../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import BaseTree from "./../../../../../components/general/BaseTree.vue";
import { hasJobGradeDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { SYSTEM_TYPE } from "./../../../../../utils/constantLists";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    TextArea,
    BaseTree,
  },
  // data() {
  //   return {};
  // },
  props: {
    jobGrade: {
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
    jobGrade: {
      jobGradeNameAr: { required, isValidNameAr },
      jobGradeNameEn: { required, isValidNameEn },
      jobGradeDescriptionAr: { isValidTextAr },
      jobGradeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.JobGrade;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.jobGrade.systemComponentHierarchyToken,
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectJobGrade"),
        systemComponentToken: this.jobGrade.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectJobGrade"),
        parentToken: this.jobGrade.parentJobGradeToken,
        parentTitle: this.$t("JobGrades.select"),
        parentImgName: "jobGrade.svg",
      };
      return treeModelObject;
    },
    isEditting() {
      return this.submitName == this.$t("edit") ? true : false;
    },
    errors_jobGradeNameAr() {
      let errors = [];
      if (this.$v.jobGrade.jobGradeNameAr.$error) {
        if (
          !this.$v.jobGrade.jobGradeNameAr.required &&
          !this.$v.jobGrade.jobGradeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.jobGrade.jobGradeNameAr.required &&
          !this.$v.jobGrade.jobGradeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_jobGradeNameEn() {
      let errors = [];
      if (this.$v.jobGrade.jobGradeNameEn.$error) {
        if (
          !this.$v.jobGrade.jobGradeNameAr.required &&
          !this.$v.jobGrade.jobGradeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.jobGrade.jobGradeNameEn.required &&
          !this.$v.jobGrade.jobGradeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_jobGradeDescriptionAr() {
      let errors = [];
      if (this.$v.jobGrade.jobGradeDescriptionAr.$error) {
        if (!this.$v.jobGrade.jobGradeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_jobGradeDescriptionEn() {
      let errors = [];
      if (this.$v.jobGrade.jobGradeDescriptionEn.$error) {
        if (!this.$v.jobGrade.jobGradeDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    baseTreeChanged(data) {
      this.jobGrade.systemComponentHierarchyToken = data.hierarchyToken;
      this.jobGrade.systemComponentToken = data.componentToken;
      this.jobGrade.parentJobGradeToken = data.parentToken;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.jobGrade.jobGradeNameAr.required &&
          this.$v.jobGrade.jobGradeNameAr.isValidNameAr) ||
          (this.$v.jobGrade.jobGradeNameEn.required &&
            this.$v.jobGrade.jobGradeNameEn.isValidNameEn)) &&
        this.$v.jobGrade.jobGradeDescriptionAr.isValidTextAr &&
        this.$v.jobGrade.jobGradeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasJobGradeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>

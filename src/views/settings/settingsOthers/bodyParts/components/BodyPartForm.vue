<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="bodyPart.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              bodyPart.bodyPartImagePath,
              bodyPart.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !bodyPart.bodyPartImageIsDefault &&
            checkPrivilege(hasBodyPartDeleteImage())
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
            :value="bodyPart.fullCode"
            v-on:changeValue="bodyPart.fullCode = $event"
            :title="$t('BodyParts.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-bodyPartNameAr`"
            :errors="errors_bodyPartNameAr"
            :value="bodyPart.bodyPartNameAr"
            v-on:changeValue="
              bodyPart.bodyPartNameAr = $event;
              $v.bodyPart.bodyPartNameAr.$touch();
            "
            :title="$t('BodyParts.nameAr')"
            :imgName="'bodyParts.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-bodyPartNameEn`"
            :errors="errors_bodyPartNameEn"
            :value="bodyPart.bodyPartNameEn"
            v-on:changeValue="
              bodyPart.bodyPartNameEn = $event;
              $v.bodyPart.bodyPartNameEn.$touch();
            "
            :title="$t('BodyParts.nameEn')"
            :imgName="'bodyParts.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-bodyPartNameUnd`"
            :value="bodyPart.bodyPartNameUnd"
            v-on:changeValue="bodyPart.bodyPartNameUnd = $event"
            :title="$t('BodyParts.nameUnd')"
            :imgName="'bodyParts.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bodyPartDescriptionAr`"
            :errors="errors_bodyPartDescriptionAr"
            :value="bodyPart.bodyPartDescriptionAr"
            v-on:changeValue="
              bodyPart.bodyPartDescriptionAr = $event;
              $v.bodyPart.bodyPartDescriptionAr.$touch();
            "
            :title="$t('BodyParts.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bodyPartDescriptionEn`"
            :errors="errors_bodyPartDescriptionEn"
            :value="bodyPart.bodyPartDescriptionEn"
            v-on:changeValue="
              bodyPart.bodyPartDescriptionEn = $event;
              $v.bodyPart.bodyPartDescriptionEn.$touch();
            "
            :title="$t('BodyParts.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bodyPartDescriptionUnd`"
            :value="bodyPart.bodyPartDescriptionUnd"
            v-on:changeValue="bodyPart.bodyPartDescriptionUnd = $event"
            :title="$t('BodyParts.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bodyPartNotes`"
            :value="bodyPart.bodyPartNotes"
            v-on:changeValue="bodyPart.bodyPartNotes = $event"
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
import { SYSTEM_TYPE } from "./../../../../../utils/constantLists";
import CustomFileInput from "./../../../../../components/general/CustomFileInput.vue";
import BaseTree from "./../../../../../components/general/BaseTree.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasBodyPartDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    BaseTree,
    CustomInput,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    bodyPart: {
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
    bodyPart: {
      bodyPartNameAr: { required, isValidNameAr },
      bodyPartNameEn: { required, isValidNameEn },
      bodyPartDescriptionAr: { isValidTextAr },
      bodyPartDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.BodyPart;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.bodyPart.systemComponentHierarchyToken,
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectBodyPart"),
        systemComponentToken: this.bodyPart.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectBodyPart"),
        parentToken: this.bodyPart.parentBodyPartToken,
        parentTitle: this.$t("BodyParts.selectParent"),
        parentImgName: "bodyParts.svg",
      };
      return treeModelObject;
    },
    isEditting() {
      return this.submitName == this.$t("edit") ? true : false;
    },
    errors_bodyPartNameAr() {
      let errors = [];
      if (this.$v.bodyPart.bodyPartNameAr.$error) {
        if (
          !this.$v.bodyPart.bodyPartNameAr.required &&
          !this.$v.bodyPart.bodyPartNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.bodyPart.bodyPartNameAr.required &&
          !this.$v.bodyPart.bodyPartNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_bodyPartNameEn() {
      let errors = [];
      if (this.$v.bodyPart.bodyPartNameEn.$error) {
        if (
          !this.$v.bodyPart.bodyPartNameAr.required &&
          !this.$v.bodyPart.bodyPartNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.bodyPart.bodyPartNameEn.required &&
          !this.$v.bodyPart.bodyPartNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_bodyPartDescriptionAr() {
      let errors = [];
      if (this.$v.bodyPart.bodyPartDescriptionAr.$error) {
        if (!this.$v.bodyPart.bodyPartDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_bodyPartDescriptionEn() {
      let errors = [];
      if (this.$v.bodyPart.bodyPartDescriptionEn.$error) {
        if (!this.$v.bodyPart.bodyPartDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    baseTreeChanged(data) {
      this.bodyPart.systemComponentHierarchyToken = data.hierarchyToken;
      this.bodyPart.systemComponentToken = data.componentToken;
      this.bodyPart.parentBodyPartToken = data.parentToken;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.bodyPart.bodyPartNameAr.required &&
          this.$v.bodyPart.bodyPartNameAr.isValidNameAr) ||
          (this.$v.bodyPart.bodyPartNameEn.required &&
            this.$v.bodyPart.bodyPartNameEn.isValidNameEn)) &&
        this.$v.bodyPart.bodyPartDescriptionAr.isValidTextAr &&
        this.$v.bodyPart.bodyPartDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasBodyPartDeleteImage,
    fullPathFileFromServer,
  },
};
</script>

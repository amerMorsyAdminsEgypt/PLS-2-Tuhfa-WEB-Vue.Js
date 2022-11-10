<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="countedService.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              countedService.countedServiceImagePath,
              countedService.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !countedService.countedServiceImageIsDefault &&
            checkPrivilege(hasCountedServiceDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="countedService.fullCode"
            v-on:changeValue="countedService.fullCode = $event"
            :title="$t('CountedServices.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-countedServiceNameAr`"
            :errors="errors_countedServiceNameAr"
            :value="countedService.countedServiceNameAr"
            v-on:changeValue="
              countedService.countedServiceNameAr = $event;
              $v.countedService.countedServiceNameAr.$touch();
            "
            :title="$t('CountedServices.nameAr')"
            :imgName="'countedServices.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-countedServiceNameEn`"
            :errors="errors_countedServiceNameEn"
            :value="countedService.countedServiceNameEn"
            v-on:changeValue="
              countedService.countedServiceNameEn = $event;
              $v.countedService.countedServiceNameEn.$touch();
            "
            :title="$t('CountedServices.nameEn')"
            :imgName="'countedServices.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-countedServiceNameUnd`"
            :value="countedService.countedServiceNameUnd"
            v-on:changeValue="countedService.countedServiceNameUnd = $event"
            :title="$t('CountedServices.nameUnd')"
            :imgName="'countedServices.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`placeTypeToken`"
            :value="placeTypeToken"
            :options="placeTypeTokenOptions"
            v-on:changeValue="placeTypeToken = $event"
            :title="$t('Places.type')"
            :imgName="'type.svg'"
          />
          <BaseTree
            :key="placeTypeToken"
            :placeTypeToken="placeTypeToken"
            :hierarchySystemTypeFilterToken="
              hierarchySystemTypeFilterTokenPlace
            "
            :treeModel="getTreeModelPlace"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="true"
          />
          <BaseTree
            :hierarchySystemTypeFilterToken="
              hierarchySystemTypeFilterTokenEducational
            "
            :treeModel="getTreeModel"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="true"
          />
          <CustomSelectBox
            :className="'col-md-4'"
            :id="`${id}-countedServiceTypeToken`"
            :value="countedService.countedServiceTypeToken"
            :options="countedServiceTypeTokenOptions"
            v-on:changeValue="countedService.countedServiceTypeToken = $event"
            :title="$t('CountedServiceTypes.select')"
            :imgName="'countedServiceTypes.svg'"
          />
          <CustomInputFloat
            :className="'col-md-4'"
            :id="`${id}-countedServicePrice`"
            :value="countedService.countedServicePrice"
            v-on:changeValue="countedService.countedServicePrice = $event"
            :title="$t('CountedServices.countedServicePrice')"
            :imgName="'money.svg'"
          />
          <CustomInputFloat
            :className="'col-md-4'"
            :id="`${id}-countedServiceMaximumDiscountPercentage`"
            :value="countedService.countedServiceMaximumDiscountPercentage"
            v-on:changeValue="
              countedService.countedServiceMaximumDiscountPercentage = $event
            "
            :title="$t('CountedServices.maximumDiscountPercentage')"
            :imgName="'percentage.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceDescriptionAr`"
            :errors="errors_countedServiceDescriptionAr"
            :value="countedService.countedServiceDescriptionAr"
            v-on:changeValue="
              countedService.countedServiceDescriptionAr = $event;
              $v.countedService.countedServiceDescriptionAr.$touch();
            "
            :title="$t('CountedServices.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceDescriptionEn`"
            :errors="errors_countedServiceDescriptionEn"
            :value="countedService.countedServiceDescriptionEn"
            v-on:changeValue="
              countedService.countedServiceDescriptionEn = $event;
              $v.countedService.countedServiceDescriptionEn.$touch();
            "
            :title="$t('CountedServices.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceDescriptionUnd`"
            :value="countedService.countedServiceDescriptionUnd"
            v-on:changeValue="
              countedService.countedServiceDescriptionUnd = $event
            "
            :title="$t('CountedServices.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceNotes`"
            :value="countedService.countedServiceNotes"
            v-on:changeValue="countedService.countedServiceNotes = $event"
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
} from "./../../../utils/functions";

import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../utils/validationHelper";
import CustomFileInput from "./../../../components/general/CustomFileInput.vue";
import CustomInputFloat from "./../../../components/general/CustomInputFloat.vue";
import BaseTree from "./../../../components/general/BaseTree.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../components/general/TextArea.vue";
import { hasCountedServiceDeleteImage } from "./../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../utils/functions";
import generalMixin from "./../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { SYSTEM_TYPE } from "./../../../utils/constantLists";
import { getCountedServiceTypesDialog } from "./../../../utils/dialogsOfApi";
import { getDialogOfPlaceType } from "./../../../utils/dialogsOfConstantsLists";
import PreLoader from "@/components/general/PreLoader.vue";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomFileInput,
    CustomInputFloat,
    BaseTree,
    CustomInput,
    CustomSelectBox,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      countedServiceTypeTokenOptions: [],
      placeTypeToken: "",
      placeTypeTokenOptions: getDialogOfPlaceType() || [],
    };
  },
  props: {
    countedService: {
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
    countedService: {
      countedServiceNameAr: { required, isValidNameAr },
      countedServiceNameEn: { required, isValidNameEn },
      countedServiceDescriptionAr: { isValidTextAr },
      countedServiceDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    hierarchySystemTypeFilterTokenPlace() {
      return SYSTEM_TYPE.Place;
    },
    hierarchySystemTypeFilterTokenEducational() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModelPlace() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.countedService.placeInfoData.systemComponentHierarchyToken,
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectPlace"),
        systemComponentToken:
          this.countedService.placeInfoData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectPlace"),
        parentToken: this.countedService.placeToken,
        parentTitle: this.$t("Places.selectParent"),
        parentImgName: "places.svg",
      };
      return treeModelObject;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.countedService.educationalCategoryInfoData
            .systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken:
          this.countedService.educationalCategoryInfoData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: this.countedService.educationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.select"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
    errors_countedServiceNameAr() {
      let errors = [];
      if (this.$v.countedService.countedServiceNameAr.$error) {
        if (
          !this.$v.countedService.countedServiceNameAr.required &&
          !this.$v.countedService.countedServiceNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.countedService.countedServiceNameAr.required &&
          !this.$v.countedService.countedServiceNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_countedServiceNameEn() {
      let errors = [];
      if (this.$v.countedService.countedServiceNameEn.$error) {
        if (
          !this.$v.countedService.countedServiceNameAr.required &&
          !this.$v.countedService.countedServiceNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.countedService.countedServiceNameEn.required &&
          !this.$v.countedService.countedServiceNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_countedServiceDescriptionAr() {
      let errors = [];
      if (this.$v.countedService.countedServiceDescriptionAr.$error) {
        if (!this.$v.countedService.countedServiceDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_countedServiceDescriptionEn() {
      let errors = [];
      if (this.$v.countedService.countedServiceDescriptionEn.$error) {
        if (!this.$v.countedService.countedServiceDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getCountedServiceTypesDialog() {
      this.isLoading = true;

      this.countedServiceTypeTokenOptions =
        await getCountedServiceTypesDialog();
      this.isLoading = false;
    },
    baseTreeChanged(data) {
      if (data.systemTypeToken == SYSTEM_TYPE.Place) {
        this.countedService.placeInfoData.systemComponentHierarchyToken =
          data.hierarchyToken;
        this.countedService.placeInfoData.systemComponentToken =
          data.componentToken;
        this.countedService.placeToken = data.parentToken;
      }
      if (data.systemTypeToken == SYSTEM_TYPE.EducationalActivity) {
        this.countedService.educationalCategoryInfoData.systemComponentHierarchyToken =
          data.hierarchyToken;
        this.countedService.educationalCategoryInfoData.systemComponentToken =
          data.componentToken;
        this.countedService.educationalCategoryToken = data.parentToken;
      }
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.countedService.countedServiceNameAr.required &&
          this.$v.countedService.countedServiceNameAr.isValidNameAr) ||
          (this.$v.countedService.countedServiceNameEn.required &&
            this.$v.countedService.countedServiceNameEn.isValidNameEn)) &&
        this.$v.countedService.countedServiceDescriptionAr.isValidTextAr &&
        this.$v.countedService.countedServiceDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasCountedServiceDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getCountedServiceTypesDialog();
  },
};
</script>

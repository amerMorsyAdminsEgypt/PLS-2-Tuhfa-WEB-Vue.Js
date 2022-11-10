<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="service.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(service.serviceImagePath, service.defaultImg)
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !service.serviceImageIsDefault &&
            checkPrivilege(hasServiceDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`serviceForm-placeTypeToken`"
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
            :className="'col-md-6'"
            :id="`${id}-serviceTypeToken`"
            :value="service.serviceTypeToken"
            :options="serviceTypeTokenOptions"
            v-on:changeValue="service.serviceTypeToken = $event"
            :title="$t('ServiceTypes.select')"
            :imgName="'serviceTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="service.fullCode"
            v-on:changeValue="service.fullCode = $event"
            :title="$t('Services.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-serviceNameAr`"
            :errors="errors_serviceNameAr"
            :value="service.serviceNameAr"
            v-on:changeValue="
              service.serviceNameAr = $event;
              $v.service.serviceNameAr.$touch();
            "
            :title="$t('Services.nameAr')"
            :imgName="'services.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-serviceNameEn`"
            :errors="errors_serviceNameEn"
            :value="service.serviceNameEn"
            v-on:changeValue="
              service.serviceNameEn = $event;
              $v.service.serviceNameEn.$touch();
            "
            :title="$t('Services.nameEn')"
            :imgName="'services.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-serviceNameUnd`"
            :value="service.serviceNameUnd"
            v-on:changeValue="service.serviceNameUnd = $event"
            :title="$t('Services.nameUnd')"
            :imgName="'services.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-serviceDescriptionAr`"
            :errors="errors_serviceDescriptionAr"
            :value="service.serviceDescriptionAr"
            v-on:changeValue="
              service.serviceDescriptionAr = $event;
              $v.service.serviceDescriptionAr.$touch();
            "
            :title="$t('Services.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-serviceDescriptionEn`"
            :errors="errors_serviceDescriptionEn"
            :value="service.serviceDescriptionEn"
            v-on:changeValue="
              service.serviceDescriptionEn = $event;
              $v.service.serviceDescriptionEn.$touch();
            "
            :title="$t('Services.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-serviceDescriptionUnd`"
            :value="service.serviceDescriptionUnd"
            v-on:changeValue="service.serviceDescriptionUnd = $event"
            :title="$t('Services.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-servicePrice`"
            :value="service.servicePrice"
            v-on:changeValue="service.servicePrice = $event"
            :title="$t('Services.servicePrice')"
            :imgName="'money.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-serviceMaximumDiscountPercentage`"
            :value="service.serviceMaximumDiscountPercentage"
            v-on:changeValue="service.serviceMaximumDiscountPercentage = $event"
            :title="$t('Services.maximumDiscountPercentage')"
            :imgName="'percentage.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="`${id}-serviceNotes`"
            :value="service.serviceNotes"
            v-on:changeValue="service.serviceNotes = $event"
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
import { hasServiceDeleteImage } from "./../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../utils/functions";
import generalMixin from "./../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { SYSTEM_TYPE } from "./../../../utils/constantLists";
import { getServiceTypesDialog } from "./../../../utils/dialogsOfApi";
import PreLoader from "@/components/general/PreLoader.vue";
import { getDialogOfPlaceType } from "./../../../utils/dialogsOfConstantsLists";

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
      serviceTypeTokenOptions: [],
      placeTypeToken: "",
      placeTypeTokenOptions: getDialogOfPlaceType() || [],
    };
  },
  props: {
    service: {
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
    service: {
      serviceNameAr: { required, isValidNameAr },
      serviceNameEn: { required, isValidNameEn },
      serviceDescriptionAr: { isValidTextAr },
      serviceDescriptionEn: { isValidTextEn },
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
          this.service.placeInfoData.systemComponentHierarchyToken,
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectPlace"),
        systemComponentToken: this.service.placeInfoData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectPlace"),
        parentToken: this.service.placeToken,
        parentTitle: this.$t("Places.selectParent"),
        parentImgName: "places.svg",
      };
      return treeModelObject;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.service.educationalCategoryInfoData
            .systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken:
          this.service.educationalCategoryInfoData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: this.service.educationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.select"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
    errors_serviceNameAr() {
      let errors = [];
      if (this.$v.service.serviceNameAr.$error) {
        if (
          !this.$v.service.serviceNameAr.required &&
          !this.$v.service.serviceNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.service.serviceNameAr.required &&
          !this.$v.service.serviceNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_serviceNameEn() {
      let errors = [];
      if (this.$v.service.serviceNameEn.$error) {
        if (
          !this.$v.service.serviceNameAr.required &&
          !this.$v.service.serviceNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.service.serviceNameEn.required &&
          !this.$v.service.serviceNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_serviceDescriptionAr() {
      let errors = [];
      if (this.$v.service.serviceDescriptionAr.$error) {
        if (!this.$v.service.serviceDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_serviceDescriptionEn() {
      let errors = [];
      if (this.$v.service.serviceDescriptionEn.$error) {
        if (!this.$v.service.serviceDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getServiceTypesDialog() {
      this.isLoading = true;

      this.serviceTypeTokenOptions = await getServiceTypesDialog();
      this.isLoading = false;
    },
    baseTreeChanged(data) {
      if (data.systemTypeToken == SYSTEM_TYPE.Place) {
        this.service.placeInfoData.systemComponentHierarchyToken =
          data.hierarchyToken;
        this.service.placeInfoData.systemComponentToken = data.componentToken;
        this.service.placeToken = data.parentToken;
      }
      if (data.systemTypeToken == SYSTEM_TYPE.EducationalActivity) {
        this.service.educationalCategoryInfoData.systemComponentHierarchyToken =
          data.hierarchyToken;
        this.service.educationalCategoryInfoData.systemComponentToken =
          data.componentToken;
        this.service.educationalCategoryToken = data.parentToken;
      }
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.service.serviceNameAr.required &&
          this.$v.service.serviceNameAr.isValidNameAr) ||
          (this.$v.service.serviceNameEn.required &&
            this.$v.service.serviceNameEn.isValidNameEn)) &&
        this.$v.service.serviceDescriptionAr.isValidTextAr &&
        this.$v.service.serviceDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasServiceDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getServiceTypesDialog();
  },
};
</script>

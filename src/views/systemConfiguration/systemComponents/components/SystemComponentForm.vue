<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="systemComponent.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              systemComponent.systemComponentImagePath,
              systemComponent.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !systemComponent.systemComponentImageIsDefault &&
            hasSystemComponentDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="systemComponent.fullCode"
            v-on:changeValue="systemComponent.fullCode = $event"
            :title="$t('SystemComponents.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-systemComponentNameAr`"
            :errors="errors_systemComponentNameAr"
            :value="systemComponent.systemComponentNameAr"
            v-on:changeValue="
              systemComponent.systemComponentNameAr = $event;
              $v.systemComponent.systemComponentNameAr.$touch();
            "
            :title="$t('SystemComponents.nameAr')"
            :imgName="'systemComponents.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-systemComponentNameEn`"
            :errors="errors_systemComponentNameEn"
            :value="systemComponent.systemComponentNameEn"
            v-on:changeValue="
              systemComponent.systemComponentNameEn = $event;
              $v.systemComponent.systemComponentNameEn.$touch();
            "
            :title="$t('SystemComponents.nameEn')"
            :imgName="'systemComponents.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-systemComponentNameUnd`"
            :value="systemComponent.systemComponentNameUnd"
            v-on:changeValue="systemComponent.systemComponentNameUnd = $event"
            :title="$t('SystemComponents.nameUnd')"
            :imgName="'systemComponents.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-systemComponentDescriptionAr`"
            :errors="errors_systemComponentDescriptionAr"
            :value="systemComponent.systemComponentDescriptionAr"
            v-on:changeValue="
              systemComponent.systemComponentDescriptionAr = $event;
              $v.systemComponent.systemComponentDescriptionAr.$touch();
            "
            :title="$t('SystemComponents.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-systemComponentDescriptionEn`"
            :errors="errors_systemComponentDescriptionEn"
            :value="systemComponent.systemComponentDescriptionEn"
            v-on:changeValue="
              systemComponent.systemComponentDescriptionEn = $event;
              $v.systemComponent.systemComponentDescriptionEn.$touch();
            "
            :title="$t('SystemComponents.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-systemComponentDescriptionUnd`"
            :value="systemComponent.systemComponentDescriptionUnd"
            v-on:changeValue="
              systemComponent.systemComponentDescriptionUnd = $event
            "
            :title="$t('SystemComponents.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-systemComponentNotes`"
            :value="systemComponent.systemComponentNotes"
            v-on:changeValue="systemComponent.systemComponentNotes = $event"
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
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import {
  hasSystemComponentPlaceDeleteImage,
  hasSystemComponentEducationalCategoryDeleteImage,
  hasSystemComponentGeographicalDistributionDeleteImage,
  hasSystemComponentJobGradeDeleteImage,
  hasSystemComponentStoreItemDeleteImage,
  hasSystemComponentBodyPartDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    systemComponent: {
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
    systemComponent: {
      systemComponentNameAr: { required, isValidNameAr },
      systemComponentNameEn: { required, isValidNameEn },
      systemComponentDescriptionAr: { isValidTextAr },
      systemComponentDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_systemComponentNameAr() {
      let errors = [];
      if (this.$v.systemComponent.systemComponentNameAr.$error) {
        if (
          !this.$v.systemComponent.systemComponentNameAr.required &&
          !this.$v.systemComponent.systemComponentNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.systemComponent.systemComponentNameAr.required &&
          !this.$v.systemComponent.systemComponentNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_systemComponentNameEn() {
      let errors = [];
      if (this.$v.systemComponent.systemComponentNameEn.$error) {
        if (
          !this.$v.systemComponent.systemComponentNameAr.required &&
          !this.$v.systemComponent.systemComponentNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.systemComponent.systemComponentNameEn.required &&
          !this.$v.systemComponent.systemComponentNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_systemComponentDescriptionAr() {
      let errors = [];
      if (this.$v.systemComponent.systemComponentDescriptionAr.$error) {
        if (!this.$v.systemComponent.systemComponentDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_systemComponentDescriptionEn() {
      let errors = [];
      if (this.$v.systemComponent.systemComponentDescriptionEn.$error) {
        if (!this.$v.systemComponent.systemComponentDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasSystemComponentDeleteImage() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentPlace":
          status = checkPrivilege(hasSystemComponentPlaceDeleteImage());
          break;
        case "systemComponentEducationalCategory":
          status = checkPrivilege(
            hasSystemComponentEducationalCategoryDeleteImage()
          );
          break;
        case "systemComponentGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentGeographicalDistributionDeleteImage()
          );
          break;
        case "systemComponentJobGrade":
          status = checkPrivilege(hasSystemComponentJobGradeDeleteImage());
          break;
        case "systemComponentStoreItem":
          status = checkPrivilege(hasSystemComponentStoreItemDeleteImage());
          break;
        case "systemComponentBodyPart":
          status = checkPrivilege(hasSystemComponentBodyPartDeleteImage());
          break;
      }
      return status;
    },
  },
  methods: {
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.systemComponent.systemComponentNameAr.required &&
          this.$v.systemComponent.systemComponentNameAr.isValidNameAr) ||
          (this.$v.systemComponent.systemComponentNameEn.required &&
            this.$v.systemComponent.systemComponentNameEn.isValidNameEn)) &&
        this.$v.systemComponent.systemComponentDescriptionAr.isValidTextAr &&
        this.$v.systemComponent.systemComponentDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    fullPathFileFromServer,
  },
};
</script>

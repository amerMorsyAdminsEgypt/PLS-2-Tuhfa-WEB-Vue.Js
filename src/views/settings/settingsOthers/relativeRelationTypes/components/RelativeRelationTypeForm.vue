<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="relativeRelationType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              relativeRelationType.relativeRelationTypeImagePath,
              relativeRelationType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !relativeRelationType.relativeRelationTypeImageIsDefault &&
            checkPrivilege(hasRelativeRelationTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="relativeRelationType.fullCode"
            v-on:changeValue="relativeRelationType.fullCode = $event"
            :title="$t('RelativeRelationTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-relativeRelationTypeNameAr`"
            :errors="errors_relativeRelationTypeNameAr"
            :value="relativeRelationType.relativeRelationTypeNameAr"
            v-on:changeValue="
              relativeRelationType.relativeRelationTypeNameAr = $event;
              $v.relativeRelationType.relativeRelationTypeNameAr.$touch();
            "
            :title="$t('RelativeRelationTypes.nameAr')"
            :imgName="'RelativeRelationTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-relativeRelationTypeNameEn`"
            :errors="errors_relativeRelationTypeNameEn"
            :value="relativeRelationType.relativeRelationTypeNameEn"
            v-on:changeValue="
              relativeRelationType.relativeRelationTypeNameEn = $event;
              $v.relativeRelationType.relativeRelationTypeNameEn.$touch();
            "
            :title="$t('RelativeRelationTypes.nameEn')"
            :imgName="'RelativeRelationTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-relativeRelationTypeNameUnd`"
            :value="relativeRelationType.relativeRelationTypeNameUnd"
            v-on:changeValue="
              relativeRelationType.relativeRelationTypeNameUnd = $event
            "
            :title="$t('RelativeRelationTypes.nameUnd')"
            :imgName="'RelativeRelationTypes.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-relativeRelationKinShipDegreeToken`"
            :value="relativeRelationType.relativeRelationKinShipDegreeToken"
            :options="relativeRelationKinShipDegreeTokenOptions"
            v-on:changeValue="
              relativeRelationType.relativeRelationKinShipDegreeToken = $event
            "
            :title="$t('general.degree')"
            :imgName="'RelativeRelationTypes.svg'"
          />
          <CustomCheckbox
            :className="'col-md-6'"
            :value="relativeRelationType.relativeRelationRepetitionStatus"
            v-on:changeValue="
              relativeRelationType.relativeRelationRepetitionStatus = $event
            "
            :title="$t('RelativeRelationTypes.RepetitionStatus')"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-relativeRelationTypeDescriptionAr`"
            :errors="errors_relativeRelationTypeDescriptionAr"
            :value="relativeRelationType.relativeRelationTypeDescriptionAr"
            v-on:changeValue="
              relativeRelationType.relativeRelationTypeDescriptionAr = $event;
              $v.relativeRelationType.relativeRelationTypeDescriptionAr.$touch();
            "
            :title="$t('RelativeRelationTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-relativeRelationTypeDescriptionEn`"
            :errors="errors_relativeRelationTypeDescriptionEn"
            :value="relativeRelationType.relativeRelationTypeDescriptionEn"
            v-on:changeValue="
              relativeRelationType.relativeRelationTypeDescriptionEn = $event;
              $v.relativeRelationType.relativeRelationTypeDescriptionEn.$touch();
            "
            :title="$t('RelativeRelationTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-relativeRelationTypeDescriptionUnd`"
            :value="relativeRelationType.relativeRelationTypeDescriptionUnd"
            v-on:changeValue="
              relativeRelationType.relativeRelationTypeDescriptionUnd = $event
            "
            :title="$t('RelativeRelationTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-relativeRelationTypeNotes`"
            :value="relativeRelationType.relativeRelationTypeNotes"
            v-on:changeValue="
              relativeRelationType.relativeRelationTypeNotes = $event
            "
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
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../../../../components/general/CustomCheckbox.vue";
import { hasRelativeRelationTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
import { getDialogOfKinShipDegree } from "./../../../../../utils/dialogsOfConstantsLists";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    TextArea,
    CustomSelectBox,
    CustomCheckbox,
  },
  data() {
    return {
      relativeRelationKinShipDegreeTokenOptions: getDialogOfKinShipDegree(),
    };
  },
  props: {
    relativeRelationType: {
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
    relativeRelationType: {
      relativeRelationTypeNameAr: { required, isValidNameAr },
      relativeRelationTypeNameEn: { required, isValidNameEn },
      relativeRelationTypeDescriptionAr: { isValidTextAr },
      relativeRelationTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_relativeRelationTypeNameAr() {
      let errors = [];
      if (this.$v.relativeRelationType.relativeRelationTypeNameAr.$error) {
        if (
          !this.$v.relativeRelationType.relativeRelationTypeNameAr.required &&
          !this.$v.relativeRelationType.relativeRelationTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.relativeRelationType.relativeRelationTypeNameAr.required &&
          !this.$v.relativeRelationType.relativeRelationTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_relativeRelationTypeNameEn() {
      let errors = [];
      if (this.$v.relativeRelationType.relativeRelationTypeNameEn.$error) {
        if (
          !this.$v.relativeRelationType.relativeRelationTypeNameAr.required &&
          !this.$v.relativeRelationType.relativeRelationTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.relativeRelationType.relativeRelationTypeNameEn.required &&
          !this.$v.relativeRelationType.relativeRelationTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_relativeRelationTypeDescriptionAr() {
      let errors = [];
      if (
        this.$v.relativeRelationType.relativeRelationTypeDescriptionAr.$error
      ) {
        if (
          !this.$v.relativeRelationType.relativeRelationTypeDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_relativeRelationTypeDescriptionEn() {
      let errors = [];
      if (
        this.$v.relativeRelationType.relativeRelationTypeDescriptionEn.$error
      ) {
        if (
          !this.$v.relativeRelationType.relativeRelationTypeDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.relativeRelationType.relativeRelationTypeNameAr.required &&
          this.$v.relativeRelationType.relativeRelationTypeNameAr
            .isValidNameAr) ||
          (this.$v.relativeRelationType.relativeRelationTypeNameEn.required &&
            this.$v.relativeRelationType.relativeRelationTypeNameEn
              .isValidNameEn)) &&
        this.$v.relativeRelationType.relativeRelationTypeDescriptionAr
          .isValidTextAr &&
        this.$v.relativeRelationType.relativeRelationTypeDescriptionEn
          .isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasRelativeRelationTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>

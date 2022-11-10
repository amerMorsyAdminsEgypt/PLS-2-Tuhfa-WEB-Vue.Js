<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="communicationType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              communicationType.communicationTypeImagePath,
              communicationType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !communicationType.communicationTypeImageIsDefault &&
            checkPrivilege(hasCommunicationTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="communicationType.fullCode"
            v-on:changeValue="communicationType.fullCode = $event"
            :title="$t('CommunicationTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-communicationTypeNameAr`"
            :errors="errors_communicationTypeNameAr"
            :value="communicationType.communicationTypeNameAr"
            v-on:changeValue="
              communicationType.communicationTypeNameAr = $event;
              $v.communicationType.communicationTypeNameAr.$touch();
            "
            :title="$t('CommunicationTypes.nameAr')"
            :imgName="'communicationTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-communicationTypeNameEn`"
            :errors="errors_communicationTypeNameEn"
            :value="communicationType.communicationTypeNameEn"
            v-on:changeValue="
              communicationType.communicationTypeNameEn = $event;
              $v.communicationType.communicationTypeNameEn.$touch();
            "
            :title="$t('CommunicationTypes.nameEn')"
            :imgName="'communicationTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-communicationTypeNameUnd`"
            :value="communicationType.communicationTypeNameUnd"
            v-on:changeValue="
              communicationType.communicationTypeNameUnd = $event
            "
            :title="$t('CommunicationTypes.nameUnd')"
            :imgName="'communicationTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-communicationTypeDescriptionAr`"
            :errors="errors_communicationTypeDescriptionAr"
            :value="communicationType.communicationTypeDescriptionAr"
            v-on:changeValue="
              communicationType.communicationTypeDescriptionAr = $event;
              $v.communicationType.communicationTypeDescriptionAr.$touch();
            "
            :title="$t('CommunicationTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-communicationTypeDescriptionEn`"
            :errors="errors_communicationTypeDescriptionEn"
            :value="communicationType.communicationTypeDescriptionEn"
            v-on:changeValue="
              communicationType.communicationTypeDescriptionEn = $event;
              $v.communicationType.communicationTypeDescriptionEn.$touch();
            "
            :title="$t('CommunicationTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-communicationTypeDescriptionUnd`"
            :value="communicationType.communicationTypeDescriptionUnd"
            v-on:changeValue="
              communicationType.communicationTypeDescriptionUnd = $event
            "
            :title="$t('CommunicationTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-communicationTypeNotes`"
            :value="communicationType.communicationTypeNotes"
            v-on:changeValue="communicationType.communicationTypeNotes = $event"
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
import { hasCommunicationTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
  },
  // data() {
  //   return {};
  // },
  props: {
    communicationType: {
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
    communicationType: {
      communicationTypeNameAr: { required, isValidNameAr },
      communicationTypeNameEn: { required, isValidNameEn },
      communicationTypeDescriptionAr: { isValidTextAr },
      communicationTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_communicationTypeNameAr() {
      let errors = [];
      if (this.$v.communicationType.communicationTypeNameAr.$error) {
        if (
          !this.$v.communicationType.communicationTypeNameAr.required &&
          !this.$v.communicationType.communicationTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.communicationType.communicationTypeNameAr.required &&
          !this.$v.communicationType.communicationTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_communicationTypeNameEn() {
      let errors = [];
      if (this.$v.communicationType.communicationTypeNameEn.$error) {
        if (
          !this.$v.communicationType.communicationTypeNameAr.required &&
          !this.$v.communicationType.communicationTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.communicationType.communicationTypeNameEn.required &&
          !this.$v.communicationType.communicationTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_communicationTypeDescriptionAr() {
      let errors = [];
      if (this.$v.communicationType.communicationTypeDescriptionAr.$error) {
        if (
          !this.$v.communicationType.communicationTypeDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_communicationTypeDescriptionEn() {
      let errors = [];
      if (this.$v.communicationType.communicationTypeDescriptionEn.$error) {
        if (
          !this.$v.communicationType.communicationTypeDescriptionEn
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
        ((this.$v.communicationType.communicationTypeNameAr.required &&
          this.$v.communicationType.communicationTypeNameAr.isValidNameAr) ||
          (this.$v.communicationType.communicationTypeNameEn.required &&
            this.$v.communicationType.communicationTypeNameEn.isValidNameEn)) &&
        this.$v.communicationType.communicationTypeDescriptionAr
          .isValidTextAr &&
        this.$v.communicationType.communicationTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasCommunicationTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>

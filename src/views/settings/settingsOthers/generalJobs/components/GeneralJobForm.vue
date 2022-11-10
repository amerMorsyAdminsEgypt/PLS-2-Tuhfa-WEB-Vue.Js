<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="generalJob.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              generalJob.generalJobImagePath,
              generalJob.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !generalJob.generalJobImageIsDefault &&
            checkPrivilege(hasGeneralJobDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="generalJob.fullCode"
            v-on:changeValue="generalJob.fullCode = $event"
            :title="$t('GeneralJobs.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-generalJobNameAr`"
            :errors="errors_generalJobNameAr"
            :value="generalJob.generalJobNameAr"
            v-on:changeValue="
              generalJob.generalJobNameAr = $event;
              $v.generalJob.generalJobNameAr.$touch();
            "
            :title="$t('GeneralJobs.nameAr')"
            :imgName="'generalJobs.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-generalJobNameEn`"
            :errors="errors_generalJobNameEn"
            :value="generalJob.generalJobNameEn"
            v-on:changeValue="
              generalJob.generalJobNameEn = $event;
              $v.generalJob.generalJobNameEn.$touch();
            "
            :title="$t('GeneralJobs.nameEn')"
            :imgName="'generalJobs.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-generalJobNameUnd`"
            :value="generalJob.generalJobNameUnd"
            v-on:changeValue="generalJob.generalJobNameUnd = $event"
            :title="$t('GeneralJobs.nameUnd')"
            :imgName="'generalJobs.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-generalJobDescriptionAr`"
            :errors="errors_generalJobDescriptionAr"
            :value="generalJob.generalJobDescriptionAr"
            v-on:changeValue="
              generalJob.generalJobDescriptionAr = $event;
              $v.generalJob.generalJobDescriptionAr.$touch();
            "
            :title="$t('GeneralJobs.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-generalJobDescriptionEn`"
            :errors="errors_generalJobDescriptionEn"
            :value="generalJob.generalJobDescriptionEn"
            v-on:changeValue="
              generalJob.generalJobDescriptionEn = $event;
              $v.generalJob.generalJobDescriptionEn.$touch();
            "
            :title="$t('GeneralJobs.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-generalJobDescriptionUnd`"
            :value="generalJob.generalJobDescriptionUnd"
            v-on:changeValue="generalJob.generalJobDescriptionUnd = $event"
            :title="$t('GeneralJobs.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-generalJobNotes`"
            :value="generalJob.generalJobNotes"
            v-on:changeValue="generalJob.generalJobNotes = $event"
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
import { hasGeneralJobDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    generalJob: {
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
    generalJob: {
      generalJobNameAr: { required, isValidNameAr },
      generalJobNameEn: { required, isValidNameEn },
      generalJobDescriptionAr: { isValidTextAr },
      generalJobDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_generalJobNameAr() {
      let errors = [];
      if (this.$v.generalJob.generalJobNameAr.$error) {
        if (
          !this.$v.generalJob.generalJobNameAr.required &&
          !this.$v.generalJob.generalJobNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.generalJob.generalJobNameAr.required &&
          !this.$v.generalJob.generalJobNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_generalJobNameEn() {
      let errors = [];
      if (this.$v.generalJob.generalJobNameEn.$error) {
        if (
          !this.$v.generalJob.generalJobNameAr.required &&
          !this.$v.generalJob.generalJobNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.generalJob.generalJobNameEn.required &&
          !this.$v.generalJob.generalJobNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_generalJobDescriptionAr() {
      let errors = [];
      if (this.$v.generalJob.generalJobDescriptionAr.$error) {
        if (!this.$v.generalJob.generalJobDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_generalJobDescriptionEn() {
      let errors = [];
      if (this.$v.generalJob.generalJobDescriptionEn.$error) {
        if (!this.$v.generalJob.generalJobDescriptionEn.isValidTextEn)
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
        ((this.$v.generalJob.generalJobNameAr.required &&
          this.$v.generalJob.generalJobNameAr.isValidNameAr) ||
          (this.$v.generalJob.generalJobNameEn.required &&
            this.$v.generalJob.generalJobNameEn.isValidNameEn)) &&
        this.$v.generalJob.generalJobDescriptionAr.isValidTextAr &&
        this.$v.generalJob.generalJobDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasGeneralJobDeleteImage,
    fullPathFileFromServer,
  },
};
</script>

<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="complaintFollowUp.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              complaintFollowUp.complaintFollowUpMediaPath,
              complaintFollowUp.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !complaintFollowUp.complaintFollowUpImageIsDefault &&
            checkPrivilege(hasComplaintFollowUpDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <!-- <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-complaintToken`"
            :value="complaintFollowUp.complaintToken"
            :errors="errors_complaintToken"
            :options="complaintTokenOptions"
            v-on:changeValue="
              complaintFollowUp.complaintToken = $event;
              $v.complaintFollowUp.complaintToken.$touch();
            "
            :title="$t('Complaints.select')"
            :imgName="'complaints.svg'"
          /> -->
          <DataLabelGroup
            :className="'col-md-6'"
            :value="complaintFollowUp.complaintInfoData.complaintTitleCurrent"
            :title="$t('Complaints.title')"
            :imgName="'complaints.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-complaintTypeToken`"
            :value="complaintFollowUp.complaintTypeToken"
            :options="complaintFollowUpTypeTokenOptions"
            v-on:changeValue="complaintFollowUp.complaintTypeToken = $event"
            :title="$t('ComplaintTypes.select')"
            :imgName="'complaintTypes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-complaintSectorToken`"
            :value="complaintFollowUp.complaintSectorToken"
            :options="complaintFollowUpSectorTokenOptions"
            v-on:changeValue="complaintFollowUp.complaintSectorToken = $event"
            :title="$t('ComplaintSectors.select')"
            :imgName="'complaintSectors.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="complaintFollowUp.fullCode"
            v-on:changeValue="complaintFollowUp.fullCode = $event"
            :title="$t('ComplaintFollowUps.code')"
            :imgName="'code.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintFollowUpTextAr`"
            :errors="errors_complaintFollowUpTextAr"
            :value="complaintFollowUp.complaintFollowUpTextAr"
            v-on:changeValue="
              complaintFollowUp.complaintFollowUpTextAr = $event;
              $v.complaintFollowUp.complaintFollowUpTextAr.$touch();
            "
            :title="$t('ComplaintFollowUps.textAr')"
            :imgName="'complaintFollowUps.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintFollowUpTextEn`"
            :errors="errors_complaintFollowUpTextEn"
            :value="complaintFollowUp.complaintFollowUpTextEn"
            v-on:changeValue="
              complaintFollowUp.complaintFollowUpTextEn = $event;
              $v.complaintFollowUp.complaintFollowUpTextEn.$touch();
            "
            :title="$t('ComplaintFollowUps.textEn')"
            :imgName="'complaintFollowUps.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-complaintFollowUpTextUnd`"
            :value="complaintFollowUp.complaintFollowUpTextUnd"
            v-on:changeValue="
              complaintFollowUp.complaintFollowUpTextUnd = $event
            "
            :title="$t('ComplaintFollowUps.textUnd')"
            :imgName="'complaintFollowUps.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="submitForm"
        >
          {{ submitName }}
        </button>
        <button
          class="btn btn-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
          @click.prevent
        >
          {{ $t("cancel") }}
        </button>
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
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasComplaintFollowUpDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import {
  getComplaintsDialog,
  getComplaintTypesDialog,
  getComplaintSectorsDialog,
} from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomSelectBox,
    DataLabelGroup,
    CustomInput,
    TextArea,
  },
  data() {
    return {
      complaintTokenOptions: [],
      complaintFollowUpTypeTokenOptions: [],
      complaintFollowUpSectorTokenOptions: [],
    };
  },
  props: {
    complaintFollowUp: {
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
    complaintFollowUp: {
      complaintToken: { required },
      complaintFollowUpTextAr: { required, isValidTextAr },
      complaintFollowUpTextEn: { required, isValidTextEn },
    },
  },
  computed: {
    errors_complaintToken() {
      let errors = [];
      if (this.$v.complaintFollowUp.complaintToken.$error) {
        if (!this.$v.complaintFollowUp.complaintToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_complaintFollowUpTextAr() {
      let errors = [];
      if (this.$v.complaintFollowUp.complaintFollowUpTextAr.$error) {
        if (
          !this.$v.complaintFollowUp.complaintFollowUpTextAr.required &&
          !this.$v.complaintFollowUp.complaintFollowUpTextEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.complaintFollowUp.complaintFollowUpTextAr.required &&
          !this.$v.complaintFollowUp.complaintFollowUpTextAr.isValidTextAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_complaintFollowUpTextEn() {
      let errors = [];
      if (this.$v.complaintFollowUp.complaintFollowUpTextEn.$error) {
        if (
          !this.$v.complaintFollowUp.complaintFollowUpTextAr.required &&
          !this.$v.complaintFollowUp.complaintFollowUpTextEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.complaintFollowUp.complaintFollowUpTextEn.required &&
          !this.$v.complaintFollowUp.complaintFollowUpTextEn.isValidTextEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getComplaintTypesDialog() {
      this.isLoading = true;

      this.complaintFollowUpTypeTokenOptions = await getComplaintTypesDialog();
      this.isLoading = false;
    },
    async getComplaintsDialog() {
      this.isLoading = true;

      this.complaintTokenOptions = await getComplaintsDialog();
      this.isLoading = false;
    },
    async getComplaintSectorsDialog() {
      this.isLoading = true;

      this.complaintFollowUpSectorTokenOptions =
        await getComplaintSectorsDialog();
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        (this.$v.complaintFollowUp.complaintToken.required &&
          this.$v.complaintFollowUp.complaintFollowUpTextAr.required &&
          this.$v.complaintFollowUp.complaintFollowUpTextAr.isValidTextAr) ||
        (this.$v.complaintFollowUp.complaintFollowUpTextEn.required &&
          this.$v.complaintFollowUp.complaintFollowUpTextEn.isValidTextEn)
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasComplaintFollowUpDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getComplaintTypesDialog();
    this.getComplaintsDialog();
    this.getComplaintSectorsDialog();
  },
};
</script>

<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="interestFollowUp.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              interestFollowUp.interestFollowUpImagePath,
              interestFollowUp.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !interestFollowUp.interestFollowUpImageIsDefault &&
            checkPrivilege(hasInterestFollowUpDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <!-- <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-followUpTypeToken`"
            :value="interestFollowUp.followUpTypeToken"
            :options="followUpTypeTokenOptions"
            v-on:changeValue="interestFollowUp.followUpTypeToken = $event"
            :title="$t('InterestFollowUps.followUpType')"
            :imgName="'type.svg'"
          /> -->
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-replyStatusTypeToken`"
            :value="interestFollowUp.replyStatusTypeToken"
            :options="replyStatusTypeTokenOptions"
            v-on:changeValue="interestFollowUp.replyStatusTypeToken = $event"
            :title="$t('InterestFollowUps.replyStatusType')"
            :imgName="'type.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="interestFollowUp.fullCode"
            v-on:changeValue="interestFollowUp.fullCode = $event"
            :title="$t('InterestFollowUps.code')"
            :imgName="'code.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-interestFollowUpDescriptionAr`"
            :errors="errors_interestFollowUpDescriptionAr"
            :value="interestFollowUp.interestFollowUpDescriptionAr"
            v-on:changeValue="
              interestFollowUp.interestFollowUpDescriptionAr = $event;
              $v.interestFollowUp.interestFollowUpDescriptionAr.$touch();
            "
            :title="$t('InterestFollowUps.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-interestFollowUpDescriptionEn`"
            :errors="errors_interestFollowUpDescriptionEn"
            :value="interestFollowUp.interestFollowUpDescriptionEn"
            v-on:changeValue="
              interestFollowUp.interestFollowUpDescriptionEn = $event;
              $v.interestFollowUp.interestFollowUpDescriptionEn.$touch();
            "
            :title="$t('InterestFollowUps.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-interestFollowUpDescriptionUnd`"
            :value="interestFollowUp.interestFollowUpDescriptionUnd"
            v-on:changeValue="
              interestFollowUp.interestFollowUpDescriptionUnd = $event
            "
            :title="$t('InterestFollowUps.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-interestFollowUpNotes`"
            :value="interestFollowUp.interestFollowUpNotes"
            v-on:changeValue="interestFollowUp.interestFollowUpNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
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
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasInterestFollowUpDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import {
  getUsersDialog,
  getInterestsDialog,
} from "./../../../../utils/dialogsOfApi";
import { USER_TYPE } from "./../../../../utils/constantLists";
import {
  getDialogOfFollowUpType,
  getDialogOfReplyStatusType,
} from "./../../../../utils/dialogsOfConstantsLists";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomSelectBox,
    TextArea,
  },
  data() {
    return {
      followUpTypeTokenOptions: getDialogOfFollowUpType(),
      replyStatusTypeTokenOptions: getDialogOfReplyStatusType() || [],
      interestTokenOptions: [],
      // userTokenOptions: [],
    };
  },
  props: {
    interestFollowUp: {
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
    interestFollowUp: {
      interestFollowUpNameAr: { required, isValidNameAr },
      interestFollowUpNameEn: { required, isValidNameEn },
      interestFollowUpDescriptionAr: { isValidTextAr },
      interestFollowUpDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_interestFollowUpNameAr() {
      let errors = [];
      if (this.$v.interestFollowUp.interestFollowUpNameAr.$error) {
        if (
          !this.$v.interestFollowUp.interestFollowUpNameAr.required &&
          !this.$v.interestFollowUp.interestFollowUpNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.interestFollowUp.interestFollowUpNameAr.required &&
          !this.$v.interestFollowUp.interestFollowUpNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_interestFollowUpNameEn() {
      let errors = [];
      if (this.$v.interestFollowUp.interestFollowUpNameEn.$error) {
        if (
          !this.$v.interestFollowUp.interestFollowUpNameAr.required &&
          !this.$v.interestFollowUp.interestFollowUpNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.interestFollowUp.interestFollowUpNameEn.required &&
          !this.$v.interestFollowUp.interestFollowUpNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_interestFollowUpDescriptionAr() {
      let errors = [];
      if (this.$v.interestFollowUp.interestFollowUpDescriptionAr.$error) {
        if (
          !this.$v.interestFollowUp.interestFollowUpDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_interestFollowUpDescriptionEn() {
      let errors = [];
      if (this.$v.interestFollowUp.interestFollowUpDescriptionEn.$error) {
        if (
          !this.$v.interestFollowUp.interestFollowUpDescriptionEn.isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getInterestsDialog() {
      this.isLoading = true;

      this.interestTokenOptions = await getInterestsDialog();
      this.isLoading = false;
    },
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.interestFollowUp.interestFollowUpDescriptionAr.isValidTextAr &&
        this.$v.interestFollowUp.interestFollowUpDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasInterestFollowUpDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    // this.getInterestsDialog();
  },
};
</script>

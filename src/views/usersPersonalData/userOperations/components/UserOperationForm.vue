<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userOperation.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userOperation.userOperationImagePath,
              userOperation.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !userOperation.userOperationImageIsDefault &&
            hasPrivilegeDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userOperation.fullCode"
            v-on:changeValue="userOperation.fullCode = $event"
            :title="$t('UserOperations.code')"
            :imgName="'code.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-operationTypeToken`"
            :errors="errors_operationTypeToken"
            :value="userOperation.operationTypeToken"
            :options="operationTypeTokenOptions"
            v-on:changeValue="
              userOperation.operationTypeToken = $event;
              $v.userOperation.operationTypeToken.$touch();
            "
            :title="$t('OperationTypes.select')"
            :imgName="'operationTypes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-bodyPartToken`"
            :errors="errors_bodyPartToken"
            :value="userOperation.bodyPartToken"
            :options="bodyPartTokenOptions"
            v-on:changeValue="
              userOperation.bodyPartToken = $event;
              $v.userOperation.bodyPartToken.$touch();
            "
            :title="$t('BodyParts.select')"
            :imgName="'bodyParts.svg'"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-operationDateTime`"
            type="dateTime"
            :value="userOperation.operationDateTime"
            :title="$t('UserOperations.operationDateTime')"
            v-on:changeValue="userOperation.operationDateTime = $event.dateTime"
            :language="language"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userOperationDescriptionAr`"
            :errors="errors_userOperationDescriptionAr"
            :value="userOperation.userOperationDescriptionAr"
            v-on:changeValue="
              userOperation.userOperationDescriptionAr = $event;
              $v.userOperation.userOperationDescriptionAr.$touch();
            "
            :title="$t('UserOperations.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userOperationDescriptionEn`"
            :errors="errors_userOperationDescriptionEn"
            :value="userOperation.userOperationDescriptionEn"
            v-on:changeValue="
              userOperation.userOperationDescriptionEn = $event;
              $v.userOperation.userOperationDescriptionEn.$touch();
            "
            :title="$t('UserOperations.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userOperationDescriptionUnd`"
            :value="userOperation.userOperationDescriptionUnd"
            v-on:changeValue="
              userOperation.userOperationDescriptionUnd = $event
            "
            :title="$t('UserOperations.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userOperationNotes`"
            :value="userOperation.userOperationNotes"
            v-on:changeValue="userOperation.userOperationNotes = $event"
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
import { USER_TYPE } from "./../../../../utils/constantLists";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import {
  hasAdminsEgyptOperationDeleteImage,
  hasMasterAdminOperationDeleteImage,
  hasEmployeeOperationDeleteImage,
  hasStudentOperationDeleteImage,
  hasSupplierOperationDeleteImage,
  hasParentOperationDeleteImage,
  hasClientOperationDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { checkPrivilege, getLanguage } from "./../../../../utils/functions";
import {
  getOperationTypesDialog,
  getBodyPartsDialog,
} from "./../../../../utils/dialogsOfApi";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    PreLoader,
    CustomSelectBox,
    CustomInput,
    DateTimePicker,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      operationTypeTokenOptions: [],
      bodyPartTokenOptions: [],
    };
  },
  props: {
    userOperation: {
      type: Object,
    },
    userTypeToken: {
      type: String,
      default: "",
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
    userOperation: {
      operationTypeToken: { required },
      bodyPartToken: { required },
      userOperationDescriptionAr: { isValidTextAr },
      userOperationDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_operationTypeToken() {
      let errors = [];
      if (this.$v.userOperation.operationTypeToken.$error) {
        if (!this.$v.userOperation.operationTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_bodyPartToken() {
      let errors = [];
      if (this.$v.userOperation.bodyPartToken.$error) {
        if (!this.$v.userOperation.bodyPartToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userOperationDescriptionAr() {
      let errors = [];
      if (this.$v.userOperation.userOperationDescriptionAr.$error) {
        if (!this.$v.userOperation.userOperationDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userOperationDescriptionEn() {
      let errors = [];
      if (this.$v.userOperation.userOperationDescriptionEn.$error) {
        if (!this.$v.userOperation.userOperationDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasPrivilegeDeleteImage() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptOperationDeleteImage());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminOperationDeleteImage());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeOperationDeleteImage());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentOperationDeleteImage());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierOperationDeleteImage());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentOperationDeleteImage());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientOperationDeleteImage());
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
        this.$v.userOperation.operationTypeToken.required &&
        this.$v.userOperation.bodyPartToken.required &&
        this.$v.userOperation.userOperationDescriptionAr.isValidTextAr &&
        this.$v.userOperation.userOperationDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    async getOperationTypesDialog() {
      this.isLoading = true;
      this.operationTypeTokenOptions = await getOperationTypesDialog();
      this.isLoading = false;
    },
    async getBodyPartsDialog() {
      this.isLoading = true;
      this.bodyPartTokenOptions = await getBodyPartsDialog();
      this.isLoading = false;
    },

    fullPathFileFromServer,
  },
  created() {
    this.getOperationTypesDialog();
    this.getBodyPartsDialog();
  },
};
</script>

<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userLoginCode.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userLoginCode.userLoginCodeImagePath,
              userLoginCode.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus && !userLoginCode.userLoginCodeImageIsDefault
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userLoginCode.fullCode"
            v-on:changeValue="userLoginCode.fullCode = $event"
            :title="$t('UserLoginCodes.code')"
            :imgName="'code.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-userToken`"
            :errors="errors_userToken"
            :value="userLoginCode.userToken"
            :options="userTokenOptions"
            v-on:changeValue="
              userLoginCode.userToken = $event;
              $v.userLoginCode.userToken.$touch();
            "
            :title="$t('Users.select')"
            :imgName="'user.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-userLoginCodePlatFromToken`"
            :errors="errors_userLoginCodePlatFromToken"
            :value="userLoginCode.userLoginCodePlatFromToken"
            :options="userLoginCodePlatFromTokenOptions"
            v-on:changeValue="
              userLoginCode.userLoginCodePlatFromToken = $event;
              $v.userLoginCode.userLoginCodePlatFromToken.$touch();
            "
            :title="$t('PlatFroms.select')"
            :imgName="'type.svg'"
          />
          <CustomInput
            :isSync="true"
            :syncTitle="$t('UserLoginCodes.loginCodeSuggestion')"
            :syncImgName="'sync.svg'"
            @sync="loginCodeSuggestion()"
            :className="'col-md-6'"
            :id="`${id}-loginCode`"
            :value="userLoginCode.loginCode"
            v-on:changeValue="userLoginCode.loginCode = $event"
            :title="$t('UserLoginCodes.loginCode')"
            :imgName="'UserLoginCodes.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userLoginCodeNameAr`"
            :errors="errors_userLoginCodeNameAr"
            :value="userLoginCode.userLoginCodeNameAr"
            v-on:changeValue="
              userLoginCode.userLoginCodeNameAr = $event;
              $v.userLoginCode.userLoginCodeNameAr.$touch();
            "
            :title="$t('UserLoginCodes.nameAr')"
            :imgName="'UserLoginCodes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userLoginCodeNameEn`"
            :errors="errors_userLoginCodeNameEn"
            :value="userLoginCode.userLoginCodeNameEn"
            v-on:changeValue="
              userLoginCode.userLoginCodeNameEn = $event;
              $v.userLoginCode.userLoginCodeNameEn.$touch();
            "
            :title="$t('UserLoginCodes.nameEn')"
            :imgName="'UserLoginCodes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userLoginCodeNameUnd`"
            :value="userLoginCode.userLoginCodeNameUnd"
            v-on:changeValue="userLoginCode.userLoginCodeNameUnd = $event"
            :title="$t('UserLoginCodes.nameUnd')"
            :imgName="'UserLoginCodes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userLoginCodeDescriptionAr`"
            :errors="errors_userLoginCodeDescriptionAr"
            :value="userLoginCode.userLoginCodeDescriptionAr"
            v-on:changeValue="
              userLoginCode.userLoginCodeDescriptionAr = $event;
              $v.userLoginCode.userLoginCodeDescriptionAr.$touch();
            "
            :title="$t('UserLoginCodes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userLoginCodeDescriptionEn`"
            :errors="errors_userLoginCodeDescriptionEn"
            :value="userLoginCode.userLoginCodeDescriptionEn"
            v-on:changeValue="
              userLoginCode.userLoginCodeDescriptionEn = $event;
              $v.userLoginCode.userLoginCodeDescriptionEn.$touch();
            "
            :title="$t('UserLoginCodes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userLoginCodeDescriptionUnd`"
            :value="userLoginCode.userLoginCodeDescriptionUnd"
            v-on:changeValue="
              userLoginCode.userLoginCodeDescriptionUnd = $event
            "
            :title="$t('UserLoginCodes.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <CustomCheckbox
            :className="'col-md-12'"
            :value="userLoginCode.codeIsActiveUnTileUserSignOut"
            v-on:changeValue="
              userLoginCode.codeIsActiveUnTileUserSignOut = $event
            "
            :title="$t('UserLoginCodes.codeIsActiveUnTileUserSignOut')"
          />
          <template v-if="!userLoginCode.codeIsActiveUnTileUserSignOut">
            <DateTimePicker
              class="col-md-6"
              :id="`${id}-codeActiveFromDateTime`"
              type="dateTime"
              :value="userLoginCode.codeActiveFromDateTime"
              :title="$t('UserLoginCodes.codeActiveFromDateTime')"
              v-on:changeValue="
                userLoginCode.codeActiveFromDateTime = $event.dateTime
              "
              :language="language"
            />
            <DateTimePicker
              class="col-md-6"
              :id="`${id}-codeActiveToDateTime`"
              type="dateTime"
              :value="userLoginCode.codeActiveToDateTime"
              :title="$t('UserLoginCodes.codeActiveToDateTime')"
              v-on:changeValue="
                userLoginCode.codeActiveToDateTime = $event.dateTime
              "
              :language="language"
            />
          </template>
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-userLoginCodeNotes`"
            :value="userLoginCode.userLoginCodeNotes"
            v-on:changeValue="userLoginCode.userLoginCodeNotes = $event"
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
  getLanguage,
} from "./../../../../utils/functions";
import {
  // isValidNameAr,
  // isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import { STATUS } from "./../../../../utils/constants";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { getUsersDialog } from "./../../../../utils/dialogsOfApi";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { getDialogOfPlatFormType } from "./../../../../utils/dialogsOfConstantsLists";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import apiUserLoginCode from "./../../../../api/settings/userLoginCode";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    PreLoader,
    CustomInput,
    DateTimePicker,
    CustomSelectBox,
    CustomCheckbox,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      userTokenOptions: [],
      userLoginCodePlatFromTokenOptions: getDialogOfPlatFormType() || [],
      language: getLanguage(),
    };
  },
  props: {
    userLoginCode: {
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
    userTypeToken: {
      type: String,
      default: "",
    },
  },
  validations: {
    userLoginCode: {
      userToken: { required },
      userLoginCodePlatFromToken: { required },
      userLoginCodeNameAr: { isValidTextAr },
      userLoginCodeNameEn: { isValidTextEn },
      userLoginCodeDescriptionAr: { isValidTextAr },
      userLoginCodeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_userToken() {
      let errors = [];
      if (this.$v.userLoginCode.userToken.$error) {
        if (!this.$v.userLoginCode.userToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userLoginCodePlatFromToken() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodePlatFromToken.$error) {
        if (!this.$v.userLoginCode.userLoginCodePlatFromToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },

    errors_userLoginCodeNameAr() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodeNameAr.$error) {
        if (!this.$v.userLoginCode.userLoginCodeNameAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userLoginCodeNameEn() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodeNameEn.$error) {
        if (!this.$v.userLoginCode.userLoginCodeNameEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    errors_userLoginCodeDescriptionAr() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodeDescriptionAr.$error) {
        if (!this.$v.userLoginCode.userLoginCodeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userLoginCodeDescriptionEn() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodeDescriptionEn.$error) {
        if (!this.$v.userLoginCode.userLoginCodeDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async loginCodeSuggestion() {
      let paramsAvailableToCall = true;
      if (!this.userLoginCode.userToken) {
        this.showMsg(this.$t("Users.select"));
        paramsAvailableToCall = false;
      }

      if (!this.userLoginCode.userLoginCodePlatFromToken) {
        this.showMsg(this.$t("PlatFroms.select"));
        paramsAvailableToCall = false;
      }
      if (paramsAvailableToCall) {
        this.getSuggestion();
      }
    },
    async getSuggestion() {
      this.isLoading = true;
      try {
        let params = {
          userToken: this.userLoginCode.userToken,
          userLoginCodePlatFromToken:
            this.userLoginCode.userLoginCodePlatFromToken,
        };
        const response = await apiUserLoginCode.getSuggestion(params);
        if (response.data.status == STATUS.SUCCESS) {
          this.userLoginCode.loginCode = response.data.userLoginCode;
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async submitForm() {
      this.$v.$touch();
      bottomSheetScrollToTop();
      if (
        this.$v.userLoginCode.userToken.required &&
        this.$v.userLoginCode.userLoginCodePlatFromToken.required &&
        this.$v.userLoginCode.userLoginCodeNameAr.isValidTextAr &&
        this.$v.userLoginCode.userLoginCodeNameEn.isValidTextEn &&
        this.$v.userLoginCode.userLoginCodeDescriptionAr.isValidTextAr &&
        this.$v.userLoginCode.userLoginCodeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    fullPathFileFromServer,
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getSuppliersDialog() {
      this.isLoading = true;
      let params = {
        modelName: "suppliers",
        userTypeToken: USER_TYPE.Supplier,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getParentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "parents",
        userTypeToken: USER_TYPE.Parent,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getClientsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "clients",
        userTypeToken: USER_TYPE.Client,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getEmployeesDialog() {
      this.isLoading = true;
      let params = {
        modelName: "employees",
        userTypeToken: USER_TYPE.Employee,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getMasterAdminsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "masterAdmins",
        userTypeToken: USER_TYPE.MasterAdmin,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
  },
  async created() {
    switch (this.userTypeToken) {
      case USER_TYPE.Student:
        await this.getStudentsDialog();
        break;
      case USER_TYPE.Supplier:
        await this.getSuppliersDialog();
        break;
      case USER_TYPE.Parent:
        await this.getParentsDialog();
        break;
      case USER_TYPE.Client:
        await this.getClientsDialog();
        break;
      case USER_TYPE.Employee:
        await this.getEmployeesDialog();
        break;
      case USER_TYPE.MasterAdmin:
        await this.getMasterAdminsDialog();
        break;
    }
  },
};
</script>

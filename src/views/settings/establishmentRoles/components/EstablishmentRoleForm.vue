<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="establishmentRole.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              establishmentRole.establishmentRoleImagePath,
              establishmentRole.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !establishmentRole.establishmentRoleImageIsDefault &&
            checkPrivilege(hasEstablishmentsRoleDeleteImage)
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <!-- :errors="errors_authenticationLoginTypeToken" -->
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`authenticationLoginTypeToken`"
            :value="establishmentRole.authenticationLoginTypeToken"
            :options="authenticationLoginTypeTokenOptions"
            v-on:changeValue="
              establishmentRole.authenticationLoginTypeToken = $event
            "
            :title="$t('EstablishmentRoles.selectLoginType')"
            :imgName="'type.svg'"
          />
          <!-- $v.establishmentRole.authenticationLoginTypeToken.$touch(); -->
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`codeInLoginTypeToken`"
            :value="establishmentRole.codeInLoginTypeToken"
            :options="codeInLoginTypeTokenOptions"
            v-on:changeValue="establishmentRole.codeInLoginTypeToken = $event"
            :title="$t('EstablishmentRoles.codeType')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="establishmentRole.fullCode"
            v-on:changeValue="establishmentRole.fullCode = $event"
            :title="$t('EstablishmentRoles.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'establishmentRoleNameAr'"
            :errors="errors_establishmentRoleNameAr"
            :value="establishmentRole.establishmentRoleNameAr"
            v-on:changeValue="
              establishmentRole.establishmentRoleNameAr = $event;
              $v.establishmentRole.establishmentRoleNameAr.$touch();
            "
            :title="$t('EstablishmentRoles.nameAr')"
            :imgName="'establishment-role.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'establishmentRoleNameEn'"
            :errors="errors_establishmentRoleNameEn"
            :value="establishmentRole.establishmentRoleNameEn"
            v-on:changeValue="
              establishmentRole.establishmentRoleNameEn = $event;
              $v.establishmentRole.establishmentRoleNameEn.$touch();
            "
            :title="$t('EstablishmentRoles.nameEn')"
            :imgName="'establishment-role.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'establishmentRoleNameUnd'"
            :value="establishmentRole.establishmentRoleNameUnd"
            v-on:changeValue="
              establishmentRole.establishmentRoleNameUnd = $event
            "
            :title="$t('EstablishmentRoles.nameUnd')"
            :imgName="'establishment-role.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'establishmentRoleDescriptionAr'"
            :errors="errors_establishmentRoleDescriptionAr"
            :value="establishmentRole.establishmentRoleDescriptionAr"
            v-on:changeValue="
              establishmentRole.establishmentRoleDescriptionAr = $event;
              $v.establishmentRole.establishmentRoleDescriptionAr.$touch();
            "
            :title="$t('EstablishmentRoles.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'establishmentRoleDescriptionEn'"
            :errors="errors_establishmentRoleDescriptionEn"
            :value="establishmentRole.establishmentRoleDescriptionEn"
            v-on:changeValue="
              establishmentRole.establishmentRoleDescriptionEn = $event;
              $v.establishmentRole.establishmentRoleDescriptionEn.$touch();
            "
            :title="$t('EstablishmentRoles.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'establishmentRoleDescriptionUnd'"
            :value="establishmentRole.establishmentRoleDescriptionUnd"
            v-on:changeValue="
              establishmentRole.establishmentRoleDescriptionUnd = $event
            "
            :title="$t('EstablishmentRoles.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'establishmentRoleNotes'"
            :value="establishmentRole.establishmentRoleNotes"
            v-on:changeValue="establishmentRole.establishmentRoleNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
          <CustomCheckbox
            :className="'col-md-6'"
            :value="establishmentRole.establishmentRoleDefaultStatus"
            v-on:changeValue="
              establishmentRole.establishmentRoleDefaultStatus = $event
            "
            :title="$t('EstablishmentRoles.defaultStatus')"
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
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import {
  hasAdminsEgyptEstablishmentsRoleDeleteImage,
  hasMasterAdminEstablishmentsRoleDeleteImage,
  hasEmployeeEstablishmentsRoleDeleteImage,
  hasStudentEstablishmentsRoleDeleteImage,
  hasSupplierEstablishmentsRoleDeleteImage,
  hasParentEstablishmentsRoleDeleteImage,
  hasClientEstablishmentsRoleDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  getDialogOfAuthenticationLoginType,
  getDialogOfCodeInLoginType,
} from "./../../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomSelectBox,
    CustomInput,
    CustomCheckbox,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      authenticationLoginTypeTokenOptions:
        getDialogOfAuthenticationLoginType() || [],
      codeInLoginTypeTokenOptions: getDialogOfCodeInLoginType() || [],
    };
  },
  props: {
    establishmentRole: {
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
    modelName: {
      type: String,
      default: "",
    },
  },
  validations: {
    establishmentRole: {
      establishmentRoleNameAr: { required, isValidNameAr },
      establishmentRoleNameEn: { required, isValidNameEn },
      establishmentRoleDescriptionAr: { isValidTextAr },
      establishmentRoleDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    hasEstablishmentsRoleDeleteImage() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptEstablishmentsRole":
          status = checkPrivilege(
            hasAdminsEgyptEstablishmentsRoleDeleteImage()
          );
          break;
        case "masterAdminEstablishmentsRole":
          status = checkPrivilege(
            hasMasterAdminEstablishmentsRoleDeleteImage()
          );
          break;
        case "employeeEstablishmentsRole":
          status = checkPrivilege(hasEmployeeEstablishmentsRoleDeleteImage());
          break;
        case "studentEstablishmentsRole":
          status = checkPrivilege(hasStudentEstablishmentsRoleDeleteImage());
          break;
        case "supplierEstablishmentsRole":
          status = checkPrivilege(hasSupplierEstablishmentsRoleDeleteImage());
          break;
        case "parentEstablishmentsRole":
          status = checkPrivilege(hasParentEstablishmentsRoleDeleteImage());
          break;
        case "clientEstablishmentsRole":
          status = checkPrivilege(hasClientEstablishmentsRoleDeleteImage());
          break;
      }
      return status;
    },
    errors_userTypeToken() {
      let errors = [];
      if (this.$v.establishmentRole.userTypeToken.$error) {
        if (!this.$v.establishmentRole.userTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_establishmentRoleNameAr() {
      let errors = [];
      if (this.$v.establishmentRole.establishmentRoleNameAr.$error) {
        if (
          !this.$v.establishmentRole.establishmentRoleNameAr.required &&
          !this.$v.establishmentRole.establishmentRoleNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.establishmentRole.establishmentRoleNameAr.required &&
          !this.$v.establishmentRole.establishmentRoleNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_establishmentRoleNameEn() {
      let errors = [];
      if (this.$v.establishmentRole.establishmentRoleNameEn.$error) {
        if (
          !this.$v.establishmentRole.establishmentRoleNameAr.required &&
          !this.$v.establishmentRole.establishmentRoleNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.establishmentRole.establishmentRoleNameEn.required &&
          !this.$v.establishmentRole.establishmentRoleNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_establishmentRoleDescriptionAr() {
      let errors = [];
      if (this.$v.establishmentRole.establishmentRoleDescriptionAr.$error) {
        if (
          !this.$v.establishmentRole.establishmentRoleDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_establishmentRoleDescriptionEn() {
      let errors = [];
      if (this.$v.establishmentRole.establishmentRoleDescriptionEn.$error) {
        if (
          !this.$v.establishmentRole.establishmentRoleDescriptionEn
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
        ((this.$v.establishmentRole.establishmentRoleNameAr.required &&
          this.$v.establishmentRole.establishmentRoleNameAr.isValidNameAr) ||
          (this.$v.establishmentRole.establishmentRoleNameEn.required &&
            this.$v.establishmentRole.establishmentRoleNameEn.isValidNameEn)) &&
        this.$v.establishmentRole.establishmentRoleDescriptionAr
          .isValidTextAr &&
        this.$v.establishmentRole.establishmentRoleDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    fullPathFileFromServer,
  },
};
</script>

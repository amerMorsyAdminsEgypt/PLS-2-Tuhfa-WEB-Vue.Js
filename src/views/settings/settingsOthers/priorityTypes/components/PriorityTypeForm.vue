<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="priorityType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              priorityType.priorityTypeImagePath,
              priorityType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !priorityType.priorityTypeImageIsDefault &&
            checkPrivilege(hasPriorityTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-priorityScopeTokens`"
            :errors="errors_priorityScopeTokens"
            :value="priorityType.priorityScopeTokens"
            :options="priorityScopeTokensOptions"
            v-on:changeValue="
              priorityType.priorityScopeTokens = $event;
              $v.priorityType.priorityScopeTokens.$touch();
            "
            :title="$t('PriorityTypes.type')"
            :imgName="'type.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-colorToken`"
            :errors="errors_colorToken"
            :value="priorityType.colorToken"
            :options="colorTokenOptions"
            v-on:changeValue="
              priorityType.colorToken = $event;
              $v.priorityType.colorToken.$touch();
            "
            :title="$t('Colors.select')"
            :imgName="'colors.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="priorityType.fullCode"
            v-on:changeValue="priorityType.fullCode = $event"
            :title="$t('PriorityTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-priorityTypeNameAr`"
            :errors="errors_priorityTypeNameAr"
            :value="priorityType.priorityTypeNameAr"
            v-on:changeValue="
              priorityType.priorityTypeNameAr = $event;
              $v.priorityType.priorityTypeNameAr.$touch();
            "
            :title="$t('PriorityTypes.nameAr')"
            :imgName="'priorityTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-priorityTypeNameEn`"
            :errors="errors_priorityTypeNameEn"
            :value="priorityType.priorityTypeNameEn"
            v-on:changeValue="
              priorityType.priorityTypeNameEn = $event;
              $v.priorityType.priorityTypeNameEn.$touch();
            "
            :title="$t('PriorityTypes.nameEn')"
            :imgName="'priorityTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-priorityTypeNameUnd`"
            :value="priorityType.priorityTypeNameUnd"
            v-on:changeValue="priorityType.priorityTypeNameUnd = $event"
            :title="$t('PriorityTypes.nameUnd')"
            :imgName="'priorityTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priorityTypeDescriptionAr`"
            :errors="errors_priorityTypeDescriptionAr"
            :value="priorityType.priorityTypeDescriptionAr"
            v-on:changeValue="
              priorityType.priorityTypeDescriptionAr = $event;
              $v.priorityType.priorityTypeDescriptionAr.$touch();
            "
            :title="$t('PriorityTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priorityTypeDescriptionEn`"
            :errors="errors_priorityTypeDescriptionEn"
            :value="priorityType.priorityTypeDescriptionEn"
            v-on:changeValue="
              priorityType.priorityTypeDescriptionEn = $event;
              $v.priorityType.priorityTypeDescriptionEn.$touch();
            "
            :title="$t('PriorityTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priorityTypeDescriptionUnd`"
            :value="priorityType.priorityTypeDescriptionUnd"
            v-on:changeValue="priorityType.priorityTypeDescriptionUnd = $event"
            :title="$t('PriorityTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priorityTypeNotes`"
            :value="priorityType.priorityTypeNotes"
            v-on:changeValue="priorityType.priorityTypeNotes = $event"
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
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasPriorityTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Colors from "./../../../../../models/settings/settingsOthers/colors/Colors";
import apiColor from "./../../../../../api/settings/settingsOthers/colors";
import { STATUS, BASE_URL } from "./../../../../../utils/constants";
import { getDialogOfPriorityScopeType } from "./../../../../../utils/dialogsOfConstantsLists";

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
      priorityScopeTokensOptions: getDialogOfPriorityScopeType(),
      colorTokenOptions: [],
      colors: new Colors(),
    };
  },
  props: {
    priorityType: {
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
    priorityType: {
      priorityScopeTokens: { required },
      colorToken: { required },
      priorityTypeNameAr: { required, isValidNameAr },
      priorityTypeNameEn: { required, isValidNameEn },
      priorityTypeDescriptionAr: { isValidTextAr },
      priorityTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_priorityScopeTokens() {
      let errors = [];
      if (this.$v.priorityType.priorityScopeTokens.$error) {
        if (!this.$v.priorityType.priorityScopeTokens.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_colorToken() {
      let errors = [];
      if (this.$v.priorityType.colorToken.$error) {
        if (!this.$v.priorityType.colorToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_priorityTypeNameAr() {
      let errors = [];
      if (this.$v.priorityType.priorityTypeNameAr.$error) {
        if (
          !this.$v.priorityType.priorityTypeNameAr.required &&
          !this.$v.priorityType.priorityTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.priorityType.priorityTypeNameAr.required &&
          !this.$v.priorityType.priorityTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_priorityTypeNameEn() {
      let errors = [];
      if (this.$v.priorityType.priorityTypeNameEn.$error) {
        if (
          !this.$v.priorityType.priorityTypeNameAr.required &&
          !this.$v.priorityType.priorityTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.priorityType.priorityTypeNameEn.required &&
          !this.$v.priorityType.priorityTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_priorityTypeDescriptionAr() {
      let errors = [];
      if (this.$v.priorityType.priorityTypeDescriptionAr.$error) {
        if (!this.$v.priorityType.priorityTypeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_priorityTypeDescriptionEn() {
      let errors = [];
      if (this.$v.priorityType.priorityTypeDescriptionEn.$error) {
        if (!this.$v.priorityType.priorityTypeDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getColorsDialog() {
      this.isLoading = true;
      let options = [];
      try {
        const response = await apiColor.getDialog(this.colors.filterData);
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            options.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
              image: itemsData[item]["itemImagePath"]
                ? BASE_URL + itemsData[item]["itemImagePath"]
                : this.colors.color.defaultImg,
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          options.push({
            value: "",
            text: response.data.msg,
            image: this.colors.color.defaultImg,
          });
        }
      } catch (error) {
        options.push({
          value: "",
          text: this.$t("errorCatch"),
          image: this.colors.color.defaultImg,
        });
      }
      this.colorTokenOptions = options;
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.priorityType.priorityScopeTokens.required &&
        this.$v.priorityType.colorToken.required &&
        ((this.$v.priorityType.priorityTypeNameAr.required &&
          this.$v.priorityType.priorityTypeNameAr.isValidNameAr) ||
          (this.$v.priorityType.priorityTypeNameEn.required &&
            this.$v.priorityType.priorityTypeNameEn.isValidNameEn)) &&
        this.$v.priorityType.priorityTypeDescriptionAr.isValidTextAr &&
        this.$v.priorityType.priorityTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasPriorityTypeDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getColorsDialog();
  },
};
</script>

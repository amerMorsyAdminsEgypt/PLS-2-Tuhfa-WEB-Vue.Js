<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="propertyType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              propertyType.propertyTypeImagePath,
              propertyType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !propertyType.propertyTypeImageIsDefault &&
            checkPrivilege(hasPropertyTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="propertyType.fullCode"
            v-on:changeValue="propertyType.fullCode = $event"
            :title="$t('PropertyTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-propertyTypeNameAr`"
            :errors="errors_propertyTypeNameAr"
            :value="propertyType.propertyTypeNameAr"
            v-on:changeValue="
              propertyType.propertyTypeNameAr = $event;
              $v.propertyType.propertyTypeNameAr.$touch();
            "
            :title="$t('PropertyTypes.nameAr')"
            :imgName="'PropertyTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-propertyTypeNameEn`"
            :errors="errors_propertyTypeNameEn"
            :value="propertyType.propertyTypeNameEn"
            v-on:changeValue="
              propertyType.propertyTypeNameEn = $event;
              $v.propertyType.propertyTypeNameEn.$touch();
            "
            :title="$t('PropertyTypes.nameEn')"
            :imgName="'PropertyTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-propertyTypeNameUnd`"
            :value="propertyType.propertyTypeNameUnd"
            v-on:changeValue="propertyType.propertyTypeNameUnd = $event"
            :title="$t('PropertyTypes.nameUnd')"
            :imgName="'PropertyTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-propertyTypeDescriptionAr`"
            :value="propertyType.propertyTypeDescriptionAr"
            v-on:changeValue="propertyType.propertyTypeDescriptionAr = $event"
            :title="$t('PropertyTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-propertyTypeDescriptionEn`"
            :value="propertyType.propertyTypeDescriptionEn"
            v-on:changeValue="propertyType.propertyTypeDescriptionEn = $event"
            :title="$t('PropertyTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-propertyTypeDescriptionUnd`"
            :value="propertyType.propertyTypeDescriptionUnd"
            v-on:changeValue="propertyType.propertyTypeDescriptionUnd = $event"
            :title="$t('PropertyTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-propertyTypeNotes`"
            :value="propertyType.propertyTypeNotes"
            v-on:changeValue="propertyType.propertyTypeNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <PropertyFileds
        :propertyDetailsData="propertyType.propertyDetailsData"
        :dropDownListTokenOptions="dropDownListTokenOptions"
        :id="id"
      />

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
import { getDropDownListsDialog } from "./../../../../utils/dialogsOfApi";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import PropertyFileds from "./PropertyFileds.vue";
import { hasPropertyTypeDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomFileInput,
    CustomInput,
    TextArea,
    PropertyFileds,
  },
  data() {
    return {
      dropDownListTokenOptions: [],
    };
  },
  props: {
    propertyType: {
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
    propertyType: {
      propertyTypeNameAr: { required },
      propertyTypeNameEn: { required },
    },
  },
  computed: {
    errors_propertyTypeNameAr() {
      let errors = [];
      if (this.$v.propertyType.propertyTypeNameAr.$error) {
        if (
          !this.$v.propertyType.propertyTypeNameAr.required &&
          !this.$v.propertyType.propertyTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_propertyTypeNameEn() {
      let errors = [];
      if (this.$v.propertyType.propertyTypeNameEn.$error) {
        if (
          !this.$v.propertyType.propertyTypeNameAr.required &&
          !this.$v.propertyType.propertyTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.propertyType.propertyTypeNameAr.required ||
        this.$v.propertyType.propertyTypeNameEn.required
      ) {
        this.$emit("submitForm");
      }
    },
    async getDropDownListsDialog() {
      this.isLoading = true;
      this.dropDownListTokenOptions = await getDropDownListsDialog();
      this.isLoading = false;
    },
    checkPrivilege,
    hasPropertyTypeDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getDropDownListsDialog();
  },
};
</script>

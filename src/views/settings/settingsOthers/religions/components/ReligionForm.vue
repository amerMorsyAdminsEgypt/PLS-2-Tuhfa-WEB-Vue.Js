<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="religion.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              religion.religionImagePath,
              religion.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !religion.religionImageIsDefault &&
            checkPrivilege(hasReligionDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="religion.fullCode"
            v-on:changeValue="religion.fullCode = $event"
            :title="$t('Religions.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-religionNameAr`"
            :errors="errors_religionNameAr"
            :value="religion.religionNameAr"
            v-on:changeValue="
              religion.religionNameAr = $event;
              $v.religion.religionNameAr.$touch();
            "
            :title="$t('Religions.nameAr')"
            :imgName="'religions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-religionNameEn`"
            :errors="errors_religionNameEn"
            :value="religion.religionNameEn"
            v-on:changeValue="
              religion.religionNameEn = $event;
              $v.religion.religionNameEn.$touch();
            "
            :title="$t('Religions.nameEn')"
            :imgName="'religions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-religionNameUnd`"
            :value="religion.religionNameUnd"
            v-on:changeValue="religion.religionNameUnd = $event"
            :title="$t('Religions.nameUnd')"
            :imgName="'religions.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-religionDescriptionAr`"
            :errors="errors_religionDescriptionAr"
            :value="religion.religionDescriptionAr"
            v-on:changeValue="
              religion.religionDescriptionAr = $event;
              $v.religion.religionDescriptionAr.$touch();
            "
            :title="$t('Religions.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-religionDescriptionEn`"
            :errors="errors_religionDescriptionEn"
            :value="religion.religionDescriptionEn"
            v-on:changeValue="
              religion.religionDescriptionEn = $event;
              $v.religion.religionDescriptionEn.$touch();
            "
            :title="$t('Religions.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-religionDescriptionUnd`"
            :value="religion.religionDescriptionUnd"
            v-on:changeValue="religion.religionDescriptionUnd = $event"
            :title="$t('Religions.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-religionNotes`"
            :value="religion.religionNotes"
            v-on:changeValue="religion.religionNotes = $event"
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
import { hasReligionDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    religion: {
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
    religion: {
      religionNameAr: { required, isValidNameAr },
      religionNameEn: { required, isValidNameEn },
      religionDescriptionAr: { isValidTextAr },
      religionDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_religionNameAr() {
      let errors = [];
      if (this.$v.religion.religionNameAr.$error) {
        if (
          !this.$v.religion.religionNameAr.required &&
          !this.$v.religion.religionNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.religion.religionNameAr.required &&
          !this.$v.religion.religionNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_religionNameEn() {
      let errors = [];
      if (this.$v.religion.religionNameEn.$error) {
        if (
          !this.$v.religion.religionNameAr.required &&
          !this.$v.religion.religionNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.religion.religionNameEn.required &&
          !this.$v.religion.religionNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_religionDescriptionAr() {
      let errors = [];
      if (this.$v.religion.religionDescriptionAr.$error) {
        if (!this.$v.religion.religionDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_religionDescriptionEn() {
      let errors = [];
      if (this.$v.religion.religionDescriptionEn.$error) {
        if (!this.$v.religion.religionDescriptionEn.isValidTextEn)
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
        ((this.$v.religion.religionNameAr.required &&
          this.$v.religion.religionNameAr.isValidNameAr) ||
          (this.$v.religion.religionNameEn.required &&
            this.$v.religion.religionNameEn.isValidNameEn)) &&
        this.$v.religion.religionDescriptionAr.isValidTextAr &&
        this.$v.religion.religionDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasReligionDeleteImage,
    fullPathFileFromServer,
  },
};
</script>

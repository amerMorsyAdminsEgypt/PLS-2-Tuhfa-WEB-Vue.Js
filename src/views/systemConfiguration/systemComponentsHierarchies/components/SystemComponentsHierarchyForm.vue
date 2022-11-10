<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="systemComponentsHierarchy.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              systemComponentsHierarchy.systemComponentsHierarchyImagePath,
              systemComponentsHierarchy.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !systemComponentsHierarchy.systemComponentsHierarchyImageIsDefault &&
            hasSystemComponentsHierarchyDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="systemComponentsHierarchy.fullCode"
            v-on:changeValue="systemComponentsHierarchy.fullCode = $event"
            :title="$t('SystemComponentsHierarchies.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-systemComponentsHierarchyNameAr`"
            :errors="errors_systemComponentsHierarchyNameAr"
            :value="systemComponentsHierarchy.systemComponentsHierarchyNameAr"
            v-on:changeValue="
              systemComponentsHierarchy.systemComponentsHierarchyNameAr =
                $event;
              $v.systemComponentsHierarchy.systemComponentsHierarchyNameAr.$touch();
            "
            :title="$t('SystemComponentsHierarchies.nameAr')"
            :imgName="'systemComponentsHierarchies.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-systemComponentsHierarchyNameEn`"
            :errors="errors_systemComponentsHierarchyNameEn"
            :value="systemComponentsHierarchy.systemComponentsHierarchyNameEn"
            v-on:changeValue="
              systemComponentsHierarchy.systemComponentsHierarchyNameEn =
                $event;
              $v.systemComponentsHierarchy.systemComponentsHierarchyNameEn.$touch();
            "
            :title="$t('SystemComponentsHierarchies.nameEn')"
            :imgName="'systemComponentsHierarchies.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-systemComponentsHierarchyNameUnd`"
            :value="systemComponentsHierarchy.systemComponentsHierarchyNameUnd"
            v-on:changeValue="
              systemComponentsHierarchy.systemComponentsHierarchyNameUnd =
                $event
            "
            :title="$t('SystemComponentsHierarchies.nameUnd')"
            :imgName="'systemComponentsHierarchies.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-systemComponentsHierarchyDescriptionAr`"
            :errors="errors_systemComponentsHierarchyDescriptionAr"
            :value="
              systemComponentsHierarchy.systemComponentsHierarchyDescriptionAr
            "
            v-on:changeValue="
              systemComponentsHierarchy.systemComponentsHierarchyDescriptionAr =
                $event;
              $v.systemComponentsHierarchy.systemComponentsHierarchyDescriptionAr.$touch();
            "
            :title="$t('SystemComponentsHierarchies.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-systemComponentsHierarchyDescriptionEn`"
            :errors="errors_systemComponentsHierarchyDescriptionEn"
            :value="
              systemComponentsHierarchy.systemComponentsHierarchyDescriptionEn
            "
            v-on:changeValue="
              systemComponentsHierarchy.systemComponentsHierarchyDescriptionEn =
                $event;
              $v.systemComponentsHierarchy.systemComponentsHierarchyDescriptionEn.$touch();
            "
            :title="$t('SystemComponentsHierarchies.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-systemComponentsHierarchyDescriptionUnd`"
            :value="
              systemComponentsHierarchy.systemComponentsHierarchyDescriptionUnd
            "
            v-on:changeValue="
              systemComponentsHierarchy.systemComponentsHierarchyDescriptionUnd =
                $event
            "
            :title="$t('SystemComponentsHierarchies.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-systemComponentsHierarchyNotes`"
            :value="systemComponentsHierarchy.systemComponentsHierarchyNotes"
            v-on:changeValue="
              systemComponentsHierarchy.systemComponentsHierarchyNotes = $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <CustomSelectBox
            :className="'col-md-12'"
            :id="'systemComponents'"
            :value="''"
            :options="systemComponentOptions"
            v-on:changeValue="optionsListHandeler($event)"
            :title="$t('SystemComponents.select')"
            :imgName="'systemComponents.svg'"
          />
          <CustomSortable
            v-if="sortList.length"
            :className="'col-md-12'"
            :list="sortList"
            v-on:sortableItemRemoved="sortListHandeler($event)"
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
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomSortable from "./../../../../components/general/CustomSortable.vue";
import {
  hasSystemComponentsHierarchyPlaceDeleteImage,
  hasSystemComponentsHierarchyEducationalCategoryDeleteImage,
  hasSystemComponentsHierarchyGeographicalDistributionDeleteImage,
  hasSystemComponentsHierarchyJobGradeDeleteImage,
  hasSystemComponentsHierarchyStoreItemDeleteImage,
  hasSystemComponentsHierarchyBodyPartDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getSystemComponentsDialog } from "./../../../../utils/dialogsOfApi";
import SystemComponents from "./../../../../models/systemConfiguration/systemComponents/SystemComponents";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    PreLoader,
    CustomInput,
    CustomSelectBox,
    TextArea,
    CustomSortable,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      systemComponents: new SystemComponents(this.modelName),
      systemComponentOptions: [],
      sortList: [],
    };
  },
  props: {
    systemComponentsHierarchy: {
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
    systemTypeToken: {
      type: String,
      default: "",
    },
  },
  watch: {
    "systemComponentsHierarchy.systemComponentsHierarchyToken": function () {
      if (this.systemComponentsHierarchy.systemComponentTokenList.length) {
        this.setSortListAtUpdate();
      }
    },
  },
  validations: {
    systemComponentsHierarchy: {
      systemComponentsHierarchyNameAr: { required, isValidNameAr },
      systemComponentsHierarchyNameEn: { required, isValidNameEn },
      systemComponentsHierarchyDescriptionAr: { isValidTextAr },
      systemComponentsHierarchyDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_systemComponentsHierarchyNameAr() {
      let errors = [];
      if (
        this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameAr.$error
      ) {
        if (
          !this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameAr
            .required &&
          !this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameEn
            .required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameAr
            .required &&
          !this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameAr
            .isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_systemComponentsHierarchyNameEn() {
      let errors = [];
      if (
        this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameEn.$error
      ) {
        if (
          !this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameAr
            .required &&
          !this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameEn
            .required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameEn
            .required &&
          !this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameEn
            .isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_systemComponentsHierarchyDescriptionAr() {
      let errors = [];
      if (
        this.$v.systemComponentsHierarchy.systemComponentsHierarchyDescriptionAr
          .$error
      ) {
        if (
          !this.$v.systemComponentsHierarchy
            .systemComponentsHierarchyDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_systemComponentsHierarchyDescriptionEn() {
      let errors = [];
      if (
        this.$v.systemComponentsHierarchy.systemComponentsHierarchyDescriptionEn
          .$error
      ) {
        if (
          !this.$v.systemComponentsHierarchy
            .systemComponentsHierarchyDescriptionEn.isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasSystemComponentsHierarchyDeleteImage() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentsHierarchyPlace":
          status = checkPrivilege(
            hasSystemComponentsHierarchyPlaceDeleteImage()
          );
          break;
        case "systemComponentsHierarchyEducationalCategory":
          status = checkPrivilege(
            hasSystemComponentsHierarchyEducationalCategoryDeleteImage()
          );
          break;
        case "systemComponentsHierarchyGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentsHierarchyGeographicalDistributionDeleteImage()
          );
          break;
        case "systemComponentsHierarchyJobGrade":
          status = checkPrivilege(
            hasSystemComponentsHierarchyJobGradeDeleteImage()
          );
          break;
        case "systemComponentsHierarchyStoreItem":
          status = checkPrivilege(
            hasSystemComponentsHierarchyStoreItemDeleteImage()
          );
          break;
        case "systemComponentsHierarchyBodyPart":
          status = checkPrivilege(
            hasSystemComponentsHierarchyBodyPartDeleteImage()
          );
          break;
      }
      return status;
    },
  },
  methods: {
    async getSystemComponentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: this.modelName,
        systemTypeToken: this.systemTypeToken,
      };
      this.systemComponentOptions = await getSystemComponentsDialog(params);
      this.isLoading = false;
    },
    getSystemComponentByToken(token) {
      return this.systemComponentOptions.find(
        (element) => element.value == token
      );
    },
    optionsListHandeler(token) {
      let item = "";
      if (token) {
        item = this.getSystemComponentByToken(token);
        this.systemComponentOptions = this.systemComponentOptions.filter(
          (el) => el.value !== token
        );
      }
      if (item) {
        this.sortList.push(item);
      }
    },
    sortListHandeler(item) {
      this.systemComponentOptions.push(item);
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameAr
          .required &&
          this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameAr
            .isValidNameAr) ||
          (this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameEn
            .required &&
            this.$v.systemComponentsHierarchy.systemComponentsHierarchyNameEn
              .isValidNameEn)) &&
        this.$v.systemComponentsHierarchy.systemComponentsHierarchyDescriptionAr
          .isValidTextAr &&
        this.$v.systemComponentsHierarchy.systemComponentsHierarchyDescriptionEn
          .isValidTextEn
      ) {
        if (this.sortList.length) {
          let systemComponentTokenList = this.sortList.map((x) => x.value);
          this.systemComponentsHierarchy.systemComponentTokenList =
            systemComponentTokenList;
        }
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    fullPathFileFromServer,

    setSortListAtUpdate() {
      if (this.submitName == this.$t("edit")) {
        this.systemComponentsHierarchy.systemComponentTokenList.forEach(
          (token) => {
            this.sortList.push(this.getSystemComponentByToken(token));
            this.systemComponentOptions = this.systemComponentOptions.filter(
              (el) => el.value !== token
            );
          }
        );
      }
    },
  },
  async created() {
    await this.getSystemComponentsDialog();
    this.setSortListAtUpdate();
  },
};
</script>

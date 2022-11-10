<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="priceList.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              priceList.priceListImagePath,
              priceList.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !priceList.priceListImageIsDefault &&
            checkPrivilege(hasPriceListDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <BaseTree
            :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
            :treeModel="getTreeModel"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="true"
          />

          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-priceListPackagePriceForClient`"
            :value="priceList.priceListPackagePriceForClient"
            v-on:changeValue="priceList.priceListPackagePriceForClient = $event"
            :title="$t('PriceLists.packagePriceForClient')"
            :imgName="'money.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-priceListPackagePriceInOfferForClient`"
            :value="priceList.priceListPackagePriceInOfferForClient"
            v-on:changeValue="
              priceList.priceListPackagePriceInOfferForClient = $event
            "
            :title="$t('PriceLists.packagePriceInOfferForClient')"
            :imgName="'offers.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-priceListSessionPriceForClient`"
            :value="priceList.priceListSessionPriceForClient"
            v-on:changeValue="priceList.priceListSessionPriceForClient = $event"
            :title="$t('PriceLists.sessionPriceForClient')"
            :imgName="'money.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-priceListSessionPriceInOfferForClient`"
            :value="priceList.priceListSessionPriceInOfferForClient"
            v-on:changeValue="
              priceList.priceListSessionPriceInOfferForClient = $event
            "
            :title="$t('PriceLists.sessionPriceInOfferForClient')"
            :imgName="'offers.svg'"
          />
          <!-- <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-priceListHourPriceForClient`"
            :value="priceList.priceListHourPriceForClient"
            v-on:changeValue="priceList.priceListHourPriceForClient = $event"
            :title="$t('PriceLists.hourPriceForClient')"
            :imgName="'money.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-priceListHourPriceInOfferForClient`"
            :value="priceList.priceListHourPriceInOfferForClient"
            v-on:changeValue="
              priceList.priceListHourPriceInOfferForClient = $event
            "
            :title="$t('PriceLists.hourPriceInOfferForClient')"
            :imgName="'offers.svg'"
          /> -->
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`showStatusToken`"
            :value="priceList.showStatusToken"
            :options="showStatusTokenOptions"
            v-on:changeValue="priceList.showStatusToken = $event"
            :title="$t('general.showStatus')"
            :imgName="'type.svg'"
          />
          <CustomCheckbox
            :className="'col-md-6'"
            :value="priceList.priceListInOfferStatus"
            v-on:changeValue="priceList.priceListInOfferStatus = $event"
            :title="$t('general.offerActiveStatus')"
            :imgName="'type.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="priceList.fullCode"
            v-on:changeValue="priceList.fullCode = $event"
            :title="$t('PriceLists.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-priceListNameAr`"
            :errors="errors_priceListNameAr"
            :value="priceList.priceListNameAr"
            v-on:changeValue="
              priceList.priceListNameAr = $event;
              $v.priceList.priceListNameAr.$touch();
            "
            :title="$t('PriceLists.nameAr')"
            :imgName="'PriceLists.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-priceListNameEn`"
            :errors="errors_priceListNameEn"
            :value="priceList.priceListNameEn"
            v-on:changeValue="
              priceList.priceListNameEn = $event;
              $v.priceList.priceListNameEn.$touch();
            "
            :title="$t('PriceLists.nameEn')"
            :imgName="'PriceLists.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-priceListNameUnd`"
            :value="priceList.priceListNameUnd"
            v-on:changeValue="priceList.priceListNameUnd = $event"
            :title="$t('PriceLists.nameUnd')"
            :imgName="'PriceLists.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceListDescriptionAr`"
            :errors="errors_priceListDescriptionAr"
            :value="priceList.priceListDescriptionAr"
            v-on:changeValue="
              priceList.priceListDescriptionAr = $event;
              $v.priceList.priceListDescriptionAr.$touch();
            "
            :title="$t('PriceLists.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceListDescriptionEn`"
            :errors="errors_priceListDescriptionEn"
            :value="priceList.priceListDescriptionEn"
            v-on:changeValue="
              priceList.priceListDescriptionEn = $event;
              $v.priceList.priceListDescriptionEn.$touch();
            "
            :title="$t('PriceLists.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceListDescriptionUnd`"
            :value="priceList.priceListDescriptionUnd"
            v-on:changeValue="priceList.priceListDescriptionUnd = $event"
            :title="$t('PriceLists.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceListNotes`"
            :value="priceList.priceListNotes"
            v-on:changeValue="priceList.priceListNotes = $event"
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
import CustomInputFloat from "./../../../../../components/general/CustomInputFloat.vue";
import CustomCheckbox from "./../../../../../components/general/CustomCheckbox.vue";
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import BaseTree from "./../../../../../components/general/BaseTree.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasPriceListDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getDialogOfShowType } from "./../../../../../utils/dialogsOfConstantsLists";
import { SYSTEM_TYPE } from "./../../../../../utils/constantLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomInputFloat,
    CustomCheckbox,
    CustomSelectBox,
    BaseTree,
    TextArea,
  },
  data() {
    return {
      showStatusTokenOptions: getDialogOfShowType(),
    };
  },
  props: {
    priceList: {
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
    priceList: {
      priceListNameAr: { required, isValidNameAr },
      priceListNameEn: { required, isValidNameEn },
      priceListDescriptionAr: { isValidTextAr },
      priceListDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.priceList.educationalCategoryInfoData
            .systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken:
          this.priceList.educationalCategoryInfoData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: this.priceList.educationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.select"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
    errors_priceListNameAr() {
      let errors = [];
      if (this.$v.priceList.priceListNameAr.$error) {
        if (
          !this.$v.priceList.priceListNameAr.required &&
          !this.$v.priceList.priceListNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.priceList.priceListNameAr.required &&
          !this.$v.priceList.priceListNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_priceListNameEn() {
      let errors = [];
      if (this.$v.priceList.priceListNameEn.$error) {
        if (
          !this.$v.priceList.priceListNameAr.required &&
          !this.$v.priceList.priceListNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.priceList.priceListNameEn.required &&
          !this.$v.priceList.priceListNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_priceListDescriptionAr() {
      let errors = [];
      if (this.$v.priceList.priceListDescriptionAr.$error) {
        if (!this.$v.priceList.priceListDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_priceListDescriptionEn() {
      let errors = [];
      if (this.$v.priceList.priceListDescriptionEn.$error) {
        if (!this.$v.priceList.priceListDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    baseTreeChanged(data) {
      this.priceList.educationalCategoryInfoData.systemComponentHierarchyToken =
        data.hierarchyToken;
      this.priceList.educationalCategoryInfoData.systemComponentToken =
        data.componentToken;
      this.priceList.educationalCategoryToken = data.parentToken;
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.priceList.priceListNameAr.required &&
          this.$v.priceList.priceListNameAr.isValidNameAr) ||
          (this.$v.priceList.priceListNameEn.required &&
            this.$v.priceList.priceListNameEn.isValidNameEn)) &&
        this.$v.priceList.priceListDescriptionAr.isValidTextAr &&
        this.$v.priceList.priceListDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasPriceListDeleteImage,
    fullPathFileFromServer,
  },
};
</script>

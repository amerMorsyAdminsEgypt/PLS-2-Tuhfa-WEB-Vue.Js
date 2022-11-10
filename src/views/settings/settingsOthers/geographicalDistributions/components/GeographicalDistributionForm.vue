<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="geographicalDistribution.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              geographicalDistribution.geographicalDistributionImagePath,
              geographicalDistribution.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !geographicalDistribution.geographicalDistributionImageIsDefault &&
            checkPrivilege(hasGeographicalDistributionDeleteImage())
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
            :filterParentDirect="false"
            :enableEdit="isEditting"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="geographicalDistribution.fullCode"
            v-on:changeValue="geographicalDistribution.fullCode = $event"
            :title="$t('GeographicalDistributions.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-geographicalDistributionNameAr`"
            :errors="errors_geographicalDistributionNameAr"
            :value="geographicalDistribution.geographicalDistributionNameAr"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionNameAr = $event;
              $v.geographicalDistribution.geographicalDistributionNameAr.$touch();
            "
            :title="$t('GeographicalDistributions.nameAr')"
            :imgName="'geographicalDistributions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-geographicalDistributionNameEn`"
            :errors="errors_geographicalDistributionNameEn"
            :value="geographicalDistribution.geographicalDistributionNameEn"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionNameEn = $event;
              $v.geographicalDistribution.geographicalDistributionNameEn.$touch();
            "
            :title="$t('GeographicalDistributions.nameEn')"
            :imgName="'geographicalDistributions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-geographicalDistributionNameUnd`"
            :value="geographicalDistribution.geographicalDistributionNameUnd"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionNameUnd = $event
            "
            :title="$t('GeographicalDistributions.nameUnd')"
            :imgName="'geographicalDistributions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionCountryCodeName'"
            :value="
              geographicalDistribution.geographicalDistributionCountryCodeName
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionCountryCodeName =
                $event
            "
            :title="$t('GeographicalDistributions.countryCodeName')"
            :imgName="'geographicalDistributions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionCountryCode'"
            :value="
              geographicalDistribution.geographicalDistributionCountryCode
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionCountryCode =
                $event
            "
            :title="$t('GeographicalDistributions.countryCode')"
            :imgName="'number.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionMapLink'"
            :value="geographicalDistribution.geographicalDistributionMapLink"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionMapLink = $event
            "
            :title="$t('GeographicalDistributions.mapLink')"
            :imgName="'location.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionLatitude'"
            :value="geographicalDistribution.geographicalDistributionLatitude"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionLatitude = $event
            "
            :title="$t('GeographicalDistributions.latitude')"
            :imgName="'latitude.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionEndLatitude'"
            :value="
              geographicalDistribution.geographicalDistributionEndLatitude
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionEndLatitude =
                $event
            "
            :title="$t('GeographicalDistributions.endLatitude')"
            :imgName="'latitude.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionlongitude'"
            :value="geographicalDistribution.geographicalDistributionlongitude"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionlongitude =
                $event
            "
            :title="$t('GeographicalDistributions.longitude')"
            :imgName="'longitude.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionEndlongitude'"
            :value="
              geographicalDistribution.geographicalDistributionEndlongitude
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionEndlongitude =
                $event
            "
            :title="$t('GeographicalDistributions.endLongitude')"
            :imgName="'longitude.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-geographicalDistributionDescriptionAr`"
            :errors="errors_geographicalDistributionDescriptionAr"
            :value="
              geographicalDistribution.geographicalDistributionDescriptionAr
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionDescriptionAr =
                $event;
              $v.geographicalDistribution.geographicalDistributionDescriptionAr.$touch();
            "
            :title="$t('GeographicalDistributions.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-geographicalDistributionDescriptionEn`"
            :errors="errors_geographicalDistributionDescriptionEn"
            :value="
              geographicalDistribution.geographicalDistributionDescriptionEn
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionDescriptionEn =
                $event;
              $v.geographicalDistribution.geographicalDistributionDescriptionEn.$touch();
            "
            :title="$t('GeographicalDistributions.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-geographicalDistributionDescriptionUnd`"
            :value="
              geographicalDistribution.geographicalDistributionDescriptionUnd
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionDescriptionUnd =
                $event
            "
            :title="$t('GeographicalDistributions.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-geographicalDistributionNotes`"
            :value="geographicalDistribution.geographicalDistributionNotes"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionNotes = $event
            "
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
import { SYSTEM_TYPE } from "./../../../../../utils/constantLists";
import CustomFileInput from "./../../../../../components/general/CustomFileInput.vue";
import BaseTree from "./../../../../../components/general/BaseTree.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasGeographicalDistributionDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    BaseTree,
    CustomInput,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    geographicalDistribution: {
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
    geographicalDistribution: {
      geographicalDistributionNameAr: { required, isValidNameAr },
      geographicalDistributionNameEn: { required, isValidNameEn },
      geographicalDistributionDescriptionAr: { isValidTextAr },
      geographicalDistributionDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.GeographicalDistribution;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.geographicalDistribution.systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectGeographicalDistribution"
        ),
        systemComponentToken:
          this.geographicalDistribution.systemComponentToken,
        componentTitle: this.$t(
          "SystemComponents.selectGeographicalDistribution"
        ),
        parentToken:
          this.geographicalDistribution.parentGeographicalDistributionToken,
        parentTitle: this.$t("GeographicalDistributions.selectParent"),
        parentImgName: "geographicalDistributions.svg",
      };
      return treeModelObject;
    },
    isEditting() {
      return this.submitName == this.$t("edit") ? true : false;
    },
    errors_geographicalDistributionNameAr() {
      let errors = [];
      if (
        this.$v.geographicalDistribution.geographicalDistributionNameAr.$error
      ) {
        if (
          !this.$v.geographicalDistribution.geographicalDistributionNameAr
            .required &&
          !this.$v.geographicalDistribution.geographicalDistributionNameEn
            .required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.geographicalDistribution.geographicalDistributionNameAr
            .required &&
          !this.$v.geographicalDistribution.geographicalDistributionNameAr
            .isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_geographicalDistributionNameEn() {
      let errors = [];
      if (
        this.$v.geographicalDistribution.geographicalDistributionNameEn.$error
      ) {
        if (
          !this.$v.geographicalDistribution.geographicalDistributionNameAr
            .required &&
          !this.$v.geographicalDistribution.geographicalDistributionNameEn
            .required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.geographicalDistribution.geographicalDistributionNameEn
            .required &&
          !this.$v.geographicalDistribution.geographicalDistributionNameEn
            .isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_geographicalDistributionDescriptionAr() {
      let errors = [];
      if (
        this.$v.geographicalDistribution.geographicalDistributionDescriptionAr
          .$error
      ) {
        if (
          !this.$v.geographicalDistribution
            .geographicalDistributionDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_geographicalDistributionDescriptionEn() {
      let errors = [];
      if (
        this.$v.geographicalDistribution.geographicalDistributionDescriptionEn
          .$error
      ) {
        if (
          !this.$v.geographicalDistribution
            .geographicalDistributionDescriptionEn.isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    baseTreeChanged(data) {
      this.geographicalDistribution.systemComponentHierarchyToken =
        data.hierarchyToken;
      this.geographicalDistribution.systemComponentToken = data.componentToken;
      this.geographicalDistribution.parentGeographicalDistributionToken =
        data.parentToken;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.geographicalDistribution.geographicalDistributionNameAr
          .required &&
          this.$v.geographicalDistribution.geographicalDistributionNameAr
            .isValidNameAr) ||
          (this.$v.geographicalDistribution.geographicalDistributionNameEn
            .required &&
            this.$v.geographicalDistribution.geographicalDistributionNameEn
              .isValidNameEn)) &&
        this.$v.geographicalDistribution.geographicalDistributionDescriptionAr
          .isValidTextAr &&
        this.$v.geographicalDistribution.geographicalDistributionDescriptionEn
          .isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasGeographicalDistributionDeleteImage,
    fullPathFileFromServer,
  },
};
</script>

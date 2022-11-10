<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="place.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(place.placeImagePath, place.defaultImg)
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !place.placeImageIsDefault &&
            checkPrivilege(hasPrivilegeDeleteImage)
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <!-- <CustomSelectBox
            :className="'col-12'"
            :id="`${id}-placeActivityTypeToken`"
            :errors="errors_placeActivityTypeToken"
            :value="place.placeActivityTypeToken"
            :options="placeActivityTypeTokenOptions"
            v-on:changeValue="
              place.placeActivityTypeToken = $event;
              $v.place.placeActivityTypeToken.$touch();
            "
            :title="$t('Places.activityType')"
            :imgName="'activity-types.svg'"
          /> -->
          <BaseTree
            :placeTypeToken="placeTypeToken"
            :hierarchySystemTypeFilterToken="placeFilterToken"
            :treeModel="getTreeModelPlace"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="false"
            :enableEdit="isEditting"
          />
          <BaseTree
            :hierarchySystemTypeFilterToken="distributionFilterToken"
            :treeModel="getTreeModelDistribution"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="true"
            :enableEdit="isEditting"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="place.fullCode"
            v-on:changeValue="place.fullCode = $event"
            :title="$t('Places.code')"
            :imgName="'code.svg'"
          />
          <template>
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeNameAr`"
              :errors="errors_placeNameAr"
              :value="place.placeNameAr"
              v-on:changeValue="
                place.placeNameAr = $event;
                $v.place.placeNameAr.$touch();
              "
              :title="$t('Places.nameAr')"
              :imgName="'places.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeNameEn`"
              :errors="errors_placeNameEn"
              :value="place.placeNameEn"
              v-on:changeValue="
                place.placeNameEn = $event;
                $v.place.placeNameEn.$touch();
              "
              :title="$t('Places.nameEn')"
              :imgName="'places.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeNameUnd`"
              :value="place.placeNameUnd"
              v-on:changeValue="place.placeNameUnd = $event"
              :title="$t('Places.nameUnd')"
              :imgName="'places.svg'"
            />
          </template>
          <template>
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-placeDescriptionAr`"
              :errors="errors_placeDescriptionAr"
              :value="place.placeDescriptionAr"
              v-on:changeValue="
                place.placeDescriptionAr = $event;
                $v.place.placeDescriptionAr.$touch();
              "
              :title="$t('Places.descriptionAr')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-placeDescriptionEn`"
              :errors="errors_placeDescriptionEn"
              :value="place.placeDescriptionEn"
              v-on:changeValue="
                place.placeDescriptionEn = $event;
                $v.place.placeDescriptionEn.$touch();
              "
              :title="$t('Places.descriptionEn')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-placeDescriptionUnd`"
              :value="place.placeDescriptionUnd"
              v-on:changeValue="place.placeDescriptionUnd = $event"
              :title="$t('Places.descriptionUnd')"
              :imgName="'description.svg'"
            />
          </template>

          <template>
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-placeAddressAr`"
              :errors="errors_placeAddressAr"
              :value="place.placeAddressAr"
              v-on:changeValue="
                place.placeAddressAr = $event;
                $v.place.placeAddressAr.$touch();
              "
              :title="$t('Places.addressAr')"
              :imgName="'address.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-placeAddressEn`"
              :errors="errors_placeAddressEn"
              :value="place.placeAddressEn"
              v-on:changeValue="
                place.placeAddressEn = $event;
                $v.place.placeAddressEn.$touch();
              "
              :title="$t('Places.addressEn')"
              :imgName="'address.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-placeAddressUnd`"
              :value="place.placeAddressUnd"
              v-on:changeValue="place.placeAddressUnd = $event"
              :title="$t('Places.addressUnd')"
              :imgName="'address.svg'"
            />
          </template>
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-placeOpeningDateTime`"
            type="dateTime"
            :value="place.placeOpeningDateTime"
            v-on:changeValue="place.placeOpeningDateTime = $event.dateTime"
            :title="$t('Places.openingDateAndTime')"
            :language="language"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-placeMapLink`"
            :value="place.placeMapLink"
            v-on:changeValue="place.placeMapLink = $event"
            :title="$t('Places.mapLink')"
            :imgName="'location.svg'"
          />

          <!-- lat & log -->
          <template>
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-placeLatitude`"
              :value="place.placeLatitude"
              v-on:changeValue="
                place.placeLatitude = $event;
                placeCordinatesUpdated();
              "
              :title="$t('latitude')"
              :imgName="'latitude.svg'"
              :isSync="true"
              v-on:getLocation="getLatitude()"
            />

            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-placelongitude`"
              :value="place.placelongitude"
              v-on:changeValue="
                place.placelongitude = $event;
                placeCordinatesUpdated();
              "
              :title="$t('longitude')"
              :imgName="'longitude.svg'"
              :isSync="true"
              v-on:getLocation="getLongitude()"
            />
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-placeEndLatitude`"
              :value="place.placeEndLatitude"
              v-on:changeValue="
                place.placeEndLatitude = $event;
                placeCordinatesUpdated();
              "
              :title="$t('endLatitude')"
              :imgName="'latitude.svg'"
              :isSync="true"
              v-on:getLocation="getEndLatitude()"
            />
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-placeEndlongitude`"
              :value="place.placeEndlongitude"
              v-on:changeValue="
                place.placeEndlongitude = $event;
                placeCordinatesUpdated();
              "
              :title="$t('endLongitude')"
              :imgName="'longitude.svg'"
              :isSync="true"
              v-on:getLocation="getEndLongitude()"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :id="`${id}-placeDistance`"
              :value="place.placeDistance"
              :title="$t('Places.placeDistance')"
              :imgName="'number.svg'"
            />
          </template>
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-placeLocalIpAddress`"
            :value="place.placeLocalIpAddress"
            v-on:changeValue="place.placeLocalIpAddress = $event"
            :title="$t('Places.localIpAddress')"
            :imgName="'pc.svg'"
          />
          <!-- phone -->
          <template>
            <CustomPhonePicker
              :className="'col-md-4'"
              :id="`${id}-phone`"
              :countryCodeName="place.placePhone1CountryCodeName"
              :countryCode="place.placePhone1CountryCode"
              :phoneNumber="place.placePhone1"
              :title="$t('phone1')"
              :imgName="'phone.svg'"
              v-on:changeValue="setPhone1($event)"
            />
            <CustomCheckbox
              :className="'col-md-2'"
              :value="place.placePhone1WhatsAppStatus"
              v-on:changeValue="place.placePhone1WhatsAppStatus = $event"
              :title="$t('Places.whatsAppStatus')"
            />
            <CustomPhonePicker
              :className="'col-md-4'"
              :id="`${id}-phone`"
              :countryCodeName="place.placePhone2CountryCodeName"
              :countryCode="place.placePhone2CountryCode"
              :phoneNumber="place.placePhone2"
              :title="$t('phone2')"
              :imgName="'phone.svg'"
              v-on:changeValue="setPhone2($event)"
            />
            <CustomCheckbox
              :className="'col-md-2'"
              :value="place.placePhone2WhatsAppStatus"
              v-on:changeValue="place.placePhone2WhatsAppStatus = $event"
              :title="$t('Places.whatsAppStatus')"
            />
            <CustomPhonePicker
              :className="'col-md-4'"
              :id="`${id}-phone`"
              :countryCodeName="place.placePhone3CountryCodeName"
              :countryCode="place.placePhone3CountryCode"
              :phoneNumber="place.placePhone3"
              :title="$t('phone3')"
              :imgName="'phone.svg'"
              v-on:changeValue="setPhone3($event)"
            />
            <CustomCheckbox
              :className="'col-md-2'"
              :value="place.placePhone3WhatsAppStatus"
              v-on:changeValue="place.placePhone3WhatsAppStatus = $event"
              :title="$t('Places.whatsAppStatus')"
            />
            <CustomPhonePicker
              :className="'col-md-4'"
              :id="`${id}-phone`"
              :countryCodeName="place.placePhone4CountryCodeName"
              :countryCode="place.placePhone4CountryCode"
              :phoneNumber="place.placePhone4"
              :title="$t('phone4')"
              :imgName="'phone.svg'"
              v-on:changeValue="setPhone4($event)"
            />
            <CustomCheckbox
              :className="'col-md-2'"
              :value="place.placePhone4WhatsAppStatus"
              v-on:changeValue="place.placePhone4WhatsAppStatus = $event"
              :title="$t('Places.whatsAppStatus')"
            />
          </template>

          <template>
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeEmail`"
              :errors="errors_placeEmail"
              :value="place.placeEmail"
              v-on:changeValue="
                place.placeEmail = $event;
                $v.place.placeEmail.$touch();
              "
              :title="$t('email')"
              :imgName="'email.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeFaceBookLink`"
              :value="place.placeFaceBookLink"
              v-on:changeValue="place.placeFaceBookLink = $event"
              :title="$t('Places.faceBookLink')"
              :imgName="'facebook.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeTwitterLink`"
              :value="place.placeTwitterLink"
              v-on:changeValue="place.placeTwitterLink = $event"
              :title="$t('Places.twitterLink')"
              :imgName="'twitter.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeInstgramLink`"
              :value="place.placeInstgramLink"
              v-on:changeValue="place.placeInstgramLink = $event"
              :title="$t('Places.instagramLink')"
              :imgName="'instagram.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeYouTubeLink`"
              :value="place.placeYouTubeLink"
              v-on:changeValue="place.placeYouTubeLink = $event"
              :title="$t('Places.youTubeLink')"
              :imgName="'youtube.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeWebSiteLink`"
              :value="place.placeWebSiteLink"
              v-on:changeValue="place.placeWebSiteLink = $event"
              :title="$t('Places.webSiteLink')"
              :imgName="'places.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeFaxNumber`"
              :value="place.placeFaxNumber"
              v-on:changeValue="place.placeFaxNumber = $event"
              :title="$t('Places.faxNumber')"
              :imgName="'number.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placeTaxNumber`"
              :value="place.placeTaxNumber"
              v-on:changeValue="place.placeTaxNumber = $event"
              :title="$t('Places.taxNumber')"
              :imgName="'number.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placePostOfficeNameAr`"
              :errors="errors_placePostOfficeNameAr"
              :value="place.placePostOfficeNameAr"
              v-on:changeValue="
                place.placePostOfficeNameAr = $event;
                $v.place.placePostOfficeNameAr.$touch();
              "
              :title="$t('Places.postOfficeNameAr')"
              :imgName="'places.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placePostOfficeNameEn`"
              :errors="errors_placePostOfficeNameEn"
              :value="place.placePostOfficeNameEn"
              v-on:changeValue="
                place.placePostOfficeNameEn = $event;
                $v.place.placePostOfficeNameEn.$touch();
              "
              :title="$t('Places.postOfficeNameEn')"
              :imgName="'places.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placePostOfficeNameUnd`"
              :value="place.placePostOfficeNameUnd"
              v-on:changeValue="place.placePostOfficeNameUnd = $event"
              :title="$t('Places.postOfficeNameUnd')"
              :imgName="'places.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-placePostalCode`"
              :value="place.placePostalCode"
              v-on:changeValue="place.placePostalCode = $event"
              :title="$t('Places.postalCode')"
              :imgName="'number.svg'"
            />
          </template>

          <TextArea
            :className="'col-md-12'"
            :id="`${id}-placeNotes`"
            :value="place.placeNotes"
            v-on:changeValue="place.placeNotes = $event"
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
import { mapGetters } from "vuex";
import PreLoader from "./../../../components/general/PreLoader.vue";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import CustomInputFloat from "./../../../components/general/CustomInputFloat.vue";
import CustomCheckbox from "./../../../components/general/CustomCheckbox.vue";
// import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import CustomPhonePicker from "./../../../components/general/CustomPhonePicker.vue";
import CustomFileInput from "./../../../components/general/CustomFileInput.vue";
import TextArea from "./../../../components/general/TextArea.vue";
import DateTimePicker from "./../../../components/general/DateTimePicker.vue";
import BaseTree from "./../../../components/general/BaseTree.vue";
import {
  hasPlaceMasterAdminDeleteImage,
  hasPlaceEmployeeDeleteImage,
  hasPlaceStudentDeleteImage,
  hasPlaceClientDeleteImage,
  hasPlaceSupplierDeleteImage,
  hasPlaceParentDeleteImage,
  hasPlaceOtherDeleteImage,
} from "./../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../utils/functions";
import generalMixin from "./../../../utils/generalMixin";
// import Places from "./../../../models/places/Places";
import { getLanguage } from "./../../../utils/functions";
import { SYSTEM_TYPE } from "./../../../utils/constantLists";
import { getDialogOfPlaceActivityType } from "./../../../utils/dialogsOfConstantsLists";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "@/utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
  isValidEmail,
} from "@/utils/validationHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    DataLabelGroup,
    CustomInput,
    CustomInputFloat,
    CustomCheckbox,
    // CustomSelectBox,
    CustomPhonePicker,
    CustomFileInput,
    TextArea,
    DateTimePicker,
    BaseTree,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: getLanguage(),
      placeActivityTypeTokenOptions: getDialogOfPlaceActivityType() || [],
      p1: {},
      p2: {},
    };
  },
  watch: {
    p1: function (val) {
      let isPositionOneHasValue = (val.lat && val.lng) || false;
      let isPositionTwoHasValue = (this.p2.lat && this.p2.lng) || false;
      if (isPositionOneHasValue && isPositionTwoHasValue) {
        this.calculatePlaceDistance();
      } else {
        this.setPlaceDistance(0);
      }
    },
    p2: function (val) {
      let isPositionTwoHasValue = (val.lat && val.lng) || false;
      let isPositionOneHasValue = (this.p1.lat && this.p1.lng) || false;
      if (isPositionOneHasValue && isPositionTwoHasValue) {
        this.calculatePlaceDistance();
      } else {
        this.setPlaceDistance(0);
      }
    },
  },
  props: {
    place: {
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
    placeTypeToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
  },
  validations: {
    place: {
      // placeActivityTypeToken: { required },
      placeNameAr: { required, isValidNameAr },
      placeNameEn: { required, isValidNameEn },
      placeDescriptionAr: { isValidTextAr },
      placeDescriptionEn: { isValidTextEn },
      placeAddressAr: { isValidTextAr },
      placeAddressEn: { isValidTextEn },
      placeEmail: { isValidEmail },
      placePostOfficeNameAr: { isValidTextAr },
      placePostOfficeNameEn: { isValidTextEn },
    },
  },
  computed: {
    ...mapGetters(["userAuthorizeToken", "constantsListsData"]),

    distributionFilterToken() {
      return SYSTEM_TYPE.GeographicalDistribution;
    },
    placeFilterToken() {
      return SYSTEM_TYPE.Place;
    },
    isEditting() {
      return this.submitName == this.$t("edit") ? true : false;
    },
    getTreeModelDistribution() {
      let treeModelObjectPlace = {
        systemComponentHierarchyToken: this.place.geographicalDistributionData
          ? this.place.geographicalDistributionData
              .systemComponentHierarchyToken
          : "",
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectGeographicalDistribution"
        ),
        systemComponentToken: this.place.geographicalDistributionData
          ? this.place.geographicalDistributionData.systemComponentToken
          : "",
        componentTitle: this.$t(
          "SystemComponents.selectGeographicalDistribution"
        ),
        parentToken: this.place.geographicalDistributionToken,
        parentTitle: this.$t("GeographicalDistributions.selectParent"),
        parentImgName: "geographicalDistributions.svg",
      };
      return treeModelObjectPlace;
    },
    getTreeModelPlace() {
      let treeModelObject = {
        systemComponentHierarchyToken: this.place.systemComponentHierarchyToken,
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectPlace"),
        systemComponentToken: this.place.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectPlace"),
        parentToken: this.place.parentPlaceToken,
        parentTitle: this.$t("Places.selectParent"),
        parentImgName: "places.svg",
      };
      return treeModelObject;
    },

    // validations
    // errors_placeActivityTypeToken() {
    //   let errors = [];
    //   if (this.$v.place.placeActivityTypeToken.$error) {
    //     if (!this.$v.place.placeActivityTypeToken.required)
    //       errors.push(this.$t("validation.fieldIsRequired"));
    //   }
    //   return errors;
    // },
    errors_placeNameAr() {
      let errors = [];
      if (this.$v.place.placeNameAr.$error) {
        if (
          !this.$v.place.placeNameAr.required &&
          !this.$v.place.placeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.place.placeNameAr.required &&
          !this.$v.place.placeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_placeNameEn() {
      let errors = [];
      if (this.$v.place.placeNameEn.$error) {
        if (
          !this.$v.place.placeNameAr.required &&
          !this.$v.place.placeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.place.placeNameEn.required &&
          !this.$v.place.placeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_placeDescriptionAr() {
      let errors = [];
      if (this.$v.place.placeDescriptionAr.$error) {
        if (!this.$v.place.placeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_placeDescriptionEn() {
      let errors = [];
      if (this.$v.place.placeDescriptionEn.$error) {
        if (!this.$v.place.placeDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    errors_placeAddressAr() {
      let errors = [];
      if (this.$v.place.placeAddressAr.$error) {
        if (!this.$v.place.placeAddressAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_placeAddressEn() {
      let errors = [];
      if (this.$v.place.placeAddressEn.$error) {
        if (!this.$v.place.placeAddressEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    errors_placeEmail() {
      let errors = [];
      if (this.$v.place.placeEmail.$error) {
        if (!this.$v.place.placeEmail.isValidEmail)
          errors.push(this.$t("validation.fieldMustBeEmail"));
      }
      return errors;
    },
    errors_placePostOfficeNameAr() {
      let errors = [];
      if (this.$v.place.placePostOfficeNameAr.$error) {
        if (!this.$v.place.placePostOfficeNameAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_placePostOfficeNameEn() {
      let errors = [];
      if (this.$v.place.placePostOfficeNameEn.$error) {
        if (!this.$v.place.placePostOfficeNameEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasPrivilegeDeleteImage() {
      let status = false;
      switch (this.modelName) {
        case "placeMasterAdmins":
          status = checkPrivilege(hasPlaceMasterAdminDeleteImage());
          break;
        case "placeEmployees":
          status = checkPrivilege(hasPlaceEmployeeDeleteImage());
          break;
        case "placeStudents":
          status = checkPrivilege(hasPlaceStudentDeleteImage());
          break;
        case "placeClients":
          status = checkPrivilege(hasPlaceClientDeleteImage());
          break;
        case "placeSuppliers":
          status = checkPrivilege(hasPlaceSupplierDeleteImage());
          break;
        case "placeParents":
          status = checkPrivilege(hasPlaceParentDeleteImage());
          break;
        case "placeOthers":
          status = checkPrivilege(hasPlaceOtherDeleteImage());
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
        ((this.$v.place.placeNameAr.required &&
          this.$v.place.placeNameAr.isValidNameAr) ||
          (this.$v.place.placeNameEn.required &&
            this.$v.place.placeNameEn.isValidNameEn)) &&
        this.$v.place.placeDescriptionAr.isValidTextAr &&
        this.$v.place.placeDescriptionEn.isValidTextEn &&
        this.$v.place.placeAddressAr.isValidTextAr &&
        this.$v.place.placeAddressEn.isValidTextEn &&
        this.$v.place.placeEmail.isValidEmail &&
        this.$v.place.placePostOfficeNameAr.isValidTextAr &&
        this.$v.place.placePostOfficeNameEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    baseTreeChanged(data) {
      if (data.systemTypeToken == SYSTEM_TYPE.Place) {
        this.place.systemComponentHierarchyToken = data.hierarchyToken;
        this.place.systemComponentToken = data.componentToken;
        this.place.parentPlaceToken = data.parentToken;
      }
      if (data.systemTypeToken == SYSTEM_TYPE.GeographicalDistribution) {
        this.place.geographicalDistributionData.systemComponentHierarchyToken =
          data.hierarchyToken;
        this.place.geographicalDistributionData.systemComponentToken =
          data.componentToken;
        this.place.geographicalDistributionToken = data.parentToken;
      }
    },
    setPhone1(data) {
      this.place.placePhone1 = data.phoneNumber;
      this.place.placePhone1CountryCodeName = data.countryCodeName;
      this.place.placePhone1CountryCode = data.countryCode;
      this.place.placePhone1WithCC = data.CCWithCCName;
    },
    setPhone2(data) {
      this.place.placePhone2 = data.phoneNumber;
      this.place.placePhone2CountryCodeName = data.countryCodeName;
      this.place.placePhone2CountryCode = data.countryCode;
      this.place.placePhone2WithCC = data.CCWithCCName;
    },
    setPhone3(data) {
      this.place.placePhone3 = data.phoneNumber;
      this.place.placePhone3CountryCodeName = data.countryCodeName;
      this.place.placePhone3CountryCode = data.countryCode;
      this.place.placePhone3WithCC = data.CCWithCCName;
    },
    setPhone4(data) {
      this.place.placePhone4 = data.phoneNumber;
      this.place.placePhone4CountryCodeName = data.countryCodeName;
      this.place.placePhone4CountryCode = data.countryCode;
      this.place.placePhone4WithCC = data.CCWithCCName;
    },
    getLatitude() {
      this.getLocation("setLatitude");
    },
    getLongitude() {
      this.getLocation("setLongitude");
    },
    getEndLatitude() {
      this.getLocation("setEndLatitude");
    },
    getEndLongitude() {
      this.getLocation("setEndLongitude");
    },
    getLocation(setter) {
      try {
        navigator.geolocation.getCurrentPosition(this[setter]);
      } catch (e) {
        console.log(e);
      }
    },
    setLatitude(position) {
      this.place.placeLatitude = position.coords.latitude;
      this.placeCordinatesUpdated();
    },
    setLongitude(position) {
      this.place.placelongitude = position.coords.longitude;
      this.placeCordinatesUpdated();
    },
    setEndLatitude(position) {
      this.place.placeEndLatitude = position.coords.latitude;
      this.placeCordinatesUpdated();
    },
    setEndLongitude(position) {
      this.place.placeEndlongitude = position.coords.longitude;
      this.placeCordinatesUpdated();
    },
    setPlaceDistance(val) {
      this.place.placeDistance = val;
    },
    placeCordinatesUpdated() {
      let p1 = {
        lat: this.place.placeLatitude,
        lng: this.place.placelongitude,
      };
      let p2 = {
        lat: this.place.placeEndLatitude,
        lng: this.place.placeEndlongitude,
      };
      this.p1 = p1;
      this.p2 = p2;
    },

    getDistance(p1, p2) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = this.rad(p2.lat - p1.lat);
      var dLong = this.rad(p2.lng - p1.lng);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.rad(p1.lat)) *
          Math.cos(this.rad(p2.lat)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in meter
    },
    rad(x) {
      return (x * Math.PI) / 180;
    },
    calculatePlaceDistance() {
      let dis = this.getDistance(this.p1, this.p2);
      this.setPlaceDistance(dis.toFixed(2));
    },

    fullPathFileFromServer,
    bottomSheetScrollToTop,
    checkPrivilege,
  },
  async created() {},
};
</script>

<style lang="scss"></style>

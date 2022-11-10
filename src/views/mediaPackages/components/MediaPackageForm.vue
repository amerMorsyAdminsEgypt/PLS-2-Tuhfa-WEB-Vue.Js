<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row item-no-p">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="mediaPackage.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              mediaPackage.mediaPackageImagePath,
              mediaPackage.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !mediaPackage.mediaPackageImageIsDefault &&
            checkPrivilege(hasMediaPackageDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card my-card-item-no-p">
        <div class="row item-no-p">
          <!-- mainData -->
          <template>
            <div class="container-collapse col-12">
              <b-button
                v-b-toggle="`${id}-mainData`"
                class="btn btn-lg btn-collapse collapse-data"
              >
                {{ $t("MediaPackages.mainData") }}
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </b-button>
              <b-collapse :id="`${id}-mainData`" v-model="mainDataVisible">
                <div class="row item-no-p">
                  <CustomInput
                    :className="'col-md-6'"
                    :id="`${id}-fullCode`"
                    :value="mediaPackage.fullCode"
                    v-on:changeValue="mediaPackage.fullCode = $event"
                    :title="$t('MediaPackages.code')"
                    :imgName="'code.svg'"
                  />
                  <CustomInput
                    :className="'col-md-6'"
                    :id="`${id}-mediaPackageNameAr`"
                    :errors="errors_mediaPackageNameAr"
                    :value="mediaPackage.mediaPackageNameAr"
                    v-on:changeValue="
                      mediaPackage.mediaPackageNameAr = $event;
                      $v.mediaPackage.mediaPackageNameAr.$touch();
                    "
                    :title="$t('MediaPackages.nameAr')"
                    :imgName="'mediaPackages.svg'"
                  />
                  <CustomInput
                    :className="'col-md-6'"
                    :id="`${id}-mediaPackageNameEn`"
                    :errors="errors_mediaPackageNameEn"
                    :value="mediaPackage.mediaPackageNameEn"
                    v-on:changeValue="
                      mediaPackage.mediaPackageNameEn = $event;
                      $v.mediaPackage.mediaPackageNameEn.$touch();
                    "
                    :title="$t('MediaPackages.nameEn')"
                    :imgName="'mediaPackages.svg'"
                  />
                  <CustomInput
                    :className="'col-md-6'"
                    :id="`${id}-mediaPackageNameUnd`"
                    :value="mediaPackage.mediaPackageNameUnd"
                    v-on:changeValue="mediaPackage.mediaPackageNameUnd = $event"
                    :title="$t('MediaPackages.nameUnd')"
                    :imgName="'mediaPackages.svg'"
                  />
                  <TextArea
                    :className="'col-md-6'"
                    :id="`${id}-mediaPackageDescriptionAr`"
                    :errors="errors_mediaPackageDescriptionAr"
                    :value="mediaPackage.mediaPackageDescriptionAr"
                    v-on:changeValue="
                      mediaPackage.mediaPackageDescriptionAr = $event;
                      $v.mediaPackage.mediaPackageDescriptionAr.$touch();
                    "
                    :title="$t('MediaPackages.descriptionAr')"
                    :imgName="'description.svg'"
                  />
                  <TextArea
                    :className="'col-md-6'"
                    :id="`${id}-mediaPackageDescriptionEn`"
                    :errors="errors_mediaPackageDescriptionEn"
                    :value="mediaPackage.mediaPackageDescriptionEn"
                    v-on:changeValue="
                      mediaPackage.mediaPackageDescriptionEn = $event;
                      $v.mediaPackage.mediaPackageDescriptionEn.$touch();
                    "
                    :title="$t('MediaPackages.descriptionEn')"
                    :imgName="'description.svg'"
                  />
                  <TextArea
                    :className="'col-md-6'"
                    :id="`${id}-mediaPackageDescriptionUnd`"
                    :value="mediaPackage.mediaPackageDescriptionUnd"
                    v-on:changeValue="
                      mediaPackage.mediaPackageDescriptionUnd = $event
                    "
                    :title="$t('MediaPackages.descriptionUnd')"
                    :imgName="'description.svg'"
                  />
                  <TextArea
                    :className="'col-md-6'"
                    :id="`${id}-mediaPackageNotes`"
                    :value="mediaPackage.mediaPackageNotes"
                    v-on:changeValue="mediaPackage.mediaPackageNotes = $event"
                    :title="$t('notes')"
                    :imgName="'notes.svg'"
                  />
                  <BaseTree
                    :hierarchySystemTypeFilterToken="
                      hierarchySystemTypeFilterToken
                    "
                    :treeModel="getTreeModel"
                    v-on:changeValue="baseTreeChanged($event)"
                    :showParent="true"
                    :filterParentDirect="true"
                  />
                  <CustomSelectBox
                    :className="'col-md-6'"
                    :id="`${id}-accountToken`"
                    :errors="errors_accountToken"
                    :value="mediaPackage.accountToken"
                    :options="accountTokenOptions"
                    v-on:changeValue="
                      mediaPackage.accountToken = $event;
                      $v.mediaPackage.accountToken.$touch();
                    "
                    :title="$t('Accounts.select')"
                    :imgName="'accounts.svg'"
                  />
                  <CustomSelectBox
                    :className="'col-md-6'"
                    :id="`${id}-mediaPackageShowStatusTypeToken`"
                    :value="mediaPackage.mediaPackageShowStatusTypeToken"
                    :options="showStatusTokenOptions"
                    v-on:changeValue="
                      mediaPackage.mediaPackageShowStatusTypeToken = $event
                    "
                    :title="$t('general.showStatus')"
                    :imgName="'type.svg'"
                  />
                  <CustomInputFloat
                    :className="'col-md-4'"
                    :id="`${id}-mediaPackagePrice`"
                    :value="mediaPackage.mediaPackageFinance.mediaPackagePrice"
                    v-on:changeValue="
                      mediaPackage.mediaPackageFinance.mediaPackagePrice =
                        $event
                    "
                    :title="$t('Price')"
                    :imgName="'money.svg'"
                  />
                  <CustomInputFloat
                    :className="'col-md-4'"
                    :id="`${id}-mediaPackagePriceInOffer`"
                    :value="
                      mediaPackage.mediaPackageFinance.mediaPackagePriceInOffer
                    "
                    v-on:changeValue="
                      mediaPackage.mediaPackageFinance.mediaPackagePriceInOffer =
                        $event
                    "
                    :title="$t('priceInOffer')"
                    :imgName="'offers.svg'"
                  />
                  <CustomCheckbox
                    :className="'col-md-4'"
                    :value="mediaPackage.mediaPackageFinance.offerStatus"
                    v-on:changeValue="
                      mediaPackage.mediaPackageFinance.offerStatus = $event
                    "
                    :title="$t('general.offerActiveStatus')"
                    :imgName="'type.svg'"
                  />
                  <div class="col-12">
                    <div class="row item-no-p">
                      <CustomCheckbox
                        :className="'col-6'"
                        :value="
                          mediaPackage.mediaPackageLicenceData
                            .activationInFixedDurationStatus
                        "
                        v-on:changeValue="
                          mediaPackage.mediaPackageLicenceData.activationInFixedDurationStatus =
                            $event;
                          mediaPackage.mediaPackageLicenceData.durationFromActivationStatus =
                            !$event;
                        "
                        :title="$t('MediaPackages.fixedDurationStatus')"
                        :centerStatus="true"
                      />
                      <CustomCheckbox
                        :className="'col-6'"
                        :value="
                          mediaPackage.mediaPackageLicenceData
                            .durationFromActivationStatus
                        "
                        v-on:changeValue="
                          mediaPackage.mediaPackageLicenceData.durationFromActivationStatus =
                            $event;
                          mediaPackage.mediaPackageLicenceData.activationInFixedDurationStatus =
                            !$event;
                        "
                        :title="$t('MediaPackages.numberOfDaysStatus')"
                        :centerStatus="true"
                      />
                    </div>
                  </div>
                  <template
                    v-if="
                      mediaPackage.mediaPackageLicenceData
                        .activationInFixedDurationStatus
                    "
                  >
                    <DateTimePicker
                      class="col-md-6"
                      :id="`${id}-activationDateTimeFrom`"
                      type="dateTime"
                      :value="
                        mediaPackage.mediaPackageLicenceData
                          .activationDateTimeFrom
                      "
                      :title="$t('Reports.dateTimeFrom')"
                      v-on:changeValue="
                        mediaPackage.mediaPackageLicenceData.activationDateTimeFrom =
                          $event.dateTime
                      "
                      :language="language"
                    />
                    <DateTimePicker
                      class="col-md-6"
                      :id="`${id}-activationDateTimeTo`"
                      type="dateTime"
                      :value="
                        mediaPackage.mediaPackageLicenceData
                          .activationDateTimeTo
                      "
                      :title="$t('Reports.dateTimeTo')"
                      v-on:changeValue="
                        mediaPackage.mediaPackageLicenceData.activationDateTimeTo =
                          $event.dateTime
                      "
                      :language="language"
                    />
                  </template>
                  <template v-else>
                    <div class="row item-no-p">
                      <CustomInputInt
                        :className="'col-md-2'"
                        :id="`${id}-toNumberInMinutes`"
                        :value="
                          mediaPackage.mediaPackageLicenceData.toNumberInMinutes
                        "
                        :maxlength="2"
                        :maxValueStatus="true"
                        :maxValue="59"
                        v-on:changeValue="
                          mediaPackage.mediaPackageLicenceData.toNumberInMinutes =
                            $event
                        "
                        :title="$t('timeCounter.minutes')"
                        :imgName="'minutes.svg'"
                      />
                      <CustomInputInt
                        :className="'col-md-2'"
                        :id="`${id}-toNumberInHours`"
                        :value="
                          mediaPackage.mediaPackageLicenceData.toNumberInHours
                        "
                        :maxlength="2"
                        :maxValueStatus="true"
                        :maxValue="11"
                        v-on:changeValue="
                          mediaPackage.mediaPackageLicenceData.toNumberInHours =
                            $event
                        "
                        :title="$t('timeCounter.hours')"
                        :imgName="'hours.svg'"
                      />
                      <CustomInputInt
                        :className="'col-md-3'"
                        :id="`${id}-toNumberInDays`"
                        :value="
                          mediaPackage.mediaPackageLicenceData.toNumberInDays
                        "
                        :maxlength="3"
                        :maxValueStatus="true"
                        :maxValue="364"
                        v-on:changeValue="
                          mediaPackage.mediaPackageLicenceData.toNumberInDays =
                            $event
                        "
                        :title="$t('timeCounter.days')"
                        :imgName="'days.svg'"
                      />
                      <CustomInputInt
                        :className="'col-md-2'"
                        :id="`${id}-toNumberInMonths`"
                        :value="
                          mediaPackage.mediaPackageLicenceData.toNumberInMonths
                        "
                        :maxlength="2"
                        :maxValueStatus="true"
                        :maxValue="11"
                        v-on:changeValue="
                          mediaPackage.mediaPackageLicenceData.toNumberInMonths =
                            $event
                        "
                        :title="$t('timeCounter.months')"
                        :imgName="'months.svg'"
                      />
                      <CustomInputInt
                        :className="'col-md-3'"
                        :id="`${id}-toNumberInYears`"
                        :value="
                          mediaPackage.mediaPackageLicenceData.toNumberInYears
                        "
                        :maxlength="3"
                        :maxValueStatus="true"
                        :maxValue="999"
                        v-on:changeValue="
                          mediaPackage.mediaPackageLicenceData.toNumberInYears =
                            $event
                        "
                        :title="$t('timeCounter.years')"
                        :imgName="'year.svg'"
                      />
                    </div>
                  </template>
                </div>
              </b-collapse>
            </div>
          </template>
          <!-- mediaPackageMediaData -->
          <template>
            <div class="container-collapse col-12">
              <b-button
                v-b-toggle="`${id}-mediaPackageMediaData`"
                class="btn btn-lg btn-collapse collapse-data"
              >
                {{ $t("SharedMedias.data") }}
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </b-button>
              <b-collapse
                :id="`${id}-mediaPackageMediaData`"
                v-model="mediaPackageMediaDataVisible"
              >
                <div class="row item-no-p">
                  <!-- mediaPackageSelector -->
                  <div class="col-md-5 item-no-p">
                    <SharedMediaComponent
                      :id="id"
                      :showImgStatus="false"
                      :sharedMediaWithSpaceStorageMedia="
                        sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia
                      "
                      v-on:mediaPackageSelectorUpdated="
                        mediaPackageSelectorUpdated($event)
                      "
                    />
                  </div>
                  <!-- mediaPackageContainer -->
                  <div class="col-md-7 item-no-p">
                    <MediaPackageSharedMediaComponent
                      :id="id"
                      :key="mediaPackage.selectorSharedMediaTokens.length"
                      :mediaPackageMediaData="
                        mediaPackage.mediaPackageMediaData
                      "
                      v-on:mediaPackageContainerUpdated="
                        mediaPackageContainerUpdated($event)
                      "
                    />
                  </div>
                </div>
              </b-collapse>
            </div>
          </template>
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
  getLanguage,
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../utils/functions";
import store from "./../../../store";

import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../utils/validationHelper";
import CustomFileInput from "./../../../components/general/CustomFileInput.vue";
import BaseTree from "./../../../components/general/BaseTree.vue";
// import TimeCounter from "./../../../components/general/TimeCounter.vue";
import DateTimePicker from "./../../../components/general/DateTimePicker.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import CustomInputFloat from "./../../../components/general/CustomInputFloat.vue";
import CustomInputInt from "./../../../components/general/CustomInputInt.vue";
import CustomCheckbox from "./../../../components/general/CustomCheckbox.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../components/general/TextArea.vue";
import MediaPackageSharedMediaComponent from "./MediaPackageSharedMediaComponent.vue";
import { hasMediaPackageDeleteImage } from "./../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../utils/functions";
import generalMixin from "./../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getAccountsDialog } from "./../../../utils/dialogsOfApi";
import PreLoader from "@/components/general/PreLoader.vue";
import { SYSTEM_TYPE } from "./../../../utils/constantLists";
import {
  getDialogOfSharedMediaType,
  getDialogOfShowType,
} from "./../../../utils/dialogsOfConstantsLists";
import SharedMediaComponent from "./../../sharedMediaWithSpaceStorageMedias/SharedMediaComponent.vue";
import SharedMediaWithSpaceStorageMedias from "./../../../models/sharedMediaWithSpaceStorageMedias/SharedMediaWithSpaceStorageMedias";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomFileInput,
    BaseTree,
    // TimeCounter,
    DateTimePicker,
    CustomInput,
    CustomInputFloat,
    CustomInputInt,
    CustomCheckbox,
    CustomSelectBox,
    TextArea,
    MediaPackageSharedMediaComponent,
    SharedMediaComponent,
  },
  data() {
    return {
      mainDataVisible: false,
      mediaPackageMediaDataVisible: true,
      language: getLanguage(),
      isLoading: false,
      mediaPackageTypeTokenOptions: getDialogOfSharedMediaType(),
      educationalCategoryTokenOptions: [],
      accountTokenOptions: [],
      showStatusTokenOptions: getDialogOfShowType(),
      sharedMediaWithSpaceStorageMedias:
        new SharedMediaWithSpaceStorageMedias(),
    };
  },
  props: {
    mediaPackage: {
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
    mediaPackage: {
      mediaPackageNameAr: { required, isValidNameAr },
      mediaPackageNameEn: { required, isValidNameEn },
      mediaPackageDescriptionAr: { isValidTextAr },
      mediaPackageDescriptionEn: { isValidTextEn },
      accountToken: { required },
    },
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.mediaPackage.educationalCategoryInfoData
            .systemComponentsHierarchyData.systemComponentsHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken:
          this.mediaPackage.educationalCategoryInfoData.systemComponentData
            .systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: this.mediaPackage.educationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.select"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
    // validations
    errors_placesTokensList() {
      let errors = [];
      if (this.$v.mediaPackage.placesTokensList.$error) {
        if (!this.$v.mediaPackage.placesTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_usersTokensList() {
      let errors = [];
      if (this.$v.mediaPackage.usersTokensList.$error) {
        if (!this.$v.mediaPackage.usersTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalCategoriesTokensList() {
      let errors = [];
      if (this.$v.mediaPackage.educationalCategoriesTokensList.$error) {
        if (!this.$v.mediaPackage.educationalCategoriesTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalGroupsTokensList() {
      let errors = [];
      if (this.$v.mediaPackage.educationalGroupsTokensList.$error) {
        if (!this.$v.mediaPackage.educationalGroupsTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_mediaPackageDateTime() {
      let errors = [];
      if (this.$v.mediaPackage.mediaPackageDateTime.$error) {
        if (!this.$v.mediaPackage.mediaPackageDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_mediaPackageNameAr() {
      let errors = [];
      if (this.$v.mediaPackage.mediaPackageNameAr.$error) {
        if (
          !this.$v.mediaPackage.mediaPackageNameAr.required &&
          !this.$v.mediaPackage.mediaPackageNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.mediaPackage.mediaPackageNameAr.required &&
          !this.$v.mediaPackage.mediaPackageNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_mediaPackageNameEn() {
      let errors = [];
      if (this.$v.mediaPackage.mediaPackageNameEn.$error) {
        if (
          !this.$v.mediaPackage.mediaPackageNameAr.required &&
          !this.$v.mediaPackage.mediaPackageNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.mediaPackage.mediaPackageNameEn.required &&
          !this.$v.mediaPackage.mediaPackageNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_mediaPackageDescriptionAr() {
      let errors = [];
      if (this.$v.mediaPackage.mediaPackageDescriptionAr.$error) {
        if (!this.$v.mediaPackage.mediaPackageDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_mediaPackageDescriptionEn() {
      let errors = [];
      if (this.$v.mediaPackage.mediaPackageDescriptionEn.$error) {
        if (!this.$v.mediaPackage.mediaPackageDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    errors_accountToken() {
      let errors = [];
      if (this.$v.mediaPackage.accountToken.$error) {
        if (!this.$v.mediaPackage.accountToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },

    yearsToDays() {
      let days = "";
      if (this.mediaPackage.mediaPackageLicenceData.toNumberInYears)
        days =
          Number(this.mediaPackage.mediaPackageLicenceData.toNumberInYears) *
          365;
      return Number(days);
    },
    monthsToDays() {
      let days = "";
      if (this.mediaPackage.mediaPackageLicenceData.toNumberInMonths)
        days =
          Number(this.mediaPackage.mediaPackageLicenceData.toNumberInMonths) *
          30;
      return Number(days);
    },
    durationFromActivation() {
      let durationFromActivation = "";
      let toNumberInDays =
        this.yearsToDays +
        this.monthsToDays +
        Number(this.mediaPackage.mediaPackageLicenceData.toNumberInDays);

      durationFromActivation = `${toNumberInDays}.${this.mediaPackage.mediaPackageLicenceData.toNumberInHours}:${this.mediaPackage.mediaPackageLicenceData.toNumberInMinutes}`;
      return durationFromActivation;
    },
  },
  methods: {
    async diffTowLists(left, right, compareFunction) {
      return left.filter(
        (leftValue) =>
          !right.some((rightValue) => compareFunction(leftValue, rightValue))
      );
    },
    async mediaPackageSelectorUpdated(data) {
      await this.updatedSelectorFolderTokenMediaTokensAndData(data);

      await this.updatedSelectorLists();

      // set mediaPackageMediaData with selector-lists
      //get div selectorSharedMediaData vs mediaPackageMediaData
      // tow lists
      let a = this.mediaPackage.mediaPackageMediaData;
      let b = this.mediaPackage.selectorSharedMediaData;
      // condetion
      const isSameToken = (a, b) => a.sharedMediaToken === b.sharedMediaToken;
      // diff in selector
      let diffInB = this.diffTowLists(b, a, isSameToken);

      Promise.all([diffInB]).then((values) => {
        let differantList = values[0];
        differantList.forEach((i) => {
          this.mediaPackage.mediaPackageMediaData.push({
            sharedMediaToken: i.sharedMediaToken,
            sharedMediaData: i,
            sharedMediaIsFreeStatus: false,
            sharedMediaActivationTypeToken: "",
            sharedMediaActivationTypeNameCurrent: "",
          });
        });
      });
    },

    async updatedSelectorFolderTokenMediaTokensAndData(data) {
      if (this.mediaPackage.selectorFolderTokenMediaTokensAndData.length) {
        let subSelectedFolderToken =
          data.selectorFolderTokenMediaTokensAndData.folderToken;

        let isSubSelectedFolderTokenExist =
          this.mediaPackage.selectorFolderTokenMediaTokensAndData.some(
            (item) => item.folderToken == subSelectedFolderToken
          );
        this.mediaPackage.selectorFolderTokenMediaTokensAndData[
          subSelectedFolderToken
        ] = data.selectorFolderTokenMediaTokensAndData;

        if (isSubSelectedFolderTokenExist) {
          this.mediaPackage.selectorFolderTokenMediaTokensAndData.every(
            (element, i) => {
              if (element.folderToken == subSelectedFolderToken) {
                this.mediaPackage.selectorFolderTokenMediaTokensAndData[i] =
                  data.selectorFolderTokenMediaTokensAndData;
                // stop search
                return false;
              } else {
                // keep searching
                return true;
              }
            }
          );
        } else {
          this.mediaPackage.selectorFolderTokenMediaTokensAndData.push(
            data.selectorFolderTokenMediaTokensAndData
          );
        }
      } else {
        this.mediaPackage.selectorFolderTokenMediaTokensAndData.push(
          data.selectorFolderTokenMediaTokensAndData
        );
      }
    },

    async updatedSelectorLists() {
      // set selector-lists with sub-selected
      let mediaTokens = [];
      let mediaData = [];
      this.mediaPackage.selectorFolderTokenMediaTokensAndData.forEach((i) => {
        mediaTokens = [...mediaTokens, ...i.mediaTokens];
        mediaData = [...mediaData, ...i.mediaData];
      });
      this.mediaPackage.selectorSharedMediaTokens = mediaTokens;
      this.mediaPackage.selectorSharedMediaData = mediaData;
    },

    async mediaPackageContainerUpdated(data) {
      this.mediaPackage.selectorFolderTokenMediaTokensAndData.every(
        (folder, i) => {
          if (folder.folderToken == data.folderToken) {
            // remove token from mediaTokens arr
            this.mediaPackage.selectorFolderTokenMediaTokensAndData[
              i
            ].mediaTokens = this.mediaPackage.selectorFolderTokenMediaTokensAndData[
              i
            ].mediaTokens.filter((token) => token != data.mediaToken);

            // remove token from mediaData arr
            this.mediaPackage.selectorFolderTokenMediaTokensAndData[
              i
            ].mediaData = this.mediaPackage.selectorFolderTokenMediaTokensAndData[
              i
            ].mediaData.filter(
              (itemData) => itemData.sharedMediaToken != data.mediaToken
            );

            // stop search
            return false;
          } else {
            // keep searching
            return true;
          }
        }
      );

      await this.updatedSelectorLists();
    },

    baseTreeChanged(data) {
      this.mediaPackage.educationalCategoryInfoData.systemComponentsHierarchyData.systemComponentsHierarchyToken =
        data.hierarchyToken;
      this.mediaPackage.educationalCategoryInfoData.systemComponentData.systemComponentToken =
        data.componentToken;
      this.mediaPackage.educationalCategoryToken = data.parentToken;
    },
    async getAccountsDialog() {
      this.$emit("isLoading", true);
      this.accountTokenOptions = await getAccountsDialog();
      this.$emit("isLoading", false);
    },

    async submitForm() {
      this.mainDataVisible = true;
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.mediaPackage.mediaPackageNameAr.required &&
          this.$v.mediaPackage.mediaPackageNameAr.isValidNameAr) ||
          (this.$v.mediaPackage.mediaPackageNameEn.required &&
            this.$v.mediaPackage.mediaPackageNameEn.isValidNameEn)) &&
        this.$v.mediaPackage.mediaPackageDescriptionAr.isValidTextAr &&
        this.$v.mediaPackage.mediaPackageDescriptionEn.isValidTextEn &&
        this.$v.mediaPackage.accountToken.required
      ) {
        this.mediaPackage.mediaPackageLicenceData.durationFromActivation =
          this.durationFromActivation;
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasMediaPackageDeleteImage,
    fullPathFileFromServer,
  },
  watch: {
    "mediaPackage.selectorSharedMediaTokens": function (val) {
      store.dispatch("updateEmmitSharedMediaDataListStatus", false);
      store.dispatch("updateMediaPackageContainerSharedMediaTokens", val);
    },
  },
  created() {
    this.getAccountsDialog();
  },
};
</script>

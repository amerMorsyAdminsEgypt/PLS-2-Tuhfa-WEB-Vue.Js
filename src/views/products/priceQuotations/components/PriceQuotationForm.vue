<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="priceQuotation.fullCode"
            v-on:changeValue="priceQuotation.fullCode = $event"
            :title="$t('PriceQuotations.code')"
            :imgName="'code.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-reportTemplateToken`"
            :errors="errors_reportTemplateToken"
            :value="priceQuotation.reportTemplateToken"
            :options="reportTemplateTokenOptions"
            v-on:changeValue="
              priceQuotation.reportTemplateToken = $event;
              $v.priceQuotation.reportTemplateToken.$touch();
            "
            :title="$t('ConstantsListSelect.ReportTemplates')"
            :imgName="'ReportTemplates.svg'"
          />

          <!-- <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-placeTypeToken`"
            :value="priceQuotation.placeTypeToken"
            :options="placeTypeTokenOptions"
            v-on:changeValue="priceQuotation.placeTypeToken = $event"
            :title="$t('Places.type')"
            :imgName="'type.svg'"
          /> -->
          <CustomSelectBox
            :key="priceQuotation.placeTypeToken"
            :className="'col-md-12'"
            :id="`${id}-requestPlaceToken`"
            :errors="errors_requestPlaceToken"
            :value="priceQuotation.requestPlaceToken"
            :options="placeTokensOptions"
            v-on:changeValue="
              priceQuotation.requestPlaceToken = $event;
              $v.priceQuotation.requestPlaceToken.$touch();
            "
            :title="$t('Places.select')"
            :imgName="'places.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceQuotationDescriptionAr`"
            :value="priceQuotation.priceQuotationDescriptionAr"
            v-on:changeValue="
              priceQuotation.priceQuotationDescriptionAr = $event
            "
            :title="$t('PriceQuotations.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceQuotationDescriptionEn`"
            :value="priceQuotation.priceQuotationDescriptionEn"
            v-on:changeValue="
              priceQuotation.priceQuotationDescriptionEn = $event
            "
            :title="$t('PriceQuotations.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceQuotationDescriptionUnd`"
            :value="priceQuotation.priceQuotationDescriptionUnd"
            v-on:changeValue="
              priceQuotation.priceQuotationDescriptionUnd = $event
            "
            :title="$t('PriceQuotations.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceQuotationNotes`"
            :value="priceQuotation.priceQuotationNotes"
            v-on:changeValue="priceQuotation.priceQuotationNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <CustomSelectBoxMultiple
            :className="'col-md-12'"
            :id="`usersSalesTokenList`"
            :value="priceQuotation.usersSalesTokenList"
            :options="userTokenOptions"
            v-on:changeValue="priceQuotation.usersSalesTokenList = $event"
            :title="$t('sales.select')"
            :imgName="'sales.svg'"
            :returnArrayOfObjects="false"
          />
        </div>
      </div>

      <div class="my-card">
        <span class="my-card-title">{{
          $t("PriceQuotations.details.name")
        }}</span>

        <FormStoreItemsTable
          v-on:changeCurrentIndex="index = $event"
          :StoreItems="priceQuotation.priceQuotationDetails"
          :id="id"
        />

        <div class="my-card">
          <span class="my-card-title">{{ index + 1 }}</span>

          <div class="row">
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-[${index}][storeItemToken]`"
              :value="
                priceQuotation.priceQuotationDetails[index].storeItemToken
              "
              :options="storeItemTokenOptions"
              v-on:changeValue="
                priceQuotation.priceQuotationDetails[index].storeItemToken =
                  $event.value;
                priceQuotation.priceQuotationDetails[index].storeItemName =
                  $event.text;
                storeItemTokenChanged($event.value, index);
              "
              :title="$t('StoreItems.select')"
              :imgName="'StoreItems.svg'"
              :emitObject="true"
            />
            <CustomInputInt
              :className="'col-md-6'"
              :id="`${id}-[${index}][storeItemQuantity]`"
              :value="
                priceQuotation.priceQuotationDetails[index].storeItemQuantity
              "
              v-on:changeValue="
                priceQuotation.priceQuotationDetails[index].storeItemQuantity =
                  $event
              "
              :title="$t('StoreItems.quantity')"
              :imgName="'number.svg'"
            />

            <TextArea
              :className="'col-md-6'"
              :id="`${id}-[${index}][priceQuotationDetalisNotes]`"
              :value="
                priceQuotation.priceQuotationDetails[index]
                  .priceQuotationDetalisNotes
              "
              v-on:changeValue="
                priceQuotation.priceQuotationDetails[
                  index
                ].priceQuotationDetalisNotes = $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-[${index}][affiliateOperationTypeToken]`"
              :value="
                priceQuotation.priceQuotationDetails[index]
                  .affiliateOperationTypeToken
              "
              :options="affiliateOperationTypeTokenOptions"
              v-on:changeValue="
                priceQuotation.priceQuotationDetails[
                  index
                ].affiliateOperationTypeToken = $event
              "
              :title="$t('PriceQuotations.details.AffiliateOperationSelect')"
              :imgName="'AffiliateOperationTypes.svg'"
            />

            <div class="my-card col-12">
              <span class="my-card-title">{{
                $t("PropertyTypes.modelName")
              }}</span>

              <div
                v-if="
                  priceQuotation.priceQuotationDetails[index]
                    .storeItemPropertyTypesData.length == 0
                "
                class="my-card-no-content"
              >
                {{ $t("PropertyTypes.thereAreNoOne") }}
              </div>

              <template v-else>
                <div
                  v-for="(PropertyType, indexPropertyType) in priceQuotation
                    .priceQuotationDetails[index].storeItemPropertyTypesData"
                  :key="indexPropertyType"
                >
                  <!-- <span class="my-card-title">{{
                      indexPropertyType + 1
                    }}</span> -->

                  <b-button
                    v-b-toggle="`PropertyTypes-${index}-${indexPropertyType}`"
                    class="btn btn-lg btn-collapse"
                  >
                    {{ indexPropertyType + 1 }}
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </b-button>
                  <b-collapse
                    :id="`PropertyTypes-${index}-${indexPropertyType}`"
                  >
                    <div class="my-card">
                      <span class="remove-slice-container">
                        <button
                          @click="
                            removeSliceStoreItemPropertyType(
                              index,
                              indexPropertyType
                            )
                          "
                          type="button"
                          class="btn btn-remove-slice"
                        >
                          ×
                        </button>
                      </span>

                      <div class="row">
                        <CustomInput
                          :className="'col-md-4'"
                          :id="`${id}-[${index}]PropertyType[${indexPropertyType}][propertyTypeNameAr]`"
                          :value="PropertyType.propertyTypeNameAr"
                          v-on:changeValue="
                            PropertyType.propertyTypeNameAr = $event
                          "
                          :title="$t('PropertyTypes.nameAr')"
                          :imgName="'PropertyTypes.svg'"
                        />
                        <CustomInput
                          :className="'col-md-4'"
                          :id="`${id}-[${index}]PropertyType[${indexPropertyType}][propertyTypeNameEn]`"
                          :value="PropertyType.propertyTypeNameEn"
                          v-on:changeValue="
                            PropertyType.propertyTypeNameEn = $event
                          "
                          :title="$t('PropertyTypes.nameEn')"
                          :imgName="'PropertyTypes.svg'"
                        />
                        <CustomInput
                          :className="'col-md-4'"
                          :id="`${id}-[${index}]PropertyType[${indexPropertyType}][propertyTypeNameUnd]`"
                          :value="PropertyType.propertyTypeNameUnd"
                          v-on:changeValue="
                            PropertyType.propertyTypeNameUnd = $event
                          "
                          :title="$t('PropertyTypes.nameUnd')"
                          :imgName="'PropertyTypes.svg'"
                        />

                        <TextArea
                          :className="'col-md-6'"
                          :id="`${id}-[${index}]PropertyType[${indexPropertyType}][propertyTypeDescriptionAr]`"
                          :value="PropertyType.propertyTypeDescriptionAr"
                          v-on:changeValue="
                            PropertyType.propertyTypeDescriptionAr = $event
                          "
                          :title="$t('PropertyTypes.descriptionAr')"
                          :imgName="'description.svg'"
                        />
                        <TextArea
                          :className="'col-md-6'"
                          :id="`${id}-[${index}]PropertyType[${indexPropertyType}][propertyTypeDescriptionEn]`"
                          :value="PropertyType.propertyTypeDescriptionEn"
                          v-on:changeValue="
                            PropertyType.propertyTypeDescriptionEn = $event
                          "
                          :title="$t('PropertyTypes.descriptionEn')"
                          :imgName="'description.svg'"
                        />
                        <TextArea
                          :className="'col-md-6'"
                          :id="`${id}-[${index}]PropertyType[${indexPropertyType}][propertyTypeDescriptionUnd]`"
                          :value="PropertyType.propertyTypeDescriptionUnd"
                          v-on:changeValue="
                            PropertyType.propertyTypeDescriptionUnd = $event
                          "
                          :title="$t('PropertyTypes.descriptionUnd')"
                          :imgName="'description.svg'"
                        />
                        <TextArea
                          :className="'col-md-6'"
                          :id="`${id}-[${index}]PropertyType[${indexPropertyType}][propertyTypeNotes]`"
                          :value="PropertyType.propertyTypeNotes"
                          v-on:changeValue="
                            PropertyType.propertyTypeNotes = $event
                          "
                          :title="$t('notes')"
                          :imgName="'notes.svg'"
                        />

                        <PropertyFileds
                          class="col-12"
                          :propertyDetailsData="
                            PropertyType.propertyDetailsData
                          "
                          :dropDownListTokenOptions="dropDownListTokenOptions"
                          :id="`${id}-[${index}]PropertyType[${indexPropertyType}]Property`"
                        />
                      </div>
                    </div>
                  </b-collapse>
                </div>
              </template>

              <div class="add-slice-container">
                <button
                  @click="addSliceStoreItemPropertyType(index)"
                  type="button"
                  class="btn btn-add-slice"
                  :title="$t('addSlice')"
                >
                  +
                </button>
              </div>
            </div>
          </div>
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
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomInputInt from "./../../../../components/general/CustomInputInt.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomSelectBoxMultiple from "./../../../../components/general/CustomSelectBoxMultiple.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import FormStoreItemsTable from "./FormStoreItemsTable.vue";
import PropertyFileds from "./../../propertyTypes/components/PropertyFileds.vue";
import PriceQuotationDetailsItem from "./../../../../models/products/priceQuotations/PriceQuotationDetailsItem";
import PropertyTypeInfoData from "./../../../../models/products/propertyTypes/PropertyTypeInfoData";
import PropertyDetailsData from "./../../../../models/products/propertyTypes/PropertyDetailsData";
import apiStoreItems from "./../../../../api/products/storeItems";
import {
  bottomSheetScrollToTop,
  checkPrivilege,
} from "./../../../../utils/functions";
import { STATUS } from "./../../../../utils/constants";
import { USER_TYPE } from "./../../../../utils/constantLists";
import {
  getPlacesDialog,
  getReportTemplatesDialog,
  getUsersDialog,
  getStoreItemsDialog,
  getDropDownListsDialog,
} from "./../../../../utils/dialogsOfApi";
import {
  getDialogOfPlaceType,
  getDialogOfAffiliateOperationTypes,
} from "./../../../../utils/dialogsOfConstantsLists";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomInputInt,
    CustomSelectBox,
    CustomSelectBoxMultiple,
    TextArea,
    FormStoreItemsTable,
    PropertyFileds,
  },
  data() {
    return {
      placeTypeTokenOptions: getDialogOfPlaceType(),
      affiliateOperationTypeTokenOptions: getDialogOfAffiliateOperationTypes(),
      placeTokensOptions: [],
      reportTemplateTokenOptions: [],
      userTokenOptions: [],
      storeItemTokenOptions: [],
      dropDownListTokenOptions: [],
      priceQuotationDetailsItem: new PriceQuotationDetailsItem(),
      index: 0,
    };
  },
  props: {
    priceQuotation: {
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
    priceQuotation: {
      requestPlaceToken: { required },
      reportTemplateToken: { required },
    },
  },
  computed: {
    errors_requestPlaceToken() {
      let errors = [];
      if (this.$v.priceQuotation.requestPlaceToken.$error) {
        if (!this.$v.priceQuotation.requestPlaceToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_reportTemplateToken() {
      let errors = [];
      if (this.$v.priceQuotation.reportTemplateToken.$error) {
        if (!this.$v.priceQuotation.reportTemplateToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    // addSlice() {
    //   this.priceQuotation.priceQuotationDetails.push(
    //     new PriceQuotationDetailsItem()
    //   );
    // },
    // removeSlice(index) {
    //   this.priceQuotation.priceQuotationDetails.splice(index, 1);
    // },
    addSliceStoreItemPropertyType(index) {
      this.priceQuotation.priceQuotationDetails[
        index
      ].storeItemPropertyTypesData.push(new PropertyTypeInfoData());
    },
    removeSliceStoreItemPropertyType(index, indexPropertyType) {
      this.priceQuotation.priceQuotationDetails[
        index
      ].storeItemPropertyTypesData.splice(indexPropertyType, 1);
    },
    addSlicePropertyDetailsData(index, indexPropertyType) {
      this.priceQuotation.priceQuotationDetails[
        index
      ].storeItemPropertyTypesData[indexPropertyType].propertyDetailsData.push(
        new PropertyDetailsData()
      );
    },
    removeSlicePropertyDetailsData(index, indexPropertyType, indexProperty) {
      this.priceQuotation.priceQuotationDetails[
        index
      ].storeItemPropertyTypesData[
        indexPropertyType
      ].propertyDetailsData.splice(indexProperty, 1);
    },

    async getPlacesDialog() {
      this.isLoading = true;
      let params = { placeTypeToken: this.priceQuotation.placeTypeToken };
      if (params.placeTypeToken)
        this.placeTokensOptions = await getPlacesDialog(params);
      else this.placeTokensOptions = [];
      this.isLoading = false;
    },
    async getReportTemplatesDialog() {
      this.isLoading = true;
      this.reportTemplateTokenOptions = await getReportTemplatesDialog();
      this.isLoading = false;
    },
    async getUsersDialog() {
      this.isLoading = true;
      let params = {
        modelName: "employees",
        userTypeToken: USER_TYPE.Employee,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getStoreItemsDialog() {
      this.isLoading = true;
      this.storeItemTokenOptions = await getStoreItemsDialog();
      this.isLoading = false;
    },
    async storeItemTokenChanged(token, index) {
      this.isLoading = true;
      this.priceQuotation.priceQuotationDetails[
        index
      ].storeItemPropertyTypesData = [];
      if (token) {
        try {
          let filter = { token: token };
          const response = await apiStoreItems.getDetails(filter);
          if (
            response.data.status == STATUS.SUCCESS &&
            response.data.storeItem &&
            response.data.storeItem.propertyTypesData &&
            response.data.storeItem.propertyTypesData.length > 0
          ) {
            this.priceQuotation.priceQuotationDetails[
              index
            ].storeItemPropertyTypesData = response.data.storeItem.propertyTypesData.map(
              (element) => {
                return new PropertyTypeInfoData(element);
              }
            );
          } else if (response.data.status == STATUS.INVALID_TOKEN) {
            this.$store.dispatch("logoutUser", response.data.msg);
          } else if (response.data.status != STATUS.SUCCESS) {
            this.showMsg(response.data.msg);
          }
        } catch (e) {
          this.showMsg(this.$t("errorCatch"));
        }
      }
      this.isLoading = false;
    },
    async getDropDownListsDialog() {
      this.isLoading = true;
      this.dropDownListTokenOptions = await getDropDownListsDialog();
      this.isLoading = false;
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.priceQuotation.requestPlaceToken.required &&
        this.$v.priceQuotation.reportTemplateToken.required
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
  },
  watch: {
    "priceQuotation.placeTypeToken": function () {
      this.getPlacesDialog();
    },
  },
  created() {
    this.getPlacesDialog();
    this.getReportTemplatesDialog();
    this.getUsersDialog();
    this.getStoreItemsDialog();
    this.getDropDownListsDialog();
  },
};
</script>

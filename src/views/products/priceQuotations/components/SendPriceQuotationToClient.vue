<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SendPriceQuotationToClient"
      size="xl"
      :headerText="$t('PriceQuotations.sendToClient')"
      :headerIcon="priceQuotationSendPrice.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />

      <form autocomplete="off" v-else>
        <div class="my-card">
          <div class="row">
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`send-feeTypeToken`"
              :value="priceQuotationSendPrice.feeTypeToken"
              :options="feeTypeTokenOptions"
              v-on:changeValue="priceQuotationSendPrice.feeTypeToken = $event"
              :title="$t('general.selectFeeType')"
              :imgName="'FeesTypes.svg'"
            />
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`send-feeTypeValue`"
              :value="priceQuotationSendPrice.feeTypeValue"
              v-on:changeValue="priceQuotationSendPrice.feeTypeValue = $event"
              :title="$t('general.feeTypeValue')"
              :imgName="'money.svg'"
            />

            <CustomCheckbox
              :className="'col-md-6'"
              :value="priceQuotationSendPrice.taxStatus"
              v-on:changeValue="priceQuotationSendPrice.taxStatus = $event"
              :title="$t('general.taxStatus')"
              :centerStatus="true"
            />
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`send-taxPercent`"
              :value="priceQuotationSendPrice.taxPercent"
              v-on:changeValue="priceQuotationSendPrice.taxPercent = $event"
              :title="$t('general.taxPercent')"
              :imgName="'percentage.svg'"
            />

            <CustomCheckbox
              :className="'col-md-12'"
              :value="priceQuotationSendPrice.sendAfterSave"
              v-on:changeValue="priceQuotationSendPrice.sendAfterSave = $event"
              :title="$t('PriceQuotations.sendAfterSave')"
              :centerStatus="true"
            />
          </div>

          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t("StoreItems.code") }}</th>
                  <th>{{ $t("StoreItems.name") }}</th>
                  <th class="cell-lg">{{ $t("Places.type") }}</th>
                  <th class="cell-lg">{{ $t("Places.name") }}</th>
                  <th>
                    {{ $t("PriceQuotations.approvedPriceStoreItemsAmount") }}
                  </th>
                  <th>{{ $t("PriceQuotations.affiliateOperationAmount") }}</th>
                </tr>
              </thead>
              <tbody>
                <template
                  v-if="
                    priceQuotationSendPrice.quotationDetailsPriceRelianceList
                      .length == 0
                  "
                >
                  <tr>
                    <th colspan="7">
                      {{ $t("PriceQuotations.details.thereAreNoSlides") }}
                    </th>
                  </tr>
                </template>
                <template v-else>
                  <tr
                    v-for="(
                      item, index
                    ) in priceQuotationSendPrice.quotationDetailsPriceRelianceList"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ isDataExist(item.storeItemFullCode) }}</td>
                    <td>
                      {{ isDataExist(item.storeItemNameCurrent) }}
                    </td>
                    <td>
                      <CustomSelectBox
                        :id="`send-[${index}][placeTypeToken]`"
                        :value="item.placeTypeToken"
                        :options="placeTypeTokenOptions"
                        v-on:changeValue="
                          item.placeTypeToken = $event;
                          placeTypeTokenChanged($event, index);
                        "
                        :title="$t('Places.type')"
                        :imgName="'type.svg'"
                        :openDown="true"
                      />
                    </td>
                    <td>
                      <CustomSelectBox
                        :id="`send-[${index}][approvedPricePlaceToken]`"
                        :value="item.approvedPricePlaceToken"
                        :options="item.placeTokensOptions"
                        v-on:changeValue="item.approvedPricePlaceToken = $event"
                        :title="$t('Places.select')"
                        :imgName="'places.svg'"
                        :openDown="true"
                      />
                    </td>
                    <td>
                      <CustomInputFloat
                        :id="`send-[${index}][approvedPriceStoreItemsAmount]`"
                        :value="item.approvedPriceStoreItemsAmount"
                        v-on:changeValue="
                          item.approvedPriceStoreItemsAmount = $event
                        "
                        :withOutDesign="true"
                      />
                    </td>
                    <td>
                      <CustomInputFloat
                        :id="`send-[${index}][affiliateOperationAmount]`"
                        :value="item.affiliateOperationAmount"
                        v-on:changeValue="
                          item.affiliateOperationAmount = $event
                        "
                        :withOutDesign="true"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5">{{ $t("general.total") }}</td>
                    <td>{{ totalPrice }}</td>
                    <td>{{ totalAffiliate }}</td>
                  </tr>
                  <tr>
                    <td colspan="2">{{ $t("general.feeTypeValue") }}</td>
                    <td colspan="2">{{ feesValue }}</td>
                    <td colspan="1">{{ $t("general.totalWithFees") }}</td>
                    <td colspan="2">{{ totalWithFees }}</td>
                  </tr>
                  <tr>
                    <td colspan="2">{{ $t("general.taxValue") }}</td>
                    <td colspan="2">{{ taxValue }}</td>
                    <td colspan="1">{{ $t("general.totalWithTax") }}</td>
                    <td colspan="2">{{ totalWithTax }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <div class="form-actions">
          <div class="icon-submit" @click.prevent="SendToClient">
            <img
              src="@/assets/images/check-icon.svg"
              :title="$t('PriceQuotations.sendToClient')"
            />
          </div>
          <div
            @click.prevent
            class="icon-cancel"
            v-b-modal="`ConfirmCloseSheet-SendPriceQuotationToClient`"
          >
            <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
          </div>
        </div>
      </form>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import SendPriceQuotationToClientModel from "./../../../../models/products/priceQuotations/SendPriceQuotationToClientModel";
import apiPriceQuotation from "./../../../../api/products/priceQuotations";
import {
  getDialogOfFeesTypes,
  getDialogOfPlaceType,
} from "./../../../../utils/dialogsOfConstantsLists";
import { getPlacesDialog } from "./../../../../utils/dialogsOfApi";
import { STATUS } from "./../../../../utils/constants";
import { FEES_TYPES } from "./../../../../utils/constantLists";
import { isDataExist } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    CustomSelectBox,
    CustomCheckbox,
    CustomInputFloat,
  },
  props: ["token"],
  data() {
    return {
      priceQuotationSendPrice: new SendPriceQuotationToClientModel(),
      feeTypeTokenOptions: getDialogOfFeesTypes(),
      placeTypeTokenOptions: getDialogOfPlaceType(),
      approvedPricePlaceTokenOptions: [],
    };
  },
  computed: {
    totalPrice() {
      return this.priceQuotationSendPrice.quotationDetailsPriceRelianceList.reduce(
        (sum, current) =>
          parseFloat(sum) +
          (isNaN(parseFloat(current.approvedPriceStoreItemsAmount))
            ? 0
            : parseFloat(current.approvedPriceStoreItemsAmount)),
        0
      );
    },
    totalAffiliate() {
      return this.priceQuotationSendPrice.quotationDetailsPriceRelianceList.reduce(
        (sum, current) =>
          sum +
          (isNaN(parseFloat(current.affiliateOperationAmount))
            ? 0
            : parseFloat(current.affiliateOperationAmount)),
        0
      );
    },
    feesValue() {
      let feesValue = isNaN(
        parseFloat(this.priceQuotationSendPrice.feeTypeValue)
      )
        ? 0
        : parseFloat(this.priceQuotationSendPrice.feeTypeValue);
      if (this.priceQuotationSendPrice.feeTypeToken == FEES_TYPES.Increase) {
        feesValue = 1 * feesValue;
      } else if (
        this.priceQuotationSendPrice.feeTypeToken == FEES_TYPES.Deduct
      ) {
        feesValue = -1 * feesValue;
      } else {
        feesValue = 0;
      }
      return feesValue;
    },
    totalWithFees() {
      return this.totalPrice + this.totalAffiliate + this.feesValue;
    },
    taxValue() {
      if (this.priceQuotationSendPrice.taxStatus) {
        return (
          (this.totalWithFees *
            (isNaN(parseFloat(this.priceQuotationSendPrice.taxPercent))
              ? 0
              : parseFloat(this.priceQuotationSendPrice.taxPercent))) /
          100
        );
      } else {
        return 0;
      }
    },
    totalWithTax() {
      return this.totalWithFees + this.taxValue;
    },
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.token };
        this.priceQuotationSendPrice.setInitialValue();
        const response = await apiPriceQuotation.getDetails(filter);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        let item = {
          priceQuotationToken: response.data.priceQuotation.priceQuotationToken,
          quotationDetailsPriceRelianceList: [],
        };
        if (
          response.data.priceQuotation.priceQuotationDetails != null &&
          response.data.priceQuotation.priceQuotationDetails.length > 0
        ) {
          item.quotationDetailsPriceRelianceList =
            response.data.priceQuotation.priceQuotationDetails.map(
              (element) => {
                return {
                  storeItemFullCode: element.storeItemInfoData
                    ? element.storeItemInfoData.fullCode
                    : "",
                  storeItemNameCurrent: element.storeItemInfoData
                    ? element.storeItemInfoData.storeItemNameCurrent
                    : "",
                  priceQuotationDetailsToken:
                    element.priceQuotationDetailsToken,
                  approvedPricePlaceToken: element.bestPricePlaceToken,
                  approvedPriceStoreItemsAmount:
                    element.bestPriceTotalItemsAmount,
                  placeTypeToken: element.bestPricePlaceInfoData
                    ? element.bestPricePlaceInfoData.placeTypeToken
                    : "",
                };
              }
            );
        }
        this.priceQuotationSendPrice.fillData(item);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async SendToClient() {
      this.isLoading = true;
      try {
        const response = await apiPriceQuotation.sendToClient(
          this.priceQuotationSendPrice
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("SendPriceQuotationToClient");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },

    async placeTypeTokenChanged(token, index) {
      this.isLoading = true;
      this.priceQuotationSendPrice.quotationDetailsPriceRelianceList[
        index
      ].placeTokensOptions = [];
      if (token) {
        let params = { placeTypeToken: token };
        this.priceQuotationSendPrice.quotationDetailsPriceRelianceList[
          index
        ].placeTokensOptions = await getPlacesDialog(params);
      }
      this.isLoading = false;
    },
    isDataExist,
  },
};
</script>

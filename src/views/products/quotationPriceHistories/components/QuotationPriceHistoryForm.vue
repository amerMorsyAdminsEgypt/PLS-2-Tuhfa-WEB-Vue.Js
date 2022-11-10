<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="my-card">
        <span class="my-card-title">
          {{ $t("QuotationPriceHistories.listItems.modelName") }}
        </span>

        <div
          v-if="
            quotationPriceHistory.quotationPriceHistoryDtoItemList.length == 0
          "
          class="my-card-no-content"
        >
          {{ $t("QuotationPriceHistories.listItems.noItems") }}
        </div>
        <template v-else>
          <div
            class="my-card"
            v-for="(
              item, index
            ) in quotationPriceHistory.quotationPriceHistoryDtoItemList"
            :key="index"
          >
            <template v-if="submitName == $t('add')">
              <span class="my-card-title">{{ index + 1 }}</span>

              <span class="remove-slice-container">
                <button
                  @click="removeSlice(index)"
                  type="button"
                  class="btn btn-remove-slice"
                >
                  ×
                </button>
              </span>
            </template>

            <div class="row">
              <!-- <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}][placeTypeToken]`"
                :value="item.placeInfoData.placeTypeToken"
                :options="placeTypeTokenOptions"
                v-on:changeValue="
                  item.placeInfoData.placeTypeToken = $event;
                  placeTypeTokenChanged($event, index);
                "
                :title="$t('Places.type')"
                :imgName="'type.svg'"
              /> -->
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}][placeToken]`"
                :value="item.placeToken"
                :options="placeTokensOptions"
                v-on:changeValue="item.placeToken = $event"
                :title="$t('Places.select')"
                :imgName="'places.svg'"
              />

              <CustomInputFloat
                :className="'col-md-6'"
                :id="`${id}-[${index}][totalItemsAmount]`"
                :value="item.totalItemsAmount"
                v-on:changeValue="item.totalItemsAmount = $event"
                :title="$t('StoreItems.price.totalPrice')"
                :imgName="'money.svg'"
              />

              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-quotationPriceHistoryDescriptionAr`"
                :value="item.quotationPriceHistoryDescriptionAr"
                v-on:changeValue="
                  item.quotationPriceHistoryDescriptionAr = $event
                "
                :title="$t('QuotationPriceHistories.descriptionAr')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-quotationPriceHistoryDescriptionEn`"
                :value="item.quotationPriceHistoryDescriptionEn"
                v-on:changeValue="
                  item.quotationPriceHistoryDescriptionEn = $event
                "
                :title="$t('QuotationPriceHistories.descriptionEn')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-quotationPriceHistoryDescriptionUnd`"
                :value="item.quotationPriceHistoryDescriptionUnd"
                v-on:changeValue="
                  item.quotationPriceHistoryDescriptionUnd = $event
                "
                :title="$t('QuotationPriceHistories.descriptionUnd')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-quotationPriceHistoryNotes`"
                :value="item.quotationPriceHistoryNotes"
                v-on:changeValue="item.quotationPriceHistoryNotes = $event"
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />
            </div>
          </div>
        </template>
        <div v-if="submitName == $t('add')" class="add-slice-container">
          <button
            @click="addSlice()"
            type="button"
            class="btn btn-add-slice"
            :title="$t('add')"
          >
            +
          </button>
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
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { bottomSheetScrollToTop } from "./../../../../utils/functions";
// import { getDialogOfPlaceType } from "./../../../../utils/dialogsOfConstantsLists";
import { getPlacesDialog } from "./../../../../utils/dialogsOfApi";
import { PLACE_TYPE_TOKENS } from "./../../../../utils/constantLists";
import QuotationPriceHistoryDtoItem from "./../../../../models/products/quotationPriceHistories/QuotationPriceHistoryDtoItem";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomSelectBox,
    CustomInputFloat,
    TextArea,
  },
  data() {
    return {
      // placeTypeTokenOptions: getDialogOfPlaceType(),
      placeTokensOptions: [],
    };
  },
  props: {
    quotationPriceHistory: { type: Object },
    priceQuotationDetailsToken: { type: String, default: "" },
    placeTypeToken: { type: String, default: "" },
    submitName: { type: String },
    id: { type: String, default: "id" },
    bottomSheetName: { type: String, default: "" },
  },
  methods: {
    addSlice() {
      this.quotationPriceHistory.quotationPriceHistoryDtoItemList.push(
        new QuotationPriceHistoryDtoItem({
          priceQuotationDetailsToken: this.priceQuotationDetailsToken,
        })
      );
    },
    removeSlice(index) {
      this.quotationPriceHistory.quotationPriceHistoryDtoItemList.splice(
        index,
        1
      );
    },
    // async placeTypeTokenChanged(token, index) {
    //   this.isLoading = true;
    //   this.quotationPriceHistory.quotationPriceHistoryDtoItemList[
    //     index
    //   ].placeTokensOptions = [];
    //   if (token) {
    //     let params = { placeTypeToken: token };
    //     this.quotationPriceHistory.quotationPriceHistoryDtoItemList[
    //       index
    //     ].placeTokensOptions = await getPlacesDialog(params);
    //   }
    //   this.isLoading = false;
    // },
    async getPlacesDialog() {
      this.isLoading = true;
      this.placeTokensOptions = [];
      let params = { placeTypeToken: PLACE_TYPE_TOKENS.Supplier };
      this.placeTokensOptions = await getPlacesDialog(params);
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$emit("submitForm");
    },
  },
  created() {
    // if (this.placeTypeToken) {
    //   this.placeTypeTokenChanged(this.placeTypeToken, 0);
    // }
    this.getPlacesDialog();
  },
};
</script>

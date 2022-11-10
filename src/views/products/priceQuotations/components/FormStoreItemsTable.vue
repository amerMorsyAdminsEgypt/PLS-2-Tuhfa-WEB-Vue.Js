<template>
  <div class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t("delete") }}</th>
          <th>{{ $t("edit") }}</th>
          <th>{{ $t("StoreItems.name") }}</th>
          <th>{{ $t("StoreItems.quantity") }}</th>
          <th>{{ $t("notes") }}</th>
          <th>{{ $t("PriceQuotations.details.AffiliateOperation") }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="StoreItems.length == 0">
          <tr>
            <th colspan="7">
              {{ $t("PriceQuotations.details.thereAreNoSlides") }}
            </th>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in StoreItems" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <button
                v-if="StoreItems.length > 1"
                :title="$t('delete')"
                @click.prevent="removeSlice(index)"
              >
                <img src="@/assets/images/trash.svg" />
              </button>
              <span v-else>-</span>
            </td>
            <td>
              <button
                :title="$t('edit')"
                @click.prevent="$emit('changeCurrentIndex', index)"
              >
                <img src="@/assets/images/pencil.svg" />
              </button>
            </td>
            <td>{{ isDataExist(item.storeItemName) }}</td>
            <td>
              <CustomInputInt
                :id="`${id}-table-[${index}][storeItemQuantity]`"
                :value="item.storeItemQuantity"
                v-on:changeValue="item.storeItemQuantity = $event"
                :withOutDesign="true"
              />
            </td>
            <td>
              <TextArea
                :id="`${id}-table-[${index}][priceQuotationDetalisNotes]`"
                :value="item.priceQuotationDetalisNotes"
                v-on:changeValue="item.priceQuotationDetalisNotes = $event"
                :withOutDesign="true"
              />
            </td>
            <td>
              <CustomSelectBox
                :id="`${id}-table-[${index}][affiliateOperationTypeToken]`"
                :value="item.affiliateOperationTypeToken"
                :options="affiliateOperationTypeTokenOptions"
                v-on:changeValue="item.affiliateOperationTypeToken = $event"
                :title="$t('PriceQuotations.details.AffiliateOperationSelect')"
                :imgName="'AffiliateOperationTypes.svg'"
                :openDown="true"
              />
            </td>
          </tr>
        </template>
        <tr>
          <th colspan="7">
            <button
              class="btn btn-primary btn-block"
              @click.prevent="addSlice()"
            >
              {{ $t("add") }}
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CustomInputInt from "./../../../../components/general/CustomInputInt.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import PriceQuotationDetailsItem from "./../../../../models/products/priceQuotations/PriceQuotationDetailsItem";
import { isDataExist } from "./../../../../utils/functions";
import { getDialogOfAffiliateOperationTypes } from "./../../../../utils/dialogsOfConstantsLists";

export default {
  props: ["StoreItems", "id"],
  components: { CustomInputInt, TextArea, CustomSelectBox },
  data() {
    return {
      affiliateOperationTypeTokenOptions: getDialogOfAffiliateOperationTypes(),
    };
  },
  methods: {
    addSlice() {
      this.StoreItems.push(new PriceQuotationDetailsItem());
    },
    removeSlice(index) {
      this.StoreItems.splice(index, 1);
    },
    isDataExist,
  },
};
</script>

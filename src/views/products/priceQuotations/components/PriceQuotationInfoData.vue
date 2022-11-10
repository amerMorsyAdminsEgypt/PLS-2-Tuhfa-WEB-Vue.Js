<template>
  <div class="my-card m-3">
    <span class="my-card-title">{{ $t("PriceQuotations.data") }}</span>

    <table class="my-table">
      <thead>
        <tr>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("description") }}</th>
          <th>{{ $t("notes") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ isDataExist(priceQuotation.fullCode) }}</td>
          <td>
            {{ isDataExist(priceQuotation.priceQuotationDescriptionCurrent) }}
          </td>
          <td>{{ isDataExist(priceQuotation.priceQuotationNotes) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { isDataExist } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "PriceQuotationInfoData",
  mixins: [generalMixin],
  props: ["priceQuotation"],
  methods: {
    isDataExist,
  },
};
</script>

<template>
  <div class="my-card">
    <span class="my-card-title">{{ $t("lastMoveHistory.modelName") }}</span>

    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          lastPriceQuotationHistoryWorkInfoData.userCreatedData
            ? lastPriceQuotationHistoryWorkInfoData.userCreatedData
                .userNameCurrent
            : ''
        "
        :title="$t('lastMoveHistory.userName')"
        :imgName="'users.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            lastPriceQuotationHistoryWorkInfoData.creationDate
              ? lastPriceQuotationHistoryWorkInfoData.creationDate
              : '',
            lastPriceQuotationHistoryWorkInfoData.creationTime
              ? lastPriceQuotationHistoryWorkInfoData.creationTime
              : ''
          )
        "
        :title="$t('lastMoveHistory.dateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          lastPriceQuotationHistoryWorkInfoData.quotationDetailsHistoryWorkTypeNameCurrent
        "
        :title="$t('lastMoveHistory.status')"
        :imgName="'type.svg'"
      />
    </div>
  </div>
</template>

<script>
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  props: ["lastPriceQuotationHistoryWorkInfoData"],
  components: { DataLabelGroup },
  methods: { formateDateTimeLang },
};
</script>

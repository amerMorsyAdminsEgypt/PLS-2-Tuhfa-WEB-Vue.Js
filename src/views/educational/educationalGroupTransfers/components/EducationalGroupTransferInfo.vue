<template>
  <CustomBottomSheet
    :refName="'EducationalGroupTransferInfo'"
    size="lg"
    :headerText="$t('EducationalGroupTransfers.data')"
    :headerIcon="educationalGroupTransfer.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            educationalGroupTransfer.educationalGroupTransferringDate,
            educationalGroupTransfer.educationalGroupTransferringTime
          )
        "
        :title="$t('EducationalGroupTransfers.dateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          educationalGroupTransfer.educationalGroupTransferringAmountValueWithCurrency
        "
        :title="$t('EducationalGroupTransfers.amount')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroupTransfer.educationalGroupTransferringReasonAr"
        :title="$t('general.reasonAr')"
        :imgName="'reason.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroupTransfer.educationalGroupTransferringReasonEn"
        :title="$t('general.reasonEn')"
        :imgName="'reason.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroupTransfer.educationalGroupTransferringReasonUnd"
        :title="$t('general.reasonUnd')"
        :imgName="'reason.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroupTransfer.educationalGroupTransferringNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["educationalGroupTransfer"],
  methods: {
    formateDateTimeLang,
  },
};
</script>

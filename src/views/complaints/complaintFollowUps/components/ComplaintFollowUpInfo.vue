<template>
  <CustomBottomSheet
    :refName="'ComplaintFollowUpInfo'"
    size="xl"
    :headerText="$t('ComplaintFollowUps.data')"
    :headerIcon="complaintFollowUp.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintFollowUp.fullCode"
        :title="$t('ComplaintFollowUps.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintFollowUp.complaintFollowUpTAr"
        :title="$t('ComplaintFollowUps.textAr')"
        :imgName="'complaintFollowUps.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintFollowUp.complaintFollowUpTextEn"
        :title="$t('ComplaintFollowUps.textEn')"
        :imgName="'complaintFollowUps.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintFollowUp.complaintFollowUpTextUnd"
        :title="$t('ComplaintFollowUps.textUnd')"
        :imgName="'complaintFollowUps.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintFollowUp.userFollowUpData.userNameCurrent"
        :title="$t('ComplaintFollowUps.followUpBy')"
        :imgName="'user.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintFollowUp.complaintFollowUpSideTypeNameCurrent"
        :title="$t('ComplaintFollowUps.followUpSideType')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          complaintFollowUp.complaintTypeInfoData.complaintTypeNameCurrent
        "
        :title="$t('ComplaintTypes.name')"
        :imgName="'complaintTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          complaintFollowUp.complaintSectorInfoData.complaintSectorNameCurrent
        "
        :title="$t('ComplaintSectors.name')"
        :imgName="'complaintSectors.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { COMPLAINT_STATUS_TYPE } from "./../../../../utils/constantLists";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["complaintFollowUp"],
  data() {
    return {
      COMPLAINT_STATUS_TYPE: COMPLAINT_STATUS_TYPE,
    };
  },
  methods: {
    formateDateTimeLang,
  },
};
</script>

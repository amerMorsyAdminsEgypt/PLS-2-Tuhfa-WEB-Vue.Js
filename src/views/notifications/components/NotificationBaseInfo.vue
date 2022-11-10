<template>
  <CustomBottomSheet
    :refName="'NotificationBaseInfo'"
    size="xl"
    :headerText="$t('Notifications.data')"
    :headerIcon="notification.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-9'"
        :value="notification.titleCurrent"
        :title="$t('title')"
        :imgName="'notifications.svg'"
      />
      <DataLabelGroup
        :className="'col-md-3'"
        :value="notification.dateTimeAgo"
        :title="$t('time')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="notification.bodyCurrent"
        :title="$t('details')"
        :imgName="'notifications.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import { formateDateTimeLang } from "./../../../utils/functions";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["notification"],
  methods: {
    formateDateTimeLang,
  },
  async created() {},
};
</script>

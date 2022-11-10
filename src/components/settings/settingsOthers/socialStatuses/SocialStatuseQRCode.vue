<template>
  <div>
    <CustomBottomSheet :refName="'SocialStatuseQRCode'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/qr-code.svg" class="icon-lg" />
        {{ $t("SocialStatuses.qrCode") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="socialStatuse.fullCode"
          :title="$t('SocialStatuses.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="socialStatuse.socialStatuseNameCurrent"
          :title="$t('SocialStatuses.name')"
          :imgName="'socialStatuses.svg'"
        />
        <div class="img-info">
          <qrcode-vue :value="socialStatuse.fullCode" :size="300" level="H" />
        </div>
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    QrcodeVue,
  },
  data() {
    return {};
  },
  props: ["socialStatuse"],
  methods: {},
};
</script>

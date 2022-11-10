<template>
  <div>
    <CustomBottomSheet :refName="'GeographicalDistributionQRCode'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/qr-code.svg" class="icon-lg" />
        {{ $t("GeographicalDistributions.qrCode") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.fullCode"
          :title="$t('GeographicalDistributions.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionNameCurrent"
          :title="$t('GeographicalDistributions.name')"
          :imgName="'geographicalDistributions.svg'"
        />
        <div class="img-info">
          <qrcode-vue
            :value="geographicalDistribution.fullCode"
            :size="300"
            level="H"
          />
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
  props: ["geographicalDistribution"],
  methods: {},
};
</script>

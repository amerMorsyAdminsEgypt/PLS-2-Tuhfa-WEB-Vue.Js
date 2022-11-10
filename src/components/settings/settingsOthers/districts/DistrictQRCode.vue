<template>
  <div>
    <CustomBottomSheet :refName="'DistrictQRCode'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/qr-code.svg" class="icon-lg" />
        {{ $t("Districts.qrCode") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.fullCode"
          :title="$t('Districts.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.districtNameCurrent"
          :title="$t('Districts.name')"
          :imgName="'districts.svg'"
        />
        <div class="img-info">
          <qrcode-vue :value="district.fullCode" :size="300" level="H" />
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
  props: ["district"],
  methods: {},
};
</script>

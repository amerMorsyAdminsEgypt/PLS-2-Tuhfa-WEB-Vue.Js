<template>
  <div>
    <CustomBottomSheet :refName="'BloodTypeQRCode'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/qr-code.svg" class="icon-lg" />
        {{ $t("BloodTypes.qrCode") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="bloodType.fullCode"
          :title="$t('BloodTypes.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="bloodType.bloodTypeNameCurrent"
          :title="$t('BloodTypes.name')"
          :imgName="'BloodTypes.svg'"
        />
        <div class="img-info">
          <qrcode-vue :value="bloodType.fullCode" :size="300" level="H" />
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
  props: ["bloodType"],
  methods: {},
};
</script>

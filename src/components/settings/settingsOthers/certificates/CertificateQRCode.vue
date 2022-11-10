<template>
  <div>
    <CustomBottomSheet :refName="'CertificateQRCode'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/qr-code.svg" class="icon-lg" />
        {{ $t("Certificates.qrCode") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="certificate.fullCode"
          :title="$t('Certificates.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="certificate.certificateNameCurrent"
          :title="$t('Certificates.name')"
          :imgName="'certificates.svg'"
        />
        <div class="img-info">
          <qrcode-vue :value="certificate.fullCode" :size="300" level="H" />
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
  props: ["certificate"],
  methods: {},
};
</script>

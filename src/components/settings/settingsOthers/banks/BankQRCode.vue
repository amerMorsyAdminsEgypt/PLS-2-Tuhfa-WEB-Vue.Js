<template>
  <div>
    <CustomBottomSheet :refName="'BankQRCode'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/qr-code.svg" class="icon-lg" />
        {{ $t("Banks.qrCode") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.fullCode"
          :title="$t('Banks.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.bankNameCurrent"
          :title="$t('Banks.name')"
          :imgName="'banks.svg'"
        />
        <div class="img-info">
          <qrcode-vue :value="bank.fullCode" :size="300" level="H" />
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
  props: ["bank"],
  methods: {},
};
</script>

<template>
  <div>
    <CustomBottomSheet :refName="'InsuranceCompanyQRCode'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/qr-code.svg" class="icon-lg" />
        {{ $t("InsuranceCompanies.qrCode") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="insuranceCompany.fullCode"
          :title="$t('InsuranceCompanies.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="insuranceCompany.insuranceCompanyNameCurrent"
          :title="$t('InsuranceCompanies.name')"
          :imgName="'insuranceCompanies.svg'"
        />
        <div class="img-info">
          <qrcode-vue
            :value="insuranceCompany.fullCode"
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
  props: ["insuranceCompany"],
  methods: {},
};
</script>

<template>
  <div>
    <CustomBottomSheet :refName="'MilitaryStatusTypeQRCode'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/qr-code.svg" class="icon-lg" />
        {{ $t("MilitaryStatusTypes.qrCode") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="militaryStatusType.fullCode"
          :title="$t('MilitaryStatusTypes.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="militaryStatusType.militaryStatusTypeNameCurrent"
          :title="$t('MilitaryStatusTypes.name')"
          :imgName="'militaryStatus.svg'"
        />
        <div class="img-info">
          <qrcode-vue
            :value="militaryStatusType.fullCode"
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
  props: ["militaryStatusType"],
  methods: {},
};
</script>

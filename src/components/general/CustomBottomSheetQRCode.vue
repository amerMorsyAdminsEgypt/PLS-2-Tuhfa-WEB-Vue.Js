<template>
  <div>
    <CustomBottomSheet
      :refName="refName"
      size="md"
      :headerText="$t('general.qrCode')"
      :headerIcon="icon"
    >
      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="code"
          :title="codeTitle"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="name"
          :title="nameTitle"
          :imgName="nameIcon"
        />
        <div class="img-info">
          <qrcode-vue :value="code" :size="300" render-as="svg" level="H" />
        </div>
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import CustomBottomSheet from "./CustomBottomSheet.vue";
import DataLabelGroup from "./DataLabelGroup.vue";
import QrcodeVue from "qrcode.vue";
import icon from "@/assets/images/qr-code.svg";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    QrcodeVue,
  },
  props: {
    refName: {
      type: String,
      default: "bottomSheetComponent",
    },
    code: {
      type: String,
      default: "",
    },
    codeTitle: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    nameTitle: {
      type: String,
      default: "",
    },
    nameIcon: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      icon,
    };
  },
};
</script>

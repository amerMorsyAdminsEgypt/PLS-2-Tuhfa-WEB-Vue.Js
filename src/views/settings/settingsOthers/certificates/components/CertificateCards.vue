<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(certificate, index) in certificatesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="certificate.certificateNameCurrent"
      :description="certificate.fullCode"
      :imagePath="certificate.certificateImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setCertificateData(certificate);
            openBottomSheet('CertificateInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCertificateData(certificate);
            openBottomSheet('CertificateQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCertificateEdit())">
        <button
          @click="
            setCertificateData(certificate);
            openBottomSheet('CertificateUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCertificateFinaleDelete())">
        <button
          v-b-modal.CertificateDelete
          :title="$t('delete')"
          @click="setCertificateData(certificate)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCertificateChangeActivationType())">
        <button
          v-b-modal.CertificateChangeActivationType
          :title="$t('changeActivationType')"
          @click="setCertificateData(certificate)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCertificateData(certificate);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../../utils/functions";
import {
  hasCertificateEdit,
  hasCertificateFinaleDelete,
  hasCertificateChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["certificatesData", "filterData", "defaultImg"],
  methods: {
    setCertificateData(certificate) {
      this.$emit("setCertificateData", certificate);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasCertificateEdit,
    hasCertificateFinaleDelete,
    hasCertificateChangeActivationType,
  },
};
</script>

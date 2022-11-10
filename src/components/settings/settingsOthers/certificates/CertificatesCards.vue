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
          :title="$t('Certificates.qrCode')"
        >
          <qrcode-vue :value="certificate.fullCode" :size="40" level="H" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCertificateEdit())">
        <router-link
          :to="{
            name: 'CertificateEdit',
            params: {
              certificateToken: certificate.certificateToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
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
      <li>
        <!-- v-if="
            checkPrivilege(usersPrivilegeData.usersPrivilegeCertificate.update)
          " -->
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setCertificateData(certificate);
            openBottomSheet('ActionsData');
          "
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  isDataExist,
  checkPrivilege,
  fullPathFileFromServer,
} from "@/utils/functions";
import {
  hasCertificateEdit,
  hasCertificateFinaleDelete,
} from "@/utils/privilegeHelper";
import CustomCard from "@/components/general/CustomCard.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
    QrcodeVue,
  },
  data() {
    return {};
  },
  props: ["certificatesData", "certificateData", "pagination", "defaultImg"],
  methods: {
    setCertificateData(certificate) {
      this.$emit("setCertificateData", certificate);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
    hasCertificateEdit,
    hasCertificateFinaleDelete,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>

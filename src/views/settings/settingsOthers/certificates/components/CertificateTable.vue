<template>
  <div v-if="certificatesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Certificates.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(certificate, index) in certificatesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  certificate.certificateImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(certificate.fullCode) }}</td>
          <td>
            {{ isDataExist(certificate.certificateNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setCertificateData(certificate);
                    openBottomSheet('CertificateInfo');
                  "
                  :title="$t('info')"
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "CertificatesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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

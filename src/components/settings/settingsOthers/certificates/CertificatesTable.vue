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
        <tr
          v-for="(certificate, index) in certificatesData"
          :key="certificate.certificateToken"
        >
          <td>{{ ++index + pagination.currentIndex }}</td>
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
                  :title="$t('Certificates.qrCode')"
                >
                  <qrcode-vue
                    :value="certificate.fullCode"
                    :size="40"
                    level="H"
                  />
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
              <!-- v-if="
                  checkPrivilege(
                    usersPrivilegeData.usersPrivilegeCertificate.update
                  )
                " -->
              <li>
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
import FloatingMenu from "@/components/general/FloatingMenu.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "CertificatesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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

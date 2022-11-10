<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(governorate, index) in governoratesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="governorate.governorateNameCurrent"
      :description="governorate.fullCode"
      :imagePath="governorate.governorateImagePath"
      :defaultImg="defaultImg"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setGovernorateData(governorate);
            openBottomSheet('GovernorateInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setGovernorateData(governorate);
            openBottomSheet('GovernorateQRCode');
          "
          :title="$t('Governorates.qrCode')"
        >
          <qrcode-vue :value="governorate.fullCode" :size="40" level="H" />
        </button>
      </li>
      <li>
        <router-link
          :to="{
            name: 'GovernorateEdit',
            params: {
              governorateToken: governorate.governorateToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
      </li>
      <li>
        <button
          v-b-modal.GovernorateDelete
          :title="$t('delete')"
          @click="setGovernorateData(governorate)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li>
        <!-- v-if="
            checkPrivilege(usersPrivilegeData.usersPrivilegeGovernorate.update)
          " -->
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setGovernorateData(governorate);
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
  props: ["governoratesData", "governorateData", "pagination", "defaultImg"],
  methods: {
    setGovernorateData(governorate) {
      this.$emit("setGovernorateData", governorate);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>

<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(bloodType, index) in bloodTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="bloodType.bloodTypeNameCurrent"
      :description="bloodType.fullCode"
      :imagePath="bloodType.bloodTypeImagePath"
      :defaultImg="defaultImg"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setBloodTypeData(bloodType);
            openBottomSheet('BloodTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setBloodTypeData(bloodType);
            openBottomSheet('BloodTypeQRCode');
          "
          :title="$t('BloodTypes.qrCode')"
        >
          <qrcode-vue :value="bloodType.fullCode" :size="40" level="H" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBloodTypeEdit())">
        <router-link
          :to="{
            name: 'BloodTypeEdit',
            params: {
              bloodTypeToken: bloodType.bloodTypeToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
      </li>
      <li v-if="checkPrivilege(hasBloodTypeFinaleDelete())">
        <button
          v-b-modal.BloodTypeDelete
          :title="$t('delete')"
          @click="setBloodTypeData()"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li>
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setBloodTypeData();
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
  hasBloodTypeEdit,
  hasBloodTypeFinaleDelete,
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
  props: ["bloodTypesData", "bloodTypeData", "pagination", "defaultImg"],
  methods: {
    setBloodTypeData(bloodType) {
      this.$emit("setBloodTypeData", bloodType);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
    hasBloodTypeEdit,
    hasBloodTypeFinaleDelete,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>

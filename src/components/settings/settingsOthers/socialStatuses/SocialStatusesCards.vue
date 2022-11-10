<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(socialStatuse, index) in socialStatusesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="socialStatuse.socialStatuseNameCurrent"
      :description="socialStatuse.fullCode"
      :imagePath="socialStatuse.socialStatuseImagePath"
      :defaultImg="defaultImg"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setSocialStatuseData(socialStatuse);
            openBottomSheet('SocialStatuseInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSocialStatuseData(socialStatuse);
            openBottomSheet('SocialStatuseQRCode');
          "
          :title="$t('SocialStatuses.qrCode')"
        >
          <qrcode-vue :value="socialStatuse.fullCode" :size="40" level="H" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSocialStatuseEdit())">
        <router-link
          :to="{
            name: 'SocialStatuseEdit',
            params: {
              socialStatuseToken: socialStatuse.socialStatuseToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
      </li>
      <li v-if="checkPrivilege(hasSocialStatuseFinaleDelete())">
        <button
          v-b-modal.SocialStatuseDelete
          :title="$t('delete')"
          @click="setSocialStatuseData(socialStatuse)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li>
        <!-- v-if="
            checkPrivilege(
              usersPrivilegeData.usersPrivilegeSocialStatuse.update
            )
          " -->
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setSocialStatuseData(socialStatuse);
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
  hasSocialStatuseEdit,
  hasSocialStatuseFinaleDelete,
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
  props: [
    "socialStatusesData",
    "socialStatuseData",
    "pagination",
    "defaultImg",
  ],
  methods: {
    setSocialStatuseData(socialStatuse) {
      this.$emit("setSocialStatuseData", socialStatuse);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
    hasSocialStatuseEdit,
    hasSocialStatuseFinaleDelete,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>

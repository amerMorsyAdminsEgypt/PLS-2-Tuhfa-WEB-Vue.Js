<template>
  <div v-if="socialStatusesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("SocialStatuses.data") }}</th>
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
          v-for="(socialStatuse, index) in socialStatusesData"
          :key="socialStatuse.socialStatuseToken"
        >
          <td>{{ ++index + pagination.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  socialStatuse.socialStatuseImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(socialStatuse.fullCode) }}</td>
          <td>
            {{ isDataExist(socialStatuse.socialStatuseNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setSocialStatuseData(socialStatuse);
                    openBottomSheet('SocialStatuseInfo');
                  "
                  :title="$t('info')"
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
                  <qrcode-vue
                    :value="socialStatuse.fullCode"
                    :size="40"
                    level="H"
                  />
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
              <!-- v-if="
                  checkPrivilege(
                    usersPrivilegeData.usersPrivilegeSocialStatuse.update
                  )
                " -->
              <li>
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
  hasSocialStatuseEdit,
  hasSocialStatuseFinaleDelete,
} from "@/utils/privilegeHelper";
import FloatingMenu from "@/components/general/FloatingMenu.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "SocialStatusesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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

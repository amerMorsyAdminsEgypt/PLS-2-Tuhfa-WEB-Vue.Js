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
        <tr v-for="(socialStatuse, index) in socialStatusesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
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
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasSocialStatuseEdit())">
                <button
                  @click="
                    setSocialStatuseData(socialStatuse);
                    openBottomSheet('SocialStatuseUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
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
              <li v-if="checkPrivilege(hasSocialStatuseChangeActivationType())">
                <button
                  v-b-modal.SocialStatuseChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setSocialStatuseData(socialStatuse)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setSocialStatuseData(socialStatuse);
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
  hasSocialStatuseEdit,
  hasSocialStatuseFinaleDelete,
  hasSocialStatuseChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "SocialStatusesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["socialStatusesData", "filterData", "defaultImg"],
  methods: {
    setSocialStatuseData(socialStatuse) {
      this.$emit("setSocialStatuseData", socialStatuse);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasSocialStatuseEdit,
    hasSocialStatuseFinaleDelete,
    hasSocialStatuseChangeActivationType,
  },
};
</script>

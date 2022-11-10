<template>
  <div v-if="sharedMediasData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("SharedMedias.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sharedMedia, index) in sharedMediasData" :key="index">
          <td>
            {{ ++index + filterData.currentIndex }}
          </td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  sharedMedia.sharedMediaImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(sharedMedia.fullCode) }}</td>
          <td>
            {{ isDataExist(sharedMedia.sharedMediaNameCurrent) }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setSharedMediaData(sharedMedia);
                    openBottomSheet('SharedMediaInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setSharedMediaData(sharedMedia);
                    openBottomSheet('SharedMediaQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasSharedMediaEdit())">
                <button
                  @click="
                    setSharedMediaData(sharedMedia);
                    openBottomSheet('SharedMediaUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasSharedMediaFinaleDelete())">
                <button
                  v-b-modal.SharedMediaDelete
                  :title="$t('delete')"
                  @click="setSharedMediaData(sharedMedia)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasSharedMediaWithSpaceStorageMediaCancel())
                "
              >
                <button
                  @click="
                    setSharedMediaData(sharedMedia);
                    openBottomSheet('SharedMediaWithSpaceStorageMediaUnshare');
                  "
                  :title="$t('SharedMediaWithSpaceStorageMedias.unshare')"
                >
                  <img src="@/assets/images/unshare.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasSharedMediaChangeActivationType())">
                <button
                  v-b-modal.SharedMediaChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setSharedMediaData(sharedMedia)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setSharedMediaData(sharedMedia);
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
  formateDateTimeLang,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";
import {
  hasSharedMediaEdit,
  hasSharedMediaFinaleDelete,
  hasSharedMediaWithSpaceStorageMediaCancel,
  hasSharedMediaChangeActivationType,
} from "./../../../utils/privilegeHelper";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "SharedMediasTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["sharedMediasData", "filterData", "defaultImg"],
  data() {
    return {};
  },
  methods: {
    setSharedMediaData(sharedMedia) {
      this.$emit("setSharedMediaData", sharedMedia);
    },
    checkPrivilege,
    formateDateTimeLang,
    isDataExist,
    fullPathFileFromServer,
    hasSharedMediaEdit,
    hasSharedMediaFinaleDelete,
    hasSharedMediaWithSpaceStorageMediaCancel,
    hasSharedMediaChangeActivationType,
  },
};
</script>

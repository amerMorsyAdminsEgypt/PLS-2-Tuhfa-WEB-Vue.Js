<template>
  <div v-if="sharedMediaFoldersData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("SharedMediaFolders.data") }}</th>
          <th colspan="2">{{ $t("SharedMediaFolders.sharedWith") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("SharedMediaFolders.title") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("general.type") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(sharedMediaFolder, index) in sharedMediaFoldersData"
          :key="index"
        >
          <td>
            {{ ++index + filterData.currentIndex }}
          </td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  sharedMediaFolder.sharedMediaFolderImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(sharedMediaFolder.fullCode) }}</td>
          <td>
            {{ isDataExist(sharedMediaFolder.sharedMediaFolderNameCurrent) }}
          </td>
          <template
            v-if="
              sharedMediaFolder.sharedMediaFolderTypeToken ==
              SHARED_MEDIA_TYPE.Genral
            "
          >
            <td>-</td>
            <td>{{ $t("SharedMediaFolders.genral") }}</td>
          </template>
          <template
            v-if="
              sharedMediaFolder.sharedMediaFolderTypeToken ==
              SHARED_MEDIA_TYPE.EducationalCategory
            "
          >
            <td>
              {{
                isDataExist(
                  sharedMediaFolder.educationalCategoryInfoData
                    .educationalCategoryNameCurrent
                )
              }}
            </td>

            <td>{{ $t("SharedMediaFolders.educationalCategory") }}</td>
          </template>
          <template
            v-if="
              sharedMediaFolder.sharedMediaFolderTypeToken ==
              SHARED_MEDIA_TYPE.EducationalGroup
            "
          >
            <td>
              {{
                isDataExist(
                  sharedMediaFolder.educationalGroupInfoData
                    .educationalGroupNameCurrent
                )
              }}
            </td>

            <td>{{ $t("SharedMediaFolders.educationalGroup") }}</td>
          </template>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="checkPrivilege(hasSharedMedia())">
                <router-link
                  :to="{
                    name: 'SharedMedias',
                    params: {
                      sharedMediaFolderToken:
                        sharedMediaFolder.sharedMediaFolderToken,
                    },
                  }"
                  :title="$t('SharedMedias.modelName')"
                >
                  <img src="@/assets/images/media.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setSharedMediaFolderData(sharedMediaFolder);
                    openBottomSheet('SharedMediaFolderInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setSharedMediaFolderData(sharedMediaFolder);
                    openBottomSheet('SharedMediaFolderQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasSharedMediaFolderEdit())">
                <button
                  @click="
                    setSharedMediaFolderData(sharedMediaFolder);
                    openBottomSheet('SharedMediaFolderUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasSharedMediaFolderFinaleDelete())">
                <button
                  v-b-modal.SharedMediaFolderDelete
                  :title="$t('delete')"
                  @click="setSharedMediaFolderData(sharedMediaFolder)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasSharedMediaFolderChangeActivationType())
                "
              >
                <button
                  v-b-modal.SharedMediaFolderChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setSharedMediaFolderData(sharedMediaFolder)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setSharedMediaFolderData(sharedMediaFolder);
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
  hasSharedMediaFolderEdit,
  hasSharedMedia,
  hasSharedMediaFolderFinaleDelete,
  hasSharedMediaFolderChangeActivationType,
} from "./../../../utils/privilegeHelper";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";
import { SHARED_MEDIA_TYPE } from "./../../../utils/constantLists";

export default {
  name: "SharedMediaFoldersTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["sharedMediaFoldersData", "filterData", "defaultImg"],
  data() {
    return {
      SHARED_MEDIA_TYPE,
    };
  },
  methods: {
    setSharedMediaFolderData(sharedMediaFolder) {
      this.$emit("setSharedMediaFolderData", sharedMediaFolder);
    },
    checkPrivilege,
    formateDateTimeLang,
    isDataExist,
    fullPathFileFromServer,
    hasSharedMediaFolderEdit,
    hasSharedMedia,
    hasSharedMediaFolderFinaleDelete,
    hasSharedMediaFolderChangeActivationType,
  },
};
</script>

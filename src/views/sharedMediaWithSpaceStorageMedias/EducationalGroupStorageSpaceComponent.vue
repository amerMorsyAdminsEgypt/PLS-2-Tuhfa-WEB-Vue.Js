<template>
  <div class="row">
    <PreLoader v-if="isLoading" />

    <CustomSelectBox
      v-if="id == 'add'"
      :className="'col-md-12'"
      :id="`${id}-educationalGroupToken`"
      :value="
        sharedMediaWithSpaceStorageMedia.storageSpaceData.educationalGroupData
          .educationalGroupToken
      "
      :options="educationalGroupTokenOptions"
      v-on:changeValue="
        sharedMediaWithSpaceStorageMedia.storageSpaceData.educationalGroupData.educationalGroupToken =
          $event;
        setStorageSpaceData($event);
      "
      :title="$t('EducationalGroups.select')"
      :imgName="'EducationalGroups.svg'"
    />

    <template v-if="hasStorageSpaceData">
      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th rowspan="2">#</th>
              <th rowspan="2">
                <input
                  type="checkbox"
                  id="hasStorageSpaceData-selectAll"
                  @click="selectAll()"
                  v-model="selectedAll"
                  class="checkbox"
                />
                {{ $t("general.all") }}
              </th>
              <th colspan="4">{{ $t("StorageSpaces.data") }}</th>
            </tr>
            <tr>
              <th>{{ $t("general.image") }}</th>
              <th>{{ $t("general.code") }}</th>
              <th class="cell-lg">{{ $t("general.name") }}</th>
              <th rowspan="2">{{ $t("EducationalGroups.name") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(storageSpace, index) in storageSpaceData" :key="index">
              <td>
                {{ ++index + storageSpaces.filterData.currentIndex }}
              </td>
              <td>
                <input
                  type="checkbox"
                  v-model="
                    sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup
                  "
                  :value="storageSpace.storageSpaceToken"
                  @click="select(storageSpace.storageSpaceToken)"
                  class="checkbox"
                />
              </td>
              <td>
                <img
                  class="item-img-table no-border"
                  :src="
                    fullPathFileFromServer(
                      storageSpace.storageSpaceImagePath,
                      sharedMediaWithSpaceStorageMedia.defaultImg
                    )
                  "
                  :onerror="`this.src='${sharedMediaWithSpaceStorageMedia.defaultImg}'`"
                />
              </td>
              <td>{{ isDataExist(storageSpace.fullCode) }}</td>
              <td>
                {{ isDataExist(storageSpace.storageSpaceNameCurrent) }}
              </td>
              <td>
                {{
                  isDataExist(
                    storageSpace.educationalGroupData
                      .educationalGroupNameCurrent
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <ExceptionWithImg
      v-if="exceptionMsg"
      :msg="exceptionMsg"
      :image="exceptionImg"
    />
  </div>
</template>

<script>
import CustomSelectBox from "./../../components/general/CustomSelectBox.vue";
// import { SYSTEM_TYPE } from "./../../utils/constantLists";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import { STATUS } from "./../../utils/constants";
import StorageSpaces from "./../../models/storageSpaces/StorageSpaces";
import apiStorageSpace from "./../../api/storageSpace";
import { isDataExist, fullPathFileFromServer } from "./../../utils/functions";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { getEducationalGroupsDialog } from "./../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    CustomSelectBox,
    PreLoader,
    ExceptionWithImg,
  },
  data() {
    return {
      isLoading: false,
      storageSpaces: new StorageSpaces(),
      selectedAll: false,
      folderStorageSpaceData: [],
      educationalGroupTokenOptions: [],
    };
  },
  props: {
    sharedMediaWithSpaceStorageMedia: {
      type: Object,
    },
    id: {
      type: String,
      default: "id",
    },
    modelName: {
      type: String,
      default: "",
    },
    storageSpaceTypeToken: {
      type: String,
      default: "",
    },
    storageSpaceDataList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    hasStorageSpaceData() {
      return this.folderStorageSpaceData.length != 0;
    },

    storageSpaceData() {
      return this.folderStorageSpaceData;
    },
  },
  methods: {
    isDataExist,
    fullPathFileFromServer,
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.isLoading = false;
    },

    async setStorageSpaceData(mainToken) {
      this.isLoading = true;
      this.folderStorageSpaceData = [];
      this.storageSpaces.filterData.mainToken = mainToken;
      if (mainToken) {
        try {
          this.storageSpaces.filterData.activationTypeTokens =
            this.generalSetting[this.modelName].activationTypeTokens;
          this.storageSpaces.filterData.storageSpaceTypeToken =
            this.storageSpaceTypeToken;
          this.storageSpaces.filterData.getOnlyParentStatus = true;

          const response = await apiStorageSpace.getAll(
            this.storageSpaces.filterData
          );
          if (response.data.status == STATUS.SUCCESS) {
            this.exceptionMsg = null;
            this.folderStorageSpaceData = response.data.storageSpacesData;
          } else if (response.data.status == STATUS.NO_INTERNET) {
            this.exceptionMsg = response.data.msg;
            this.exceptionImg = "illustrator-noInternet.svg";
          } else if (response.data.status == STATUS.NO_CONTENT) {
            this.exceptionMsg = response.data.msg;
            this.exceptionImg = "illustrator-noData.svg";
          } else if (response.data.status == STATUS.INVALID_TOKEN) {
            this.$store.dispatch("logoutUser", response.data.msg);
          } else {
            this.exceptionMsg = response.data.msg;
            this.exceptionImg = null;
          }
        } catch (error) {
          this.exceptionMsg = this.$t("errorCatch");
          this.exceptionImg = null;
        }
      }

      this.isLoading = false;
    },
    // ACTIONS
    selectAll() {
      this.sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup = [];
      this.selectedAll = !this.selectedAll;
      if (this.selectedAll) {
        for (let ietm in this.folderStorageSpaceData) {
          this.sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup.push(
            this.folderStorageSpaceData[ietm].storageSpaceToken
          );
        }
      }
    },
    select(value) {
      const indexItem =
        this.sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup.indexOf(
          value
        );

      if (indexItem > -1) {
        this.sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup.splice(
          indexItem,
          1
        );
      }
      setTimeout(() => {
        if (
          this.folderStorageSpaceData.length ==
          this.sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup.length
        ) {
          this.selectedAll = true;
        } else {
          this.selectedAll = false;
        }
      }, 1000);
    },
  },
  created() {
    if (this.id == "add") {
      this.getEducationalGroupsDialog();
    }
    if (this.id == "unshare") {
      this.folderStorageSpaceData = this.storageSpaceDataList;
      this.selectAll();
    }
  },
};
</script>

<template>
  <div class="row">
    <PreLoader v-if="isLoading" />
    <CustomSelectBox
      :className="'col-md-12'"
      :id="`${id}-sharedMediaFolderToken`"
      :value="
        sharedMediaWithSpaceStorageMedia.sharedMediaData
          .sharedMediaFolderInfoData.sharedMediaFolderToken
      "
      :options="sharedMediaFolderTokenOptions"
      v-on:changeValue="
        sharedMediaWithSpaceStorageMedia.sharedMediaData.sharedMediaFolderInfoData.sharedMediaFolderToken =
          $event;
        selectedAll = false;
        setSharedMediaData($event);
      "
      :title="$t('SharedMediaFolders.select')"
      :imgName="'sharedMediaFolders.svg'"
    />
    <template v-if="hasSharedMediaData">
      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th rowspan="2">#</th>
              <th rowspan="2">
                <input
                  type="checkbox"
                  id="sharedMediaData-selectAll"
                  @click="selectAll()"
                  v-model="selectedAll"
                  class="checkbox"
                />
                {{ $t("general.all") }}
              </th>
              <th :colspan="showImgStatus ? 4 : 3">
                {{ $t("SharedMedias.data") }}
              </th>
            </tr>
            <tr>
              <th v-if="showImgStatus">{{ $t("general.image") }}</th>
              <th>{{ $t("general.code") }}</th>
              <th class="cell-lg">{{ $t("general.name") }}</th>
              <th>{{ $t("general.type") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(sharedMedia, index) in filteredSharedMediaData"
              :key="index"
            >
              <td>
                {{ ++index + sharedMedias.filterData.currentIndex }}
              </td>
              <td>
                <input
                  type="checkbox"
                  v-model="sharedMediaWithSpaceStorageMedia.sharedMediaTokens"
                  :value="sharedMedia.sharedMediaToken"
                  @click="select(sharedMedia.sharedMediaToken)"
                  class="checkbox"
                />
              </td>
              <td v-if="showImgStatus">
                <img
                  class="item-img-table"
                  :src="
                    fullPathFileFromServer(
                      sharedMedia.sharedMediaImagePath,
                      sharedMediaWithSpaceStorageMedia.defaultImg
                    )
                  "
                  :onerror="`this.src='${sharedMediaWithSpaceStorageMedia.defaultImg}'`"
                />
              </td>
              <td>{{ isDataExist(sharedMedia.fullCode) }}</td>
              <td>
                {{ isDataExist(sharedMedia.sharedMediaNameCurrent) }}
              </td>
              <td>
                {{ isDataExist(sharedMedia.sharedMediaFileTypeNameCurrent) }}
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
import { mapGetters } from "vuex";
import CustomSelectBox from "./../../components/general/CustomSelectBox.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import generalMixin from "./../../utils/generalMixin";
import { getSharedMediaFoldersDialog } from "./../../utils/dialogsOfApi";
import { STATUS } from "./../../utils/constants";
import SharedMedias from "./../../models/sharedMedias/SharedMedias";
import apiSharedMedia from "./../../api/sharedMedia";
import { isDataExist, fullPathFileFromServer } from "./../../utils/functions";

export default {
  mixins: [generalMixin],
  components: {
    CustomSelectBox,
    PreLoader,
    ExceptionWithImg,
  },
  data() {
    return {
      isLoading: false,
      sharedMediaFolderTokenOptions: [],
      sharedMedias: new SharedMedias(),
      selectedAll: false,
      hasSharedMediaData: false,
      filteredSharedMediaData: [],
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
    showImgStatus: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters([
      "emmitSharedMediaDataListStatus",
      "containerSharedMediaTokens",
    ]),
    sharedMediaData() {
      return this.sharedMediaWithSpaceStorageMedia.sharedMediaData;
    },
    sharedMediaTokens() {
      return this.sharedMediaWithSpaceStorageMedia.sharedMediaTokens;
    },
  },
  watch: {
    sharedMediaTokens: function () {
      if (this.filteredSharedMediaData.length) {
        let sharedMediaDataList = [];
        this.sharedMediaWithSpaceStorageMedia.sharedMediaTokens.forEach(
          (token) => {
            sharedMediaDataList.push(
              this.filteredSharedMediaData.filter(
                (sharedMediaData) => sharedMediaData.sharedMediaToken == token
              )[0]
            );
          }
        );
        this.emmitSharedMediaDataList(
          this.sharedMediaWithSpaceStorageMedia.sharedMediaTokens,
          sharedMediaDataList
        );
      }
    },
  },
  methods: {
    isDataExist,
    fullPathFileFromServer,
    emmitSharedMediaDataList(
      selectorSharedMediaTokens,
      selectorSharedMediaData
    ) {
      let selectorFolderTokenMediaTokensAndData = {
        folderToken:
          this.sharedMediaWithSpaceStorageMedia.sharedMediaData
            .sharedMediaFolderInfoData.sharedMediaFolderToken,
        mediaTokens: selectorSharedMediaTokens,
        mediaData: selectorSharedMediaData,
      };
      this.$emit("mediaPackageSelectorUpdated", {
        selectorFolderTokenMediaTokensAndData,
      });
    },
    async updateSelectedList(listOfSharedMediaTokens) {
      listOfSharedMediaTokens.forEach((element) => {
        this.select(element);
      });
    },
    async getSharedMediaFoldersDialog() {
      this.isLoading = true;
      this.sharedMediaFolderTokenOptions = await getSharedMediaFoldersDialog();
      this.isLoading = false;
    },
    async setSharedMediaData(sharedMediaFolderToke) {
      this.isLoading = true;
      this.hasSharedMediaData = false;
      this.filteredSharedMediaData = [];
      this.sharedMediaWithSpaceStorageMedia.sharedMediaTokens = [];
      this.sharedMedias.filterData.sharedMediaFolderToken =
        sharedMediaFolderToke;

      if (sharedMediaFolderToke) {
        try {
          const response = await apiSharedMedia.getAll(
            this.sharedMedias.filterData
          );
          if (response.data.status == STATUS.SUCCESS) {
            this.exceptionMsg = null;
            this.hasSharedMediaData = true;
            this.filteredSharedMediaData = response.data.sharedMediaData;
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
      this.sharedMediaWithSpaceStorageMedia.sharedMediaTokens = [];
      this.selectedAll = !this.selectedAll;
      if (this.selectedAll) {
        for (let ietm in this.filteredSharedMediaData) {
          this.sharedMediaWithSpaceStorageMedia.sharedMediaTokens.push(
            this.filteredSharedMediaData[ietm].sharedMediaToken
          );
        }
      }
    },
    select(value) {
      const indexItem =
        this.sharedMediaWithSpaceStorageMedia.sharedMediaTokens.indexOf(value);

      if (indexItem > -1) {
        this.sharedMediaWithSpaceStorageMedia.sharedMediaTokens.splice(
          indexItem,
          1
        );
      }
      setTimeout(() => {
        if (
          this.filteredSharedMediaData.length ==
          this.sharedMediaWithSpaceStorageMedia.sharedMediaTokens.length
        ) {
          this.selectedAll = true;
        } else {
          this.selectedAll = false;
        }
      }, 1000);
    },
  },
  created() {
    this.getSharedMediaFoldersDialog();
  },
};
</script>

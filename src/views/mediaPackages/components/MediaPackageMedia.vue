<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="MediaPackageMedia"
      size="xl"
      :headerText="$t('MediaPackages.media')"
      :headerIcon="mediaPackage.icon"
      @opened="getDetails()"
    >
      <template v-if="hasData">
        <table class="my-table">
          <thead>
            <tr>
              <th rowspan="2">#</th>
              <th colspan="5">{{ $t("SharedMedias.data") }}</th>
              <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
            </tr>
            <tr>
              <th>{{ $t("general.code") }}</th>
              <th class="cell-lg">{{ $t("general.name") }}</th>
              <th>{{ $t("general.type") }}</th>
              <th>{{ $t("SharedMediaFolders.title") }}</th>
              <th>{{ $t("activationStatus") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(sharedMedia, index) in mediaPackage.mediaPackageMediaData"
              :key="index"
            >
              <td>
                {{ ++index }}
              </td>
              <td>{{ isDataExist(sharedMedia.sharedMediaData.fullCode) }}</td>
              <td>
                {{
                  isDataExist(
                    sharedMedia.sharedMediaData.sharedMediaNameCurrent
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    sharedMedia.sharedMediaData.sharedMediaFileTypeNameCurrent
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    sharedMedia.sharedMediaData.sharedMediaFolderInfoData
                      .sharedMediaFolderNameCurrent
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(sharedMedia.sharedMediaActivationTypeNameCurrent)
                }}
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

                  <li
                    v-if="checkPrivilege(hasMediaPackageChangeActivationType())"
                  >
                    <button
                      v-b-modal.SharedMediaMediaPackageChangeActivationType
                      :title="$t('changeActivationType')"
                      @click="setSharedMedia(sharedMedia)"
                    >
                      <img src="@/assets/images/changeActivationType.svg" />
                    </button>
                  </li>
                </FloatingMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import { STATUS } from "./../../../utils/constants";
import {
  objectToFormData,
  isDataExist,
  checkPrivilege,
} from "./../../../utils/functions";
import { hasMediaPackageChangeActivationType } from "./../../../utils/privilegeHelper";
import apiMediaPackage from "./../../../api/mediaPackage";
import MediaPackage from "./../../../models/mediaPackages/MediaPackage";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ExceptionWithImg,
    FloatingMenu,
  },
  props: ["mediaPackageToken", "mediaPackageMediaReloadStatus"],
  data() {
    return {
      mediaPackage: new MediaPackage(),
    };
  },
  computed: {
    hasData() {
      return this.mediaPackage.mediaPackageMediaData.length != 0;
    },
  },
  watch: {
    mediaPackageMediaReloadStatus: function () {
      this.getDetails();
    },
  },
  methods: {
    checkPrivilege,
    isDataExist,
    hasMediaPackageChangeActivationType,

    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.mediaPackageToken };
        this.mediaPackage.setInitialValue();
        const response = await apiMediaPackage.getDetails(filter);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
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
        this.mediaPackage.fillData(response.data.mediaPackage);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },

    setSharedMediaData(sharedMedia) {
      this.$emit("setSharedMediaData", sharedMedia);
    },
    setSharedMedia(sharedMedia) {
      this.$emit("setSharedMedia", sharedMedia);
    },

    async updateMediaPackage() {
      this.isLoading = true;
      let formData = objectToFormData(this.mediaPackage);
      try {
        const response = await apiMediaPackage.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("MediaPackageMedia");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>

<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <template v-if="id == 'add'">
        <div class="my-card">
          <SharedMediaComponent
            :id="id"
            :sharedMediaWithSpaceStorageMedia="sharedMediaWithSpaceStorageMedia"
          />
        </div>
        <div class="my-card">
          <div class="row">
            <CustomCheckbox
              :className="'col-6'"
              :value="categoryStatus"
              v-on:changeValue="
                categoryStatus = $event;
                resetGroupList();
              "
              :title="$t('SharedMediaWithSpaceStorageMedias.shareWithCategory')"
              :centerStatus="true"
            />
            <CustomCheckbox
              :className="'col-6'"
              :value="!categoryStatus"
              v-on:changeValue="
                categoryStatus = !$event;
                resetCategoryList();
              "
              :title="$t('SharedMediaWithSpaceStorageMedias.shareWithGroup')"
              :centerStatus="true"
            />
          </div>
          <EducationalCategoryStorageSpaceComponent
            v-if="categoryStatus"
            :id="id"
            :sharedMediaWithSpaceStorageMedia="sharedMediaWithSpaceStorageMedia"
            :modelName="`storageSpacesEducationalCategory`"
            :storageSpaceTypeToken="STORAGE_SPACE_TYPE.EducationalCategory"
          />
          <EducationalGroupStorageSpaceComponent
            v-if="!categoryStatus"
            :id="id"
            :sharedMediaWithSpaceStorageMedia="sharedMediaWithSpaceStorageMedia"
            :modelName="`storageSpacesEducationalGroup`"
            :storageSpaceTypeToken="STORAGE_SPACE_TYPE.EducationalGroup"
          />
        </div>
      </template>
      <template v-if="id == 'unshare'">
        <div class="my-card">
          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th colspan="4">{{ $t("SharedMedias.data") }}</th>
                </tr>
                <tr>
                  <th>{{ $t("general.image") }}</th>
                  <th>{{ $t("general.code") }}</th>
                  <th class="cell-lg">{{ $t("general.name") }}</th>
                  <th>{{ $t("general.type") }}</th>
                </tr>
              </thead>
              <tbody>
                <td>
                  <img
                    class="item-img-table"
                    :src="
                      fullPathFileFromServer(
                        sharedMediaWithSpaceStorageMedia.sharedMediaData
                          .sharedMediaImagePath,
                        sharedMediaWithSpaceStorageMedia.defaultImg
                      )
                    "
                    :onerror="`this.src='${sharedMediaWithSpaceStorageMedia.defaultImg}'`"
                  />
                </td>
                <td>
                  {{
                    isDataExist(
                      sharedMediaWithSpaceStorageMedia.sharedMediaData.fullCode
                    )
                  }}
                </td>
                <td>
                  {{
                    isDataExist(
                      sharedMediaWithSpaceStorageMedia.sharedMediaData
                        .sharedMediaNameCurrent
                    )
                  }}
                </td>
                <td>
                  {{
                    isDataExist(
                      sharedMediaWithSpaceStorageMedia.sharedMediaData
                        .sharedMediaFileTypeNameCurrent
                    )
                  }}
                </td>
              </tbody>
            </table>
          </div>
        </div>
        <div class="my-card">
          <b-tabs>
            <b-tab :title-item-class="'custom-tab-outer-li '">
              <template #title>
                <img :src="categoryImg" class="icon-tab" />
                <span>{{ $t("StorageSpaces.EducationalCategory") }}</span>
              </template>
              <EducationalCategoryStorageSpaceComponent
                :id="id"
                :sharedMediaWithSpaceStorageMedia="
                  sharedMediaWithSpaceStorageMedia
                "
                :storageSpaceDataList="storageSpaceDataListCategory"
                :modelName="`storageSpacesEducationalCategory`"
                :storageSpaceTypeToken="STORAGE_SPACE_TYPE.EducationalCategory"
              />
            </b-tab>
            <b-tab :title-item-class="'custom-tab-outer-li '">
              <template #title>
                <img :src="groupImg" class="icon-tab" />
                <span>{{ $t("StorageSpaces.EducationalGroup") }}</span>
              </template>
              <EducationalGroupStorageSpaceComponent
                :id="id"
                :sharedMediaWithSpaceStorageMedia="
                  sharedMediaWithSpaceStorageMedia
                "
                :storageSpaceDataList="storageSpaceDataListGroup"
                :modelName="`storageSpacesEducationalGroup`"
                :storageSpaceTypeToken="STORAGE_SPACE_TYPE.EducationalGroup"
              />
            </b-tab>
          </b-tabs>
        </div>
      </template>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { isDataExist, fullPathFileFromServer } from "./../../utils/functions";
import categoryImg from "@/assets/images/EducationalCategories.svg";
import groupImg from "@/assets/images/EducationalGroups.svg";
import SharedMediaComponent from "./SharedMediaComponent.vue";
import EducationalCategoryStorageSpaceComponent from "./EducationalCategoryStorageSpaceComponent.vue";
import EducationalGroupStorageSpaceComponent from "./EducationalGroupStorageSpaceComponent.vue";
import generalMixin from "./../../utils/generalMixin";
import PreLoader from "@/components/general/PreLoader.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import { STORAGE_SPACE_TYPE } from "./../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomCheckbox,
    SharedMediaComponent,
    EducationalCategoryStorageSpaceComponent,
    EducationalGroupStorageSpaceComponent,
  },
  data() {
    return {
      isLoading: false,
      categoryStatus: true,
      STORAGE_SPACE_TYPE,
      categoryImg,
      groupImg,
    };
  },
  props: {
    sharedMediaWithSpaceStorageMedia: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
    storageSpaceDataListCategory: {
      type: Array,
      default: () => [],
    },
    storageSpaceDataListGroup: {
      type: Array,
      default: () => [],
    },
  },
  validations: {
    sharedMediaWithSpaceStorageMedia: {
      // sharedMediaWithSpaceStorageMediaNameAr: { required, isValidNameAr },
      // sharedMediaWithSpaceStorageMediaNameEn: { required, isValidNameEn },
      // sharedMediaWithSpaceStorageMediaDescriptionAr: { isValidTextAr },
      // sharedMediaWithSpaceStorageMediaDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    // errors_placesTokensList() {
    //   let errors = [];
    //   if (this.$v.sharedMedia.placesTokensList.$error) {
    //     if (!this.$v.sharedMedia.placesTokensList.required)
    //       errors.push(this.$t("validation.fieldIsRequired"));
    //   }
    //   return errors;
    // },
  },
  methods: {
    async resetGroupList() {
      this.sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup = [];
    },
    async resetCategoryList() {
      this.sharedMediaWithSpaceStorageMedia.storageSpaceTokensCategory = [];
    },
    async submitForm() {
      this.$emit("submitForm");
    },
    isDataExist,
    fullPathFileFromServer,
  },
  created() {},
};
</script>

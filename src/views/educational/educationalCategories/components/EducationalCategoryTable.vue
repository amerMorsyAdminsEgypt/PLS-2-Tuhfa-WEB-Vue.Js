<template>
  <div v-if="educationalCategoriesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("EducationalCategories.data") }}</th>
          <th rowspan="2">
            {{ $t("SystemComponentsHierarchies.educationalActivity") }}
          </th>
          <th rowspan="2">{{ $t("SystemComponents.educationalActivity") }}</th>
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
          v-for="(educationalCategory, index) in educationalCategoriesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalCategory.educationalCategoryImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(educationalCategory.fullCode) }}</td>
          <td>
            {{
              isDataExist(educationalCategory.educationalCategoryNameCurrent)
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalCategory.systemComponentsHierarchyData
                  .systemComponentsHierarchyNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalCategory.systemComponentData
                  .systemComponentNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="educationalCategory.isHaveChildrenStatus">
                <router-link
                  :to="{
                    name: 'EducationalCategories',
                    params: {
                      parentEducationalCategoryToken:
                        educationalCategory.educationalCategoryToken,
                    },
                  }"
                  :title="$t('EducationalCategories.modelName')"
                >
                  <img src="@/assets/images/open.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasStorageSpaceEducationalCategory())">
                <router-link
                  :to="{
                    name: 'StorageSpacesEducationalCategory',
                    params: {
                      mainToken: educationalCategory.educationalCategoryToken,
                    },
                  }"
                  :title="$t('StorageSpaces.modelName')"
                >
                  <img src="@/assets/images/educationalGroupMedia.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasEducationalJoiningApplication())">
                <router-link
                  :to="{
                    name: 'EducationalJoiningApplications',
                    params: {
                      educationalCategoryToken:
                        educationalCategory.educationalCategoryToken,
                    },
                  }"
                  :title="$t('EducationalJoiningApplications.modelName')"
                >
                  <img
                    src="@/assets/images/EducationalJoiningApplications.svg"
                  />
                </router-link>
              </li>

              <li v-if="checkPrivilege(hasEducationalGroup())">
                <router-link
                  :to="{
                    name: 'EducationalGroups',
                    params: {
                      educationalCategoryToken:
                        educationalCategory.educationalCategoryToken,
                    },
                  }"
                  :title="$t('EducationalGroups.modelName')"
                >
                  <img src="@/assets/images/EducationalGroups.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasPriceList())">
                <router-link
                  :to="{
                    name: 'PriceLists',
                    params: {
                      educationalCategoryToken:
                        educationalCategory.educationalCategoryToken,
                    },
                  }"
                  :title="$t('PriceLists.modelName')"
                >
                  <img src="@/assets/images/PriceLists.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setEducationalCategoryData(educationalCategory);
                    openBottomSheet('EducationalCategoryInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalCategoryData(educationalCategory);
                    openBottomSheet('EducationalCategoryQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalCategoryEdit())">
                <button
                  @click="
                    setEducationalCategoryData(educationalCategory);
                    openBottomSheet('EducationalCategoryUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalCategoryFinaleDelete())">
                <button
                  v-b-modal.EducationalCategoryDelete
                  :title="$t('delete')"
                  @click="setEducationalCategoryData(educationalCategory)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasEducationalCategoryChangeActivationType())
                "
              >
                <button
                  v-b-modal.EducationalCategoryChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setEducationalCategoryData(educationalCategory)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalCategoryData(educationalCategory);
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
} from "./../../../../utils/functions";
import {
  hasEducationalCategoryEdit,
  hasEducationalGroup,
  hasStorageSpaceEducationalCategory,
  hasEducationalJoiningApplication,
  hasEducationalCategoryFinaleDelete,
  hasEducationalCategoryChangeActivationType,
  hasPriceList,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalCategoriesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["educationalCategoriesData", "filterData", "defaultImg"],

  data() {
    return {};
  },
  methods: {
    setEducationalCategoryData(educationalCategory) {
      this.$emit("setEducationalCategoryData", educationalCategory);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalCategoryEdit,
    hasEducationalGroup,
    hasStorageSpaceEducationalCategory,
    hasEducationalJoiningApplication,
    hasEducationalCategoryFinaleDelete,
    hasEducationalCategoryChangeActivationType,
    hasPriceList,
  },
};
</script>

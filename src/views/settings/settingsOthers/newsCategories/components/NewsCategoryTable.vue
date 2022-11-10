<template>
  <div v-if="newsCategoriesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("NewsCategories.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(newsCategory, index) in newsCategoriesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  newsCategory.newsCategoryImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(newsCategory.fullCode) }}</td>
          <td>
            {{ isDataExist(newsCategory.newsCategoryNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setNewsCategoryData(newsCategory);
                    openBottomSheet('NewsCategoryInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setNewsCategoryData(newsCategory);
                    openBottomSheet('NewsCategoryQRCode');
                  "
                  :title="$t('NewsCategories.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasNewsCategoryEdit())">
                <button
                  @click="
                    setNewsCategoryData(newsCategory);
                    openBottomSheet('NewsCategoryUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasNewsCategoryFinaleDelete())">
                <button
                  v-b-modal.NewsCategoryDelete
                  :title="$t('delete')"
                  @click="setNewsCategoryData(newsCategory)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasNewsCategoryChangeActivationType())">
                <button
                  v-b-modal.NewsCategoryChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setNewsCategoryData(newsCategory)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setNewsCategoryData(newsCategory);
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
  hasNewsCategoryEdit,
  hasNewsCategoryFinaleDelete,
  hasNewsCategoryChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "NewsCategoriesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["newsCategoriesData", "filterData", "defaultImg"],
  methods: {
    setNewsCategoryData(newsCategory) {
      this.$emit("setNewsCategoryData", newsCategory);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasNewsCategoryEdit,
    hasNewsCategoryFinaleDelete,
    hasNewsCategoryChangeActivationType,
  },
};
</script>

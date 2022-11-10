<template>
  <div v-if="educationalRatingsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("EducationalRatings.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("title") }}</th>
          <th>{{ $t("EducationalRatings.ratingNumber") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(educationalRating, index) in educationalRatingsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalRating.educationalRatingImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(educationalRating.fullCode) }}</td>
          <td>
            {{ isDataExist(educationalRating.educationalRatingTitleCurrent) }}
          </td>
          <td>
            <CustomRatingStars
              :showAsInfo="true"
              :value="educationalRating.educationalRatingNumber"
            />
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setEducationalRatingData(educationalRating);
                    openBottomSheet('EducationalRatingInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalRatingData(educationalRating);
                    openBottomSheet('EducationalRatingQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalRatingEdit())">
                <button
                  @click="
                    setEducationalRatingData(educationalRating);
                    openBottomSheet('EducationalRatingUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalRatingFinaleDelete())">
                <button
                  v-b-modal.EducationalRatingDelete
                  :title="$t('delete')"
                  @click="setEducationalRatingData(educationalRating)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasEducationalRatingChangeActivationType())
                "
              >
                <button
                  v-b-modal.EducationalRatingChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setEducationalRatingData(educationalRating)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalRatingData(educationalRating);
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
  hasEducationalRatingEdit,
  hasEducationalRatingFinaleDelete,
  hasEducationalRatingChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import CustomRatingStars from "./../../../../components/general/CustomRatingStars.vue";

export default {
  name: "EducationalRatingsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
    CustomRatingStars,
  },
  props: ["educationalRatingsData", "filterData", "defaultImg"],
  methods: {
    setEducationalRatingData(educationalRating) {
      this.$emit("setEducationalRatingData", educationalRating);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalRatingEdit,
    hasEducationalRatingFinaleDelete,
    hasEducationalRatingChangeActivationType,
  },
};
</script>

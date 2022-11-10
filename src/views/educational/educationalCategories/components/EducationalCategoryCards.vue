<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(educationalCategory, index) in educationalCategoriesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="educationalCategory.educationalCategoryNameCurrent"
      :description="educationalCategory.fullCode"
      :imagePath="educationalCategory.educationalCategoryImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
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
          <img src="@/assets/images/EducationalJoiningApplications.svg" />
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
          :title="$t('info')"
          @click="
            setEducationalCategoryData(educationalCategory);
            openBottomSheet('EducationalCategoryInfo');
          "
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
      <li v-if="checkPrivilege(hasEducationalCategoryChangeActivationType())">
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
    </CustomCard>
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
  hasPriceList,
  hasEducationalGroup,
  hasEducationalJoiningApplication,
  hasEducationalCategoryFinaleDelete,
  hasEducationalCategoryChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["educationalCategoriesData", "filterData", "defaultImg"],
  methods: {
    setEducationalCategoryData(educationalCategory) {
      this.$emit("setEducationalCategoryData", educationalCategory);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalCategoryEdit,
    hasPriceList,
    hasEducationalGroup,
    hasEducationalJoiningApplication,
    hasEducationalCategoryFinaleDelete,
    hasEducationalCategoryChangeActivationType,
  },
};
</script>

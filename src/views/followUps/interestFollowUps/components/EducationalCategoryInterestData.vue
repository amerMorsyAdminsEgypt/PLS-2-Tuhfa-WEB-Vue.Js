<template>
  <div class="my-card">
    <PreLoader v-if="isLoading" />
    <span class="my-card-title">{{ msg }}</span>

    <div v-if="listData.length == 0" class="my-card-no-content">
      {{ $t("general.thereAreNoDetails") }}
    </div>
    <template v-else>
      <div class="my-card" v-for="(item, index) in listData" :key="index">
        <span class="my-card-title">{{ index + 1 }}</span>

        <span class="remove-slice-container">
          <button
            @click="removeSlice(index)"
            type="button"
            class="btn btn-remove-slice"
          >
            ×
          </button>
        </span>
        <div class="row">
          <template v-if="id == 'Interest'">
            <!-- <BaseTree
              :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
              :treeModel="getTreeModel(index)"
              v-on:changeValue="baseTreeChanged($event, index)"
              :showParent="true"
              :filterParentDirect="true"
            /> -->
            <CustomSelectBox
              :className="'col-md-12'"
              :id="`${id}[${index}][educationalCategoryToken]`"
              :value="item.educationalCategoryToken"
              :options="educationalCategoryTokenOptions"
              v-on:changeValue="item.educationalCategoryToken = $event"
              :title="$t('EducationalCategories.select')"
              :imgName="'EducationalCategories.svg'"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-[${index}][placeTypeToken]`"
              :value="placeTypeToken"
              :options="placeTypeTokenOptions"
              v-on:changeValue="
                placeTypeToken = $event;
                getPlacesDialog();
              "
              :title="$t('Places.type')"
              :imgName="'type.svg'"
            />
            <CustomSelectBox
              :className="'col-md-12'"
              :id="`${id}[${index}][placeToken]`"
              :value="item.placeToken"
              :options="placeTokenOptions"
              v-on:changeValue="item.placeToken = $event"
              :title="$t('Places.select')"
              :imgName="'places.svg'"
            />
            <DateTimePicker
              class="col-md-6"
              :id="`${id}-[${index}][startDateTime]`"
              type="dateTime"
              :value="item.startDateTime"
              :title="$t('dateTimeStart')"
              v-on:changeValue="item.startDateTime = $event.dateTime"
              :language="language"
            />
            <DateTimePicker
              class="col-md-6"
              :id="`${id}-[${index}][endDateTime]`"
              type="dateTime"
              :value="item.endDateTime"
              :title="$t('dateTimeEnd')"
              v-on:changeValue="item.endDateTime = $event.dateTime"
              :language="language"
            />
            <TextArea
              :className="'col-md-6 '"
              :id="`${id}-[${index}][educationalCategoryInterestDescriptionAr]`"
              :value="item.educationalCategoryInterestDescriptionAr"
              v-on:changeValue="
                item.educationalCategoryInterestDescriptionAr = $event
              "
              :title="$t('descriptionAr')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6 '"
              :id="`${id}-[${index}][educationalCategoryInterestDescriptionEn]`"
              :value="item.educationalCategoryInterestDescriptionEn"
              v-on:changeValue="
                item.educationalCategoryInterestDescriptionEn = $event
              "
              :title="$t('descriptionEn')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-12'"
              :id="`${id}-[${index}][educationalCategoryInterestDescriptionUnd]`"
              :value="item.educationalCategoryInterestDescriptionUnd"
              v-on:changeValue="
                item.educationalCategoryInterestDescriptionUnd = $event
              "
              :title="$t('descriptionUnd')"
              :imgName="'description.svg'"
            />
          </template>
          <template v-if="id == 'InterestOther'">
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-[${index}][educationalCategoryOtherInterestNameAr]`"
              :value="item.educationalCategoryOtherInterestNameAr"
              v-on:changeValue="
                item.educationalCategoryOtherInterestNameAr = $event
              "
              :title="$t('nameAr')"
              :imgName="'interests.svg'"
            />

            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-[${index}][educationalCategoryOtherInterestNameEn]`"
              :value="item.educationalCategoryOtherInterestNameEn"
              v-on:changeValue="
                item.educationalCategoryOtherInterestNameEn = $event
              "
              :title="$t('nameEn')"
              :imgName="'interests.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-[${index}][educationalCategoryOtherInterestNameUnd]`"
              :value="item.educationalCategoryOtherInterestNameUnd"
              v-on:changeValue="
                item.educationalCategoryOtherInterestNameUnd = $event
              "
              :title="$t('nameUnd')"
              :imgName="'interests.svg'"
            />

            <TextArea
              :className="'col-md-6 '"
              :id="`${id}-[${index}][educationalCategoryOtherInterestDescriptionAr]`"
              :value="item.educationalCategoryOtherInterestDescriptionAr"
              v-on:changeValue="
                item.educationalCategoryOtherInterestDescriptionAr = $event
              "
              :title="$t('descriptionAr')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6 '"
              :id="`${id}-[${index}][educationalCategoryOtherInterestDescriptionEn]`"
              :value="item.educationalCategoryOtherInterestDescriptionEn"
              v-on:changeValue="
                item.educationalCategoryOtherInterestDescriptionEn = $event
              "
              :title="$t('descriptionEn')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6 '"
              :id="`${id}-[${index}][educationalCategoryOtherInterestDescriptionUnd]`"
              :value="item.educationalCategoryOtherInterestDescriptionUnd"
              v-on:changeValue="
                item.educationalCategoryOtherInterestDescriptionUnd = $event
              "
              :title="$t('descriptionUnd')"
              :imgName="'description.svg'"
            />
          </template>
        </div>
      </div>
    </template>

    <div class="add-slice-container">
      <button
        @click="addSlice"
        type="button"
        class="btn btn-add-slice"
        :title="$t('addSlice')"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
// import BaseTree from "./../../../../components/general/BaseTree.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import { getLanguage } from "./../../../../utils/functions";
import {
  getEducationalCategoriesDialog,
  getPlacesDialog,
} from "./../../../../utils/dialogsOfApi";
import { SYSTEM_TYPE } from "./../../../../utils/constantLists";
import { getDialogOfPlaceType } from "./../../../../utils/dialogsOfConstantsLists";

import EducationalCategoryInterestData from "./../../../../models/followUps/interests/EducationalCategoryInterestData";
import EducationalCategoryOtherInterestData from "./../../../../models/followUps/interests/EducationalCategoryOtherInterestData";

export default {
  name: "EducationalCategoryInterestData",
  components: {
    PreLoader,
    TextArea,
    // BaseTree,
    CustomInput,
    DateTimePicker,
    CustomSelectBox,
  },
  data() {
    return {
      isLoading: false,
      educationalCategoryInterestData: new EducationalCategoryInterestData(),
      educationalCategoryOtherInterestData:
        new EducationalCategoryOtherInterestData(),
      language: getLanguage(),
      educationalCategoryTokenOptions: [],
      placeTokenOptions: [],
      placeTypeToken: "",
      placeTypeTokenOptions: getDialogOfPlaceType() || [],
    };
  },
  props: ["listData", "msg", "id"],
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.EducationalActivity;
    },
  },
  methods: {
    async getEducationalCategoriesDialog() {
      this.isLoading = true;
      this.educationalCategoryTokenOptions =
        await getEducationalCategoriesDialog();
      this.isLoading = false;
    },
    async getPlacesDialog() {
      this.isLoading = true;
      let params = { placeTypeToken: this.placeTypeToken };
      this.placeTokenOptions = await getPlacesDialog(params);
      this.isLoading = false;
    },

    addSlice() {
      if (this.id == "Interest") {
        this.listData.push(new EducationalCategoryInterestData());
      } else {
        this.listData.push(new EducationalCategoryOtherInterestData());
      }
    },
    removeSlice(index) {
      if (this.id == "Interest") {
        this.listData.splice(index, 1);
      } else {
        this.listData.splice(index, 1);
      }
    },
    getTreeModel(index) {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.listData[index].educationalCategoryInfoData
            .systemComponentsHierarchyData.systemComponentsHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken:
          this.listData[index].educationalCategoryInfoData.systemComponentData
            .systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: this.listData[index].educationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.select"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
    baseTreeChanged(data, index) {
      this.listData[
        index
      ].educationalCategoryInfoData.systemComponentsHierarchyData.systemComponentsHierarchyToken =
        data.hierarchyToken;

      this.listData[
        index
      ].educationalCategoryInfoData.systemComponentData.systemComponentToken =
        data.componentToken;

      this.listData[index].educationalCategoryToken = data.parentToken;
    },
  },
  async created() {
    this.getEducationalCategoriesDialog();
    this.getPlacesDialog();
  },
};
</script>

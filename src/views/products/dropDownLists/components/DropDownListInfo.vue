<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="'DropDownListInfo'"
      size="xl"
      :headerText="$t('DropDownLists.data')"
      :headerIcon="dropDownList.icon"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <div v-else class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="dropDownList.fullCode"
          :title="$t('DropDownLists.code')"
          :imgName="'code.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="dropDownList.dropDownListNameAr"
          :title="$t('DropDownLists.nameAr')"
          :imgName="'DropDownLists.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="dropDownList.dropDownListNameEn"
          :title="$t('DropDownLists.nameEn')"
          :imgName="'DropDownLists.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="dropDownList.dropDownListNameUnd"
          :title="$t('DropDownLists.nameUnd')"
          :imgName="'DropDownLists.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="dropDownList.dropDownListDescriptionAr"
          :title="$t('DropDownLists.descriptionAr')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="dropDownList.dropDownListDescriptionEn"
          :title="$t('DropDownLists.descriptionEn')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="dropDownList.dropDownListDescriptionUnd"
          :title="$t('DropDownLists.descriptionUnd')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="dropDownList.dropDownListNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
      </div>

      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th rowspan="2">#</th>
              <th colspan="3">{{ $t("DropDownLists.listItems.modelName") }}</th>
            </tr>
            <tr>
              <th>{{ $t("DropDownLists.listItems.nameAr") }}</th>
              <th>{{ $t("DropDownLists.listItems.nameEn") }}</th>
              <th>{{ $t("DropDownLists.listItems.nameUnd") }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="dropDownList.dropDownListItemsData.length == 0">
              <tr>
                <th colspan="4">{{ $t("DropDownLists.listItems.noItems") }}</th>
              </tr>
            </template>
            <template v-else>
              <tr
                v-for="(item, index) in dropDownList.dropDownListItemsData"
                :key="index"
              >
                <td>{{ ++index }}</td>
                <td>{{ isDataExist(item.dropDownListItemNameAr) }}</td>
                <td>{{ isDataExist(item.dropDownListItemNameEn) }}</td>
                <td>{{ isDataExist(item.dropDownListItemNameUnd) }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { isDataExist } from "./../../../../utils/functions";
import DropDownListMixin from "./DropDownListMixin";

export default {
  mixins: [DropDownListMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
  },
  methods: {
    isDataExist,
  },
};
</script>

<template>
  <CustomBottomSheet
    :refName="'FollowInterestInfo'"
    size="xl"
    :headerText="$t('FollowInterests.data')"
    :headerIcon="followInterest.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="followInterest.fullCode"
        :title="$t('FollowInterests.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="followInterest.followInterestNameCurrent"
        :title="$t('FollowInterests.name')"
        :imgName="'followInterests.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="followInterest.followInterestDescriptionAr"
        :title="$t('FollowInterests.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="followInterest.followInterestDescriptionEn"
        :title="$t('FollowInterests.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="followInterest.followInterestDescriptionUnd"
        :title="$t('FollowInterests.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="followInterest.followInterestNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          followInterest.communicationTypeInfoData
            ? followInterest.communicationTypeInfoData
                .communicationTypeNameCurrent
            : ''
        "
        :title="$t('CommunicationTypes.name')"
        :imgName="'communicationTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="followInterest.replyStatusTypeNameCurrent"
        :title="$t('ConstantsListSelect.ReplyStatusTypesName')"
        :imgName="'ReplyStatusTypes.svg'"
      />
    </div>

    <!-- #region SysteamInterests -->
    <div class="my-card" v-if="followInterest.systeamInterestsData.length > 0">
      <span class="my-card-title">{{
        $t("FollowInterests.systeamInterests.modelName")
      }}</span>

      <div
        class="my-card"
        v-for="(item, index) in followInterest.systeamInterestsData"
        :key="index"
      >
        <span class="my-card-title">{{ index + 1 }}</span>

        <div class="row">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.interestTypeNameCurrent"
            :title="$t('ConstantsListSelect.InterestTypesName')"
            :imgName="'type.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              item.priorityTypeInfoData
                ? item.priorityTypeInfoData.replyStatusTypeNameCurrent
                : ''
            "
            :title="$t('PriorityTypes.name')"
            :imgName="'priorityTypes.svg'"
          />

          <template v-if="item.interestTypeToken == INTEREST_TYPES.Place">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                item.placeInfoData
                  ? item.placeInfoData.placeTypeNameCurrent
                  : ''
              "
              :title="$t('Places.placeType')"
              :imgName="'type.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                item.placeInfoData ? item.placeInfoData.placeNameCurrent : ''
              "
              :title="$t('Places.name')"
              :imgName="'places.svg'"
            />
          </template>

          <DataLabelGroup
            v-else-if="
              item.interestTypeToken == INTEREST_TYPES.EducationalCategory
            "
            :className="'col-md-12'"
            :value="
              item.educationalCategoryInfoData
                ? item.educationalCategoryInfoData
                    .educationalCategoryNameCurrent
                : ''
            "
            :title="$t('EducationalCategories.name')"
            :imgName="'EducationalCategories.svg'"
          />

          <DataLabelGroup
            v-else-if="
              item.interestTypeToken == INTEREST_TYPES.EducationalGroup
            "
            :className="'col-md-12'"
            :value="
              item.educationalGroupInfoData
                ? item.educationalGroupInfoData.educationalGroupNameCurrent
                : ''
            "
            :title="$t('EducationalGroups.name')"
            :imgName="'EducationalGroups.svg'"
          />

          <DataLabelGroup
            v-else-if="item.interestTypeToken == INTEREST_TYPES.Service"
            :className="'col-md-12'"
            :value="
              item.serviceInfoData
                ? item.serviceInfoData.serviceNameCurrent
                : ''
            "
            :title="$t('Services.name')"
            :imgName="'services.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.systeamInterestDescriptionAr"
            :title="$t('descriptionAr')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.systeamInterestDescriptionEn"
            :title="$t('descriptionEn')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.systeamInterestDescriptionUnd"
            :title="$t('descriptionUnd')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.systeamInterestNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                item.systeamInterestDateFrom,
                item.systeamInterestTimeFrom
              )
            "
            :title="$t('FollowInterests.dateTimeFrom')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                item.systeamInterestDateTo,
                item.systeamInterestTimeTo
              )
            "
            :title="$t('FollowInterests.dateTimeTo')"
            :imgName="'dateAndTime.svg'"
          />
        </div>
      </div>
    </div>
    <!-- #endregion SysteamInterests -->

    <!-- #region OtherInterests -->
    <div class="my-card" v-if="followInterest.otherInterestsData.length > 0">
      <span class="my-card-title">{{
        $t("FollowInterests.otherInterests.modelName")
      }}</span>

      <div
        class="my-card"
        v-for="(item, index) in followInterest.otherInterestsData"
        :key="index"
      >
        <span class="my-card-title">{{ index + 1 }}</span>

        <div class="row">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.interestTypeNameCurrent"
            :title="$t('ConstantsListSelect.InterestTypesName')"
            :imgName="'type.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.otherInterestNameAr"
            :title="$t('nameAr')"
            :imgName="'followInterests.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.otherInterestNameEn"
            :title="$t('nameEn')"
            :imgName="'followInterests.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.otherInterestNameUnd"
            :title="$t('nameUnd')"
            :imgName="'followInterests.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.otherInterestDescriptionAr"
            :title="$t('descriptionAr')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.otherInterestDescriptionEn"
            :title="$t('descriptionEn')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.otherInterestDescriptionUnd"
            :title="$t('descriptionUnd')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="item.otherInterestNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                item.otherInterestDateFrom,
                item.otherInterestTimeFrom
              )
            "
            :title="$t('FollowInterests.dateTimeFrom')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                item.otherInterestDateTo,
                item.otherInterestTimeTo
              )
            "
            :title="$t('FollowInterests.dateTimeTo')"
            :imgName="'dateAndTime.svg'"
          />
        </div>
      </div>
    </div>
    <!-- #endregion OtherInterests -->
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { INTEREST_TYPES } from "./../../../../utils/constantLists";
import {
  isDataExist,
  fullPathFileFromServer,
  formateDateTimeLang,
} from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["followInterest"],
  data() {
    return { INTEREST_TYPES };
  },
  methods: {
    isDataExist,
    fullPathFileFromServer,
    formateDateTimeLang,
  },
};
</script>

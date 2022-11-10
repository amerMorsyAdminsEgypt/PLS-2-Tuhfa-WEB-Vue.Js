<template>
  <CustomBottomSheet
    :refName="'UserOtherInterestInfo'"
    size="xl"
    :headerText="$t('UserOtherInterests.data')"
    :headerIcon="userOtherInterest.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOtherInterest.interestTypeNameCurrent"
        :title="$t('ConstantsListSelect.InterestTypesName')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOtherInterest.otherInterestNameAr"
        :title="$t('nameAr')"
        :imgName="'followInterests.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOtherInterest.otherInterestNameEn"
        :title="$t('nameEn')"
        :imgName="'followInterests.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOtherInterest.otherInterestNameUnd"
        :title="$t('nameUnd')"
        :imgName="'followInterests.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOtherInterest.otherInterestDescriptionAr"
        :title="$t('descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOtherInterest.otherInterestDescriptionEn"
        :title="$t('descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOtherInterest.otherInterestDescriptionUnd"
        :title="$t('descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOtherInterest.otherInterestNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            userOtherInterest.otherInterestDateFrom,
            userOtherInterest.otherInterestTimeFrom
          )
        "
        :title="$t('FollowInterests.dateTimeFrom')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            userOtherInterest.otherInterestDateTo,
            userOtherInterest.otherInterestTimeTo
          )
        "
        :title="$t('FollowInterests.dateTimeTo')"
        :imgName="'dateAndTime.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
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
  props: ["userOtherInterest"],
  methods: {
    isDataExist,
    fullPathFileFromServer,
    formateDateTimeLang,
  },
};
</script>

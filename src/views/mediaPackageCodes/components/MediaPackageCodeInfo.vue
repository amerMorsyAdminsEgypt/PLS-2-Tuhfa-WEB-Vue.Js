<template>
  <CustomBottomSheet
    :refName="'MediaPackageCodeInfo'"
    size="xl"
    :headerText="$t('MediaPackageCodes.data')"
    :headerIcon="mediaPackageCode.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="mediaPackageCode.mediaPackageKey"
        :title="$t('general.key')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="mediaPackageCode.mediaPackageCode"
        :title="$t('general.code')"
        :imgName="'code.svg'"
      />
      <template
        v-if="
          mediaPackageCode.mediaPackageCodeUsedTypeToken == CODE_UDE_TYPE.Used
        "
        class=""
      >
        <div class="my-card row">
          <span class="my-card-title">
            {{ $t("MediaPackageCodes.codeUseData") }}
          </span>
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                mediaPackageCode.mediaPackageCodeUsed.codeUsedInData,
                mediaPackageCode.mediaPackageCodeUsed.codeUsedInTime
              )
            "
            :title="$t('actionsData.dateTime')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              mediaPackageCode.mediaPackageCodeUsed.userStudentInfoData
                ? mediaPackageCode.mediaPackageCodeUsed.userStudentInfoData
                    .userNameCurrent
                : ''
            "
            :title="$t('userName')"
            :imgName="'user.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              mediaPackageCode.mediaPackageCodeUsed
                .joinInEducationalCategoryInfoData
                ? mediaPackageCode.mediaPackageCodeUsed
                    .joinInEducationalCategoryInfoData
                    .educationalCategoryNameCurrent
                : ''
            "
            :title="$t('EducationalCategories.name')"
            :imgName="'EducationalCategories.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              mediaPackageCode.mediaPackageCodeUsed
                .joinInEeducationalGroupInfoData
                ? mediaPackageCode.mediaPackageCodeUsed
                    .joinInEeducationalGroupInfoData.educationalGroupNameCurrent
                : ''
            "
            :title="$t('EducationalGroups.name')"
            :imgName="'EducationalGroups.svg'"
          />
        </div>
      </template>
      <DataLabelGroup
        v-else
        :className="'col-md-12'"
        :value="mediaPackageCode.mediaPackageCodeUsedTypeNameCurrent"
        :title="$t('MediaPackageCodes.codeUseStatus')"
        :imgName="'type.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import { CODE_UDE_TYPE } from "./../../../utils/constantLists";
import { isDataExist, formateDateTimeLang } from "./../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["mediaPackageCode"],
  data() {
    return { CODE_UDE_TYPE };
  },
  methods: {
    isDataExist,
    formateDateTimeLang,
  },
};
</script>

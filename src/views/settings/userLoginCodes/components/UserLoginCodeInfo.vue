<template>
  <CustomBottomSheet
    :refName="'UserLoginCodeInfo'"
    size="xl"
    :headerText="$t('UserLoginCodes.data')"
    :headerIcon="userLoginCode.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.fullCode"
        :title="$t('UserLoginCodes.code')"
        :imgName="'code.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeNameAr"
        :title="$t('UserLoginCodes.nameAr')"
        :imgName="'UserLoginCodes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeNameEn"
        :title="$t('UserLoginCodes.nameEn')"
        :imgName="'UserLoginCodes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeNameUnd"
        :title="$t('UserLoginCodes.nameUnd')"
        :imgName="'UserLoginCodes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeDescriptionAr"
        :title="$t('UserLoginCodes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeDescriptionEn"
        :title="$t('UserLoginCodes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeDescriptionUnd"
        :title="$t('UserLoginCodes.descriptionUnd')"
        :imgName="'description.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.loginCode"
        :title="$t('UserLoginCodes.loginCode')"
        :imgName="'UserLoginCodes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodePlatFromNameCurrent"
        :title="$t('PlatFroms.modelName')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-4'"
        :value="
          formateDateTimeLang(
            userLoginCode.codeActiveFromDate,
            userLoginCode.codeActiveFromTime
          )
        "
        :title="
          $t('UserLoginCodes.codeIsActive') +
          ' ' +
          $t('UserLoginCodes.codeIsActiveFrom')
        "
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-4'"
        :value="
          formateDateTimeLang(
            userLoginCode.codeActiveToDate,
            userLoginCode.codeActiveToTime
          )
        "
        :title="
          $t('UserLoginCodes.codeIsActive') +
          ' ' +
          $t('UserLoginCodes.codeIsActiveTo')
        "
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-4'"
        :value="userLoginCode.codeActiveDurationCurrent"
        :title="$t('UserLoginCodes.codeIsActiveDuration')"
        :imgName="'dateAndTime.svg'"
      />

      <CustomCheckbox
        :className="'col-md-4'"
        :value="userLoginCode.codeIsActiveUnTileUserSignOut"
        :title="$t('UserLoginCodes.codeIsActiveUnTileUserSignOut')"
        :showAsInfo="true"
      />
      <CustomCheckbox
        :className="'col-md-4'"
        :value="userLoginCode.loginCodeIsUsedStatus"
        :title="`${$t('UserLoginCodes.loginCodeStatus')} [${$t(
          'UserLoginCodes.loginCodeStatusUsed'
        )}]`"
        :showAsInfo="true"
      />
      <CustomCheckbox
        :className="'col-md-4'"
        :value="userLoginCode.loginCodeIsExpiredStatus"
        :title="`${$t('UserLoginCodes.loginCodeStatus')} [${$t(
          'UserLoginCodes.loginCodeStatusExpired'
        )}]`"
        :showAsInfo="true"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    CustomCheckbox,
    DataLabelGroup,
  },
  props: ["userLoginCode"],
  methods: { formateDateTimeLang },
};
</script>

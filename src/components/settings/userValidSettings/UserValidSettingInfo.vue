<template>
  <CustomBottomSheet
    :refName="'UserValidSettingInfo'"
    size="xl"
    :headerText="$t('UserValidSettings.data')"
    :headerIcon="userValidSetting.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userValidSetting.fullCode"
        :title="$t('UserValidSettings.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userValidSetting.userTypeNameCurrent"
        :title="$t('Users.type')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userValidSetting.userValidSettingNameAr"
        :title="$t('UserValidSettings.nameAr')"
        :imgName="'UserValidSettings.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userValidSetting.userValidSettingNameEn"
        :title="$t('UserValidSettings.nameEn')"
        :imgName="'UserValidSettings.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userValidSetting.userValidSettingNameUnd"
        :title="$t('UserValidSettings.nameUnd')"
        :imgName="'UserValidSettings.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userValidSetting.userValidSettingDescriptionAr"
        :title="$t('UserValidSettings.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userValidSetting.userValidSettingDescriptionEn"
        :title="$t('UserValidSettings.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userValidSetting.userValidSettingDescriptionUnd"
        :title="$t('UserValidSettings.descriptionUnd')"
        :imgName="'description.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userValidSetting.userValidSettingNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          userValidSetting.userValidSettingActiveStatus == true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('UserValidSettings.activeStatus')"
        :imgName="'type.svg'"
      />
    </div>

    <div class="my-card">
      <span class="my-card-title">{{
        $t("UserValidSettings.requiredFields")
      }}</span>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            userValidSetting.requiredUserImageStatus == true
              ? $t('yes')
              : $t('no')
          "
          :title="$t('UserValidSettings.UserImage')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            userValidSetting.requiredUserFullCodeStatus == true
              ? $t('yes')
              : $t('no')
          "
          :title="$t('UserValidSettings.UserFullCode')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            userValidSetting.requiredUserEmailStatus == true
              ? $t('yes')
              : $t('no')
          "
          :title="$t('UserValidSettings.UserEmail')"
          :imgName="'email.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            userValidSetting.requiredUserPhoneStatus == true
              ? $t('yes')
              : $t('no')
          "
          :title="$t('UserValidSettings.UserPhone')"
          :imgName="'phone.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            userValidSetting.requiredUserNationalIDStatus == true
              ? $t('yes')
              : $t('no')
          "
          :title="$t('UserValidSettings.UserNationalID')"
          :imgName="'nationalNumber.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            userValidSetting.requiredUserExpiryDateNationalIDStatus == true
              ? $t('yes')
              : $t('no')
          "
          :title="$t('UserValidSettings.UserExpiryDateNationalID')"
          :imgName="'date.svg'"
        />

        <DataLabelGroup
          :className="'col-md-12'"
          :value="
            userValidSetting.requiredUserNotesStatus == true
              ? $t('yes')
              : $t('no')
          "
          :title="$t('UserValidSettings.UserNotes')"
          :imgName="'notes.svg'"
        />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["userValidSetting"],
};
</script>

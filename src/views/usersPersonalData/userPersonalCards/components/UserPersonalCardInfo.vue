<template>
  <CustomBottomSheet
    :refName="'UserPersonalCardInfo'"
    size="xl"
    :headerText="$t('UserPersonalCards.data')"
    :headerIcon="userPersonalCard.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.fullCode"
        :title="$t('UserPersonalCards.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          userPersonalCard.personalCardTypeData.personalCardTypeNameCurrent
        "
        :title="$t('PersonalCardTypes.select')"
        :imgName="'personalCardTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userPersonalCard.userPersonalCardCreationDate,
            userPersonalCard.userPersonalCardCreationTime
          )
        "
        :title="$t('UserPersonalCards.creationDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userPersonalCard.userPersonalCardExpirationDate,
            userPersonalCard.userPersonalCardExpirationTime
          )
        "
        :title="$t('UserPersonalCards.expirationDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardNumber"
        :title="$t('UserPersonalCards.cardNumber')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardCreationPlaceNameAr"
        :title="$t('UserPersonalCards.creationPlaceNameAr')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardCreationPlaceNameEn"
        :title="$t('UserPersonalCards.creationPlaceNameEn')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardCreationPlaceNameUnd"
        :title="$t('UserPersonalCards.creationPlaceNameUnd')"
        :imgName="'address.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardNameAr"
        :title="$t('UserPersonalCards.nameAr')"
        :imgName="'UserPersonalCards.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardNameEn"
        :title="$t('UserPersonalCards.nameEn')"
        :imgName="'UserPersonalCards.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardNameUnd"
        :title="$t('UserPersonalCards.nameUnd')"
        :imgName="'UserPersonalCards.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardNameAr"
        :title="$t('UserPersonalCards.nameAr')"
        :imgName="'UserPersonalCards.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardDescriptionAr"
        :title="$t('UserPersonalCards.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardDescriptionEn"
        :title="$t('UserPersonalCards.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardDescriptionUnd"
        :title="$t('UserPersonalCards.descriptionUnd')"
        :imgName="'description.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userPersonalCard.userPersonalCardNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["userPersonalCard"],
  methods: {
    formateDateTimeLang,
  },
};
</script>

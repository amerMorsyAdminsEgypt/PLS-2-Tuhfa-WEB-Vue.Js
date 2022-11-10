<template>
  <CustomBottomSheet
    :refName="'PriceListInfo'"
    size="xl"
    :headerText="$t('PriceLists.data')"
    :headerIcon="priceList.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListPackagePriceForClient"
        :title="$t('PriceLists.packagePriceForClient')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListPackagePriceInOfferForClient"
        :title="$t('PriceLists.packagePriceInOfferForClient')"
        :imgName="'offers.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListSessionPriceForClient"
        :title="$t('PriceLists.sessionPriceForClient')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListSessionPriceInOfferForClient"
        :title="$t('PriceLists.sessionPriceInOfferForClient')"
        :imgName="'offers.svg'"
      />
      <!-- <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListHourPriceForClient"
        :title="$t('PriceLists.hourPriceForClient')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListHourPriceInOfferForClient"
        :title="$t('PriceLists.hourPriceInOfferForClient')"
        :imgName="'offers.svg'"
      /> -->
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          priceList.educationalCategoryInfoData.educationalCategoryNameCurrent
        "
        :title="$t('EducationalCategories.name')"
        :imgName="'EducationalCategories.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.fullCode"
        :title="$t('PriceLists.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.showStatusNameCurrent"
        :title="$t('general.showStatus')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          priceList.priceListInOfferStatus
            ? $t('activeStatus')
            : $t('disActiveStatus')
        "
        :title="$t('general.offerActiveStatus')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListNameAr"
        :title="$t('PriceLists.nameAr')"
        :imgName="'PriceLists.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListNameEn"
        :title="$t('PriceLists.nameEn')"
        :imgName="'PriceLists.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListNameUnd"
        :title="$t('PriceLists.nameUnd')"
        :imgName="'PriceLists.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListDescriptionAr"
        :title="$t('PriceLists.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListDescriptionEn"
        :title="$t('PriceLists.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceList.priceListDescriptionUnd"
        :title="$t('PriceLists.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="priceList.priceListNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["priceList"],
};
</script>

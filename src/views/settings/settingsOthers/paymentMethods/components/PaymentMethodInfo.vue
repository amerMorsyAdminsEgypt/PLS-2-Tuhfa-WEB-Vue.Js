<template>
  <CustomBottomSheet
    :refName="'PaymentMethodInfo'"
    size="xl"
    :headerText="$t('PaymentMethods.data')"
    :headerIcon="paymentMethod.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="paymentMethod.fullCode"
        :title="$t('PaymentMethods.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="paymentMethod.paymentMethodNameAr"
        :title="$t('PaymentMethods.nameAr')"
        :imgName="'paymentMethods.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="paymentMethod.paymentMethodNameEn"
        :title="$t('PaymentMethods.nameEn')"
        :imgName="'paymentMethods.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="paymentMethod.paymentMethodNameUnd"
        :title="$t('PaymentMethods.nameUnd')"
        :imgName="'paymentMethods.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="paymentMethod.paymentMethodDescriptionAr"
        :title="$t('PaymentMethods.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="paymentMethod.paymentMethodDescriptionEn"
        :title="$t('PaymentMethods.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="paymentMethod.paymentMethodDescriptionUnd"
        :title="$t('PaymentMethods.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="paymentMethod.paymentMethodNotes"
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
  props: ["paymentMethod"],
};
</script>

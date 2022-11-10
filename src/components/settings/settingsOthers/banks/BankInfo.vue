<template>
  <div>
    <CustomBottomSheet :refName="'BankInfo'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/banks.svg" class="icon-lg" />
        {{ $t("Banks.data") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.fullCode"
          :title="$t('Banks.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.bankNameAr"
          :title="$t('Banks.nameAr')"
          :imgName="'banks.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.bankNameEn"
          :title="$t('Banks.nameEn')"
          :imgName="'banks.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.bankNameUnd"
          :title="$t('Banks.nameUnd')"
          :imgName="'banks.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.bankDescriptionAr"
          :title="$t('Banks.descriptionAr')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.bankDescriptionEn"
          :title="$t('Banks.descriptionEn')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.bankDescriptionUnd"
          :title="$t('Banks.descriptionUnd')"
          :imgName="'description.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="bank.bankNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  data() {
    return {};
  },
  props: ["bank"],
  methods: {},
};
</script>

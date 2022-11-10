<template>
  <CustomBottomSheet
    :refName="'PriorityTypeInfo'"
    size="xl"
    :headerText="$t('PriorityTypes.data')"
    :headerIcon="priorityType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priorityType.fullCode"
        :title="$t('PriorityTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          priorityType.colorInfoData
            ? priorityType.colorInfoData.colorNameCurrent
            : $t('notFound')
        "
        :title="$t('Colors.name')"
        :imgName="'colors.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priorityType.priorityTypeNameAr"
        :title="$t('PriorityTypes.nameAr')"
        :imgName="'priorityTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priorityType.priorityTypeNameEn"
        :title="$t('PriorityTypes.nameEn')"
        :imgName="'priorityTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priorityType.priorityTypeNameUnd"
        :title="$t('PriorityTypes.nameUnd')"
        :imgName="'priorityTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="priorityType.priorityTypeDescriptionAr"
        :title="$t('PriorityTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priorityType.priorityTypeDescriptionEn"
        :title="$t('PriorityTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priorityType.priorityTypeDescriptionUnd"
        :title="$t('PriorityTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="priorityType.priorityTypeNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <table class="my-table mt-3" v-if="priorityType.priorityScopeData">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("PriorityTypes.type") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(type, index) in priorityType.priorityScopeData"
            :key="type.priorityScopeTypeToken"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(type.priorityScopeTypeNameCurrent) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../../components/general/DataLabelGroup.vue";
import { isDataExist } from "@/utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  data() {
    return {};
  },
  props: ["priorityType"],
  methods: {
    isDataExist,
  },
};
</script>

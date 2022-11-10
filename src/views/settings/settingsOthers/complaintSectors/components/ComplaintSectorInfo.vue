<template>
  <CustomBottomSheet
    :refName="'ComplaintSectorInfo'"
    size="xl"
    :headerText="$t('ComplaintSectors.data')"
    :headerIcon="complaintSector.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintSector.fullCode"
        :title="$t('ComplaintSectors.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintSector.complaintSectorNameAr"
        :title="$t('ComplaintSectors.nameAr')"
        :imgName="'complaintSectors.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintSector.complaintSectorNameEn"
        :title="$t('ComplaintSectors.nameEn')"
        :imgName="'complaintSectors.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintSector.complaintSectorNameUnd"
        :title="$t('ComplaintSectors.nameUnd')"
        :imgName="'complaintSectors.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintSector.complaintSectorDescriptionAr"
        :title="$t('ComplaintSectors.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintSector.complaintSectorDescriptionEn"
        :title="$t('ComplaintSectors.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintSector.complaintSectorDescriptionUnd"
        :title="$t('ComplaintSectors.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintSector.complaintSectorNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <table
        class="my-table mt-3"
        v-if="complaintSector.complaintSectorsScopesData"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("ComplaintTypes.complaintScopeType") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(type, index) in complaintSector.complaintSectorsScopesData"
            :key="type.complaintSectorScopeToken"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(type.complaintScopeTypeNameCurrent) }}
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
  props: ["complaintSector"],
  methods: {
    isDataExist,
  },
};
</script>

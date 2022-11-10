<template>
  <CustomBottomSheet
    :refName="'SystemComponentsHierarchyInfo'"
    size="xl"
    :headerText="$t('SystemComponentsHierarchies.data')"
    :headerIcon="systemComponentsHierarchy.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponentsHierarchy.fullCode"
        :title="$t('SystemComponentsHierarchies.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponentsHierarchy.systemComponentsHierarchyNameAr"
        :title="$t('SystemComponentsHierarchies.nameAr')"
        :imgName="'systemComponentsHierarchies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponentsHierarchy.systemComponentsHierarchyNameEn"
        :title="$t('SystemComponentsHierarchies.nameEn')"
        :imgName="'systemComponentsHierarchies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponentsHierarchy.systemComponentsHierarchyNameUnd"
        :title="$t('SystemComponentsHierarchies.nameUnd')"
        :imgName="'systemComponentsHierarchies.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          systemComponentsHierarchy.systemComponentsHierarchyDescriptionAr
        "
        :title="$t('SystemComponentsHierarchies.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          systemComponentsHierarchy.systemComponentsHierarchyDescriptionEn
        "
        :title="$t('SystemComponentsHierarchies.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          systemComponentsHierarchy.systemComponentsHierarchyDescriptionUnd
        "
        :title="$t('SystemComponentsHierarchies.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponentsHierarchy.systemComponentsHierarchyNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
    <div class="my-card row">
      <span class="my-card-title">{{ $t("SystemComponents.modelName") }}</span>
      <table class="my-table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("general.image") }}</th>
            <th>{{ $t("general.name") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              systemComponent, index
            ) in systemComponentsHierarchy.systemComponentsHierarchiesDetailsData"
            :key="systemComponent.systemComponentData.systemComponentToken"
          >
            <td>{{ ++index }}</td>
            <td>
              <img
                class="item-img-table"
                :src="
                  fullPathFileFromServer(
                    systemComponent.systemComponentData
                      .systemComponentImagePath,
                    systemComponentsHierarchy.defaultImg
                  )
                "
                :onerror="`this.src='${systemComponentsHierarchy.defaultImg}'`"
              />
            </td>

            <td>
              {{
                isDataExist(
                  setDataMultiLang(
                    language,
                    systemComponent.systemComponentData.systemComponentNameAr,
                    systemComponent.systemComponentData.systemComponentNameEn
                  )
                )
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import {
  fullPathFileFromServer,
  isDataExist,
} from "./../../../../utils/functions";
import { setDataMultiLang, getLanguage } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  data() {
    return {
      language: getLanguage(),
    };
  },
  props: ["systemComponentsHierarchy"],
  methods: {
    fullPathFileFromServer,
    isDataExist,
    setDataMultiLang,
  },
};
</script>

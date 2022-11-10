<template>
  <div v-if="educationalStagesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("EducationalStages.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(educationalStage, index) in educationalStagesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalStage.educationalStageImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(educationalStage.fullCode) }}</td>
          <td>
            {{ isDataExist(educationalStage.educationalStageNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setEducationalStageData(educationalStage);
                    openBottomSheet('EducationalStageInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalStageData(educationalStage);
                    openBottomSheet('EducationalStageQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalStageEdit())">
                <button
                  @click="
                    setEducationalStageData(educationalStage);
                    openBottomSheet('EducationalStageUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalStageFinaleDelete())">
                <button
                  v-b-modal.EducationalStageDelete
                  :title="$t('delete')"
                  @click="setEducationalStageData(educationalStage)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasEducationalStageChangeActivationType())"
              >
                <button
                  v-b-modal.EducationalStageChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setEducationalStageData(educationalStage)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalStageData(educationalStage);
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../../utils/functions";
import {
  hasEducationalStageEdit,
  hasEducationalStageFinaleDelete,
  hasEducationalStageChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "EducationalStagesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["educationalStagesData", "filterData", "defaultImg"],
  methods: {
    setEducationalStageData(educationalStage) {
      this.$emit("setEducationalStageData", educationalStage);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalStageEdit,
    hasEducationalStageFinaleDelete,
    hasEducationalStageChangeActivationType,
  },
};
</script>

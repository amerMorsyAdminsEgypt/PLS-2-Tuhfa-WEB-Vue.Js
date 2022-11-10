<template>
  <div v-if="simpleExamModelsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("SimpleExamModels.data") }}</th>
          <th rowspan="2">{{ $t("SimpleExamModels.examDegree") }}</th>
          <th rowspan="2">{{ $t("ConstantsListSelect.ExamTypesName") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("SimpleExamModels.title") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(simpleExamModel, index) in simpleExamModelsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  simpleExamModel.simpleExamModelImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(simpleExamModel.fullCode) }}</td>
          <td>
            {{ isDataExist(simpleExamModel.simpleExamModelTitleCurrent) }}
          </td>
          <td>{{ isDataExist(simpleExamModel.simpleExamModelDegree) }}</td>
          <td>{{ isDataExist(simpleExamModel.examTypeNameCurrent) }}</td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setSimpleExamModelData(simpleExamModel);
                    openBottomSheet('SimpleExamModelInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setSimpleExamModelData(simpleExamModel);
                    openBottomSheet('SimpleExamModelQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasSimpleExamModelEdit())">
                <button
                  @click="
                    setSimpleExamModelData(simpleExamModel);
                    openBottomSheet('SimpleExamModelUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasSimpleExamModelFinaleDelete())">
                <button
                  v-b-modal.SimpleExamModelDelete
                  :title="$t('delete')"
                  @click="setSimpleExamModelData(simpleExamModel)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasSimpleExamModelChangeActivationType())"
              >
                <button
                  v-b-modal.SimpleExamModelChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setSimpleExamModelData(simpleExamModel)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setSimpleExamModelData(simpleExamModel);
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
} from "./../../../../utils/functions";
import {
  hasSimpleExamModelEdit,
  hasSimpleExamModelFinaleDelete,
  hasSimpleExamModelChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "SimpleExamModelsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["simpleExamModelsData", "filterData", "defaultImg"],
  methods: {
    setSimpleExamModelData(simpleExamModel) {
      this.$emit("setSimpleExamModelData", simpleExamModel);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasSimpleExamModelEdit,
    hasSimpleExamModelFinaleDelete,
    hasSimpleExamModelChangeActivationType,
  },
};
</script>

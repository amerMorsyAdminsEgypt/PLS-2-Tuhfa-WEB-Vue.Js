<template>
  <div v-if="classificationDegreesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("ClassificationDegrees.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
          <th>{{ $t("general.degreeFrom") }}</th>
          <th>{{ $t("general.degreeTo") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(classificationDegree, index) in classificationDegreesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  classificationDegree.classificationDegreeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(classificationDegree.fullCode) }}</td>
          <td>
            {{
              isDataExist(classificationDegree.classificationDegreeNameCurrent)
            }}
          </td>
          <td>
            {{
              isDataExist(classificationDegree.classificationDegreeGradeFrom)
            }}
          </td>
          <td>
            {{ isDataExist(classificationDegree.classificationDegreeGradeTo) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setClassificationDegreeData(classificationDegree);
                    openBottomSheet('ClassificationDegreeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setClassificationDegreeData(classificationDegree);
                    openBottomSheet('ClassificationDegreeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasClassificationDegreeEdit())">
                <button
                  @click="
                    setClassificationDegreeData(classificationDegree);
                    openBottomSheet('ClassificationDegreeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasClassificationDegreeFinaleDelete())">
                <button
                  v-b-modal.ClassificationDegreeDelete
                  :title="$t('delete')"
                  @click="setClassificationDegreeData(classificationDegree)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasClassificationDegreeChangeActivationType())
                "
              >
                <button
                  v-b-modal.ClassificationDegreeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setClassificationDegreeData(classificationDegree)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setClassificationDegreeData(classificationDegree);
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
  hasClassificationDegreeEdit,
  hasClassificationDegreeFinaleDelete,
  hasClassificationDegreeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "ClassificationDegreesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["classificationDegreesData", "filterData", "defaultImg"],
  methods: {
    setClassificationDegreeData(classificationDegree) {
      this.$emit("setClassificationDegreeData", classificationDegree);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasClassificationDegreeEdit,
    hasClassificationDegreeFinaleDelete,
    hasClassificationDegreeChangeActivationType,
  },
};
</script>

<template>
  <div v-if="scientificDegreesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("ScientificDegrees.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(scientificDegree, index) in scientificDegreesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  scientificDegree.scientificDegreeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(scientificDegree.fullCode) }}</td>
          <td>
            {{ isDataExist(scientificDegree.scientificDegreeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setScientificDegreeData(scientificDegree);
                    openBottomSheet('ScientificDegreeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setScientificDegreeData(scientificDegree);
                    openBottomSheet('ScientificDegreeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasScientificDegreeEdit())">
                <button
                  @click="
                    setScientificDegreeData(scientificDegree);
                    openBottomSheet('ScientificDegreeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasScientificDegreeFinaleDelete())">
                <button
                  v-b-modal.ScientificDegreeDelete
                  :title="$t('delete')"
                  @click="setScientificDegreeData(scientificDegree)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasScientificDegreeChangeActivationType())"
              >
                <button
                  v-b-modal.ScientificDegreeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setScientificDegreeData(scientificDegree)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setScientificDegreeData(scientificDegree);
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
  hasScientificDegreeEdit,
  hasScientificDegreeFinaleDelete,
  hasScientificDegreeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "ScientificDegreesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["scientificDegreesData", "filterData", "defaultImg"],
  methods: {
    setScientificDegreeData(scientificDegree) {
      this.$emit("setScientificDegreeData", scientificDegree);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasScientificDegreeEdit,
    hasScientificDegreeFinaleDelete,
    hasScientificDegreeChangeActivationType,
  },
};
</script>

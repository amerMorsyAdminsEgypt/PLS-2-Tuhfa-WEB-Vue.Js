<template>
  <div v-if="priorityTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("PriorityTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("Colors.name") }}</th>
          <th>{{ $t("general.type") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(priorityType, index) in priorityTypesData" :key="index">
          <td
            class="cell-color"
            :style="{
              backgroundColor: priorityType.colorInfoData.colorHexFromat,
            }"
          >
            <span>{{ ++index + filterData.currentIndex }}</span>
          </td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  priorityType.priorityTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(priorityType.fullCode) }}</td>
          <td>
            {{ isDataExist(priorityType.priorityTypeNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(priorityType.colorInfoData.colorNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(
                priorityType.priorityScopeData.length
                  ? priorityType.priorityScopeData[0]
                      .priorityScopeTypeNameCurrent
                  : ""
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setPriorityTypeData(priorityType);
                    openBottomSheet('PriorityTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriorityTypeData(priorityType);
                    openBottomSheet('PriorityTypeQRCode');
                  "
                  :title="$t('PriorityTypes.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPriorityTypeEdit())">
                <button
                  @click="
                    setPriorityTypeData(priorityType);
                    openBottomSheet('PriorityTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPriorityTypeFinaleDelete())">
                <button
                  v-b-modal.PriorityTypeDelete
                  :title="$t('delete')"
                  @click="setPriorityTypeData(priorityType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPriorityTypeChangeActivationType())">
                <button
                  v-b-modal.PriorityTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setPriorityTypeData(priorityType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriorityTypeData(priorityType);
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
  hasPriorityTypeEdit,
  hasPriorityTypeFinaleDelete,
  hasPriorityTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "PriorityTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["priorityTypesData", "filterData", "defaultImg"],
  methods: {
    setPriorityTypeData(priorityType) {
      this.$emit("setPriorityTypeData", priorityType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPriorityTypeEdit,
    hasPriorityTypeFinaleDelete,
    hasPriorityTypeChangeActivationType,
  },
};
</script>

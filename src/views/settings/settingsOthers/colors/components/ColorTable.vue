<template>
  <div v-if="colorsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Colors.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(color, index) in colorsData" :key="index">
          <td
            class="cell-color"
            :style="{
              backgroundColor: color.colorHexFromat,
            }"
          >
            <span>{{ ++index + filterData.currentIndex }}</span>
          </td>
          <td>
            <img
              class="item-img-table"
              :src="fullPathFileFromServer(color.colorImagePath, defaultImg)"
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(color.fullCode) }}</td>
          <td>
            {{ isDataExist(color.colorNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setColorData(color);
                    openBottomSheet('ColorInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setColorData(color);
                    openBottomSheet('ColorQRCode');
                  "
                  :title="$t('Colors.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasColorEdit())">
                <button
                  @click="
                    setColorData(color);
                    openBottomSheet('ColorUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasColorFinaleDelete())">
                <button
                  v-b-modal.ColorDelete
                  :title="$t('delete')"
                  @click="setColorData(color)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasColorChangeActivationType())">
                <button
                  v-b-modal.ColorChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setColorData(color)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setColorData(color);
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
  hasColorEdit,
  hasColorFinaleDelete,
  hasColorChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "ColorsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["colorsData", "filterData", "defaultImg"],
  methods: {
    setColorData(color) {
      this.$emit("setColorData", color);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasColorEdit,
    hasColorFinaleDelete,
    hasColorChangeActivationType,
  },
};
</script>

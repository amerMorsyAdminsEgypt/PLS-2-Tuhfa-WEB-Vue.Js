<template>
  <div v-if="knownMethodsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("KnownMethods.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(knownMethod, index) in knownMethodsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  knownMethod.knownMethodImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(knownMethod.fullCode) }}</td>
          <td>
            {{ isDataExist(knownMethod.knownMethodNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setKnownMethodData(knownMethod);
                    openBottomSheet('KnownMethodInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setKnownMethodData(knownMethod);
                    openBottomSheet('KnownMethodQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasKnownMethodEdit())">
                <button
                  @click="
                    setKnownMethodData(knownMethod);
                    openBottomSheet('KnownMethodUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasKnownMethodFinaleDelete())">
                <button
                  v-b-modal.KnownMethodDelete
                  :title="$t('delete')"
                  @click="setKnownMethodData(knownMethod)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasKnownMethodChangeActivationType())">
                <button
                  v-b-modal.KnownMethodChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setKnownMethodData(knownMethod)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setKnownMethodData(knownMethod);
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
  hasKnownMethodEdit,
  hasKnownMethodFinaleDelete,
  hasKnownMethodChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "KnownMethodsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["knownMethodsData", "filterData", "defaultImg"],
  methods: {
    setKnownMethodData(knownMethod) {
      this.$emit("setKnownMethodData", knownMethod);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasKnownMethodEdit,
    hasKnownMethodFinaleDelete,
    hasKnownMethodChangeActivationType,
  },
};
</script>

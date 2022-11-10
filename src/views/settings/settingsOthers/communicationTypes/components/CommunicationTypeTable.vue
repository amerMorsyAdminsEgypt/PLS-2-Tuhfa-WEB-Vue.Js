<template>
  <div v-if="communicationTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("CommunicationTypes.data") }}</th>
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
          v-for="(communicationType, index) in communicationTypesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  communicationType.communicationTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(communicationType.fullCode) }}</td>
          <td>
            {{ isDataExist(communicationType.communicationTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setCommunicationTypeData(communicationType);
                    openBottomSheet('CommunicationTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setCommunicationTypeData(communicationType);
                    openBottomSheet('CommunicationTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasCommunicationTypeEdit())">
                <button
                  @click="
                    setCommunicationTypeData(communicationType);
                    openBottomSheet('CommunicationTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasCommunicationTypeFinaleDelete())">
                <button
                  v-b-modal.CommunicationTypeDelete
                  :title="$t('delete')"
                  @click="setCommunicationTypeData(communicationType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasCommunicationTypeChangeActivationType())
                "
              >
                <button
                  v-b-modal.CommunicationTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setCommunicationTypeData(communicationType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setCommunicationTypeData(communicationType);
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
  hasCommunicationTypeEdit,
  hasCommunicationTypeFinaleDelete,
  hasCommunicationTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "CommunicationTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["communicationTypesData", "filterData", "defaultImg"],
  methods: {
    setCommunicationTypeData(communicationType) {
      this.$emit("setCommunicationTypeData", communicationType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasCommunicationTypeEdit,
    hasCommunicationTypeFinaleDelete,
    hasCommunicationTypeChangeActivationType,
  },
};
</script>

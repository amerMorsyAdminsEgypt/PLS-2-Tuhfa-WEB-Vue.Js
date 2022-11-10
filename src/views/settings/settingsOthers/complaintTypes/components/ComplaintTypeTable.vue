<template>
  <div v-if="complaintTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("ComplaintTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(complaintType, index) in complaintTypesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  complaintType.complaintTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(complaintType.fullCode) }}</td>
          <td>
            {{ isDataExist(complaintType.complaintTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setComplaintTypeData(complaintType);
                    openBottomSheet('ComplaintTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setComplaintTypeData(complaintType);
                    openBottomSheet('ComplaintTypeQRCode');
                  "
                  :title="$t('ComplaintTypes.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasComplaintTypeEdit())">
                <button
                  @click="
                    setComplaintTypeData(complaintType);
                    openBottomSheet('ComplaintTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasComplaintTypeFinaleDelete())">
                <button
                  v-b-modal.ComplaintTypeDelete
                  :title="$t('delete')"
                  @click="setComplaintTypeData(complaintType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasComplaintTypeChangeActivationType())">
                <button
                  v-b-modal.ComplaintTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setComplaintTypeData(complaintType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setComplaintTypeData(complaintType);
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
  hasComplaintTypeEdit,
  hasComplaintTypeFinaleDelete,
  hasComplaintTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "ComplaintTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["complaintTypesData", "filterData", "defaultImg"],
  methods: {
    setComplaintTypeData(complaintType) {
      this.$emit("setComplaintTypeData", complaintType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasComplaintTypeEdit,
    hasComplaintTypeFinaleDelete,
    hasComplaintTypeChangeActivationType,
  },
};
</script>

<template>
  <div v-if="complaintSectorsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("ComplaintSectors.data") }}</th>
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
          v-for="(complaintSector, index) in complaintSectorsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  complaintSector.complaintSectorImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(complaintSector.fullCode) }}</td>
          <td>
            {{ isDataExist(complaintSector.complaintSectorNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setComplaintSectorData(complaintSector);
                    openBottomSheet('ComplaintSectorInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setComplaintSectorData(complaintSector);
                    openBottomSheet('ComplaintSectorQRCode');
                  "
                  :title="$t('ComplaintSectors.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasComplaintSectorEdit())">
                <button
                  @click="
                    setComplaintSectorData(complaintSector);
                    openBottomSheet('ComplaintSectorUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasComplaintSectorFinaleDelete())">
                <button
                  v-b-modal.ComplaintSectorDelete
                  :title="$t('delete')"
                  @click="setComplaintSectorData(complaintSector)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasComplaintSectorChangeActivationType())"
              >
                <button
                  v-b-modal.ComplaintSectorChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setComplaintSectorData(complaintSector)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setComplaintSectorData(complaintSector);
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
  hasComplaintSectorEdit,
  hasComplaintSectorFinaleDelete,
  hasComplaintSectorChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "ComplaintSectorsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["complaintSectorsData", "filterData", "defaultImg"],
  methods: {
    setComplaintSectorData(complaintSector) {
      this.$emit("setComplaintSectorData", complaintSector);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasComplaintSectorEdit,
    hasComplaintSectorFinaleDelete,
    hasComplaintSectorChangeActivationType,
  },
};
</script>

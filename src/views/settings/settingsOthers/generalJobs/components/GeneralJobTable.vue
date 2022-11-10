<template>
  <div v-if="generalJobsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("GeneralJobs.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(generalJob, index) in generalJobsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  generalJob.generalJobImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(generalJob.fullCode) }}</td>
          <td>
            {{ isDataExist(generalJob.generalJobNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setGeneralJobData(generalJob);
                    openBottomSheet('GeneralJobInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setGeneralJobData(generalJob);
                    openBottomSheet('GeneralJobQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasGeneralJobEdit())">
                <button
                  @click="
                    setGeneralJobData(generalJob);
                    openBottomSheet('GeneralJobUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasGeneralJobFinaleDelete())">
                <button
                  v-b-modal.GeneralJobDelete
                  :title="$t('delete')"
                  @click="setGeneralJobData(generalJob)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasGeneralJobChangeActivationType())">
                <button
                  v-b-modal.GeneralJobChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setGeneralJobData(generalJob)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setGeneralJobData(generalJob);
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
  hasGeneralJobEdit,
  hasGeneralJobFinaleDelete,
  hasGeneralJobChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "GeneralJobsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["generalJobsData", "filterData", "defaultImg"],
  methods: {
    setGeneralJobData(generalJob) {
      this.$emit("setGeneralJobData", generalJob);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasGeneralJobEdit,
    hasGeneralJobFinaleDelete,
    hasGeneralJobChangeActivationType,
  },
};
</script>

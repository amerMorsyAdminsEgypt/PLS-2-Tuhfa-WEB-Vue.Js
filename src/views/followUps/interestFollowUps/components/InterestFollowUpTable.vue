<template>
  <div v-if="interestFollowUpsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="6">{{ $t("InterestFollowUps.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.title") }}</th>
          <th>{{ $t("general.type") }}</th>
          <th>{{ $t("general.state") }}</th>
          <th>{{ $t("Interests.title") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(interestFollowUp, index) in interestFollowUpsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  interestFollowUp.interestFollowUpImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(interestFollowUp.fullCode) }}</td>
          <td>
            {{ isDataExist(interestFollowUp.interestFollowUpTitleCurrent) }}
          </td>
          <td>
            {{ isDataExist(interestFollowUp.followUpTypeNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(interestFollowUp.replyStatusTypeNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(
                interestFollowUp.educationalCategoryInterestData
                  ? interestFollowUp.educationalCategoryInterestData
                      .educationalCategoryInterestDescriptionCurrent
                  : ""
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setInterestFollowUpData(interestFollowUp);
                    openBottomSheet('InterestFollowUpInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInterestFollowUpData(interestFollowUp);
                    openBottomSheet('InterestFollowUpQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInterestFollowUpEdit())">
                <button
                  @click="
                    setInterestFollowUpData(interestFollowUp);
                    openBottomSheet('InterestFollowUpUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInterestFollowUpFinaleDelete())">
                <button
                  v-b-modal.InterestFollowUpDelete
                  :title="$t('delete')"
                  @click="setInterestFollowUpData(interestFollowUp)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasInterestFollowUpChangeActivationType())"
              >
                <button
                  v-b-modal.InterestFollowUpChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setInterestFollowUpData(interestFollowUp)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInterestFollowUpData(interestFollowUp);
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
  hasInterestFollowUpEdit,
  hasInterestFollowUpFinaleDelete,
  hasInterestFollowUpChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "InterestFollowUpsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["interestFollowUpsData", "filterData", "defaultImg"],
  methods: {
    setInterestFollowUpData(interestFollowUp) {
      this.$emit("setInterestFollowUpData", interestFollowUp);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInterestFollowUpEdit,
    hasInterestFollowUpFinaleDelete,
    hasInterestFollowUpChangeActivationType,
  },
};
</script>

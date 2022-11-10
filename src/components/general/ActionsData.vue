<template>
  <CustomBottomSheet
    :refName="'ActionsData'"
    size="md"
    :headerText="$t('actionsData.data')"
    :headerIcon="icon"
  >
    <div class="my-card" v-if="actionsData.createdByUserToken">
      <span class="my-card-title">{{ $t("actionsData.add") }}</span>

      <div class="row">
        <!-- <DataLabelGroup
          :className="'col-lg-6'"
          :value="actionsData.userCreatedData.userNameCurrent"
          :title="$t('actionsData.user')"
          :imgName="'man.svg'"
        /> -->
        <DataLabelGroup
          :className="'col-lg-12'"
          :value="
            formateDateTimeLang(
              actionsData.creationDate,
              actionsData.creationTime
            )
          "
          :title="$t('actionsData.dateTime')"
          :imgName="'dateAndTime.svg'"
        />
      </div>
    </div>

    <div class="my-card" v-if="actionsData.lastUpdatedByUserToken">
      <span class="my-card-title">{{ $t("actionsData.lastUpdated") }}</span>

      <div class="row">
        <!-- <DataLabelGroup
          :className="'col-lg-6'"
          :value="actionsData.userLastUpdatedData.userNameCurrent"
          :title="$t('actionsData.user')"
          :imgName="'man.svg'"
        /> -->
        <DataLabelGroup
          :className="'col-lg-12'"
          :value="
            formateDateTimeLang(
              actionsData.lastUpdateDate,
              actionsData.lastUpdateTime
            )
          "
          :title="$t('actionsData.dateTime')"
          :imgName="'dateAndTime.svg'"
        />
      </div>
    </div>

    <div class="my-card" v-if="actionsData.lastActivedByUserToken">
      <span class="my-card-title">{{ $t("actionsData.lastActived") }}</span>

      <div class="row">
        <!-- <DataLabelGroup
          :className="'col-lg-6'"
          :value="actionsData.userLastActivedData.userNameCurrent"
          :title="$t('actionsData.user')"
          :imgName="'man.svg'"
        /> -->
        <DataLabelGroup
          :className="'col-lg-12'"
          :value="
            formateDateTimeLang(
              actionsData.lastActivedDate,
              actionsData.lastActivedTime
            )
          "
          :title="$t('actionsData.dateTime')"
          :imgName="'dateAndTime.svg'"
        />
      </div>
    </div>

    <div class="my-card" v-if="actionsData.lastArchivedByUserToken">
      <span class="my-card-title">{{ $t("actionsData.lastArchived") }}</span>

      <div class="row">
        <!-- <DataLabelGroup
          :className="'col-lg-6'"
          :value="actionsData.userLastArchivedData.userNameCurrent"
          :title="$t('actionsData.user')"
          :imgName="'man.svg'"
        /> -->
        <DataLabelGroup
          :className="'col-lg-12'"
          :value="
            formateDateTimeLang(
              actionsData.lastArchivedDate,
              actionsData.lastArchivedTime
            )
          "
          :title="$t('actionsData.dateTime')"
          :imgName="'dateAndTime.svg'"
        />
      </div>
    </div>

    <div class="my-card" v-if="actionsData.lastBlockedByUserToken">
      <span class="my-card-title">{{ $t("actionsData.lastBlocked") }}</span>

      <div class="row">
        <!-- <DataLabelGroup
          :className="'col-lg-6'"
          :value="actionsData.userLastBlockedData.userNameCurrent"
          :title="$t('actionsData.user')"
          :imgName="'man.svg'"
        /> -->
        <DataLabelGroup
          :className="'col-lg-12'"
          :value="
            formateDateTimeLang(
              actionsData.lastBlockedDate,
              actionsData.lastBlockedTime
            )
          "
          :title="$t('actionsData.dateTime')"
          :imgName="'dateAndTime.svg'"
        />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../utils/functions";
import icon from "@/assets/images/actions-data.svg";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  data() {
    return {
      icon,
    };
  },
  props: ["actionsData"],
  methods: {
    formateDateTimeLang,
  },
};
</script>

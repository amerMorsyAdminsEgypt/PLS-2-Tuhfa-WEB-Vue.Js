<template>
  <CustomBottomSheet
    :refName="'InterestInfo'"
    size="xl"
    :headerText="$t('Interests.data')"
    :headerIcon="interest.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interest.fullCode"
        :title="$t('Interests.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interest.interestTitleAr"
        :title="$t('Interests.titleAr')"
        :imgName="'interests.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interest.interestTitleEn"
        :title="$t('Interests.titleEn')"
        :imgName="'interests.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interest.interestTitleUnd"
        :title="$t('Interests.titleUnd')"
        :imgName="'interests.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="interest.interestDescriptionAr"
        :title="$t('Interests.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interest.interestDescriptionEn"
        :title="$t('Interests.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interest.interestDescriptionUnd"
        :title="$t('Interests.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interest.interestTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="interest.interestNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <div class="my-card row" v-if="interest.educationalCategoryInterestData">
        <span class="my-card-title">{{ $t("Interests.dataDetails") }}</span>
        <table class="my-table mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("description") }}</th>
              <th>{{ $t("general.type") }}</th>
              <th>{{ $t("dateTimeStart") }}</th>
              <th>{{ $t("dateTimeEnd") }}</th>
              <th>{{ $t("EducationalCategories.name") }}</th>
              <th>{{ $t("Places.name") }}</th>
              <th v-if="checkPrivilege(hasInterestFollowUp())">
                <i class="fas fa-sliders-h"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in interest.educationalCategoryInterestData"
              :key="index"
            >
              <td>
                {{ ++index }}
              </td>
              <td>
                {{
                  isDataExist(
                    item.educationalCategoryInterestDescriptionCurrent
                  )
                }}
              </td>
              <td>
                {{ isDataExist(item.joiningTypeNameCurrent) }}
              </td>
              <td>
                {{ isDataExist(item.startDateTime) }}
              </td>
              <td>
                {{ isDataExist(item.endDateTime) }}
              </td>
              <td>
                {{
                  isDataExist(
                    item.educationalCategoryInfoData
                      ? item.educationalCategoryInfoData
                          .educationalCategoryNameCurrent
                      : ""
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    item.placeInfoData
                      ? item.placeInfoData.placeNameCurrent
                      : ""
                  )
                }}
              </td>
              <td
                class="fmenu-item-container"
                v-if="checkPrivilege(hasInterestFollowUp())"
              >
                <FloatingMenu>
                  <li>
                    <router-link
                      :to="{
                        name: 'InterestFollowUps',
                        params: {
                          interestToken: interest.interestToken,
                          mainToken: item.educationalCategoryInterestToken,
                          followUpTypeToken:
                            FOLLOW_UP_TYPE_TOKENS.EducationalCategoryInterest,
                        },
                      }"
                      :title="$t('InterestFollowUps.data')"
                    >
                      <img src="@/assets/images/interestFollowUps.svg" />
                    </router-link>
                  </li>
                </FloatingMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="my-card row"
        v-if="interest.educationalCategoryOtherInterestData"
      >
        <span class="my-card-title">{{ $t("Interests.dataOther") }}</span>
        <table class="my-table mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("name") }}</th>
              <th>{{ $t("description") }}</th>
              <th v-if="checkPrivilege(hasInterestFollowUp())">
                <i class="fas fa-sliders-h"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(
                item, index
              ) in interest.educationalCategoryOtherInterestData"
              :key="index"
            >
              <td>
                {{ ++index }}
              </td>
              <td>
                {{
                  isDataExist(item.educationalCategoryOtherInterestNameCurrent)
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    item.educationalCategoryOtherInterestDescriptionCurrent
                  )
                }}
              </td>
              <td
                class="fmenu-item-container"
                v-if="checkPrivilege(hasInterestFollowUp())"
              >
                <FloatingMenu>
                  <li>
                    <router-link
                      :to="{
                        name: 'InterestFollowUps',
                        params: {
                          interestToken: interest.interestToken,
                          mainToken: item.educationalCategoryOtherInterestToken,
                          followUpTypeToken:
                            FOLLOW_UP_TYPE_TOKENS.EducationalCategoryOtherInterest,
                        },
                      }"
                      :title="$t('InterestFollowUps.data')"
                    >
                      <img src="@/assets/images/interestFollowUps.svg" />
                    </router-link>
                  </li>
                </FloatingMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { isDataExist, checkPrivilege } from "./../../../../utils/functions";
import { hasInterestFollowUp } from "./../../../../utils/privilegeHelper";
import { FOLLOW_UP_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  components: {
    CustomBottomSheet,
    FloatingMenu,
    DataLabelGroup,
  },
  props: ["interest"],
  data() {
    return {
      FOLLOW_UP_TYPE_TOKENS,
    };
  },
  methods: {
    isDataExist,
    checkPrivilege,
    hasInterestFollowUp,
  },
  computed: {},
};
</script>

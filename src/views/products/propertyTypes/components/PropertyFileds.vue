<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <div class="my-card">
      <span class="my-card-title">
        {{ $t("PropertyTypes.listItems.modelName") }}
      </span>

      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("delete") }}</th>
              <th class="cell-lg">
                {{ $t("PropertyTypes.listItems.nameAr") }}
              </th>
              <th class="cell-lg">
                {{ $t("PropertyTypes.listItems.nameEn") }}
              </th>
              <th class="cell-lg">
                {{ $t("ConstantsListSelect.PropertyFieldTypesName") }}
              </th>
              <th class="cell-lg">
                {{ $t("PropertyTypes.listItems.defaultValueAr") }}
              </th>
              <th class="cell-lg">
                {{ $t("PropertyTypes.listItems.defaultValueEn") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="propertyDetailsData.length == 0">
              <tr>
                <th colspan="7">
                  {{ $t("PropertyTypes.listItems.noItems") }}
                </th>
              </tr>
            </template>
            <template v-else>
              <tr v-for="(item, index) in propertyDetailsData" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <button
                    :title="$t('delete')"
                    @click.prevent="removeSlice(index)"
                  >
                    <img src="@/assets/images/trash.svg" />
                  </button>
                </td>
                <td>
                  <CustomInput
                    :id="`${id}-table-[${index}][propertyNameAr]`"
                    :value="item.propertyNameAr"
                    v-on:changeValue="item.propertyNameAr = $event"
                    :withOutDesign="true"
                  />
                </td>
                <td>
                  <CustomInput
                    :id="`${id}-table-[${index}][propertyNameEn]`"
                    :value="item.propertyNameEn"
                    v-on:changeValue="item.propertyNameEn = $event"
                    :withOutDesign="true"
                  />
                </td>
                <td>
                  <CustomSelectBox
                    :id="`${id}-table-[${index}][propertyFieldTypeToken]`"
                    :value="item.propertyFieldTypeToken"
                    :options="propertyFieldTypeTokenOptions"
                    v-on:changeValue="
                      item.propertyFieldTypeToken = $event;
                      item.propertyFieldDefaultValueAr = '';
                      item.propertyFieldDefaultValueEn = '';
                      item.propertyFieldDefaultValueUnd = '';
                      item.dropDownListToken = '';
                      item.propertyFieldDefaultValueToken = '';
                    "
                    :title="$t('ConstantsListSelect.PropertyFieldTypes')"
                    :imgName="'PropertyFieldTypes.svg'"
                    :openDown="true"
                  />
                </td>
                <template
                  v-if="
                    item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Text
                  "
                >
                  <td>
                    <CustomInput
                      :id="`${id}-table-[${index}][propertyFieldDefaultValueAr]`"
                      :value="item.propertyFieldDefaultValueAr"
                      v-on:changeValue="
                        item.propertyFieldDefaultValueAr = $event
                      "
                      :withOutDesign="true"
                    />
                  </td>
                  <td>
                    <CustomInput
                      :id="`${id}-table-[${index}][propertyFieldDefaultValueEn]`"
                      :value="item.propertyFieldDefaultValueEn"
                      v-on:changeValue="
                        item.propertyFieldDefaultValueEn = $event
                      "
                      :withOutDesign="true"
                    />
                  </td>
                </template>
                <template
                  v-else-if="
                    item.propertyFieldTypeToken ==
                    PROPERTY_FIELD_TYPES.DropDownList
                  "
                >
                  <td>
                    <CustomSelectBox
                      :id="`${id}-table-[${index}][dropDownListToken]`"
                      :value="item.dropDownListToken"
                      :options="dropDownListTokenOptions"
                      v-on:changeValue="
                        item.dropDownListToken = $event;
                        dropDownListTokenChanged($event, index);
                      "
                      :title="$t('DropDownLists.select')"
                      :imgName="'DropDownLists.svg'"
                      :openDown="true"
                    />
                  </td>
                  <td>
                    <CustomSelectBox
                      :id="`${id}-table-[${index}][propertyFieldDefaultValueToken]`"
                      :value="item.propertyFieldDefaultValueToken"
                      :options="item.defaultValueOptions"
                      v-on:changeValue="
                        item.propertyFieldDefaultValueToken = $event
                      "
                      :title="$t('PropertyTypes.listItems.defaultValue')"
                      :imgName="'DropDownLists.svg'"
                      :openDown="true"
                    />
                  </td>
                </template>
                <template v-else>
                  <td>
                    <CustomInput
                      v-if="
                        item.propertyFieldTypeToken ==
                          PROPERTY_FIELD_TYPES.Email ||
                        item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Link
                      "
                      :id="`${id}-table-[${index}][propertyFieldDefaultValueAr]`"
                      :value="item.propertyFieldDefaultValueAr"
                      v-on:changeValue="
                        item.propertyFieldDefaultValueAr = $event
                      "
                      :withOutDesign="true"
                    />
                    <CustomInputFloat
                      v-else-if="
                        item.propertyFieldTypeToken ==
                          PROPERTY_FIELD_TYPES.Number ||
                        item.propertyFieldTypeToken ==
                          PROPERTY_FIELD_TYPES.Decimal ||
                        item.propertyFieldTypeToken ==
                          PROPERTY_FIELD_TYPES.Percentage
                      "
                      :id="`${id}-table-[${index}][propertyFieldDefaultValueAr]`"
                      :value="item.propertyFieldDefaultValueAr"
                      v-on:changeValue="
                        item.propertyFieldDefaultValueAr = $event
                      "
                      :withOutDesign="true"
                    />
                    <CustomInputInt
                      v-else-if="
                        item.propertyFieldTypeToken ==
                        PROPERTY_FIELD_TYPES.Integer
                      "
                      :id="`${id}-table-[${index}][propertyFieldDefaultValueAr]`"
                      :value="item.propertyFieldDefaultValueAr"
                      v-on:changeValue="
                        item.propertyFieldDefaultValueAr = $event
                      "
                      :title="$t('PropertyTypes.listItems.defaultValue')"
                      :imgName="'PropertyTypes.svg'"
                      :withOutDesign="true"
                    />

                    <DateTimePicker
                      v-else-if="
                        item.propertyFieldTypeToken ==
                        PROPERTY_FIELD_TYPES.DateTime
                      "
                      :id="`${id}-table-[${index}][propertyFieldDefaultValueAr]`"
                      type="dateTime"
                      :value="item.propertyFieldDefaultValueAr"
                      :title="$t('PropertyTypes.listItems.defaultValue')"
                      v-on:changeValue="
                        item.propertyFieldDefaultValueAr = $event.dateTime
                      "
                      :language="language"
                      :withOutDesign="true"
                    />
                    <DateTimePicker
                      v-else-if="
                        item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Date
                      "
                      :id="`${id}-table-[${index}][propertyFieldDefaultValueAr]`"
                      type="date"
                      :value="item.propertyFieldDefaultValueAr"
                      :title="$t('PropertyTypes.listItems.defaultValue')"
                      v-on:changeValue="
                        item.propertyFieldDefaultValueAr = $event.date
                      "
                      :language="language"
                      :imgName="'date.svg'"
                      :withOutDesign="true"
                    />
                    <DateTimePicker
                      v-else-if="
                        item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Time
                      "
                      :id="`${id}-table-[${index}][propertyFieldDefaultValueAr]`"
                      type="time"
                      :value="item.propertyDateTime"
                      :title="$t('PropertyTypes.listItems.defaultValue')"
                      v-on:changeValue="
                        item.propertyDateTime = $event.dateTime;
                        item.propertyFieldDefaultValueAr =
                          $event.timeCustomized;
                      "
                      :language="language"
                      :imgName="'time.svg'"
                      :withOutDesign="true"
                    />

                    <CustomCheckbox
                      v-else-if="
                        item.propertyFieldTypeToken ==
                        PROPERTY_FIELD_TYPES.Logical
                      "
                      :value="item.propertyFieldDefaultValueAr"
                      v-on:changeValue="
                        item.propertyFieldDefaultValueAr = $event
                      "
                      :centerStatus="true"
                      :withOutTitle="true"
                    />

                    <span v-else>-</span>
                  </td>
                  <td>-</td>
                </template>
              </tr>
            </template>
            <template>
              <tr>
                <th colspan="7">
                  <button
                    class="btn btn-primary btn-block"
                    @click.prevent="addSlice(index)"
                  >
                    {{ $t("add") }}
                  </button>
                </th>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomInputInt from "./../../../../components/general/CustomInputInt.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import PropertyDetailsData from "./../../../../models/products/propertyTypes/PropertyDetailsData";
import apiDropDownList from "./../../../../api/products/dropDownLists";
import { PROPERTY_FIELD_TYPES } from "./../../../../utils/constantLists";
import { getLanguage } from "./../../../../utils/functions";
import { STATUS } from "./../../../../utils/constants";
import { getDialogOfPropertyFieldTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomInputFloat,
    CustomInputInt,
    DateTimePicker,
    CustomSelectBox,
    CustomCheckbox,
  },
  data() {
    return {
      language: getLanguage(),
      propertyFieldTypeTokenOptions: getDialogOfPropertyFieldTypes(),
      PROPERTY_FIELD_TYPES,
    };
  },
  props: {
    propertyDetailsData: {
      type: Array,
      default: () => [],
    },
    dropDownListTokenOptions: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: "id",
    },
  },
  methods: {
    addSlice() {
      this.propertyDetailsData.push(new PropertyDetailsData());
    },
    removeSlice(index) {
      this.propertyDetailsData.splice(index, 1);
    },
    async dropDownListTokenChanged(token, index) {
      this.isLoading = true;
      this.propertyDetailsData[index].defaultValueOptions = [];
      if (token) {
        try {
          let filter = { token: token };
          const response = await apiDropDownList.getDetails(filter);
          if (
            response.data.status == STATUS.SUCCESS &&
            response.data.dropDownList &&
            response.data.dropDownList.dropDownListItemsData &&
            response.data.dropDownList.dropDownListItemsData.length > 0
          ) {
            this.propertyDetailsData[index].defaultValueOptions =
              response.data.dropDownList.dropDownListItemsData.map(
                (element) => {
                  return {
                    value: element.dropDownListItemToken,
                    text: element.dropDownListItemNameCurrent,
                  };
                }
              );
          } else if (response.data.status == STATUS.INVALID_TOKEN) {
            this.$store.dispatch("logoutUser", response.data.msg);
          } else {
            this.propertyDetailsData[index].defaultValueOptions.push({
              value: "",
              text: response.data.msg,
            });
          }
        } catch (e) {
          this.propertyDetailsData[index].defaultValueOptions.push({
            value: "",
            text: this.$t("errorCatch"),
          });
        }
      }
      this.isLoading = false;
    },
  },
};
</script>

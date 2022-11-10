<template>
  <div>
    <PreLoader v-if="isLoading" />
    <CustomBottomSheet
      :refName="'SimpleExamModelInfo'"
      size="xl"
      :headerText="$t('SimpleExamModels.data')"
      :headerIcon="icon"
      @opened="getDetails()"
    >
      <template v-if="hasData">
        <div class="row">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.fullCode"
            :title="$t('SimpleExamModels.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.simpleExamModelTitleAr"
            :title="$t('SimpleExamModels.titleAr')"
            :imgName="'SimpleExamModels.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.simpleExamModelTitleEn"
            :title="$t('SimpleExamModels.titleEn')"
            :imgName="'SimpleExamModels.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.simpleExamModelTitleUnd"
            :title="$t('SimpleExamModels.titleUnd')"
            :imgName="'SimpleExamModels.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.simpleExamModelDescriptionAr"
            :title="$t('SimpleExamModels.descriptionAr')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.simpleExamModelDescriptionEn"
            :title="$t('SimpleExamModels.descriptionEn')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.simpleExamModelDescriptionUnd"
            :title="$t('SimpleExamModels.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.simpleExamModelNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.simpleExamModelDegree"
            :title="$t('SimpleExamModels.examDegree')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="simpleExamModel.examTypeNameCurrent"
            :title="$t('ConstantsListSelect.ExamTypesName')"
            :imgName="'ExamTypes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              simpleExamModel.educationalCategoryData
                .systemComponentsHierarchyData
                ? simpleExamModel.educationalCategoryData
                    .systemComponentsHierarchyData
                    .systemComponentsHierarchyNameCurrent
                : ''
            "
            :title="$t('SystemComponentsHierarchies.educationalActivity')"
            :imgName="'systemComponentsHierarchies.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              simpleExamModel.educationalCategoryData.systemComponentData
                ? simpleExamModel.educationalCategoryData.systemComponentData
                    .systemComponentNameCurrent
                : ''
            "
            :title="$t('SystemComponents.educationalActivity')"
            :imgName="'systemComponents.svg'"
          />
          <DataLabelGroup
            :className="'col-md-12'"
            :value="
              simpleExamModel.educationalCategoryData
                .educationalCategoryNameCurrent
            "
            :title="$t('EducationalCategories.name')"
            :imgName="'EducationalCategories.svg'"
          />
        </div>
        <div class="my-card">
          <span class="my-card-title">{{
            $t("SimpleExamModels.Paragraph.modelName")
          }}</span>

          <div
            v-if="simpleExamModel.simpleExamParagraphsData.length == 0"
            class="my-card-no-content"
          >
            {{ $t("SimpleExamModels.Paragraph.thereAreNoSlides") }}
          </div>
          <template v-else>
            <div
              class="my-card"
              v-for="(
                section, index
              ) in simpleExamModel.simpleExamParagraphsData"
              :key="index"
            >
              <span class="my-card-title">{{ index + 1 }}</span>
              <template>
                <ItemImageCard
                  :imagePath="section.simpleExamParagraphImagePath"
                  :defaultImg="simpleExamModel.defaultImg"
                  @updateItemImage="
                    updateItemImage(
                      'Paragraph',
                      section.simpleExamParagraphToken,
                      !section.simpleExamParagraphImageIsDefault
                    )
                  "
                />
              </template>

              <div class="row">
                <DataLabelGroup
                  :className="'col-md-6'"
                  :value="section.simpleExamParagraphTitleAr"
                  :title="$t('SimpleExamModels.Paragraph.titleAr')"
                  :imgName="'paragraph.svg'"
                />
                <DataLabelGroup
                  :className="'col-md-6'"
                  :value="section.simpleExamParagraphTitleEn"
                  :title="$t('SimpleExamModels.Paragraph.titleEn')"
                  :imgName="'paragraph.svg'"
                />
                <DataLabelGroup
                  :className="'col-md-6'"
                  :value="section.simpleExamParagraphTitleUnd"
                  :title="$t('SimpleExamModels.Paragraph.titleUnd')"
                  :imgName="'paragraph.svg'"
                />

                <DataLabelGroup
                  :className="'col-md-6'"
                  :value="section.simpleExamModelDescriptionAr"
                  :title="$t('SimpleExamModels.Paragraph.descriptionAr')"
                  :imgName="'description.svg'"
                />
                <DataLabelGroup
                  :className="'col-md-6'"
                  :value="section.simpleExamModelDescriptionEn"
                  :title="$t('SimpleExamModels.Paragraph.descriptionEn')"
                  :imgName="'description.svg'"
                />
                <DataLabelGroup
                  :className="'col-md-6'"
                  :value="section.simpleExamModelDescriptionUnd"
                  :title="$t('SimpleExamModels.Paragraph.descriptionUnd')"
                  :imgName="'description.svg'"
                />

                <!-- #region TrueFalse -->
                <div class="my-card col-12">
                  <span class="my-card-title">{{
                    $t("SimpleExamModels.question.trueFalseQuestions")
                  }}</span>

                  <div
                    v-if="section.trueFalseQuestionsData.length == 0"
                    class="my-card-no-content"
                  >
                    {{
                      $t("SimpleExamModels.question.thereAreNoSlidesTrueFalse")
                    }}
                  </div>
                  <template v-else>
                    <div
                      class="my-card"
                      v-for="(
                        trueFalseQuestion, indexTrueFalse
                      ) in section.trueFalseQuestionsData"
                      :key="indexTrueFalse"
                    >
                      <span class="my-card-title">{{
                        indexTrueFalse + 1
                      }}</span>
                      <template>
                        <ItemImageCard
                          :imagePath="
                            trueFalseQuestion.trueFalseQuestionImagePath
                          "
                          :defaultImg="simpleExamModel.defaultImg"
                          @updateItemImage="
                            updateItemImage(
                              'TrueFalseQuestion',
                              trueFalseQuestion.trueFalseQuestionToken,
                              !trueFalseQuestion.trueFalseQuestionImageIsDefault
                            )
                          "
                        />
                      </template>

                      <div class="row">
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="trueFalseQuestion.trueFalseQuestionTextAr"
                          :title="$t('SimpleExamModels.question.textAr')"
                          :imgName="'question.svg'"
                        />
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="trueFalseQuestion.trueFalseQuestionTextEn"
                          :title="$t('SimpleExamModels.question.textEn')"
                          :imgName="'question.svg'"
                        />
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="trueFalseQuestion.trueFalseQuestionTextUnd"
                          :title="$t('SimpleExamModels.question.textUnd')"
                          :imgName="'question.svg'"
                        />

                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="trueFalseQuestion.trueFalseDescriptionAr"
                          :title="$t('SimpleExamModels.question.descriptionAr')"
                          :imgName="'description.svg'"
                        />
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="trueFalseQuestion.trueFalseDescriptionEn"
                          :title="$t('SimpleExamModels.question.descriptionEn')"
                          :imgName="'description.svg'"
                        />
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="trueFalseQuestion.trueFalseDescriptionUnd"
                          :title="
                            $t('SimpleExamModels.question.descriptionUnd')
                          "
                          :imgName="'description.svg'"
                        />

                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="trueFalseQuestion.questionDegree"
                          :title="$t('SimpleExamModels.questionDegree')"
                          :imgName="'number.svg'"
                        />
                        <CustomCheckbox
                          class="col-md-6"
                          :value="trueFalseQuestion.correctAnswer"
                          :title="$t('SimpleExamModels.question.correctAnswer')"
                          :showAsInfo="true"
                        />
                      </div>
                    </div>
                  </template>
                </div>
                <!-- #endregion TrueFalse -->

                <!-- #region MCQ -->
                <div class="my-card col-12">
                  <span class="my-card-title">{{
                    $t("SimpleExamModels.question.mcqQuestions")
                  }}</span>

                  <div
                    v-if="section.mcqQuestionsData.length == 0"
                    class="my-card-no-content"
                  >
                    {{ $t("SimpleExamModels.question.thereAreNoSlidesMCQ") }}
                  </div>
                  <template v-else>
                    <div
                      class="my-card"
                      v-for="(
                        mcqQuestion, indexMCQ
                      ) in section.mcqQuestionsData"
                      :key="indexMCQ"
                    >
                      <span class="my-card-title">{{ indexMCQ + 1 }}</span>
                      <template>
                        <ItemImageCard
                          :imagePath="mcqQuestion.mcqQuestionImagePath"
                          :defaultImg="simpleExamModel.defaultImg"
                          @updateItemImage="
                            updateItemImage(
                              'McqQuestion',
                              mcqQuestion.mcqQuestionToken,
                              !mcqQuestion.mcqQuestionImageIsDefault
                            )
                          "
                        />
                      </template>

                      <div class="row">
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="mcqQuestion.mcqQuestionTextAr"
                          :title="$t('SimpleExamModels.question.textAr')"
                          :imgName="'question.svg'"
                        />
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="mcqQuestion.mcqQuestionTextEn"
                          :title="$t('SimpleExamModels.question.textEn')"
                          :imgName="'question.svg'"
                        />
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="mcqQuestion.mcqQuestionTextUnd"
                          :title="$t('SimpleExamModels.question.textUnd')"
                          :imgName="'question.svg'"
                        />

                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="mcqQuestion.mcqQuestionDescriptionAr"
                          :title="$t('SimpleExamModels.question.descriptionAr')"
                          :imgName="'description.svg'"
                        />
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="mcqQuestion.mcqQuestionDescriptionEn"
                          :title="$t('SimpleExamModels.question.descriptionEn')"
                          :imgName="'description.svg'"
                        />
                        <DataLabelGroup
                          :className="'col-md-6'"
                          :value="mcqQuestion.mcqQuestionDescriptionUnd"
                          :title="
                            $t('SimpleExamModels.question.descriptionUnd')
                          "
                          :imgName="'description.svg'"
                        />

                        <DataLabelGroup
                          :className="'col-md-12'"
                          :value="mcqQuestion.questionDegree"
                          :title="$t('SimpleExamModels.questionDegree')"
                          :imgName="'number.svg'"
                        />

                        <!-- #region Answer A -->
                        <div class="my-card col-12">
                          <span class="my-card-title">{{
                            $t("SimpleExamModels.question.mcqA")
                          }}</span>

                          <div class="row">
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.aAnswerAr"
                              :title="$t('SimpleExamModels.question.answerAr')"
                              :imgName="'answer.svg'"
                            />
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.aAnswerEn"
                              :title="$t('SimpleExamModels.question.answerEn')"
                              :imgName="'answer.svg'"
                            />
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.aAnswerUnd"
                              :title="$t('SimpleExamModels.question.answerUnd')"
                              :imgName="'answer.svg'"
                            />

                            <CustomCheckbox
                              class="col-md-3"
                              :value="mcqQuestion.aAnswerAppearanceStatus"
                              :title="
                                $t(
                                  'SimpleExamModels.question.answerAppearanceStatus'
                                )
                              "
                              :showAsInfo="true"
                            />
                            <CustomCheckbox
                              class="col-md-3"
                              :value="mcqQuestion.aCorrectAnswer"
                              :title="
                                $t('SimpleExamModels.question.correctAnswer')
                              "
                              :showAsInfo="true"
                            />
                          </div>
                        </div>
                        <!-- #endregion Answer A -->

                        <!-- #region Answer B -->
                        <div class="my-card col-12">
                          <span class="my-card-title">{{
                            $t("SimpleExamModels.question.mcqB")
                          }}</span>

                          <div class="row">
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.bAnswerAr"
                              :title="$t('SimpleExamModels.question.answerAr')"
                              :imgName="'answer.svg'"
                            />
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.bAnswerEn"
                              :title="$t('SimpleExamModels.question.answerEn')"
                              :imgName="'answer.svg'"
                            />
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.bAnswerUnd"
                              :title="$t('SimpleExamModels.question.answerUnd')"
                              :imgName="'answer.svg'"
                            />

                            <CustomCheckbox
                              class="col-md-3"
                              :value="mcqQuestion.bAnswerAppearanceStatus"
                              :title="
                                $t(
                                  'SimpleExamModels.question.answerAppearanceStatus'
                                )
                              "
                              :showAsInfo="true"
                            />
                            <CustomCheckbox
                              class="col-md-3"
                              :value="mcqQuestion.bCorrectAnswer"
                              :title="
                                $t('SimpleExamModels.question.correctAnswer')
                              "
                              :showAsInfo="true"
                            />
                          </div>
                        </div>
                        <!-- #endregion Answer B -->

                        <!-- #region Answer C -->
                        <div class="my-card col-12">
                          <span class="my-card-title">{{
                            $t("SimpleExamModels.question.mcqC")
                          }}</span>

                          <div class="row">
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.cAnswerAr"
                              :title="$t('SimpleExamModels.question.answerAr')"
                              :imgName="'answer.svg'"
                            />
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.cAnswerEn"
                              :title="$t('SimpleExamModels.question.answerEn')"
                              :imgName="'answer.svg'"
                            />
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.cAnswerUnd"
                              :title="$t('SimpleExamModels.question.answerUnd')"
                              :imgName="'answer.svg'"
                            />

                            <CustomCheckbox
                              class="col-md-3"
                              :value="mcqQuestion.cAnswerAppearanceStatus"
                              :title="
                                $t(
                                  'SimpleExamModels.question.answerAppearanceStatus'
                                )
                              "
                              :showAsInfo="true"
                            />
                            <CustomCheckbox
                              class="col-md-3"
                              :value="mcqQuestion.cCorrectAnswer"
                              :title="
                                $t('SimpleExamModels.question.correctAnswer')
                              "
                              :showAsInfo="true"
                            />
                          </div>
                        </div>
                        <!-- #endregion Answer C -->

                        <!-- #region Answer D -->
                        <div class="my-card col-12">
                          <span class="my-card-title">{{
                            $t("SimpleExamModels.question.mcqD")
                          }}</span>

                          <div class="row">
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.dAnswerAr"
                              :title="$t('SimpleExamModels.question.answerAr')"
                              :imgName="'answer.svg'"
                            />
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.dAnswerEn"
                              :title="$t('SimpleExamModels.question.answerEn')"
                              :imgName="'answer.svg'"
                            />
                            <DataLabelGroup
                              :className="'col-md-6'"
                              :value="mcqQuestion.dAnswerUnd"
                              :title="$t('SimpleExamModels.question.answerUnd')"
                              :imgName="'answer.svg'"
                            />

                            <CustomCheckbox
                              class="col-md-3"
                              :value="mcqQuestion.dAnswerAppearanceStatus"
                              :title="
                                $t(
                                  'SimpleExamModels.question.answerAppearanceStatus'
                                )
                              "
                              :showAsInfo="true"
                            />
                            <CustomCheckbox
                              class="col-md-3"
                              :value="mcqQuestion.dCorrectAnswer"
                              :title="
                                $t('SimpleExamModels.question.correctAnswer')
                              "
                              :showAsInfo="true"
                            />
                          </div>
                        </div>
                        <!-- #endregion Answer D -->
                      </div>
                    </div>
                  </template>
                </div>
                <!-- #endregion MCQ -->
              </div>
            </div>
          </template>
        </div>
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
    </CustomBottomSheet>
    <ItemImageUpdate
      v-if="hasData"
      :itemType="itemType"
      :itemToken="itemToken"
      :canDeleteFile="canDeleteFile"
      v-on:getDetails="getDetails()"
    />
  </div>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import ItemImageCard from "./ItemImageCard.vue";
import ItemImageUpdate from "./ItemImageUpdate.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { STATUS } from "./../../../../utils/constants";
import apiSimpleExamModel from "./../../../../api/educational/simpleExamModels";
import SimpleExamModels from "./../../../../models/educational/simpleExamModels/SimpleExamModels";
import icon from "@/assets/images/SimpleExamModels.svg";

export default {
  mixins: [generalMixin],
  components: {
    CustomBottomSheet,
    ExceptionWithImg,
    PreLoader,
    DataLabelGroup,
    CustomCheckbox,
    ItemImageCard,
    ItemImageUpdate,
  },
  props: ["simpleExamToken"],
  data() {
    return {
      icon,
      itemType: "",
      itemToken: "",
      canDeleteFile: "",
      simpleExamModel: new SimpleExamModels().simpleExamModel,
    };
  },
  computed: {
    hasData() {
      return this.simpleExamModel.simpleExamModelToken;
    },
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        const response = await apiSimpleExamModel.getDetails({
          token: this.simpleExamToken,
        });
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.simpleExamModel.fillData(response.data.simpleExamModel);
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    updateItemImage(itemType, itemToken, canDeleteFile) {
      this.itemType = itemType;
      this.itemToken = itemToken;
      this.canDeleteFile = canDeleteFile;

      this.openBottomSheet("ItemImageUpdate");
    },
  },
};
</script>

<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="simpleExamModel.fullCode"
            v-on:changeValue="simpleExamModel.fullCode = $event"
            :title="$t('SimpleExamModels.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-simpleExamModelTitleAr`"
            :errors="errors_simpleExamModelTitleAr"
            :value="simpleExamModel.simpleExamModelTitleAr"
            v-on:changeValue="
              simpleExamModel.simpleExamModelTitleAr = $event;
              $v.simpleExamModel.simpleExamModelTitleAr.$touch();
            "
            :title="$t('SimpleExamModels.titleAr')"
            :imgName="'SimpleExamModels.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-simpleExamModelTitleEn`"
            :errors="errors_simpleExamModelTitleEn"
            :value="simpleExamModel.simpleExamModelTitleEn"
            v-on:changeValue="
              simpleExamModel.simpleExamModelTitleEn = $event;
              $v.simpleExamModel.simpleExamModelTitleEn.$touch();
            "
            :title="$t('SimpleExamModels.titleEn')"
            :imgName="'SimpleExamModels.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-simpleExamModelTitleUnd`"
            :value="simpleExamModel.simpleExamModelTitleUnd"
            v-on:changeValue="simpleExamModel.simpleExamModelTitleUnd = $event"
            :title="$t('SimpleExamModels.titleUnd')"
            :imgName="'SimpleExamModels.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-simpleExamModelDescriptionAr`"
            :errors="errors_simpleExamModelDescriptionAr"
            :value="simpleExamModel.simpleExamModelDescriptionAr"
            v-on:changeValue="
              simpleExamModel.simpleExamModelDescriptionAr = $event;
              $v.simpleExamModel.simpleExamModelDescriptionAr.$touch();
            "
            :title="$t('SimpleExamModels.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-simpleExamModelDescriptionEn`"
            :errors="errors_simpleExamModelDescriptionEn"
            :value="simpleExamModel.simpleExamModelDescriptionEn"
            v-on:changeValue="
              simpleExamModel.simpleExamModelDescriptionEn = $event;
              $v.simpleExamModel.simpleExamModelDescriptionEn.$touch();
            "
            :title="$t('SimpleExamModels.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-simpleExamModelDescriptionUnd`"
            :value="simpleExamModel.simpleExamModelDescriptionUnd"
            v-on:changeValue="
              simpleExamModel.simpleExamModelDescriptionUnd = $event
            "
            :title="$t('SimpleExamModels.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-simpleExamModelNotes`"
            :value="simpleExamModel.simpleExamModelNotes"
            v-on:changeValue="simpleExamModel.simpleExamModelNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <BaseTree
            :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
            :treeModel="getTreeModel"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="true"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-examTypeToken`"
            :errors="errors_examTypeToken"
            :value="simpleExamModel.examTypeToken"
            :options="examTypeTokenOptions"
            v-on:changeValue="
              simpleExamModel.examTypeToken = $event;
              $v.simpleExamModel.examTypeToken.$touch();
            "
            :title="$t('ConstantsListSelect.ExamTypes')"
            :imgName="'ExamTypes.svg'"
          />
        </div>
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
            v-for="(section, index) in simpleExamModel.simpleExamParagraphsData"
            :key="index"
          >
            <span class="my-card-title">{{ index + 1 }}</span>

            <span class="remove-slice-container">
              <button
                @click="removeSlice(index)"
                type="button"
                class="btn btn-remove-slice"
              >
                ×
              </button>
            </span>

            <div class="row">
              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}]simpleExamParagraphTitleAr]`"
                :value="section.simpleExamParagraphTitleAr"
                v-on:changeValue="section.simpleExamParagraphTitleAr = $event"
                :title="$t('SimpleExamModels.Paragraph.titleAr')"
                :imgName="'paragraph.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}]simpleExamParagraphTitleEn]`"
                :value="section.simpleExamParagraphTitleEn"
                v-on:changeValue="section.simpleExamParagraphTitleEn = $event"
                :title="$t('SimpleExamModels.Paragraph.titleEn')"
                :imgName="'paragraph.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}]simpleExamParagraphTitleUnd]`"
                :value="section.simpleExamParagraphTitleUnd"
                v-on:changeValue="section.simpleExamParagraphTitleUnd = $event"
                :title="$t('SimpleExamModels.Paragraph.titleUnd')"
                :imgName="'paragraph.svg'"
              />

              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]simpleExamParagraphDescriptionAr]`"
                :value="section.simpleExamParagraphDescriptionAr"
                v-on:changeValue="
                  section.simpleExamParagraphDescriptionAr = $event
                "
                :title="$t('SimpleExamModels.Paragraph.descriptionAr')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]simpleExamParagraphDescriptionEn]`"
                :value="section.simpleExamParagraphDescriptionEn"
                v-on:changeValue="
                  section.simpleExamParagraphDescriptionEn = $event
                "
                :title="$t('SimpleExamModels.Paragraph.descriptionEn')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]simpleExamParagraphDescriptionUnd]`"
                :value="section.simpleExamParagraphDescriptionUnd"
                v-on:changeValue="
                  section.simpleExamParagraphDescriptionUnd = $event
                "
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
                    <span class="my-card-title">{{ indexTrueFalse + 1 }}</span>

                    <span class="remove-slice-container">
                      <button
                        @click="removeSliceTrueFalse(index, indexTrueFalse)"
                        type="button"
                        class="btn btn-remove-slice"
                      >
                        ×
                      </button>
                    </span>

                    <div class="row">
                      <CustomInput
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]TrueFalse[${indexTrueFalse}][trueFalseQuestionTextAr]`"
                        :value="trueFalseQuestion.trueFalseQuestionTextAr"
                        v-on:changeValue="
                          trueFalseQuestion.trueFalseQuestionTextAr = $event
                        "
                        :title="$t('SimpleExamModels.question.textAr')"
                        :imgName="'question.svg'"
                      />
                      <CustomInput
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]TrueFalse[${indexTrueFalse}][trueFalseQuestionTextEn]`"
                        :value="trueFalseQuestion.trueFalseQuestionTextEn"
                        v-on:changeValue="
                          trueFalseQuestion.trueFalseQuestionTextEn = $event
                        "
                        :title="$t('SimpleExamModels.question.textEn')"
                        :imgName="'question.svg'"
                      />
                      <CustomInput
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]TrueFalse[${indexTrueFalse}][trueFalseQuestionTextUnd]`"
                        :value="trueFalseQuestion.trueFalseQuestionTextUnd"
                        v-on:changeValue="
                          trueFalseQuestion.trueFalseQuestionTextUnd = $event
                        "
                        :title="$t('SimpleExamModels.question.textUnd')"
                        :imgName="'question.svg'"
                      />

                      <TextArea
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]TrueFalse[${indexTrueFalse}][trueFalseDescriptionAr]`"
                        :value="section.trueFalseDescriptionAr"
                        v-on:changeValue="
                          section.trueFalseDescriptionAr = $event
                        "
                        :title="$t('SimpleExamModels.question.descriptionAr')"
                        :imgName="'description.svg'"
                      />
                      <TextArea
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]TrueFalse[${indexTrueFalse}][trueFalseDescriptionEn]`"
                        :value="section.trueFalseDescriptionEn"
                        v-on:changeValue="
                          section.trueFalseDescriptionEn = $event
                        "
                        :title="$t('SimpleExamModels.question.descriptionEn')"
                        :imgName="'description.svg'"
                      />
                      <TextArea
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]TrueFalse[${indexTrueFalse}][trueFalseDescriptionUnd]`"
                        :value="section.trueFalseDescriptionUnd"
                        v-on:changeValue="
                          section.trueFalseDescriptionUnd = $event
                        "
                        :title="$t('SimpleExamModels.question.descriptionUnd')"
                        :imgName="'description.svg'"
                      />

                      <CustomInputFloat
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]TrueFalse[${indexTrueFalse}][questionDegree]`"
                        :value="trueFalseQuestion.questionDegree"
                        v-on:changeValue="
                          trueFalseQuestion.questionDegree = Number($event)
                        "
                        :title="$t('SimpleExamModels.questionDegree')"
                        :imgName="'number.svg'"
                      />
                      <CustomCheckbox
                        :value="trueFalseQuestion.correctAnswer"
                        v-on:changeValue="
                          trueFalseQuestion.correctAnswer = $event
                        "
                        :title="$t('SimpleExamModels.question.correctAnswer')"
                        class="col-md-6"
                      />
                    </div>
                  </div>
                </template>
                <div class="add-slice-container">
                  <button
                    @click="addSliceTrueFalse(index)"
                    type="button"
                    class="btn btn-add-slice"
                    :title="$t('addSlice')"
                  >
                    +
                  </button>
                </div>
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
                    v-for="(mcqQuestion, indexMCQ) in section.mcqQuestionsData"
                    :key="indexMCQ"
                  >
                    <span class="my-card-title">{{ indexMCQ + 1 }}</span>

                    <span class="remove-slice-container">
                      <button
                        @click="removeSliceMCQ(index, indexMCQ)"
                        type="button"
                        class="btn btn-remove-slice"
                      >
                        ×
                      </button>
                    </span>

                    <div class="row">
                      <CustomInput
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]MCQ[${indexMCQ}][mcqQuestionTextAr]`"
                        :value="mcqQuestion.mcqQuestionTextAr"
                        v-on:changeValue="
                          mcqQuestion.mcqQuestionTextAr = $event
                        "
                        :title="$t('SimpleExamModels.question.textAr')"
                        :imgName="'question.svg'"
                      />
                      <CustomInput
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]MCQ[${indexMCQ}][mcqQuestionTextEn]`"
                        :value="mcqQuestion.mcqQuestionTextEn"
                        v-on:changeValue="
                          mcqQuestion.mcqQuestionTextEn = $event
                        "
                        :title="$t('SimpleExamModels.question.textEn')"
                        :imgName="'question.svg'"
                      />
                      <CustomInput
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]MCQ[${indexMCQ}][mcqQuestionTextUnd]`"
                        :value="mcqQuestion.mcqQuestionTextUnd"
                        v-on:changeValue="
                          mcqQuestion.mcqQuestionTextUnd = $event
                        "
                        :title="$t('SimpleExamModels.question.textUnd')"
                        :imgName="'question.svg'"
                      />

                      <TextArea
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]MCQ[${indexMCQ}][mcqQuestionDescriptionAr]`"
                        :value="section.mcqQuestionDescriptionAr"
                        v-on:changeValue="
                          section.mcqQuestionDescriptionAr = $event
                        "
                        :title="$t('SimpleExamModels.question.descriptionAr')"
                        :imgName="'description.svg'"
                      />
                      <TextArea
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]MCQ[${indexMCQ}][mcqQuestionDescriptionEn]`"
                        :value="section.mcqQuestionDescriptionEn"
                        v-on:changeValue="
                          section.mcqQuestionDescriptionEn = $event
                        "
                        :title="$t('SimpleExamModels.question.descriptionEn')"
                        :imgName="'description.svg'"
                      />
                      <TextArea
                        :className="'col-md-6'"
                        :id="`${id}-[${index}]MCQ[${indexMCQ}][mcqQuestionDescriptionUnd]`"
                        :value="section.mcqQuestionDescriptionUnd"
                        v-on:changeValue="
                          section.mcqQuestionDescriptionUnd = $event
                        "
                        :title="$t('SimpleExamModels.question.descriptionUnd')"
                        :imgName="'description.svg'"
                      />

                      <CustomInputFloat
                        :className="'col-md-12'"
                        :id="`${id}-[${index}]MCQ[${indexMCQ}][questionDegree]`"
                        :value="mcqQuestion.questionDegree"
                        v-on:changeValue="
                          mcqQuestion.questionDegree = Number($event)
                        "
                        :title="$t('SimpleExamModels.questionDegree')"
                        :imgName="'number.svg'"
                      />

                      <!-- #region Answer A -->
                      <div class="my-card col-12">
                        <span class="my-card-title">{{
                          $t("SimpleExamModels.question.mcqA")
                        }}</span>

                        <div class="row">
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][aAnswerAr]`"
                            :value="mcqQuestion.aAnswerAr"
                            v-on:changeValue="mcqQuestion.aAnswerAr = $event"
                            :title="$t('SimpleExamModels.question.answerAr')"
                            :imgName="'answer.svg'"
                          />
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][aAnswerEn]`"
                            :value="mcqQuestion.aAnswerEn"
                            v-on:changeValue="mcqQuestion.aAnswerEn = $event"
                            :title="$t('SimpleExamModels.question.answerEn')"
                            :imgName="'answer.svg'"
                          />
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][aAnswerUnd]`"
                            :value="mcqQuestion.aAnswerUnd"
                            v-on:changeValue="mcqQuestion.aAnswerUnd = $event"
                            :title="$t('SimpleExamModels.question.answerUnd')"
                            :imgName="'answer.svg'"
                          />

                          <CustomCheckbox
                            :value="mcqQuestion.aAnswerAppearanceStatus"
                            v-on:changeValue="
                              mcqQuestion.aAnswerAppearanceStatus = $event
                            "
                            :title="
                              $t(
                                'SimpleExamModels.question.answerAppearanceStatus'
                              )
                            "
                            class="col-md-3"
                          />
                          <CustomCheckbox
                            :value="mcqQuestion.aCorrectAnswer"
                            v-on:changeValue="
                              mcqQuestion.aCorrectAnswer = $event
                            "
                            :title="
                              $t('SimpleExamModels.question.correctAnswer')
                            "
                            class="col-md-3"
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
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][bAnswerAr]`"
                            :value="mcqQuestion.bAnswerAr"
                            v-on:changeValue="mcqQuestion.bAnswerAr = $event"
                            :title="$t('SimpleExamModels.question.answerAr')"
                            :imgName="'answer.svg'"
                          />
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][bAnswerEn]`"
                            :value="mcqQuestion.bAnswerEn"
                            v-on:changeValue="mcqQuestion.bAnswerEn = $event"
                            :title="$t('SimpleExamModels.question.answerEn')"
                            :imgName="'answer.svg'"
                          />
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][bAnswerUnd]`"
                            :value="mcqQuestion.bAnswerUnd"
                            v-on:changeValue="mcqQuestion.bAnswerUnd = $event"
                            :title="$t('SimpleExamModels.question.answerUnd')"
                            :imgName="'answer.svg'"
                          />

                          <CustomCheckbox
                            :value="mcqQuestion.bAnswerAppearanceStatus"
                            v-on:changeValue="
                              mcqQuestion.bAnswerAppearanceStatus = $event
                            "
                            :title="
                              $t(
                                'SimpleExamModels.question.answerAppearanceStatus'
                              )
                            "
                            class="col-md-3"
                          />
                          <CustomCheckbox
                            :value="mcqQuestion.bCorrectAnswer"
                            v-on:changeValue="
                              mcqQuestion.bCorrectAnswer = $event
                            "
                            :title="
                              $t('SimpleExamModels.question.correctAnswer')
                            "
                            class="col-md-3"
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
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][cAnswerAr]`"
                            :value="mcqQuestion.cAnswerAr"
                            v-on:changeValue="mcqQuestion.cAnswerAr = $event"
                            :title="$t('SimpleExamModels.question.answerAr')"
                            :imgName="'answer.svg'"
                          />
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][cAnswerEn]`"
                            :value="mcqQuestion.cAnswerEn"
                            v-on:changeValue="mcqQuestion.cAnswerEn = $event"
                            :title="$t('SimpleExamModels.question.answerEn')"
                            :imgName="'answer.svg'"
                          />
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][cAnswerUnd]`"
                            :value="mcqQuestion.cAnswerUnd"
                            v-on:changeValue="mcqQuestion.cAnswerUnd = $event"
                            :title="$t('SimpleExamModels.question.answerUnd')"
                            :imgName="'answer.svg'"
                          />

                          <CustomCheckbox
                            :value="mcqQuestion.cAnswerAppearanceStatus"
                            v-on:changeValue="
                              mcqQuestion.cAnswerAppearanceStatus = $event
                            "
                            :title="
                              $t(
                                'SimpleExamModels.question.answerAppearanceStatus'
                              )
                            "
                            class="col-md-3"
                          />
                          <CustomCheckbox
                            :value="mcqQuestion.cCorrectAnswer"
                            v-on:changeValue="
                              mcqQuestion.cCorrectAnswer = $event
                            "
                            :title="
                              $t('SimpleExamModels.question.correctAnswer')
                            "
                            class="col-md-3"
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
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][dAnswerAr]`"
                            :value="mcqQuestion.dAnswerAr"
                            v-on:changeValue="mcqQuestion.dAnswerAr = $event"
                            :title="$t('SimpleExamModels.question.answerAr')"
                            :imgName="'answer.svg'"
                          />
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][dAnswerEn]`"
                            :value="mcqQuestion.dAnswerEn"
                            v-on:changeValue="mcqQuestion.dAnswerEn = $event"
                            :title="$t('SimpleExamModels.question.answerEn')"
                            :imgName="'answer.svg'"
                          />
                          <CustomInput
                            :className="'col-md-6'"
                            :id="`${id}-[${index}][${indexMCQ}][dAnswerUnd]`"
                            :value="mcqQuestion.dAnswerUnd"
                            v-on:changeValue="mcqQuestion.dAnswerUnd = $event"
                            :title="$t('SimpleExamModels.question.answerUnd')"
                            :imgName="'answer.svg'"
                          />

                          <CustomCheckbox
                            :value="mcqQuestion.dAnswerAppearanceStatus"
                            v-on:changeValue="
                              mcqQuestion.dAnswerAppearanceStatus = $event
                            "
                            :title="
                              $t(
                                'SimpleExamModels.question.answerAppearanceStatus'
                              )
                            "
                            class="col-md-3"
                          />
                          <CustomCheckbox
                            :value="mcqQuestion.dCorrectAnswer"
                            v-on:changeValue="
                              mcqQuestion.dCorrectAnswer = $event
                            "
                            :title="
                              $t('SimpleExamModels.question.correctAnswer')
                            "
                            class="col-md-3"
                          />
                        </div>
                      </div>
                      <!-- #endregion Answer D -->
                    </div>
                  </div>
                </template>
                <div class="add-slice-container">
                  <button
                    @click="addSliceMCQ(index)"
                    type="button"
                    class="btn btn-add-slice"
                    :title="$t('addSlice')"
                  >
                    +
                  </button>
                </div>
              </div>
              <!-- #endregion MCQ -->
            </div>
          </div>
        </template>
        <div class="add-slice-container">
          <button
            @click="addSlice()"
            type="button"
            class="btn btn-add-slice"
            :title="$t('SimpleExamModels.Paragraph.add')"
          >
            +
          </button>
        </div>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { bottomSheetScrollToTop } from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import BaseTree from "./../../../../components/general/BaseTree.vue";
import SimpleExamParagraph from "./../../../../models/educational/simpleExamModels/SimpleExamParagraph";
import TrueFalseQuestion from "./../../../../models/educational/simpleExamModels/TrueFalseQuestion";
import McqQuestion from "./../../../../models/educational/simpleExamModels/McqQuestion";
import { getDialogOfExamTypes } from "./../../../../utils/dialogsOfConstantsLists";
import { checkPrivilege } from "./../../../../utils/functions";
import { SYSTEM_TYPE } from "./../../../../utils/constantLists";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomInput,
    CustomInputFloat,
    CustomCheckbox,
    TextArea,
    CustomSelectBox,
    BaseTree,
  },
  data() {
    return {
      examTypeTokenOptions: getDialogOfExamTypes(),
    };
  },
  props: {
    simpleExamModel: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  validations: {
    simpleExamModel: {
      gradingPlanToken: { required },
      simpleExamModelTitleAr: { required, isValidNameAr },
      simpleExamModelTitleEn: { required, isValidNameEn },
      examTypeToken: { required },
      simpleExamModelDescriptionAr: { isValidTextAr },
      simpleExamModelDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.simpleExamModel.educationalCategoryData
            .systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken:
          this.simpleExamModel.educationalCategoryData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: this.simpleExamModel.educationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.select"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
    errors_simpleExamModelTitleAr() {
      let errors = [];
      if (this.$v.simpleExamModel.simpleExamModelTitleAr.$error) {
        if (
          !this.$v.simpleExamModel.simpleExamModelTitleAr.required &&
          !this.$v.simpleExamModel.simpleExamModelTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.simpleExamModel.simpleExamModelTitleAr.required &&
          !this.$v.simpleExamModel.simpleExamModelTitleAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_simpleExamModelTitleEn() {
      let errors = [];
      if (this.$v.simpleExamModel.simpleExamModelTitleEn.$error) {
        if (
          !this.$v.simpleExamModel.simpleExamModelTitleAr.required &&
          !this.$v.simpleExamModel.simpleExamModelTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.simpleExamModel.simpleExamModelTitleEn.required &&
          !this.$v.simpleExamModel.simpleExamModelTitleEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_examTypeToken() {
      let errors = [];
      if (this.$v.simpleExamModel.examTypeToken.$error) {
        if (!this.$v.simpleExamModel.examTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_simpleExamModelDescriptionAr() {
      let errors = [];
      if (this.$v.simpleExamModel.simpleExamModelDescriptionAr.$error) {
        if (!this.$v.simpleExamModel.simpleExamModelDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_simpleExamModelDescriptionEn() {
      let errors = [];
      if (this.$v.simpleExamModel.simpleExamModelDescriptionEn.$error) {
        if (!this.$v.simpleExamModel.simpleExamModelDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    addSlice() {
      this.simpleExamModel.simpleExamParagraphsData.push(
        new SimpleExamParagraph()
      );
    },
    removeSlice(index) {
      this.simpleExamModel.simpleExamParagraphsData.splice(index, 1);
    },
    addSliceTrueFalse(index) {
      this.simpleExamModel.simpleExamParagraphsData[
        index
      ].trueFalseQuestionsData.push(new TrueFalseQuestion());
    },
    removeSliceTrueFalse(index, indexQuestion) {
      this.simpleExamModel.simpleExamParagraphsData[
        index
      ].trueFalseQuestionsData.splice(indexQuestion, 1);
    },
    addSliceMCQ(index) {
      this.simpleExamModel.simpleExamParagraphsData[
        index
      ].mcqQuestionsData.push(new McqQuestion());
    },
    removeSliceMCQ(index, indexQuestion) {
      this.simpleExamModel.simpleExamParagraphsData[
        index
      ].mcqQuestionsData.splice(indexQuestion, 1);
    },
    baseTreeChanged(data) {
      this.simpleExamModel.educationalCategoryData.systemComponentHierarchyToken =
        data.hierarchyToken;
      this.simpleExamModel.educationalCategoryData.systemComponentToken =
        data.componentToken;
      this.simpleExamModel.educationalCategoryToken = data.parentToken;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.simpleExamModel.simpleExamModelTitleAr.required &&
          this.$v.simpleExamModel.simpleExamModelTitleAr.isValidNameAr) ||
          (this.$v.simpleExamModel.simpleExamModelTitleEn.required &&
            this.$v.simpleExamModel.simpleExamModelTitleEn.isValidNameEn)) &&
        this.$v.simpleExamModel.examTypeToken.required &&
        this.$v.simpleExamModel.simpleExamModelDescriptionAr.isValidTextAr &&
        this.$v.simpleExamModel.simpleExamModelDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
  },
  // created() {
  //   this.getGradingPlansDialog();
  // },
};
</script>

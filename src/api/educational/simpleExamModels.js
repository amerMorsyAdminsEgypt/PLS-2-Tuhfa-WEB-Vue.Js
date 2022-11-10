import { METHOD, request } from "./../../utils/request";
import { SimpleExamModels } from "./../api";

async function getAll(params) {
  return request(SimpleExamModels.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(SimpleExamModels.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(SimpleExamModels.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(SimpleExamModels.add, METHOD.POST, data);
}
async function update(data) {
  return request(SimpleExamModels.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(SimpleExamModels.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(SimpleExamModels.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(SimpleExamModels.deleteImage, METHOD.POST, data);
}

async function updateParagraphImage(data) {
  return request(SimpleExamModels.updateParagraphImage, METHOD.POST, data);
}
async function deleteParagraphImage(data) {
  return request(SimpleExamModels.deleteParagraphImage, METHOD.POST, data);
}

async function updateTrueFalseQuestionImage(data) {
  return request(
    SimpleExamModels.updateTrueFalseQuestionImage,
    METHOD.POST,
    data
  );
}
async function deleteTrueFalseQuestionImage(data) {
  return request(
    SimpleExamModels.deleteTrueFalseQuestionImage,
    METHOD.POST,
    data
  );
}

async function updateMcqQuestionImage(data) {
  return request(SimpleExamModels.updateMcqQuestionImage, METHOD.POST, data);
}
async function deleteMcqQuestionImage(data) {
  return request(SimpleExamModels.deleteMcqQuestionImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  update,
  changeActivationType,
  finalDelete,
  deleteImage,
  updateParagraphImage,
  deleteParagraphImage,
  updateTrueFalseQuestionImage,
  deleteTrueFalseQuestionImage,
  updateMcqQuestionImage,
  deleteMcqQuestionImage,
};

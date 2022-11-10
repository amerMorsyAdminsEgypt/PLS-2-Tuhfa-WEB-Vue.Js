import GeneralModel from "./../../general/GeneralModel";
import DiscussionComment from "./DiscussionComment";
import DiscussionCommentsFilter from "./DiscussionCommentsFilter";

export default class DiscussionComments extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.discussionCommentsData = [];
    this.discussionComment = new DiscussionComment();
    this.filterData = new DiscussionCommentsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.discussionCommentsData = data.discussionCommentsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}

export default class FullTreeData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.itemToken = "";
    this.itemParentToken = "";
    this.itemMainRootToken = "";
    this.itemNameCurrent = "";
    this.itemDescriptionCurrent = "";
    this.itemNotes = "";
    this.itemImagePath = "";
    this.itemImageIsDefault = "";
    this.itemImageSizeBytes = "";
    this.itemImageSizeTextCurrent = "";
    this.systemComponentToken = "";
    this.systemComponentNameCurrent = "";
    this.itemLevel = 0;
    this.itemTreePath = "";
    this.isHaveChildrenStatus = false;
    this.childrenData = [];
  }
  fillData(data) {
    if (data) {
      this.itemToken = data.itemToken ?? "";
      this.itemParentToken = data.itemParentToken ?? "";
      this.itemMainRootToken = data.itemMainRootToken ?? "";
      this.itemNameCurrent = data.itemNameCurrent ?? "";
      this.itemDescriptionCurrent = data.itemDescriptionCurrent ?? "";
      this.itemNotes = data.itemNotes ?? "";
      this.itemImagePath = data.itemImagePath ?? "";
      this.itemImageIsDefault = data.itemImageIsDefault ?? "";
      this.itemImageSizeBytes = data.itemImageSizeBytes ?? "";
      this.itemImageSizeTextCurrent = data.itemImageSizeTextCurrent ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentNameCurrent = data.systemComponentNameCurrent ?? "";
      this.itemLevel = data.itemLevel ?? 0;
      this.itemTreePath = data.itemTreePath ?? "";
      this.isHaveChildrenStatus = data.isHaveChildrenStatus ?? false;
      this.childrenData = data.childrenData ?? [];
    } else {
      this.setInitialValue();
    }
  }
}

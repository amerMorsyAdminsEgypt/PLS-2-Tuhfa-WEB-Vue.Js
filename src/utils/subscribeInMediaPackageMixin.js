import SubscribeInMediaPackageClass from "./../models/mediaPackageCodes/SubscribeInMediaPackageClass";
import SubscribeInMediaPackage from "./../views/mediaPackageCodes/components/SubscribeInMediaPackage.vue";

export default {
  components: {
    SubscribeInMediaPackage,
  },
  data() {
    return {
      subscribeInMediaPackageClass: new SubscribeInMediaPackageClass(),
    };
  },
  methods: {
    fillDataToSubscribeInMediaPackage(data) {
      if (data) {
        this.subscribeInMediaPackageClass.fillData(data);
      } else {
        this.subscribeInMediaPackageClass.setInitialValue();
      }
    },
  },
};

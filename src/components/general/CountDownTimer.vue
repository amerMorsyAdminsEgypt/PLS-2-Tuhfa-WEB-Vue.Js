<template>
  <div>
    <p>{{ timer }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      timer: "",
      countDownDate: new Date("Jan 31, 2022 20:37:25").getTime(),
    };
  },
  props: ["duration"],
  // props: {
  //   duration: {
  //     type: Number,
  //     default: 0,
  //   },
  // },
  methods: {
    convertHMS(value) {
      const sec = parseInt(value, 10); // convert value to number if it's string
      let hours = Math.floor(sec / 3600); // get hours
      let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
      let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
    },
    countDown() {
      var vue = this;
      setInterval(function () {
        // Get today's date and time
        // var now = new Date().getTime();

        // Find the distance between now and the count down date
        // var distance = this.countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(vue.duration / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (vue.duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor(
          (vue.duration % (1000 * 60 * 60)) / (1000 * 60)
        );
        var seconds = Math.floor((vue.duration % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        vue.timer = days + ":" + hours + ":" + minutes + ":" + seconds;

        // // If the count down is over, write some text
        // if (distance < 0) {
        //   clearInterval(x);
        //   this.time = "EXPIRED";
        // }
      }, 1000);
    },
    startCountDown() {
      var vue = this;
      setInterval(function () {
        vue.countDown();
      }, 1000);
    },
  },
  async created() {
    this.countDown();
    // setInterval(function () {
    //   // this.countDown();
    //   console.log(this);
    // }, 1000);
  },
};
</script>

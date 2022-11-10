<template>
  <div
    class="time-counter"
    :class="className"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div class="selected" :class="{ open: open }">
      <div class="time-counter-img" @click="open = !open">
        <img :src="require('@/assets/images/' + imgName)" />
      </div>
      <div class="time-counter-label">
        <label class="time-counter-label-title" @click="open = !open">{{
          title ? title : $t("notFound")
        }}</label>

        <!-- <label class="time-counter-label-value">{{ theValue }}</label> -->
        <label class="time-counter-label-value" @click="open = false">
          <!-- #region Days -->
          <input
            v-if="dayStatus"
            type="tel"
            :value="days"
            :data-id="'day'"
            :ref="iRefs.day"
            v-on:input="changeDaysInput($event)"
            v-on:keypress="isInt($event)"
            v-on:keydown="onKeyDownDays($event)"
            @paste.prevent
            :maxlength="daysDigits"
          />
          <span
            v-if="
              (dayStatus && hourStatus) ||
              (dayStatus && minuteStatus) ||
              (dayStatus && secondStatus)
            "
            >.</span
          >
          <!-- #endregion Days -->
          <!-- #region Hours -->
          <input
            v-if="hourStatus"
            type="tel"
            :value="hours"
            :data-id="'hour'"
            :ref="iRefs.hour"
            v-on:input="changeHoursInput($event)"
            v-on:keypress="isInt($event)"
            v-on:keydown="onKeyDownHours($event)"
            @paste.prevent
            :maxlength="hoursDigits"
          />
          <span
            v-if="(hourStatus && minuteStatus) || (hourStatus && secondStatus)"
            >:</span
          >
          <!-- #endregion Hours -->
          <!-- #region Minutes -->
          <input
            v-if="minuteStatus"
            type="tel"
            :value="minutes"
            :data-id="'minute'"
            :ref="iRefs.minute"
            v-on:input="changeMinutesInput($event)"
            v-on:keypress="isInt($event)"
            v-on:keydown="onKeyDownMinutes($event)"
            @paste.prevent
            :maxlength="minutesDigits"
          />
          <span v-if="minuteStatus && secondStatus">:</span>
          <!-- #endregion Minutes -->
          <!-- #region Seconds -->
          <input
            v-if="secondStatus"
            type="tel"
            :value="seconds"
            :data-id="'second'"
            :ref="iRefs.second"
            v-on:input="changeSecondsInput($event)"
            v-on:keypress="isInt($event)"
            v-on:keydown="onKeyDownSeconds($event)"
            @paste.prevent
            :maxlength="secondsDigits"
          />
          <!-- #endregion Seconds -->
        </label>
      </div>
      <div class="time-counter-arrow" @click="open = !open"></div>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div class="items-container">
        <div class="items-list" v-if="dayStatus">
          <span class="hint">{{ dayHintD }}</span>
          <ul>
            <li
              v-for="(item, index) in range(dayStart, dayEnd, dayStep)"
              @click="setDays(item)"
              :class="item == days ? 'active' : ''"
              :key="index"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="items-list" v-if="hourStatus">
          <span class="hint">{{ hourHintD }}</span>
          <ul>
            <li
              v-for="(item, index) in range(hourStart, hourEnd, hourStep)"
              @click="setHours(numToStrOfXDigits(item, 2))"
              :class="
                numToStrOfXDigits(item, 2) == numToStrOfXDigits(hours, 2)
                  ? 'active'
                  : ''
              "
              :key="index"
            >
              <span>{{ numToStrOfXDigits(item, 2) }}</span>
            </li>
          </ul>
        </div>
        <div class="items-list" v-if="minuteStatus">
          <span class="hint">{{ minuteHintD }}</span>
          <ul>
            <li
              v-for="(item, index) in range(minuteStart, minuteEnd, minuteStep)"
              @click="setMinutes(numToStrOfXDigits(item, 2))"
              :class="
                numToStrOfXDigits(item, 2) == numToStrOfXDigits(minutes, 2)
                  ? 'active'
                  : ''
              "
              :key="index"
            >
              <span>{{ numToStrOfXDigits(item, 2) }}</span>
            </li>
          </ul>
        </div>
        <div class="items-list" v-if="secondStatus">
          <span class="hint">{{ secondHintD }}</span>
          <ul>
            <li
              v-for="(item, index) in range(secondStart, secondEnd, secondStep)"
              @click="setSeconds(numToStrOfXDigits(item, 2))"
              :class="
                numToStrOfXDigits(item, 2) == numToStrOfXDigits(seconds, 2)
                  ? 'active'
                  : ''
              "
              :key="index"
            >
              <span>{{ numToStrOfXDigits(item, 2) }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="items-footer" v-if="showFooter">
        <span class="btn btn-outline-danger" @click="open = false">{{
          $t("timeCounter.close")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { range, numToStrOfXDigits } from "@/utils/functions";
import { KEY_CODE } from "./../../utils/constants";

export default {
  props: {
    //#region days
    dayValue: {
      type: [String, Number],
      default: 0,
    },
    dayStatus: {
      type: Boolean,
      default: false,
    },
    dayStart: {
      type: Number,
      default: 0,
    },
    dayEnd: {
      type: Number,
      default: 365,
    },
    dayStep: {
      type: Number,
      default: 1,
    },
    dayHint: {
      type: String,
      default: "",
    },
    //#endregion days

    //#region hours
    hourValue: {
      type: [String, Number],
      default: 0,
    },
    hourStatus: {
      type: Boolean,
      default: true,
    },
    hourStart: {
      type: Number,
      default: 0,
    },
    hourEnd: {
      type: Number,
      default: 23,
    },
    hourStep: {
      type: Number,
      default: 1,
    },
    hourHint: {
      type: String,
      default: "",
    },
    //#endregion hours

    //#region minutes
    minuteValue: {
      type: [String, Number],
      default: 0,
    },
    minuteStatus: {
      type: Boolean,
      default: true,
    },
    minuteStart: {
      type: Number,
      default: 0,
    },
    minuteEnd: {
      type: Number,
      default: 59,
    },
    minuteStep: {
      type: Number,
      default: 1,
    },
    minuteHint: {
      type: String,
      default: "",
    },
    //#endregion minutes

    //#region seconds
    secondValue: {
      type: [String, Number],
      default: 0,
    },
    secondStatus: {
      type: Boolean,
      default: true,
    },
    secondStart: {
      type: Number,
      default: 0,
    },
    secondEnd: {
      type: Number,
      default: 59,
    },
    secondStep: {
      type: Number,
      default: 1,
    },
    secondHint: {
      type: String,
      default: "",
    },
    //#endregion seconds

    className: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "dateAndTime.svg",
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      open: false,
      theValue: "",
      dayHintD: this.dayHint ? this.dayHint : this.$t("timeCounter.days"),
      hourHintD: this.hourHint ? this.hourHint : this.$t("timeCounter.hours"),
      minuteHintD: this.minuteHint
        ? this.minuteHint
        : this.$t("timeCounter.minutes"),
      secondHintD: this.secondHint
        ? this.secondHint
        : this.$t("timeCounter.seconds"),

      days: "",
      hours: "",
      minutes: "",
      seconds: "",
      daysDigits: "",
      hoursDigits: "",
      minutesDigits: "",
      secondsDigits: "",

      iRefs: {
        day: "input_day",
        hour: "input_hour",
        minute: "input_minute",
        second: "input_second",
      },
    };
  },
  methods: {
    range,
    numToStrOfXDigits,
    getDigits() {
      this.daysDigits = String(this.dayEnd).length;
      this.hoursDigits = String(this.hourEnd).length;
      this.minutesDigits = String(this.minuteEnd).length;
      this.secondsDigits = String(this.secondEnd).length;
    },
    changeValue() {
      this.theValue = `${
        this.dayStatus ? numToStrOfXDigits(this.days, 1) : ""
      }${
        (this.dayStatus && this.hourStatus) ||
        (this.dayStatus && this.minuteStatus) ||
        (this.dayStatus && this.secondStatus)
          ? "."
          : ""
      }${this.hourStatus ? numToStrOfXDigits(this.hours, 2) : ""}${
        (this.hourStatus && this.minuteStatus) ||
        (this.hourStatus && this.secondStatus)
          ? ":"
          : ""
      }${this.minuteStatus ? numToStrOfXDigits(this.minutes, 2) : ""}${
        this.minuteStatus && this.secondStatus ? ":" : ""
      }${this.secondStatus ? numToStrOfXDigits(this.seconds, 2) : ""}`;

      this.$emit("input", {
        value: this.theValue,
        days: this.days,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
      });
    },
    setDays(v) {
      v = String(v).replace(/[^\d]/gi, "");
      this.days =
        v < this.dayStart ? this.dayStart : v > this.dayEnd ? this.dayEnd : v;
      this.changeValue();
    },
    setHours(v) {
      v = String(v).replace(/[^\d]/gi, "");
      this.hours =
        v < this.hourStart
          ? this.hourStart
          : v > this.hourEnd
          ? this.hourEnd
          : v;
      this.changeValue();
    },
    setMinutes(v) {
      v = String(v).replace(/[^\d]/gi, "");
      this.minutes =
        v < this.minuteStart
          ? this.minuteStart
          : v > this.minuteEnd
          ? this.minuteEnd
          : v;
      this.changeValue();
    },
    setSeconds(v) {
      v = String(v).replace(/[^\d]/gi, "");
      this.seconds =
        v < this.secondStart
          ? this.secondStart
          : v > this.secondEnd
          ? this.secondEnd
          : v;
      this.changeValue();
    },

    changeDaysInput(e) {
      this.changeInput(e, this.daysDigits);
      this.setDays(e.target.value);
    },
    changeHoursInput(e) {
      this.changeInput(e, this.hoursDigits);
      this.setHours(e.target.value);
    },
    changeMinutesInput(e) {
      this.changeInput(e, this.minutesDigits);
      this.setMinutes(e.target.value);
    },
    changeSecondsInput(e) {
      this.changeInput(e, this.secondsDigits);
      this.setSeconds(e.target.value);
    },

    onKeyDownDays(e) {
      this.onKeyDown(e);
      this.setDays(e.target.value);
    },
    onKeyDownHours(e) {
      this.onKeyDown(e);
      this.setHours(e.target.value);
    },
    onKeyDownMinutes(e) {
      this.onKeyDown(e);
      this.setMinutes(e.target.value);
    },
    onKeyDownSeconds(e) {
      this.onKeyDown(e);
      this.setSeconds(e.target.value);
    },

    findNextPrevCurrentInput(e) {
      const index = String(e.target.dataset.id);
      let currentIndex;
      let prevIndex;
      let nextIndex;
      switch (index) {
        case "day": {
          currentIndex = "day";
          prevIndex = false;
          if (this.hourStatus) nextIndex = "hour";
          else if (this.minuteStatus) nextIndex = "minute";
          else if (this.secondStatus) nextIndex = "second";
          else nextIndex = false;
          break;
        }
        case "hour": {
          currentIndex = "hour";
          if (this.dayStatus) prevIndex = "day";
          else prevIndex = false;
          if (this.minuteStatus) nextIndex = "minute";
          else if (this.secondStatus) nextIndex = "second";
          else nextIndex = false;
          break;
        }
        case "minute": {
          currentIndex = "minute";
          if (this.hourStatus) prevIndex = "hour";
          else if (this.dayStatus) prevIndex = "day";
          else prevIndex = false;
          if (this.secondStatus) nextIndex = "second";
          else nextIndex = false;
          break;
        }
        case "second": {
          currentIndex = "second";
          if (this.minuteStatus) prevIndex = "minute";
          else if (this.hourStatus) prevIndex = "hour";
          else if (this.dayStatus) prevIndex = "day";
          else prevIndex = false;
          nextIndex = false;
          break;
        }
        default:
          prevIndex = false;
          currentIndex = false;
          nextIndex = false;
          break;
      }
      const prev = prevIndex ? this.iRefs[prevIndex] : false;
      const current = currentIndex ? this.iRefs[currentIndex] : false;
      const next = nextIndex ? this.iRefs[nextIndex] : false;
      return { prev, current, next };
    },
    onKeyDown(e) {
      const { next, prev } = this.findNextPrevCurrentInput(e);
      switch (e.keyCode) {
        case KEY_CODE.backspaceMob:
        case KEY_CODE.backspace: {
          e.preventDefault();
          if (String(e.target.value).length == 0) {
            if (prev) {
              this.$refs[prev].focus();
            }
          }
          e.target.value = String(e.target.value).slice(0, -1);
          break;
        }
        case KEY_CODE.left:
          e.preventDefault();
          if (prev) {
            this.$refs[prev].focus();
          }
          break;
        case KEY_CODE.right:
          e.preventDefault();
          if (next) {
            this.$refs[next].focus();
          }
          break;
        case KEY_CODE.up:
        case KEY_CODE.down:
          e.preventDefault();
          break;
        default:
          break;
      }
    },
    changeInput(e, digits = 2) {
      const { next } = this.findNextPrevCurrentInput(e);
      let nextElement;
      if (e.target.value.length < digits) {
        nextElement = false;
      } else {
        nextElement = next ? next : false;
      }
      if (nextElement) {
        const element = this.$refs[nextElement];
        element.focus();
        element.select();
      }
    },
    isInt(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[0-9]+$/.test(char)) return true;
      else e.preventDefault();
    },
  },
  mounted() {
    this.changeValue();
    // this.$emit("input", this.selected);
  },
  created() {
    this.getDigits();
    this.setDays(this.dayValue);
    this.setHours(this.hourValue);
    this.setMinutes(this.minuteValue);
    this.setSeconds(this.secondValue);
  },
};
</script>

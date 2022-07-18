<template>
  <div style="display: flex;height: 100px;color: #fff">
    <img src="">
    <search></search>
  </div>
  <div class="home">
    <div class="content">
      <div class="city">
        <div class="city-location">
          <input placeholder="asdas">
          <img src="../assets/images/location.png">
          <div>{{ cityDisplay }}</div>
          <button class="text" @click="this.$router.replace({name:'select-city'})">切换</button>
        </div>
        <div>
          {{ lastMinutes }}分钟前更新
        </div>
      </div>
      <div class="now">
        <div class="temp">{{ now.tmp }}℃</div>
        <div class="weather">
          <img :src="now.cond_code?require(`../assets/images/weather/${now.cond_code}.svg`):''">
          <div>{{ now.cond_txt }}</div>
        </div>
        <div class="other">
          <div class="pcpn">
            <div class="label"><span>降水量</span></div>
            <div class="value"><span>{{ now.pcpn }}mm</span></div>
          </div>
          <div class="hum">
            <div class="label"><span>湿度</span></div>
            <div class="value"><span>{{ now.hum }}%</span></div>
          </div>
          <div class="wind">
            <div class="label"><span>{{ now.wind_dir }}</span></div>
            <div class="value"><span>{{ now.wind_sc }}</span></div>
          </div>
          <div class="pres">
            <div class="label"><span>气压</span></div>
            <div class="value"><span>{{ now.pres }}hpa</span></div>
          </div>
        </div>
      </div>
      <div class="label"> 未来24小时预报</div>
      <div class="hour24">
        <div class="scroll">
          <div v-for="hour in next24Hour" :key="hour.fxTime" class="every">
            <div>{{ new Date(hour.fxTime).getHours() + ":00" }}</div>
            <img :src="require(`../assets/images/weather/${hour.icon}.svg`)">
            <div>{{ hour.temp }}</div>
          </div>
        </div>
      </div>
      <div class="label"> 未来7天预报</div>
      <div class="day7">
        <div v-for="day in next7Day" :key="day.fxDate" class="every">
          <div class="date"> {{ day.fxDate.substr(5) }}</div>
          <img :src="require(`../assets/images/weather/${day.iconDay}.svg`)">
          <div calss="temp"> {{ day.tempMax + "℃" + "-" + day.tempMin + "℃" }}</div>
          <div class="sun">
            <div>日出：{{ day.sunrise }}</div>
            <div>日落：{{ day.sunset }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {get} from "lodash"

export default {
  name: 'HomeView',
  data() {
    return {
      now: {},
      basic: {},
      update: {},
      region: "",
      regionId: "",
      next24Hour: [],
      next7Day: [],
    }
  },
  computed: {
    ...mapGetters(['getCurrentCity']),
    cityDisplay() {
      if (this.basic.location && this.basic.parent_city) {
        if (this.basic.location === this.basic.parent_city) {
          return this.basic.location;
        } else {
          return this.basic.parent_city + "  " + this.basic.location;
        }
      } else {
        return "";
      }
    },
    lastMinutes() {
      return parseInt((new Date().getTime() - new Date(this.update.loc).getTime()) / 1000 / 60);
    }
  },
  async created() {
    this.region = get(this, "getCurrentCity.name", "西安");
    this.regionId = get(this, "getCurrentCity.id", "101110101");
    this.$api.get("https://free-api.heweather.net/s6/weather/now", {
      location: this.region,
      key: '1baa01103dd74d01b65a4fc2ea26b848'
    }).then(({data}) => {
      if (data.HeWeather6[0].status === 'ok') {
        this.now = data.HeWeather6[0].now;
        this.basic = data.HeWeather6[0].basic;
        this.update = data.HeWeather6[0].update;
      }
    });
    this.$api.get("https://devapi.qweather.com/v7/weather/24h", {
      location: this.regionId,
      key: '1baa01103dd74d01b65a4fc2ea26b848'
    }).then(({data}) => {
      if (data.code === "200") {
        this.next24Hour = data.hourly;
      }
    });
    this.$api.get("https://devapi.qweather.com/v7/weather/7d", {
      location: this.regionId,
      key: '1baa01103dd74d01b65a4fc2ea26b848'
    }).then(({data}) => {
      if (data.code === "200") {
        this.next7Day = data.daily;
      }
    });
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: rgb(53, 114, 198) url("../assets/images/sunny.png") no-repeat 0% 0%;
  background-size: 100% auto !important;
  display: flex;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0 15px;

    color: #fff;

    .city {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      margin: 20px 0;
      font-size: 20px;

      .city-location {
        display: flex;
        font-size: 30px;

        .text {
          text-decoration: underline;
          border: none;
          background: transparent;
          color: #ffffff;
          position: relative;
          top: 8px;
        }
      }


      img {
        width: 30px;
        height: 30px;
      }
    }

    .now {
      display: flex;
      border-radius: 11px;
      flex-direction: column;
      flex: 1;
      background: rgba(0, 0, 0, 0.15);

      .temp {
        font-size: 50px;
      }

      .other {
        font-size: 15px;
        display: flex;

        .label {
          opacity: 0.5;
          margin-bottom: 10px;
          text-align: center;
        }

        .value {
          text-align: center;
        }

        .pcpn {
          flex: 1;
        }

        .hum {
          flex: 1;
        }

        .wind {
          flex: 1;
        }

        .pres {
          flex: 1;
        }

      }

      .weather {
        margin-bottom: 10px;
        display: flex;

        img {
          width: 20px;
          height: 20px;
          margin-right: 20px;
        }
      }
    }

    .hour24 {
      flex: 1;
      max-width: calc(100vw - 30px);

      .scroll {
        overflow: auto;
        display: flex;

        .every {
          text-align: center;

          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }

    .day7 {
      flex: 4;
      display: flex;
      flex-direction: column;

      .every {
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: space-between;

        img {
          width: 40px;
          height: 40px;
        }
      }
    }

    .label {
      font-weight: 800px;
      font-size: 20px;
    }

  }

}

</style>

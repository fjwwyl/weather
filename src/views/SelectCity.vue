<template>
  <div class="content">
    <div class="header">
      <img src="../assets/images/back.png" @click="$router.push({name:'home'})">
      <span>切换城市</span>
    </div>
    <div class="query">
      <input class="city-input" v-model="city" placeholder="搜索市、区、县等">
      <button class="query-button" @click="cityQuery">查询</button>
    </div>
    <div class="split-line"></div>
    <ul class="city-option" v-if="inputFocus">
      <li v-for="city in cityQueryList" class="city-name" :key="city.id" :value="city.id" :name="city.id"
          @click="liClick(city)">
        <span>{{ city.adm1 + "  " + city.name }}</span>
      </li>
    </ul>
    <div v-else>
      <div class="label" v-if="getCurrentCityHistory.length!==0"><span>历史记录</span></div>
      <div class="historical-records">
        <div v-for="city in getCurrentCityHistory" class="city-name" :key="city.id" :value="city.id" :name="city.id"
            @click="liClick(city)">
          <button @click="topCityClick">{{ city.name }}</button>
        </div>
      </div>
      <div class="label">热门城市</div>
      <div class="popular-cities">
        <div v-for="topCity in  topCityList" :key="topCity" :value="topCity" :name="topCity" class="top-city">
          <button @click="topCityClick(topCity)">{{ topCity }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SelectCity",
  data() {
    return {
      city: "",
      inputFocus: false,
      topCityList: ['北京', '上海', '深圳', '广东', '西安', '成都', '杭州', '武汉', '重庆', '天津', '宝鸡', '长沙'],
      cityQueryList: [],
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['getCurrentCityHistory']),
  },
  methods: {
    cityQuery() {
      this.inputFocus = true;
      this.$api.get("https://geoapi.qweather.com/v2/city/lookup", {
        location: this.city,
        key: '1baa01103dd74d01b65a4fc2ea26b848'
      }).then(({data}) => {
        if (data.code === '200') {
          this.cityQueryList = data.location;
        }
      });
    },
    liClick(city) {
      this.$store.dispatch('changeCity', city);
      this.$store.dispatch('changeCityHistory', city);
      this.$router.push({name: "home"});
    },
    topCityClick(city) {
      this.$api.get("https://geoapi.qweather.com/v2/city/lookup", {
        location: city,
        key: '1baa01103dd74d01b65a4fc2ea26b848'
      }).then(({data}) => {
        if (data.code === '200') {
          console.log(data.location.filter(f => f.name === city));
          this.$store.dispatch('changeCity', data.location.filter(f => f.name === city)[0]);
          this.$store.dispatch('changeCityHistory', data.location.filter(f => f.name === city)[0]);
          this.$router.push({name: "home"});
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;


  .header {
    color: #ffff;
    height: 50px;
    background-color: #4b6eef;
    line-height: 50px;
    text-align: center;

    img {
      position: absolute;
      top: 15px;
      left: 0px;
      margin-left: 20px;
      width: 20px;
      height: 20px;
    }

    span {
      height: 20px;
      line-height: 20px;
      font-size: 20px;
    }
  }

  .query {
    display: flex;

    .city-input {
      margin: 20px;
      height: 30px;
      flex: 1;
      position: relative;
    }

    .query-button {
      margin: 20px;
      width: 60px;
      height: 36px;
    }
  }


  .city-option {
    width: 200px;
    list-style: none;
    margin: 0 20px;
    padding: 0;

  }

  .city-name {
    font-size: 20px;
    margin-right: 10px;
  }

  .split-line {
    height: 1px;
    width: 100%;
    background-color: black;
  }

  .historical-records {
    display: flex;
    flex-wrap: wrap;
    margin: 0 20px;
    list-style: none;
  }

  .label {
    font-size: 20px;
    margin: 10px 20px;
  }

  .popular-cities {
    flex: 1;
    margin: 0 20px;
    display: flex;
    flex-wrap: wrap;

    .top-city {
      margin-right: 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }

  button {
    background-color: #ffffff;
    font-size: 20px;
    border-radius: 4px;
  }
}

</style>
import {createStore} from 'vuex'

export default createStore({
    state: {
        city: {},
        cityHistory: [],
    },
    getters: {
        getCurrentCity(state) {
            return state.city;
        },
        getCurrentCityHistory(state) {
            return state.cityHistory;
        }
    },
    mutations: {
        changeCity(state, city) {
            state.city = city;
        },
        changeCityHistory(state, city) {
            //有city就不添加了
            if (state.cityHistory.findIndex(f => f.name === city.name) === -1) {
                state.cityHistory.push(city);
            }
        }
    },
    actions: {
        changeCity({commit}, city) {
            commit('changeCity', city)
        },
        changeCityHistory({commit}, city) {
            commit('changeCityHistory', city);
        }
    },
    modules: {}
})

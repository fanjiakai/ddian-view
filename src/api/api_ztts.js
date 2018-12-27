/**
 * Created by bootdo.
 * 用户相关api
 */
import * as API from './'

export default {
  list: params => {
    return API.GET('/api-lqhd-service/lqhdLq/list', params)
  },

  list1: params => {
    return API.GET('/api-lqhd-service/lqhdLqdk/list', params)
  },

  list2: params => {
    return API.GET('/api-lqhd-service/lqhdLqpk/list', params)
  },
  lqdkTableList: params => {
    return API.GET('/api-lqhd-service/lqhdLqdk/conditionList', params)
  },
  lqpkTableList: params => {
    return API.GET('/api-lqhd-service/lqhdLqpk/conditionList', params)
  },
  lqTableList: params => {
    return API.GET('/api-lqhd-service/lqhdLq/conditionList', params)
  },
 lqlxfbCharts: params => {
    return API.GET('/api-lqhd-service/lqhdLq/lqlxDistribute', params)
  },
}

export default {
  data() {
    return {
      initCfg: {
        getApi: '',
        saveApi: ''
      },
      list: [],
      loading: false
    };
  },

  methods: {
    /**
     * 校验
     * @returns 
     */
    validateApiUrl(api) {
      const url = this.initCfg[api];
      console.log(url);

      !url && this.$message.warning('缺少接口地址');

      return url ? url : false;
    },


    // 获取
    get() {
      if (!this.validateApiUrl('getApi')) return;
      const api = this.validateApiUrl('getApi');

      const param = {};

      this.loading = true;
      this.$request[api](param)
        .then((res) => {
          // todo
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // 新增
    add() { },

    // 保存
    save() { }
  }
};
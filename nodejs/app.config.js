const appConfig = {
    ui_domain_url: process.env.UI_DOMAIN_URL,
     oracle: {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        sid: process.env.SID,
        poolAlias: process.env.POOLALIAS,
        poolMin: isNaN(Number(process.env.POOL_MIN)) ? 0 : Number(process.env.POOL_MIN),
        poolMax: isNaN(Number(process.env.POOL_MAX)) ? 10 : Number(process.env.POOL_MAX),
        poolTimeout: isNaN(Number(process.env.POOL_TIMEOUT)) ? 60 : Number(process.env.POOL_TIMEOUT),
        poolqueueTimeout: isNaN(Number(process.env.POOL_QUEUE_TIMEOUT)) ? 60 : Number(process.env.POOL_QUEUE_TIMEOUT),
        poolEnableStats: process.env.POOL_ENABLE_STATS === 'false' ? false : true,
        resultSetBatchSize: isNaN(Number(process.env.RESULTSET_BATCH_SIZE)) ? 100 : Number(process.env.RESULTSET_BATCH_SIZE)
    },
};

module.exports = appConfig;
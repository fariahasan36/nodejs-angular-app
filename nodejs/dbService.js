const oracledb = require('oracledb');
const dotenv = require('dotenv')
dotenv.config();


const appConfig = require("./app.config.js");

// force all queried CLOBs to be returned as Strings
oracledb.fetchAsString = [oracledb.CLOB];

// force all queried BLOBs to be returned as Buffers
oracledb.fetchAsBuffer = [oracledb.BLOB];

async function init() {
    // console.log(oracledb.oracleClientVersionString)
    // console.log(`${appConfig.oracle.host}:${appConfig.oracle.port}/${appConfig.oracle.sid}`)
    try {
        // Typically a pool is created only when the application starts
        await oracledb.createPool({
            _enableStats: appConfig.oracle.poolEnableStats,
            user: appConfig.oracle.user,
            password: appConfig.oracle.password,
            connectString: `${appConfig.oracle.host}:${appConfig.oracle.port}/${appConfig.oracle.sid}`,
            poolAlias: appConfig.oracle.poolAlias,
            poolMin: appConfig.oracle.poolMin,
            poolMax: appConfig.oracle.poolMax,
            poolTimeout: appConfig.oracle.poolTimeout,
            // queueTimeout: appConfig.oracle.poolqueueTimeout
        });
        console.log('Oracle connection pool has been created!');
    } catch (err) {
        console.error(err.message);
    } finally {
        // At the end of the application, the pool can be closed
        // await oracledb.getPool(appConfig.oracle.poolAlias).close(); // close pool immediately
    }
}

init();

function executeSQL(sql, bind, options) {
    return new Promise(async function (resolve, reject) {
        let connection;
        try {
            connection = await oracledb.getConnection({
                poolAlias: appConfig.oracle.poolAlias
            });

            options.autoCommit = true;
            const result = await connection.execute(sql, bind);
            resolve(result);

        } catch (err) { // catches errors in getConnection and the query
            console.error("Found Error in connection!!!");
            console.error(err);
            reject(err);
        } finally {
            if (connection) { // the connection assignment worked, must release
                try {
                    await connection.close();
                } catch (e) {
                    console.error(e);
                }
            }

        }
    });
}

function executePLSQL(plsql, bind, options, autoCommit = true) {
    return new Promise(async function (resolve, reject) {
        let connection;
        try {
            connection = await oracledb.getConnection({
                poolAlias: appConfig.oracle.poolAlias
            });
            options.autoCommit = autoCommit;
            const result = await connection.execute(plsql, bind, options);

            let outBinds = [];
            for (let key in bind) {
                if (bind[key] && bind[key]['type'] && bind[key]['type'] === oracledb.CURSOR) {
                    outBinds.push(key);
                }
            }

            /*
                Fetch rows from the REF CURSOR.

                If getRows(numRows) returns:
                    Zero rows               => there were no rows, or are no more rows to return
                    Fewer than numRows rows => this was the last set of rows to get
                    Exactly numRows rows    => there may be more rows to fetch
            */
            const numRows = appConfig.oracle.resultSetBatchSize;
            let newResult = Object.assign({}, result);
            for (let i = 0; i < outBinds.length; i++) {
                const resultSet = result.outBinds[outBinds[i]];
                result.outBinds[outBinds[i]] = [];
                let rows;
                do {
                    rows = await resultSet.getRows(numRows); /* get numRows rows at a time */
                    if (rows.length > 0) {
                        newResult.outBinds[outBinds[i]] = [...newResult.outBinds[outBinds[i]], ...rows];
                    }
                } while (rows.length === numRows);

                await resultSet.close();
            }

            resolve(newResult);

        } catch (err) { // catches errors in getConnection and the query
            console.error(err);
            reject(err);
        } finally {
            if (connection) { // the connection assignment worked, must release
                try {
                    await connection.close();
                } catch (e) {
                    console.error(e);
                }
            }

        }
    });
}

function getPoolStatistics() {
    return oracledb.getPool(appConfig.oracle.poolAlias)._logStats();
}

module.exports.executeSQL = executeSQL;
module.exports.executePLSQL = executePLSQL;
module.exports.getPoolStatistics = getPoolStatistics;
module.exports.OUT_FORMAT_ARRAY = oracledb.OUT_FORMAT_ARRAY;
module.exports.OUT_FORMAT_OBJECT = oracledb.OUT_FORMAT_OBJECT;
module.exports.BIND_IN = oracledb.BIND_IN;
module.exports.BIND_INOUT = oracledb.BIND_INOUT;
module.exports.BIND_OUT = oracledb.BIND_OUT;
module.exports.BLOB = oracledb.BLOB;
module.exports.BUFFER = oracledb.BUFFER;
module.exports.CLOB = oracledb.CLOB;
module.exports.CURSOR = oracledb.CURSOR;
module.exports.DATE = oracledb.DATE;
module.exports.DEFAULT = oracledb.DEFAULT;
module.exports.NUMBER = oracledb.NUMBER;
module.exports.NCLOB = oracledb.NCLOB;
module.exports.STRING = oracledb.STRING;
module.exports.DB_TYPE_BLOB = oracledb.DB_TYPE_BLOB;
module.exports.DB_TYPE_BOOLEAN = oracledb.DB_TYPE_BOOLEAN;
module.exports.DB_TYPE_CHAR = oracledb.DB_TYPE_CHAR;
module.exports.DB_TYPE_LONG = oracledb.DB_TYPE_LONG;
module.exports.DB_TYPE_OBJECT = oracledb.DB_TYPE_OBJECT;
module.exports.DB_TYPE_RAW = oracledb.DB_TYPE_RAW;

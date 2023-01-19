const log4js = require('log4js')


const loggers = (param) =>{
    log4js.configure({
    appenders:{
        fileWarn:{type:'file', filename:'./logs/warn.log'},
        fileError: {type:'file', filename:'./logs/error.log'},
        consola:{type:'console'},
        },
        categories:{
            default:{appenders:['consola'], level:'info'},
            Warn:{appenders:['fileWarn'], level:'warn'},
            Error:{appenders:['fileError'], level:'error'}
        }
    })
    const logger = log4js.getLogger(`${param}`)

    logger.info('info')
    logger.warn('warn')
    logger.error('error')
}


//appenders:['consola'], level:'info'

module.exports = loggers
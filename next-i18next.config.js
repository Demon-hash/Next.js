const AppConfig = require('./app.config');

module.exports = {
    i18n: {
        defaultLocale: 'default',
        locales: ['default', AppConfig.defaultAppLanguage, 'ru', 'de'],
        localeDetection: false,
    },
    fallbackLng: {
        default: [AppConfig.defaultAppLanguage]
    },
    trailingSlash: true,
    keySeparation: true,
}
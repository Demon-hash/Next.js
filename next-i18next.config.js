const AppConfig = require('./app.config');

module.exports = {
    i18n: {
        defaultLocale: 'default',
        locales: ['default', AppConfig.defaultAppLanguage, 'ru', 'de'],
        localeDetection: false,
        keySeparation: true,
    },
    fallbackLng: {
        default: [AppConfig.defaultAppLanguage]
    },
    trailingSlash: true,
}
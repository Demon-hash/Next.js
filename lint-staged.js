module.exports = {
    '*.{js,jsx,ts,tsx}': [
        () => 'tsc-files --noEmit',
    ],
    '*.{js,jsx,ts,tsx,css}': ['eslint --fix --max-warnings=0', 'prettier --write'],
}
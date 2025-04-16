import {baseConfig, baseImportConfig} from '../../eslint.config.mjs';

export default [
    ...baseConfig,
    ...baseImportConfig,
    {
        files: ['**/*.ts'],
        // Override or add rules here
        rules: {},
    },
];

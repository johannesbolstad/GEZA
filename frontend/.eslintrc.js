module.exports = {
    root: true,
    extends: ['airbnb-typescript', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json', // Specify it only for TypeScript files
        requireConfigFile: false
    },
    plugins: [
        'react',
        'react-native',
        'flowtype',
        'prettier',
        'standard',
        'unused-imports',
        'import'
    ],
    rules: {
        'unused-imports/no-unused-imports-ts': 2,
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-unused-expressions': 'off'
    }
};

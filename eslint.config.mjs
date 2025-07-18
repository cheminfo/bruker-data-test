import { defineConfig, globalIgnores } from 'eslint/config';
import recommended from 'eslint-config-cheminfo-typescript';

export default defineConfig(globalIgnores(['coverage', 'lib']), recommended);

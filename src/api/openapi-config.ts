import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'http://localhost:3000/api-docs/swagger.json',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './api.ts',
  exportName: 'api',
  hooks: { queries: true, lazyQueries: true, mutations: true },
}

export default config

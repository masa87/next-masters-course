import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.GRAPHQL_URL,
	documents: ["src/graphql/**/*.graphql", "src/{app, components, lib}/**/*.{ts, tsx}"],
	ignoreNoDocuments: true,
	generates: {
		"src/gql/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				useTypeImprots: true,
				enumsAsTypes: true,
				defaultScalarType: "unknown",
				skipTypename: true,
				documentMode: "string",
			},
		},
		"./graphql.schema.json": {
			plugins: ["introspection"],
		},
	},
};

export default config;

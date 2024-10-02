import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import tsconfigPaths from 'vite-tsconfig-paths'

const isPackageProduction = process.env.BUILDING_PACKAGE === 'true'

const packageBuildConfig = {
	lib: {
		entry: resolve(__dirname, './src/lib/index.ts'),
		name: '@boxfish-studio/react-cookie-manager',
		fileName: (format) => `index.${format}.js`
	},
	rollupOptions: {
		external: ['react', 'react-dom', 'tailwindcss'],
		output: {
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
				tailwindcss: 'tailwindcss'
			}
		}
	},
	sourcemap: true,
	emptyOutDir: true
}
const plugins = isPackageProduction
	? [
			tsconfigPaths({
				root: __dirname
			}),
			react(),
			dts({ rollupTypes: true })
		]
	: [
			tsconfigPaths({
				root: __dirname
			}),
			react()
		]

export default defineConfig({
	build: isPackageProduction ? packageBuildConfig : {},
	plugins,
	css: {
		postcss: {
			plugins: [tailwindcss]
		}
	}
})

import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'public/build/bundle.js',
  loader: {
    '.js': 'jsx',
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  external: ['react', 'react-dom', 'react-router-dom'], // Marking as external
}).catch(() => process.exit(1));

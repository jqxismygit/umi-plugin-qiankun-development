import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  // standlone:false
  qiankunDev: {
    devExternal: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
  },
});

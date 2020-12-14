// ref:
// - https://umijs.org/plugins/api
import { IApi, IConfig } from '@umijs/types';

export default function(api: IApi) {
  api.logger.info('use plugin');

  api.describe({
    key: 'standlone',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
  const { standlone = true, qiankun = {} } = api.userConfig;
  api.modifyConfig((initConfig: IConfig) => {
    if (api.env === 'development' && standlone) {
      initConfig.scripts = [
        'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.development.js',
        'https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.development.js',
        'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.js',
        'https://cdn.jsdelivr.net/npm/antd@4.6.4/dist/antd.js',
      ];
    }
    if (api.env === 'production') {
      initConfig.externals = {
        react: 'React',
        'react-dom': 'ReactDOM',
        moment: 'moment',
        antd: 'antd',
      };
      if (qiankun.master) {
        initConfig.scripts = [
          'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js',
          'https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.production.min.js',
          'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.min.js',
          'https://cdn.jsdelivr.net/npm/antd@4.6.4/dist/antd.min.js',
        ];
      }
    }
    return initConfig;
  });
}

// ref:
// - https://umijs.org/plugins/api
import { IApi, IConfig } from '@umijs/types';

export default function(api: IApi) {
  api.logger.info('use plugin umi-plugin-qiankun-development');

  api.describe({
    key: 'standlone',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
  const { standlone = true, qiankun = {} } = api.userConfig;

  api.addDepInfo(() => {
    const { dependencies, devDependencies } = api.pkg;
    return [
      {
        name: 'react',
        range:
          dependencies?.['react'] ||
          devDependencies?.['react'] ||
          require('../package')?.dependencies?.['react'],
      },
      {
        name: 'react-dom',
        range:
          dependencies?.['react-dom'] ||
          devDependencies?.['react-dom'] ||
          require('../package')?.dependencies?.['react-dom'],
      },
      {
        name: 'antd',
        range:
          dependencies?.['antd'] ||
          devDependencies?.['antd'] ||
          require('../package')?.dependencies?.['antd'],
      },
      {
        name: 'moment',
        range:
          dependencies?.['moment'] ||
          devDependencies?.['moment'] ||
          require('../package')?.dependencies?.['moment'],
      },
    ];
  });

  api.modifyConfig((initConfig: IConfig) => {
    if (api.env === 'development') {
      if (!standlone) {
        initConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          moment: 'moment',
          antd: 'antd',
        };
        if (qiankun.master) {
          initConfig.scripts = [
            'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.development.js',
            'https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.development.js',
            'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.js',
            'https://cdn.jsdelivr.net/npm/antd@4.6.4/dist/antd.js',
          ];
        }
      }
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

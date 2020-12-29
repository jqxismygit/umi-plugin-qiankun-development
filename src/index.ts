// ref:
// - https://umijs.org/plugins/api
import { IApi, IConfig } from '@umijs/types';
export default function(api: IApi) {
  api.logger.info('use plugin umi-plugin-qiankun-development');
  api.describe({
    key: 'qiankunDev',
    config: {
      schema(joi) {
        return joi.object({
          devExternal: joi.boolean(),
          autoDep: joi.boolean(),
        });
      },
    },
  });

  const { qiankunDev = {}, qiankun = {} } = api.userConfig;
  const { devExternal = true, autoDep = true } = qiankunDev;

  if (autoDep) {
    api.addDepInfo(() => {
      console.log('addDepInfo------->>>');
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
        {
          name: 'lodash',
          range:
            dependencies?.['lodash'] ||
            devDependencies?.['lodash'] ||
            require('../package')?.dependencies?.['lodash'],
        },
        // {
        //   name: 'bizcharts',
        //   range:
        //     dependencies?.['bizcharts'] ||
        //     devDependencies?.['bizcharts'] ||
        //     require('../package')?.dependencies?.['bizcharts'],
        // },
        // {
        //   name: '@antv/data-set',
        //   range:
        //     dependencies?.['@antv/data-set'] ||
        //     devDependencies?.['@antv/data-set'] ||
        //     require('../package')?.dependencies?.['@antv/data-set'],
        // },
        // {
        //   name: '@antv/g2',
        //   range:
        //     dependencies?.['@antv/g2'] ||
        //     devDependencies?.['@antv/g2'] ||
        //     require('../package')?.dependencies?.['@antv/g2'],
        // },
        // {
        //   name: '@antv/g6',
        //   range:
        //     dependencies?.['@antv/g6'] ||
        //     devDependencies?.['@antv/g6'] ||
        //     require('../package')?.dependencies?.['@antv/g6'],
        // },
      ];
    });
  }

  api.modifyConfig((initConfig: IConfig) => {
    if (api.env === 'development') {
      if (devExternal) {
        initConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          // moment: 'moment',
          antd: 'antd',
          lodash: '_',
          // bizcharts: 'BizCharts',
          // '@antv/data-set': 'DataSet',
          // '@antv/g2': 'G2',
          // '@antv/g6': 'G6',
        };
        if (!qiankun.slave) {
          initConfig.scripts = [
            'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.development.js',
            'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.development.js',
            // 'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.min.js',
            'https://cdn.jsdelivr.net/npm/antd@4.6.4/dist/antd.js',
            'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js',
            // 'https://cdn.jsdelivr.net/npm/@antv/data-set@0.11.7/build/data-set.min.js',
            // 'https://gw.alipayobjects.com/os/lib/antv/g2/4.0.15/dist/g2.min.js',
            // 'https://cdn.jsdelivr.net/npm/@antv/g6@4.0.3/dist/g6.min.js',
            // 'https://cdn.jsdelivr.net/npm/bizcharts@3.5.9/umd/BizCharts.min.js',
          ];
        }
      }
    }
    if (api.env === 'production') {
      initConfig.externals = {
        react: 'React',
        'react-dom': 'ReactDOM',
        // moment: 'moment',
        antd: 'antd',
        lodash: '_',
        // bizcharts: 'BizCharts',
        // '@antv/data-set': 'DataSet',
        // '@antv/g2': 'G2',
        // '@antv/g6': 'G6',
      };
      if (qiankun.master) {
        initConfig.scripts = [
          'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js',
          'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js',
          // 'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.min.js',
          'https://cdn.jsdelivr.net/npm/antd@4.6.4/dist/antd.min.js',
          'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js',
          // 'https://cdn.jsdelivr.net/npm/@antv/data-set@0.11.7/build/data-set.min.js',
          // //这个CDN有点问题，不晓得啥情况
          // // 'https://cdn.jsdelivr.net/npm/@antv/g2@4.0.15/lib/index.min.js',
          // 'https://gw.alipayobjects.com/os/lib/antv/g2/4.0.15/dist/g2.min.js',
          // 'https://cdn.jsdelivr.net/npm/@antv/g6@4.0.3/dist/g6.min.js',
          // 'https://cdn.jsdelivr.net/npm/bizcharts@3.5.9/umd/BizCharts.min.js',
        ];
      }
    }
    return initConfig;
  });
}

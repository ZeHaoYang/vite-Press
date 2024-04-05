/* 
配置文件 （） 允许您自定义 VitePress 网站的各个方面，最基本的选项是网站的标题和描述：.vitepress/config.js
*/
export default {
    // site-level options
    title: '学习网站',
    description: '网站描述.',
    themeConfig: {
      // theme-level options
      logo: './img/1.png',   //LOGO
      nav: [
        { text: '首页', link: '/' },
        { text: '导航栏链接2', link: '/guide/' },
        { text: '导航栏链接3', link: '' },
      ], //导航栏链接
      displayAllHeaders: true ,
     // search: true,  //搜索框
      searchMaxSuggestions: 10 , //搜索框 搜索结果数量
      algolia: {
        apiKey: '<API_KEY>',
        indexName: '<INDEX_NAME>',
        // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
        appId: '<APP_ID>'
      },
      // siteTitle: 'Hello World'
       sidebar: [  //侧边栏
        {
          text: '导航',
          items: [
            { text: '首页', link: '../index.md' },
            { text: 'Vue3', link: '../Vue3-examples.md' },
            { text: 'JAVA 基础', link: '../面试题/Java 基础.md' },
            { text: 'JAVA IO', link: '../面试题/Java IO.md' },
            { text: 'JAVA 容器', link: '../面试题/Java 容器.md' },
            { text: '分布式', link: '../面试题/分布式.md' },
            { text: 'JAVA 并发', link: '../面试题/Java 并发.md' },
          ]
        }
      ] 
    },
    markdown: {
      lineNumbers: true   //左侧显示行号
    },
   
  }
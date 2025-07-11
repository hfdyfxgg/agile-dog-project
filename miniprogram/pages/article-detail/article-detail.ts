// 导入API接口
import { getArticleDetail, mockArticleDetail } from '../../api/articleApi';

// 定义文章类型
interface Article {
  id: number;
  title: string;
  author: string;
  publishTime: string;
  views: number;
  content: string;
  tags: string[];
}

// 页面数据和方法
Page({
  data: {
    // 文章详情
    article: {} as Article,
    // 是否正在加载
    loading: true,
    // 文章ID
    articleId: 0
  },

  // 页面加载
  onLoad(options) {
    // 获取文章ID
    const articleId = Number(options.id || 1);
    this.setData({
      articleId,
      loading: true
    });

    // 加载文章详情
    this.loadArticleDetail(articleId);
  },

  // 加载文章详情
  async loadArticleDetail(id: number) {
    try {
      // 调用API获取文章详情
      const article = await getArticleDetail({ id });
      
      // 如果API调用失败，使用模拟数据作为兜底
      const articleData = article || mockArticleDetail;
      
      this.setData({
        article: articleData,
        loading: false
      });
    } catch (error) {
      console.error('获取文章详情失败', error);
      // API调用失败时使用模拟数据
      this.setData({
        article: mockArticleDetail,
        loading: false
      });
      wx.showToast({
        title: '数据加载失败，显示离线数据',
        icon: 'none'
      });
    }
  },

  // 分享
  onShareAppMessage() {
    const { article } = this.data;
    return {
      title: article.title,
      path: `/pages/article-detail/article-detail?id=${article.id}`
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { article } = this.data;
    return {
      title: article.title,
      query: `id=${article.id}`
    };
  }
}); 
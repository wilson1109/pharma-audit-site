# pharma-audit-site

制药 GMP 文件审核辅助系统的产品介绍页，**纯静态站点**，托管在 GitHub Pages。

线上地址：https://wilson1109.github.io/pharma-audit-site/

## 目录

```
index.html              落地页（定位 / 流程 / 能力 / 界面 / 架构 / 安全 / FAQ）
404.html                自定义 404
assets/css/style.css    全部样式，无框架、无 CDN 依赖
assets/js/main.js       移动端菜单、滚动高亮、入场动画
assets/favicon.svg      站点图标
robots.txt              允许收录
sitemap.xml             站点地址
.nojekyll               跳过 Jekyll 处理（避免下划线目录被吞）
```

## 发布

仓库 **Settings → Pages → Source 选 `Deploy from a branch`，分支 `main`，目录 `/(root)` → Save**。
推到 `main` 后约 1 分钟生效。

```bash
git add .
git commit -m "更新站点"
git push origin main
```

## 修改注意

- 所有资源用**相对路径**，因为站点地址带 `/pharma-audit-site/` 前缀；
  不要改回 `/assets/...` 这种根绝对路径，否则线上会 404。
- 页面里没有真实界面截图、没有企业文件内容、没有端点与密钥——**继续保持**，这是公开仓库。
- 页面上的 GitHub 链接指向本仓库；代码仓库是另一个私有仓库，不要链过去。

## 本地预览

双击 `index.html` 即可，或：

```bash
python -m http.server 8000
# 打开 http://127.0.0.1:8000
```

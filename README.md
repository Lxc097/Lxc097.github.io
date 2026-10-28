# LiXinchen 工程作品集

原生 HTML / CSS / JavaScript，无需安装依赖或构建。为 GitHub Pages 配置，所有资源使用相对路径，同时兼容个人域名和项目子路径。

## 本地预览

在本目录运行 `python -m http.server 8080`（没有 `python` 时用 `python3`），打开 http://localhost:8080 。

## 发布到 GitHub Pages

1. 在 Lxc097 账号新建公开仓库 `Lxc097.github.io`（若已有该仓库，先检查已有内容）。
2. 将本项目文件提交到 `main` 分支，保留 `.nojekyll`。
3. 仓库 Settings → Pages → Build and deployment → Source 选择 Deploy from a branch，分支选择 main，目录选择 / (root)，保存。
4. 等待 GitHub 自动部署成功后访问 https://lxc097.github.io/ 。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 更新真实作品

编辑 `content.js` 中的项目：`title` 标题、`description` 简介、`category` 为 cfd 或 cad、`tool` 软件名称、`tags` 标签、`sections` 项目详情。将图片存入 `assets/`，设置 `image: './assets/文件名.webp'`。真实项目补充完成后将 `sample` 改为 false，并修改 index.html 中的示例说明。示意图仅用于版式演示，不能替代真实仿真结果。

个人介绍和 GitHub 联系链接位于 `index.html`。配色与响应式样式位于 `exhibition.css`。

建议每个项目包含：背景与目标、本人负责内容、建模过程、求解/设计方法、验证、真实结果与局限。不要上传不允许公开的模型和资料。

## 变更记录

- 删除未再引用的 `style.css`。页面只链接 `exhibition.css`，两份文件内容相同。
- 增加 `.gitignore`，忽略系统与编辑器临时文件。
- 修正 304px 及更窄时导航中文被拆成单字、或贴住品牌的问题：链接不换行，导航放到品牌下一行。
- 「管道内流」的卡片和详情会写出同一个 SVG 渐变 id。现在每次绘制使用不同 id。
- 增加站点图标，避免浏览器请求 `/favicon.ico` 时出现 404。

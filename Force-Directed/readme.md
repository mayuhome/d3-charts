## 力导向图
使用tailwindcss + d3.js

### tailwind 使用方法
link https://tailwindcss.com/docs/installation/tailwind-cli
1. Install Tailwind CSS
    Install tailwindcss and @tailwindcss/cli via npm.
2. Import Tailwind in your CSS
    Add the @import "tailwindcss"; import to your main CSS file.
3. Start the Tailwind CLI build process
    Run the CLI tool to scan your source files for classes and build your CSS.
    ```
    npx @tailwindcss/cli -i ./input.css -o ./output.css --watch
    ```
4. Add the CSS to your HTML
    Add the generated CSS file to your HTML.
    ```html
    <link href="./output.css" rel="stylesheet">
    ```

## 力导向图开发步骤详解
### 1. 初始化设置
设置SVG容器尺寸

创建缩放功能

定义数据结构和颜色比例尺

### 2. 创建力导向模拟
```javascript
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(60))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => 10 + d.popularity / 5));
```
### 3. 绘制图形元素
连线：使用SVG的<line>元素

节点：使用SVG的<circle>元素

标签：使用SVG的<text>元素

### 4. 实现交互功能
拖拽：使用d3.drag()实现节点拖拽

工具提示：鼠标悬停时显示节点信息

节点详情：点击节点在侧边栏显示详细信息

缩放和平移：支持鼠标滚轮缩放和拖动画布

### 5. 控制参数
节点间斥力：控制节点间排斥力强度

连接距离：控制连线长度

向心力：控制节点向中心聚集的强度

重置按钮：恢复初始状态

### 6. 响应式设计
使用CSS Flexbox实现响应式布局

图形容器自适应父元素尺寸

关键特性
完整的力导向图实现：包含节点、连线和标签

丰富的交互功能：拖拽、缩放、悬停提示、点击详情

参数控制：实时调整力导向图布局参数

美观的UI设计：渐变背景、卡片式布局、响应式设计

信息可视化：通过颜色、大小和位置展示数据关系
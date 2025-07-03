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

import { companyData, deptColors } from './data.js';

    // 设置尺寸和边距
        const width = document.querySelector('.chart-container').clientWidth;
        const height = document.querySelector('.chart-container').clientHeight;
        
        // 创建SVG容器
        const svg = d3.select("#org-chart")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .call(d3.zoom().on("zoom", (event) => {
                container.attr("transform", event.transform);
            }))
            .append("g");
        
        // 缩放容器
        const container = svg.append("g");
        
        // 创建工具提示
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        
        // 创建层级布局
        const treeLayout = d3.tree()
            .size([height, width - 200]);

        // 创建数据并转换为层级结构
        const root = d3.hierarchy(companyData);
        treeLayout(root);

        // 创建缩放功能
        const zoom = d3.zoom()
            .scaleExtent([0.5, 2])
            .on("zoom", e => {
                container.attr("transform", e.transform);
            });

        // 应用缩放
        svg.call(zoom);

        // 添加连接线
        const link = container.append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(root.links())
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));
        
        // 添加节点
        const node = container.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .on("click", toggleChildren)
            .on("mouseover", showTooltip)
            .on("mouseout", hideTooltip);
        
        // 添加节点圆形
        node.append("circle")
            .attr("r", d => {
                // 根据部门大小调整半径
                const size = Math.max(8, Math.min(30, d.data.employees / 5));
                return size;
            })
            .attr("fill", d => deptColors[d.data.department] || "#4facfe");

        // 添加节点文本
        node.append("text")
            .attr("dy", "0.38em")
            .attr("x", d => d.children ? -15 : 15)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .attr("font-size", "10px")
            .text(d => d.data.name);

        // 添加部门文本
        node.append("text")
            .attr("dy", "1.8em")
            .attr("x", d => d.children ? -15 : 15)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .attr("font-size", "10px")
            .text(d => d.data.department);

        // 添加员工数量文本
        node.append("text")
            .attr("dy", "3.1em")
            .attr("x", d => d.children ? -15 : 15)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .attr("fill", "#ffb38a")
            .attr("font-size", "9px")
            .text(d => `${d.data.employees}人`);
    
        // 切换子节点展开/收起
        function toggleChildren(event, d) {
            // // 防止事件冒泡
            // event.stopPropagation();
            // if (d.children) {
            //     d._children = d.children;
            //     d.children = null;
            // } else {
            //     d.children = d._children;
            //     d._children = null;
            // }
            // treeLayout(root);
            // console.log('node:',root.descendants());
            
            // // 更新节点
            // const nodeUpdate = node.data(root.descendants(), d => d.data.id)
            // .transition()
            // .duration(500)
            // .attr("transform", d => `translate(${d.y},${d.x})`);

            // console.log('nodeUpdate:',nodeUpdate.node());
            
            // // 更新连接线
            // const linkUpdate = link.data(root.links(), d => d.target.id)
            // .transition()
            // .duration(500)
            // .attr("d", d3.linkHorizontal()
            //     .x(d => d.y)
            //     .y(d => d.x));

            // // 添加节点
            // const nodeEnter = nodeUpdate.enter().append("g")
            //     .attr("class", "node")
            //     .attr("transform", d => `translate(${d.y},${d.x})`)
            //     .on("click", toggleChildren)
            //     .on("mouseover", showTooltip)
            //     .on("mouseout", hideTooltip);

            // // 添加节点圆形
            // nodeEnter.append("circle")
            //     .attr("r", d => {
            //         // 根据部门大小调整半径
            //         const size = Math.max(8, Math.min(30, d.data.employees / 5));
            //         return size;
            //     })
            //     .attr("fill", d => deptColors[d.data.department] || "#4facfe");

            // // 添加节点文本
            // nodeEnter.append("text")
            //     .attr("dy", "0.38em")
            //     .attr("x", d => d.children ? -15 : 15)
            //     .attr("text-anchor", d => d.children ? "end" : "start")
            //     .attr("font-size", "10px")
            //     .text(d => d.data.name);

            // // 添加部门文本
            // nodeEnter.append("text")
            //     .attr("dy", "1.8em")
            //     .attr("x", d => d.children ? -15 : 15)
            //     .attr("text-anchor", d => d.children ? "end" : "start")
            //     .attr("font-size", "10px")
            //     .text(d => d.data.department);

            // // 添加员工数量文本
            // nodeEnter.append("text")
            //     .attr("dy", "3.1em")
            //     .attr("x", d => d.children ? -15 : 15)
            //     .attr("text-anchor", d => d.children ? "end" : "start")
            //     .attr("fill", "#ffb38a")
            //     .attr("font-size", "9px")
            //     .text(d => `${d.data.employees}人`);

            // // 删除节点
            // const nodeExit = nodeUpdate.exit().transition()
            //     .duration(500)
            //     .attr("transform", d => `translate(${source.y},${source.x})`)
            //     .remove();

            // // 删除连接线
            // const linkExit = linkUpdate.exit().transition()
            //     .duration(500)
            //     .attr("d", d => {
            //         const o = {x: source.x, y: source.y};
            //         return d3.linkHorizontal()
            //             .x(d => d.y)
            //             .y(d => d.x)(o);
            //     })
            //     .remove();
        }
    
        // 显示提示框
        function showTooltip(event, d) {
            console.log('e:',event);
            console.log('d:',d);
            
            
            // 防止事件冒泡
            event.stopPropagation();

            tooltip.transition()
                .duration(200)
                .style("opacity", 0.95);

            tooltip
                .style("left", `${event.pageX}px`)
                .style("top", `${event.pageY}px`)
                .html(`
                    <h3>${d.data.name}</h3>
                    <p><strong>部门:</strong> ${d.data.department}</p>
                    <p><strong>员工数:</strong> ${d.data.employees}人</p>
                    <p><strong>预算:</strong> ${d.data.budget}</p>
                    <div class="dept" style="background: ${deptColors[d.data.department] || '#4facfe'}30;">
                        ${d.data.department}
                    </div>
                `);
        }
    
        // 隐藏提示框
        function hideTooltip() {
            tooltip.style("opacity", 0);
        }

        // 显示节点详细信息
        function showNodeDetails(d) {
            const teamList = d.data.team.map(member => 
                `<div class="team-member">${member}</div>`
            ).join("");
            
            const details = `
                <div class="info-section">
                    <div class="info-label">部门名称</div>
                    <div class="info-value">${d.data.department}</div>
                </div>
                
                <div class="info-section">
                    <div class="info-label">负责人</div>
                    <div class="info-value">${d.data.name}</div>
                </div>
                
                <div class="info-section">
                    <div class="info-label">员工数量</div>
                    <div class="info-value">${d.data.employees}人</div>
                </div>
                
                <div class="info-section">
                    <div class="info-label">年度预算</div>
                    <div class="info-value">${d.data.budget}</div>
                </div>
                
                <div class="info-section">
                    <div class="info-label">核心成员</div>
                    <div class="team-list">${teamList}</div>
                </div>
            `;
            
            document.getElementById("node-details").innerHTML = details;

            // 控制按钮事件
            document.getElementById('expand-btn').addEventListener('click', function() {
                // 递归展开所有节点
                function expandAll(d) {
                    if (d._children) {
                        d.children = d._children;
                        d._children = null;
                    }
                    if (d.children) {
                        d.children.forEach(expandAll);
                    }
                }
                expandAll(root);
                updateChart();
            });

            document.getElementById('collapse-btn').addEventListener('click', function() {
                // 递归折叠所有节点（除根节点外）
                function collapseAll(d) {
                    if (d.depth > 0 && d.children) {
                        d._children = d.children;
                        d.children = null;
                    }
                    if (d.children) {
                        d.children.forEach(collapseAll);
                    }
                }
                
                collapseAll(root);
                updateChart();
            });

            document.getElementById("zoom-in").addEventListener("click", function() {
                svg.transition().call(zoom.scaleBy, 1.3);
            });
            
            document.getElementById("zoom-out").addEventListener("click", function() {
                svg.transition().call(zoom.scaleBy, 0.7);
            });
            
            document.getElementById("reset-view").addEventListener("click", function() {
                svg.transition()
                    .duration(750)
                    .call(zoom.transform, d3.zoomIdentity);
            });

            // 更新图表
            function updateChart(){
                treeLayout(root);
                console.log('root:', root.descendants());
                
                // 更新节点位置
                const nodeUpdate = node.data(root.descendants(), d => d.data.id)
                .transition()
                .duration(500)
                .attr("transform", d => `translate(${d.y},${d.x})`);

                // 更新连接线
                const linkUpdate = link.data(root.links(), d => d.target.id)
                .transition()
                .duration(500)
                .attr("d", d3.linkHorizontal()
                    .x(d => d.y)
                    .y(d => d.x));

                // 添加节点
                const newNode = nodeUpdate.enter().append("g")
                    .attr("class", "node")
                    .attr("transform", d => `translate(${d.parent ? d.parent.y : d.y},${d.parent ? d.parent.x : d.x})`)
                    .on("click", toggleChildren)
                    .on("mouseover", showTooltip)
                    .on("mouseout", hideTooltip)
                    .transition()
                    .duration(500)
                    .attr("transform", d => `translate(${d.y},${d.x})`);
                
                newNode.append("circle")
                    .attr("r", d => d._children ? 10 : 5);
                
                newNode.append("text")
                    .attr("dy", "0.35em")
                    .attr("x", d => d.children || d._children ? -15 : 15)
                    .attr("text-anchor", d => d.children || d._children ? "end" : "start")
                    .text(d => d.data.name);
                
                newNode.append("text")
                    .attr("dy", "1.8em")
                    .attr("x", d => d.children || d._children ? -15 : 15)
                    .attr("text-anchor", d => d.children || d._children ? "end" : "start")
                    .attr("fill", "#ffd8b1")
                    .attr("font-size", "10px")
                    .text(d => d.data.department);
                
                newNode.append("text")
                    .attr("dy", "3.1em")
                    .attr("x", d => d.children || d._children ? -15 : 15)
                    .attr("text-anchor", d => d.children || d._children ? "end" : "start")
                    .attr("fill", "#ffb38a")
                    .attr("font-size", "9px")
                    .text(d => `${d.data.employees}人`);

                // 移除折叠的节点
                nodeUpdate.exit().remove();

                // 移除折叠的连接线
                linkUpdate.exit().remove();
            }

            // 初始化显示CEO信息
            showNodeDetails(root);
        }
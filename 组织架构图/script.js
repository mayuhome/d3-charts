
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
        root.descendants().forEach(node => {
            node._children = node.children;
            // node.children = null;
        })
        treeLayout(root);

        // 创建缩放功能
        const zoom = d3.zoom()
            .scaleExtent([0.5, 2])
            .on("zoom", e => {
                container.attr("transform", e.transform);
            });

        // 应用缩放
        svg.call(zoom);

        console.log('links:', root.links());
        

        // 2. 添加连接线
        const link = container.append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(root.links())
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))
                .style('display', d => isLinkVisible(d) ? 'block' : 'none');
        
        // 3. 添加节点并创建点击事件
        const node = container.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .on("click", (e,d) => {
                toggleNode(d);
                updateTree();
                showNodeDetails(d);
            })
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

        // 4. 切换节点展开/收起
        function toggleNode(node) {
            console.log('toggleNode:', node);
            
            if(node.children){
                // 收起子节点
                node._children = node.children;
                node.children = null;
            } else if(node._children){
                // 展开子节点
                node.children = node._children;
                node._children = null;
            }
        }

        // 5. 判断节点状态
        function isNodeVisible(node) {            
            // 根节点始终可见
            if (node.depth === 0) {
                return true;
            }
            // 如果节点是折叠状态，则不显示
            let ancestor = node.parent;
            while (ancestor) {
                if(!ancestor.children){
                    return false; // 有祖先折叠
                }
                ancestor = ancestor.parent;
            }
            return true;
        }

        // 6. 判断连线是否可见
        function isLinkVisible(link) {          
            const source = link.source;
            const target = link.target;
            return isNodeVisible(source) && isNodeVisible(target);
        }

        // 7. 更新树
        function updateTree() {
            // 更新树布局
            treeLayout(root);
            // 更新节点位置
            node.transition()
            .duration(500)
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .style('display', d => isNodeVisible(d) ? 'block' : 'none');
            // 更新连接线
            link
            .transition()
            .duration(500)
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))
            .style('display', d => isLinkVisible(d) ? 'block' : 'none');
            
        }
    
        // 显示提示框
        function showTooltip(event, d) {           
            
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
                updateTree();
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
                updateTree();
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


        }

        // 初始化显示CEO信息
        showNodeDetails(root);

        
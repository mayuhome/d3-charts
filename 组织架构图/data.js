// 组织架构数据
export const companyData = {
    id: "root",
    name: "CEO: 张明远",
    department: "管理层",
    employees: 1,
    budget: "¥15,000,000",
    team: ["张明远"],
    children: [
        {
            id: "tech",
            name: "CTO: 李思源",
            department: "技术研发部",
            employees: 85,
            budget: "¥8,200,000",
            team: ["李思源", "王天宇", "赵晓雯"],
            children: [
                {
                    id: "frontend",
                    name: "刘浩然",
                    department: "前端开发部",
                    employees: 25,
                    budget: "¥2,500,000",
                    team: ["刘浩然", "陈小云", "张宇航", "李思琪", "王博文"],
                },
                {
                    id: "backend",
                    name: "陈志强",
                    department: "后端开发部",
                    employees: 30,
                    budget: "¥3,000,000",
                    team: ["陈志强", "林晓峰", "黄俊杰", "吴雅婷", "郑浩然"],
                },
                {
                    id: "qa",
                    name: "王雪梅",
                    department: "质量保障部",
                    employees: 15,
                    budget: "¥1,500,000",
                    team: ["王雪梅", "周文博", "徐天宇", "孙雨桐"],
                },
                {
                    id: "devops",
                    name: "赵天宇",
                    department: "DevOps部",
                    employees: 15,
                    budget: "¥1,200,000",
                    team: ["赵天宇", "钱晓明", "孙小雅", "李思源"],
                }
            ]
        },
        {
            id: "marketing",
            name: "CMO: 王丽娜",
            department: "市场营销部",
            employees: 42,
            budget: "¥5,500,000",
            team: ["王丽娜", "张天宇", "李晓雯"],
            children: [
                {
                    id: "digital",
                    name: "孙志强",
                    department: "数字营销部",
                    employees: 18,
                    budget: "¥2,200,000",
                    team: ["孙志强", "周小雅", "吴文博", "郑晓雯"],
                },
                {
                    id: "brand",
                    name: "周浩然",
                    department: "品牌公关部",
                    employees: 12,
                    budget: "¥1,800,000",
                    team: ["周浩然", "王思琪", "赵宇航", "钱小云"],
                },
                {
                    id: "analysis",
                    name: "吴雅琴",
                    department: "市场分析部",
                    employees: 12,
                    budget: "¥1,500,000",
                    team: ["吴雅琴", "孙文博", "李晓峰", "陈天宇"],
                }
            ]
        },
        {
            id: "finance",
            name: "CFO: 陈天明",
            department: "财务行政部",
            employees: 28,
            budget: "¥3,800,000",
            team: ["陈天明", "赵小云", "黄文博"],
            children: [
                {
                    id: "accounting",
                    name: "郑晓峰",
                    department: "财务部",
                    employees: 12,
                    budget: "¥1,800,000",
                    team: ["郑晓峰", "王雅婷", "周宇航", "李思源"],
                },
                {
                    id: "hr",
                    name: "林雨桐",
                    department: "人力资源部",
                    employees: 10,
                    budget: "¥1,500,000",
                    team: ["林雨桐", "张天宇", "钱小雯", "黄俊杰"],
                },
                {
                    id: "admin",
                    name: "徐志强",
                    department: "行政管理部",
                    employees: 6,
                    budget: "¥500,000",
                    team: ["徐志强", "孙晓雯", "吴文博"],
                }
            ]
        },
        {
            id: "operations",
            name: "COO: 刘伟",
            department: "产品运营部",
            employees: 38,
            budget: "¥4,500,000",
            team: ["刘伟", "李晓峰", "赵雨桐"],
            children: [
                {
                    id: "product",
                    name: "黄小云",
                    department: "产品管理部",
                    employees: 15,
                    budget: "¥2,000,000",
                    team: ["黄小云", "周天宇", "郑文博", "王思琪"],
                },
                {
                    id: "customer",
                    name: "钱浩然",
                    department: "客户成功部",
                    employees: 15,
                    budget: "¥1,800,000",
                    team: ["钱浩然", "孙雅婷", "李文博", "张宇航"],
                },
                {
                    id: "support",
                    name: "张晓雯",
                    department: "运营支持部",
                    employees: 8,
                    budget: "¥700,000",
                    team: ["张晓雯", "陈天宇", "吴小峰"],
                }
            ]
        }
    ]
};

// 部门颜色映射
export const deptColors = {
    "管理层": "#ff7e5f",
    "技术研发部": "#00c9ff",
    "前端开发部": "#00f2fe",
    "后端开发部": "#00d2ff",
    "质量保障部": "#5ee7df",
    "DevOps部": "#96e6a1",
    "市场营销部": "#f6d365",
    "数字营销部": "#fda085",
    "品牌公关部": "#fbc2eb",
    "市场分析部": "#ff9a9e",
    "财务行政部": "#a6c1ee",
    "财务部": "#d4fc79",
    "人力资源部": "#a1c4fd",
    "行政管理部": "#c2e9fb",
    "产品运营部": "#cd9cf2",
    "产品管理部": "#f093fb",
    "客户成功部": "#f5576c",
    "运营支持部": "#f093fb"
};

// export default {companyData, deptColors };
# TreeUtil

Javascript 树处理工具

## TODO

-   扁平化树数据 flattenTreeData

## 使用

```js
import TreeUtil from '@babe0806/tree-utils';
```

## API

### TreeUtil.parseTreeData

> 解析树数据

```ts
interface TreeNode {
    [key: string]: any;
    children?: TreeNode[];
}

interface ParseTreeOption {
    // 指定子节点字段，默认读取 children
    children?: string;
    // 自定义节点数据，返回一个新的节点数据
    renderNode?: (node: TreeNode) => TreeNode;
    // 过滤节点数据，返回true or false
    filterNode?: (node: TreeNode) => boolean;
}

parseTreeData(treeData: TreeNode[], options: ParseTreeOption)
```

#### 子节点处理默认为 children，若数据子节点字段不为 children，可通过[options.children]设置

```js
const treeData = [
    {
        id: 1,
        label: '一级 1',
        child: [
            {
                id: 11,
                label: '二级 1-1',
                child: [
                    {
                        id: 111,
                        label: '三级 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: '一级 2',
        child: [
            {
                id: 21,
                label: '二级 2-1',
                child: [
                    {
                        id: 211,
                        label: '三级 2-1-1',
                    },
                ],
            },
        ],
    },
];

TreeUtil.parseTreeData(treeData, { children: 'child' });

// 返回结果
[
    {
        id: 1,
        label: '一级 1',
        children: [
            {
                id: 11,
                label: '二级 1-1',
                children: [
                    {
                        id: 111,
                        label: '三级 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: '一级 2',
        children: [
            {
                id: 21,
                label: '二级 2-1',
                children: [
                    {
                        id: 211,
                        label: '三级 2-1-1',
                    },
                ],
            },
        ],
    },
];
```

#### 使用 renderNode 自定义节点数据

```js
const treeData = [
    {
        id: 1,
        label: '一级 1',
        children: [
            {
                id: 11,
                label: '二级 1-1',
                children: [
                    {
                        id: 111,
                        label: '三级 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: '一级 2',
        children: [
            {
                id: 21,
                label: '二级 2-1',
                children: [
                    {
                        id: 211,
                        label: '三级 2-1-1',
                    },
                ],
            },
        ],
    },
];
TreeUtil.parseTreeData(treeData, {
    renderNode(node) {
        const { id, ...rest } = node;
        return {
            key: id,
            ...rest,
        };
    },
});

// 返回结果
[
    {
        key: 1,
        label: '一级 1',
        children: [
            {
                key: 11,
                label: '二级 1-1',
                children: [
                    {
                        key: 111,
                        label: '三级 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        label: '一级 2',
        children: [
            {
                key: 21,
                label: '二级 2-1',
                children: [
                    {
                        key: 211,
                        label: '三级 2-1-1',
                    },
                ],
            },
        ],
    },
];
```

#### 使用 filterNode 过滤数据

```js
const originalData = [
    {
        nodeType: 'dept',
        title: '公司',
        children: [
            {
                nodeType: 'dept',
                title: '部门一',
                children: [
                    {
                        nodeType: 'car',
                        carCode: 'N1-123',
                        online: 0,
                    },
                ],
            },
            {
                nodeType: 'dept',
                title: '部门二',
                children: [
                    {
                        nodeType: 'car',
                        carCode: 'N2-123',
                        online: 0,
                    },
                    {
                        nodeType: 'car',
                        carCode: 'N2-124',
                        online: 1,
                    },
                ],
            },
            {
                nodeType: 'dept',
                title: '部门三',
            },
        ],
    },
];

TreeUtil.parseTreeData(originalData, {
    filterNode(node) {
        return node.nodeType === 'car' && node.online === 1;
    },
});

// 返回结果
[
    {
        nodeType: 'dept',
        title: '公司',
        children: [
            {
                nodeType: 'dept',
                title: '部门二',
                children: [
                    {
                        nodeType: 'car',
                        carCode: 'N2-124',
                        online: 1,
                    },
                ],
            },
        ],
    },
];
```

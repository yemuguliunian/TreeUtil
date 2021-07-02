import assert from 'power-assert';
import TreeUtil from '../src/index';

describe('parseTreeData', () => {
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
                {
                    id: 22,
                    label: '二级 2-2',
                    children: [
                        {
                            id: 221,
                            label: '三级 2-2-1',
                        },
                    ],
                },
            ],
        },
    ];

    it('子节点数据字段为 children', () => {
        assert.deepEqual(TreeUtil.parseTreeData(treeData), treeData);
    });

    it('options.children 设置为 child', () => {
        const treeData1 = [
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
                    {
                        id: 22,
                        label: '二级 2-2',
                        child: [
                            {
                                id: 221,
                                label: '三级 2-2-1',
                            },
                        ],
                    },
                ],
            },
        ];
        assert.deepEqual(TreeUtil.parseTreeData(treeData1, { children: 'child' }), treeData);
    });

    it('使用 renderNode 处理 node 节点数据', () => {
        const parsedTreeData = [
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
                    {
                        key: 22,
                        label: '二级 2-2',
                        children: [
                            {
                                key: 221,
                                label: '三级 2-2-1',
                            },
                        ],
                    },
                ],
            },
        ];
        assert.deepEqual(
            TreeUtil.parseTreeData(treeData, {
                renderNode(node) {
                    const { id, ...rest } = node;
                    return {
                        key: id,
                        ...rest,
                    };
                },
            }),
            parsedTreeData,
        );
    });

    it('使用 filterNode 刷选节点数据', () => {
        assert.deepEqual(
            TreeUtil.parseTreeData(treeData, {
                renderNode(node) {
                    const { id, ...rest } = node;
                    return {
                        key: id,
                        ...rest,
                    };
                },
                filterNode(node) {
                    return node.label.includes('1-1');
                },
            }),
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
            ],
        );

        // 原始数据
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

        assert.deepEqual(
            TreeUtil.parseTreeData(originalData, {
                filterNode(node) {
                    return node.nodeType === 'car' && node.online === 1;
                },
            }),
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
            ],
        );
    });
});

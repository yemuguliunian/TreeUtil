import assert from 'power-assert';
import TreeUtil from '../src/index';

describe('parseTree', () => {
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
        assert.deepEqual(TreeUtil.parseTree(treeData), treeData);
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
        assert.deepEqual(TreeUtil.parseTree(treeData1, { children: 'child' }), treeData);
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
            TreeUtil.parseTree(treeData, {
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
        const filteredTreeData = [
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
        assert.deepEqual(
            TreeUtil.parseTree(treeData, {
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
            filteredTreeData,
        );
    });
});

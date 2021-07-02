interface TreeNode {
    [key: string]: any;
    children?: TreeNode[];
}

interface ParseTreeOption {
    children?: string;
    renderNode?: (node: TreeNode) => TreeNode;
    filterNode?: (node: TreeNode) => boolean;
}

/**
 * 验证子级数据不为空数据
 * @param {Array} child 子节点数据
 */
function isNotEmpty(child: any): boolean {
    return Array.isArray(child) && child.length > 0;
}

// 默认子节点字段是 children
const DEFAULT_CHILDREN_FIELD = 'children';

/**
 * 解析树形数据
 * @param {Array} treeData 树结构数据
 * @param {Object} options 选项
 * @param {String} [options.children] 指定子节点字段，默认读取 children
 * @param {Function} [options.renderNode] 自定义节点数据，返回一个新的节点数据
 * @param {Function} [options.filterNode] 过滤节点数据，返回true or false
 */
export function parseTreeData(
    treeData: TreeNode[] = [],
    options: ParseTreeOption = {},
): TreeNode[] {
    const { children = DEFAULT_CHILDREN_FIELD, renderNode, filterNode } = options;
    function dig(list: TreeNode[]): TreeNode[] {
        const array = [];
        for (let i = 0, len = list.length; i < len; i += 1) {
            const item = list[i];
            // 若存在 renderNode，则取自定义节点内的和数据
            const node = renderNode ? renderNode(item) : item;
            let nodeClone = { ...node };
            // 如果节点内存在子节点[children]，则使用最统一子节点字段children处理
            if (children in item) {
                // 如果子节点数据字段不为children,则删除子节点字段数据
                if (children !== DEFAULT_CHILDREN_FIELD) {
                    delete nodeClone[children];
                }
                const child = item[children];
                nodeClone = {
                    ...nodeClone,
                    children: isNotEmpty(child) ? dig(child) : child,
                };
            }
            if (filterNode) {
                // 若存在 filterNode 则走此处逻辑
                // filterNode(node) 返回 true，表示当前节点显示，false为不显示
                // 两种情况下当前节点显示。第一种，filterNode(node)返回true；第二种，子节点存在数据
                if (filterNode(node) || isNotEmpty(nodeClone.children)) {
                    array.push(nodeClone);
                }
            } else {
                array.push(nodeClone);
            }
        }
        return array;
    }
    return dig(treeData);
}

export default {
    parseTreeData,
};

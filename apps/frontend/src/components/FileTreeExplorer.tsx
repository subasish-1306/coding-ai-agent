import React, { useState } from 'react';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown, HardDrive } from 'lucide-react';
import { FileInfo } from '../types/scanner';

interface FileTreeExplorerProps {
  files: FileInfo[];
}

interface TreeNode {
  name: string;
  path: string;
  isFolder: boolean;
  size?: number;
  children: Record<string, TreeNode>;
}

export const FileTreeExplorer: React.FC<FileTreeExplorerProps> = ({ files }) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({ root: true });

  // Build tree hierarchy from relative paths
  const rootNode: TreeNode = {
    name: 'root',
    path: 'root',
    isFolder: true,
    children: {},
  };

  files.forEach((file) => {
    const parts = file.relative_path.split('/');
    let current = rootNode;

    parts.forEach((part, idx) => {
      const isLast = idx === parts.length - 1;
      const nodePath = parts.slice(0, idx + 1).join('/');

      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          path: nodePath,
          isFolder: !isLast,
          size: isLast ? file.size_bytes : undefined,
          children: {},
        };
      }
      current = current.children[part];
    });
  });

  const toggleExpand = (path: string) => {
    setExpandedNodes((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTree = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedNodes[node.path] ?? depth === 0;
    const sortedChildren = Object.values(node.children).sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    });

    return (
      <div key={node.path} style={{ paddingLeft: depth > 0 ? `${depth * 12}px` : 0 }}>
        {depth > 0 && (
          <div
            onClick={() => node.isFolder && toggleExpand(node.path)}
            className={`flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs cursor-pointer select-none transition-colors ${
              node.isFolder ? 'hover:bg-slate-800/80 text-slate-200' : 'hover:bg-slate-800/40 text-slate-300'
            }`}
          >
            {node.isFolder ? (
              <>
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
                {isExpanded ? (
                  <FolderOpen className="w-4 h-4 text-sky-400 shrink-0" />
                ) : (
                  <Folder className="w-4 h-4 text-sky-400 shrink-0" />
                )}
                <span className="font-semibold text-sky-200">{node.name}</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-3.5" />
                <span className="font-mono">{node.name}</span>
                {node.size !== undefined && (
                  <span className="ml-auto text-[10px] text-slate-500 font-mono">
                    {(node.size / 1024).toFixed(1)} KB
                  </span>
                )}
              </>
            )}
          </div>
        )}

        {node.isFolder && (isExpanded || depth === 0) && (
          <div className="space-y-0.5">
            {sortedChildren.map((child) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-sky-400" />
              <span>Interactive Repository File Tree</span>
            </h3>
            <p className="text-xs text-slate-400">Browse extracted repository directory hierarchy</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono">
            {files.length} total files
          </span>
        </div>

        <div className="max-h-96 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
          {renderTree(rootNode)}
        </div>
      </div>
    </div>
  );
};

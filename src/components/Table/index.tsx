import React from "react";
import "./style/index.less";

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: React.ReactNode;
  dataIndex?: keyof T | string;
  width?: number | string;
  ellipsis?: boolean;
  sortable?: boolean;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
}

export interface TableProps<T = Record<string, unknown>> {
  columns?: TableColumn<T>[];
  dataSource?: T[];
  rowKey?: string | ((record: T, index: number) => string);
  size?: "small" | "medium";
  bordered?: boolean;
  striped?: boolean;
  glow?: boolean;
  loading?: boolean;
  hoverable?: boolean;
  rowSelection?: {
    selectedRowKeys?: (string | number)[];
    onChange?: (selectedRowKeys: (string | number)[]) => void;
  };
  onRow?: (record: T, index: number) => {
    onClick?: () => void;
    className?: string;
  };
  emptyText?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function getKey<T>(record: T, index: number, rowKey?: string | ((r: T, i: number) => string)): string {
  if (typeof rowKey === "function") return rowKey(record, index);
  if (typeof rowKey === "string" && record && typeof record === "object" && rowKey in record) {
    return String((record as Record<string, unknown>)[rowKey]);
  }
  return String(index);
}

function getValue<T>(record: T, col: TableColumn<T>): unknown {
  if (col.dataIndex === undefined) return undefined;
  const key = col.dataIndex as string;
  if (record && typeof record === "object" && key in record) {
    return (record as Record<string, unknown>)[key];
  }
  return undefined;
}

const SortArrow: React.FC<{ active?: boolean; direction?: "asc" | "desc" }> = ({
  active,
  direction,
}) => (
  <span className={`sort-icon ${active ? "sort-active" : ""}`}>
    {direction === "asc" ? " ▲" : direction === "desc" ? " ▼" : " ⇅"}
  </span>
);

function TableInner<T extends Record<string, unknown>>(
  props: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>,
) {
  const {
    columns = [],
    dataSource = [],
    rowKey,
    size = "medium",
    bordered = false,
    striped = false,
    glow = false,
    loading = false,
    rowSelection,
    onRow,
    emptyText = "— 无数据 —",
    className = "",
    style,
  } = props;

  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable) return;
    const key = col.key;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return dataSource;
    const col = columns.find((c) => c.key === sortKey);
    return [...dataSource].sort((a, b) => {
      const va = col ? getValue(a, col) : undefined;
      const vb = col ? getValue(b, col) : undefined;
      if (va == null) return 1;
      if (vb == null) return -1;
      const cmp = String(va).localeCompare(String(vb), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [dataSource, sortKey, sortDir, columns]);

  const isSelected = (record: T, index: number) => {
    if (!rowSelection?.selectedRowKeys) return false;
    const key = getKey(record, index, rowKey);
    return rowSelection.selectedRowKeys.includes(key);
  };

  const classes = [
    "cyberpunk-table",
    size === "small" ? "table-sm" : "",
    bordered ? "table-bordered" : "",
    striped ? "table-striped" : "",
    glow ? "table-glow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="cyberpunk-table-wrapper">
      <table ref={ref} className={classes} style={style}>
        <thead>
          <tr className="table-header-row">
            {columns.map((col) => {
              const sortActive = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  className={`table-header-cell ${col.sortable ? "cell-sortable" : ""}`}
                  style={{ width: col.width, textAlign: col.align ?? "left" }}
                  onClick={() => handleSort(col)}
                >
                  {col.title}
                  {col.sortable && (
                    <SortArrow active={sortActive} direction={sortActive ? sortDir : undefined} />
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr className="table-empty">
              <td colSpan={columns.length} className="table-empty-cell">
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((record, i) => {
              const rowProps = onRow?.(record, i) ?? {};
              return (
                <tr
                  key={getKey(record, i, rowKey)}
                  className={`table-row ${rowProps.onClick ? "row-clickable" : ""} ${isSelected(record, i) ? "row-selected" : ""} ${rowProps.className ?? ""}`}
                  onClick={rowProps.onClick}
                >
                  {columns.map((col) => {
                    const val = getValue(record, col);
                    const content = col.render
                      ? col.render(val, record, i)
                      : val != null
                        ? String(val)
                        : "—";
                    return (
                      <td
                        key={col.key}
                        className={`table-cell ${col.ellipsis ? "cell-ellipsis" : ""}`}
                        style={{ textAlign: col.align ?? "left" }}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {loading && <div className="table-loading-overlay" />}
    </div>
  );
}

const Table = React.forwardRef(TableInner) as <T extends Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> },
) => ReturnType<typeof TableInner>;

export default Table;

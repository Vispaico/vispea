import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

export function StorePagination({ currentPage, totalPages, basePath = "/shop" }: Props) {
  if (totalPages <= 1) {
    return null;
  }

  const createHref = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((page) => {
    if (totalPages <= 7) return true;

    if (page === 1 || page === totalPages) return true;
    if (Math.abs(page - currentPage) <= 1) return true;
    if (currentPage <= 3 && page <= 4) return true;
    if (currentPage >= totalPages - 2 && page >= totalPages - 3) return true;
    return false;
  });

  const condensedPages = [] as Array<number | "ellipsis">;
  let last = 0;
  for (const page of pages) {
    if (last && page - last > 1) {
      condensedPages.push("ellipsis");
    }
    condensedPages.push(page);
    last = page;
  }

  return (
    <nav className="flex items-center justify-between gap-4" aria-label="Product pagination">
      <Link
        href={createHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:border-slate-300 hover:text-slate-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
      >
        Previous
      </Link>

      <div className="flex items-center gap-2 text-sm font-medium">
        {condensedPages.map((entry, index) =>
          entry === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
              …
            </span>
          ) : (
            <Link
              key={entry}
              href={createHref(entry)}
              aria-current={entry === currentPage ? "page" : undefined}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 transition ${
                entry === currentPage
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "border border-transparent text-slate-600 hover:border-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
              }`}
            >
              {entry}
            </Link>
          ),
        )}
      </div>

      <Link
        href={createHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:border-slate-300 hover:text-slate-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
      >
        Next
      </Link>
    </nav>
  );
}

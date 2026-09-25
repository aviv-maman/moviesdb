"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/react";

interface PaginationCustomProps {
  page?: number;
  total: number;
  className?: string;
}
export default function PaginationCustom({ page = 1, total, className }: PaginationCustomProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const href = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(value));
    return `${pathname}?${params.toString()}`;
  };
  const pages = Array.from(
    new Set([1, ...Array.from({ length: 5 }, (_, i) => page + i - 2).filter((n) => n > 1 && n < total), total]),
  )
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  return (
    <Pagination className={className} aria-label="Results pages">
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous onPress={() => router.push(href(Math.max(1, page - 1)))} isDisabled={page <= 1}>
            <Pagination.PreviousIcon />
            Previous
          </Pagination.Previous>
        </Pagination.Item>
        {pages.map((n, i) => (
          <Pagination.Item key={n}>
            {i > 0 && n > pages[i - 1] + 1 ? <Pagination.Ellipsis /> : null}
            <Pagination.Link onPress={() => router.push(href(n))} isActive={n === page}>
              {n}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next onPress={() => router.push(href(Math.min(total, page + 1)))} isDisabled={page >= total}>
            Next
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}

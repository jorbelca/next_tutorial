import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchUnpaidInvoices } from "@/app/lib/data";
import { Metadata } from "next";
import Image from "next/image";
import { formatDateToLocal } from "@/app/lib/utils";

export const metadata: Metadata = {
  title: "Unpaid Invoices",
};

export default async function Page() {
  const invoices = await fetchUnpaidInvoices();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Unpaid Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8"></div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Customer
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {invoices?.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={invoice.image_url}
                            className="rounded-full"
                            width={28}
                            height={28}
                            alt={`${invoice.name}'s profile picture`}
                          />
                          <p>{invoice.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {invoice.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {invoice.amount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatDateToLocal(invoice.date)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-red-500 font-bold">
                        {invoice.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
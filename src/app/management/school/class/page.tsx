"use client";

import DataTable from "@minhaescola/components/ui/datatable";
import Layout from "@minhaescola/components/ui/layout";

export default function Page() {
    return (
        <Layout>
            <DataTable rows={[
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '2',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '3',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '4',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },

                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },

                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },
                {
                    code: '1',
                    description: "sadasda",
                    title: "asdfdfsd"
                },

            ]} columns={[
                {
                    data: 'code',
                    column: "Code",
                    isHeader: true,
                    filter(data, row) {
                        return data
                    }
                },
                {
                    data: 'description',
                    column: "Description",
                    isHeader: true,
                    filter(data, row) {
                        return data
                    }
                },
                {
                    data: 'title',
                    column: "Title",
                    isHeader: true,
                    filter(data, row) {
                        return data
                    }
                }
            ]} />
        </Layout>
    )
}
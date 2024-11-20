export default async function BlogDetail({
    params,
}: {
    params: Promise<{ blogId: string }>
}) {
    const blogId = (await params).blogId
    return <div>My Post: {blogId}</div>
}
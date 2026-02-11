export default function Layout({ childern }) {
    return (
        <>
            <div className="w-full min-h-screen bg-gray-100 flex font-sans">
                {childern}
            </div>
        </>
    )
}
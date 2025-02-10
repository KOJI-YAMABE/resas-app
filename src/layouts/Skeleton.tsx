export function Skeleton() {
    return (
        <div className="animate-pulse p-4 mt-8">
            <div className="h-8 bg-gray-200 rounded w-1/6 mb-6"></div>
            <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-18 bg-gray-100 rounded w-3/4"></div>
                ))}
            </div>
        </div>
    )
}

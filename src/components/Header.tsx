import { GiReceiveMoney } from 'react-icons/gi'

function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-2">
                    <GiReceiveMoney className="h-8 w-8 text-gray-900" />
                    <h1 className="text-2xl font-bold text-gray-900">地方税可視化</h1>
                </div>
            </div>
        </header>
    )
}
export default Header

import { GiReceiveMoney } from 'react-icons/gi'
import SelectPrefecture from './components/SelectPrefecture'

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2">
                        <GiReceiveMoney className="h-8 w-8 text-gray-900" />
                        <h1 className="text-2xl font-bold text-gray-900">地方税収入可視化</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:col-span-2 space-y-8">
                    <SelectPrefecture />
                </div>
            </main>
        </div>
    )
}

export default App

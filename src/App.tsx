import SelectPrefecture from './components/SelectPrefecture'
import MunicipalityTaxesLineChart from './components/MunicipalityTaxesLineChart'
import Header from './components/Header'

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-16">
                <div className="lg:col-span-2 space-y-8">
                    <SelectPrefecture />
                    <MunicipalityTaxesLineChart />
                </div>
            </main>
        </div>
    )
}

export default App

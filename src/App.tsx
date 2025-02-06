// 例: src/App.tsx
import React from 'react'
import { Button } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

const data = [
    { name: 'Page A', uv: 400 },
    { name: 'Page B', uv: 300 },
    { name: 'Page C', uv: 200 },
]

function App() {
    return (
        <div className="p-4">
            <Button variant="contained" color="primary">
                MUI Button
            </Button>
            <BarChart width={300} height={200} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
        </div>
    )
}

export default App

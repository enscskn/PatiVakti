import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Dashboard />
      </main>
      <Analytics />
    </div>
  );
}

export default App;
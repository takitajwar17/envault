import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Analytics from "./components/Analytics";
import AuditLog from "./components/AuditLog";
import Dashboard from "./components/Dashboard";
import EnvEditor from "./components/EnvEditor";
import Header from "./components/Header";
import RepoList from "./components/RepoList";
import Sidebar from "./components/Sidebar";
import { EnvProvider } from "./context/EnvContext";
import { ThemeProvider } from "./context/ThemeContext";
// import TeamSettings from './components/TeamSettings';
// import Integrations from './components/Integrations';
// import PricingPlans from './components/PricingPlans';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <EnvProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/repositories"
                    element={
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-3">
                          <RepoList />
                        </div>
                        <div className="col-span-12 lg:col-span-9 space-y-6">
                          <EnvEditor />
                          <AuditLog />
                        </div>
                      </div>
                    }
                  />
                  <Route path="/analytics" element={<Analytics />} />
                  {/* <Route path="/team" element={<TeamSettings />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/pricing" element={<PricingPlans />} /> */}
                </Routes>
              </main>
            </div>
          </div>
        </EnvProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

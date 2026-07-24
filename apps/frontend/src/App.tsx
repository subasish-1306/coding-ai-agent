import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UploadDropzone } from './components/UploadDropzone';
import { LandingFeatures } from './components/LandingFeatures';
import { WorkflowSection } from './components/WorkflowSection';
import { AnalyzingLoader } from './components/AnalyzingLoader';
import { Dashboard } from './components/Dashboard';
import { uploadRepositoryZip } from './api/client';
import { ScanResponse } from './types/scanner';

function App() {
  const [status, setStatus] = useState<'landing' | 'analyzing' | 'dashboard'>('landing');
  const [progress, setProgress] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (file: File) => {
    setStatus('analyzing');
    setProgress(15);
    setError(null);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 15;
        });
      }, 300);

      const result = await uploadRepositoryZip(file, (percent) => {
        setProgress(Math.max(percent, 30));
      });

      clearInterval(interval);
      setProgress(100);
      setScanResult(result);

      setTimeout(() => {
        setStatus('dashboard');
      }, 500);
    } catch (err: any) {
      console.error('Scan error:', err);
      setError(err?.response?.data?.detail || err?.message || 'Failed to upload and scan repository archive.');
      setStatus('landing');
    }
  };

  const handleReset = () => {
    setScanResult(null);
    setStatus('landing');
    setProgress(0);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      <Navbar hasScanResult={!!scanResult} onReset={handleReset} />

      <main>
        {status === 'landing' && (
          <div className="space-y-4">
            <Hero />
            <UploadDropzone onFileSelected={handleFileSelected} error={error} />
            <LandingFeatures />
            <WorkflowSection />
          </div>
        )}

        {status === 'analyzing' && <AnalyzingLoader progressPercent={progress} />}

        {status === 'dashboard' && scanResult && <Dashboard data={scanResult} />}
      </main>

      <footer className="mt-16 py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 Coding AI Agent • AI Code Intelligence Platform</p>
      </footer>
    </div>
  );
}

export default App;
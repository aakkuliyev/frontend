import React, { useState } from 'react';
import { FileText, ListChecks } from 'lucide-react';
import './CSS/ReportPage.css';

// Helper for fetch with JWT
function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('token');
    return fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
}

const ReportPage = () => {
    const [loadingFull, setLoadingFull] = useState(false);
    const [loadingSummary, setLoadingSummary] = useState(false);

    const downloadReport = async (endpoint, setLoading) => {
        try {
            setLoading(true);
            const response = await fetchWithToken(endpoint, { method: 'GET' });
            if (!response.ok) throw new Error(`Error ${response.status}`);
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = endpoint.includes('summary')
                ? 'teachers_summary.xlsx'
                : 'teachers_full.xlsx';
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error(err);
            alert('Failed to download report');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-page">
            <div className="report-card">
                <h1>Teacher Reports</h1>
                <p className="report-description">
                    Select the report type to download:
                </p>
                <div className="report-options">
                    <div className="report-option">
                        <FileText size={48} className="report-icon" />
                        <h2>Full Report</h2>
                        <p>Includes all fields for each teacher</p>
                        <button
                            className="report-button"
                            disabled={loadingFull}
                            onClick={() =>
                                downloadReport('/api/v1/reports/teachers', setLoadingFull)
                            }
                        >
                            {loadingFull ? 'Loading...' : 'Download'}
                        </button>
                    </div>
                    <div className="report-option">
                        <ListChecks size={48} className="report-icon" />
                        <h2>Summary Report</h2>
                        <p>Key teacher data only</p>
                        <button
                            className="report-button"
                            disabled={loadingSummary}
                            onClick={() =>
                                downloadReport(
                                    '/api/v1/reports/teachers/summary',
                                    setLoadingSummary
                                )
                            }
                        >
                            {loadingSummary ? 'Loading...' : 'Download'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportPage;

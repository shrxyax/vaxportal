import React, { useState } from 'react';
import { Calendar, FileText, Check, Download, Share2 } from 'lucide-react';
import './Certificates.css';

const Certificates = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const certificates = [
    {
      id: 1,
      type: 'COVID-19 Vaccination',
      manufacturer: 'Pfizer-BioNTech',
      completionDate: 'March 20, 2025',
      doses: '2/2',
      certificateId: 'VAX-COVID-123456',
      category: 'covid19',
      verified: true
    },
    {
      id: 2,
      type: 'Tetanus Vaccination',
      manufacturer: 'Tdap',
      completionDate: 'March 20, 2025',
      doses: '1/1',
      certificateId: 'VAX-TETANUS-789012',
      category: 'other',
      verified: true
    },
    {
      id: 3,
      type: 'Hepatitis B Vaccination',
      manufacturer: 'Engerix-B',
      completionDate: 'February 15, 2025',
      doses: '3/3',
      certificateId: 'VAX-HEPB-345678',
      category: 'other',
      verified: true
    }
  ];

  const filteredCertificates = certificates.filter(certificate => {
    if (activeTab === 'all') return true;
    if (activeTab === 'covid19' && certificate.category === 'covid19') return true;
    if (activeTab === 'other' && certificate.category === 'other') return true;
    return false;
  });

  const handleDownload = (certificateId) => {
    console.log(`Downloading certificate: ${certificateId}`);
    // Implement certificate download logic
  };

  const handleShare = (certificateId) => {
    console.log(`Sharing certificate: ${certificateId}`);
    // Implement certificate sharing logic
  };

  const handleView = (certificateId) => {
    console.log(`Viewing certificate: ${certificateId}`);
    // Implement certificate viewing logic
  };

  return (
    <div className="certificates-page">
      <div className="certificates-container">
        <div className="certificates-header">
          <h1 className="certificates-title">Vaccination Certificates</h1>
          <p className="certificates-subtitle">View and download your vaccination certificates</p>
        </div>

        <div className="certificates-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Certificates
          </button>
          <button 
            className={`tab-btn ${activeTab === 'covid19' ? 'active' : ''}`}
            onClick={() => setActiveTab('covid19')}
          >
            COVID-19
          </button>
          <button 
            className={`tab-btn ${activeTab === 'other' ? 'active' : ''}`}
            onClick={() => setActiveTab('other')}
          >
            Other Vaccines
          </button>
        </div>

        <div className="certificates-list">
          {filteredCertificates.map(certificate => (
            <div key={certificate.id} className="certificate-card">
              <div className="certificate-left">
                <div className="certificate-icon">
                  <FileText size={20} color="#4CAF50" />
                </div>
                <div className="certificate-details">
                  <div className="certificate-header">
                    <h3 className="certificate-type">{certificate.type}</h3>
                    {certificate.verified && (
                      <div className="verified-badge">
                        <Check size={14} />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="certificate-manufacturer">{certificate.manufacturer}</p>
                  <div className="certificate-info">
                    <div className="info-item">
                      <Calendar size={16} />
                      <span>Completed on {certificate.completionDate}</span>
                    </div>
                    <div className="info-item">
                      <span>Doses: {certificate.doses}</span>
                    </div>
                    <div className="info-item">
                      <span>Certificate ID: {certificate.certificateId}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="certificate-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => handleView(certificate.certificateId)}
                >
                  View
                </button>
                <button 
                  className="action-btn download-btn"
                  onClick={() => handleDownload(certificate.certificateId)}
                >
                  <Download size={16} />
                  Download
                </button>
                <button 
                  className="action-btn share-btn"
                  onClick={() => handleShare(certificate.certificateId)}
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
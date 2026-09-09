An automated satellite waste detection and bio-remediation system tailored for Bengaluru (Shanthi Nagar / Double Road region). Uses computer vision to spot minor illegal landfill clusters, alerts BBMP authorities via webhook, and manages local plastic-eating worm deployment.
waste-management-system/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── models/
│       └── detector.py
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       ├── App.css
│       └── components/
│           ├── Navbar.jsx
│           ├── Dashboard.jsx
│           ├── SatelliteView.jsx
│           └── WormTracker.jsx
└── README.md

# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from models.detector import WasteDetector

app = Flask(__name__)
CORS(app)
detector = WasteDetector()

# Simulated database state for Bangalore Shanthi Nagar Zone
system_state = {
    'landfills': [
        {
            'id': 1,
            'location': 'Double Road Junction, Shanthi Nagar',
            'coords': [12.9569, 77.5946],
            'status': 'Active Dump Detected',
            'severity': 'Critical',
            'plastic_tonnes': 3.4,
            'worms_deployed': 12000,
            'digestion_rate': '78%',
            'bbmp_notified': True,
        },
        {
            'id': 2,
            'location': 'KHB Colony Inner Ring',
            'coords': [12.9592, 77.5981],
            'status': 'Processing by Bio-Worms',
            'severity': 'Moderate',
            'plastic_tonnes': 1.8,
            'worms_deployed': 8500,
            'digestion_rate': '92%',
            'bbmp_notified': True,
        },
    ],
    'alerts': [
        {
            'id': 101,
            'time': '10:14 AM',
            'msg': (
                'BBMP Zone 8 Auto-Dispatch: Satellite anomaly locked at Double'
                ' Road.'
            ),
        }
    ],
}


@app.route('/api/status', methods=['GET'])
def get_status():
  return jsonify(system_state)


@app.route('/api/scan', methods=['POST'])
def trigger_scan():
  detections = detector.process_satellite_image('dummy')
  new_alert = {
      'id': len(system_state['alerts']) + 101,
      'time': 'Just Now',
      'msg': f'Scanned region Shanthi Nagar. Detected {len(detections)} localized waste cluster(s).',
  }
  system_state['alerts'].insert(0, new_alert)
  return jsonify(
      {
          'status': 'success',
          'detections': detections,
          'alerts': system_state['alerts'],
      }
  )


@app.route('/api/deploy-worms', methods=['POST'])
def deploy_worms():
  data = request.json
  landfill_id = data.get('id')
  for lf in system_state['landfills']:
    if lf['id'] == landfill_id:
      lf['worms_deployed'] += 5000
      lf['status'] = 'Active Bio-Degradation in Progress'
  return jsonify(system_state)


if __name__ == '__main__':
  app.run(debug=True, port=5000)
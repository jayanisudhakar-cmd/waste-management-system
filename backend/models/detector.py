# backend/models/detector.py
import cv2
import numpy as np


class WasteDetector:

  def __init__(self):
    pass

  def process_satellite_image(self, image_path):
    img = cv2.imread(image_path)
    if img is None:
      # Create a synthetic grid pattern if image is missing for demo
      img = np.zeros((480, 640, 3), dtype=np.uint8)
      img[:] = (240, 240, 240)
      cv2.putText(
          img,
          'Shanthi Nagar Satellite Feed',
          (50, 50),
          cv2.FONT_HERSHEY_SIMPLEX,
          0.8,
          (50, 50, 50),
          2,
      )
      cv2.rectangle(img, (200, 150), (320, 270), (0, 140, 255), -1)

    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # Detect anomalous dump cluster colors
    mask = cv2.inRange(hsv, np.array([0, 30, 20]), np.array([35, 255, 220]))
    contours, _ = cv2.findContours(
        mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
    )

    detections = []
    for idx, c in enumerate(contours):
      area = cv2.contourArea(c)
      if area > 100:
        x, y, w, h = cv2.boundingRect(c)
        detections.append({
            'id': idx + 1,
            'box': {'x': int(x), 'y': int(y), 'w': int(w), 'h': int(h)},
            'area_sq_m': round(area * 0.75, 2),
            'severity': 'Critical' if area > 800 else 'Moderate',
        })

    return detections
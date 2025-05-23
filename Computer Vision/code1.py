import cv2
from PIL import Image
import google.generativeai as genai

API_KEY = "API_KEY HERE"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

prompt = (
    "You are an expert waste classifier."
    "Given an image, classify it as either 'biodegradable' or 'non-biodegradable'. "
    "Then, specify which of these classes it belongs to: "
    "glass, plastic, phosphorus, carbon, synthetic_clothes, brick, others. "
    "Note: (food wastes, ewastes, battery) are considered phosphorus and (leaf, wood, paper, cardboard) are considered carbon"
    "Respond in this format:\n"
    "Biodegradable or Non-biodegradable: \n"
    "<answer>\n"
    "Class: <class>"
)

cap = cv2.VideoCapture(0)
window_name = 'Waste Classifier Fullscreen'

cv2.namedWindow(window_name, cv2.WND_PROP_FULLSCREEN)
cv2.setWindowProperty(window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame to PIL Image
    image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

    # Send to Gemini 
    response = model.generate_content([prompt, image])
    result_text = response.text

    # Overlay multi-line result on frame
    y0, dy = 30, 40 
    for i, line in enumerate(result_text.split('\n')):
        y = y0 + i*dy
        cv2.putText(frame, line, (10, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)

    cv2.imshow(window_name, frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

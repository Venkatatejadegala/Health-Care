from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "ML Microservice running!"}

@app.post("/predict-food")
async def predict_food(image: dict):
    # This is a placeholder for the actual ML model.
    # It would take an image, process it, and return a food name.
    # For now, it just returns a dummy response.
    print(f"Received image for prediction: {image}")
    return {"food_name": "placeholder_food_item", "confidence": 0.95}

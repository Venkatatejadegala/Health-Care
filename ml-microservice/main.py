from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import logging
from typing import Dict, List, Optional
import base64
import io
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Health Hub ML Microservice",
    description="AI-powered food analysis and health recommendations",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {
        "message": "Health Hub ML Microservice is running!",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "ml-microservice",
        "version": "1.0.0"
    }

@app.post("/analyze-food")
async def analyze_food(image: UploadFile = File(...)):
    """
    Analyze food from uploaded image and return nutritional information
    """
    try:
        # Validate image file
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image data
        image_data = await image.read()
        
        # Process image (placeholder for actual ML model)
        # In a real implementation, this would use a trained model
        # to identify food items and extract nutritional information
        
        # Mock analysis result
        analysis_result = {
            "food_name": "Grilled Chicken Breast",
            "confidence": 0.92,
            "nutrition": {
                "calories": 165,
                "protein": 31,
                "carbs": 0,
                "fat": 3.6,
                "fiber": 0,
                "sodium": 74
            },
            "serving_size": "100g",
            "description": "Lean protein source, low in calories and fat",
            "health_benefits": [
                "High protein content",
                "Low in saturated fat",
                "Good source of B vitamins"
            ],
            "recommendations": [
                "Great choice for muscle building",
                "Pair with vegetables for a balanced meal",
                "Consider portion size for weight management"
            ]
        }
        
        logger.info(f"Food analysis completed for: {analysis_result['food_name']}")
        
        return analysis_result
        
    except Exception as e:
        logger.error(f"Error analyzing food: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to analyze food image")

@app.post("/get-health-recommendations")
async def get_health_recommendations(user_profile: Dict):
    """
    Generate personalized health recommendations based on user profile
    """
    try:
        # Validate user profile
        required_fields = ["age", "gender", "height", "weight", "activity_level", "goals"]
        for field in required_fields:
            if field not in user_profile:
                raise HTTPException(status_code=400, detail=f"Missing required field: {field}")
        
        # Mock AI recommendations (in real implementation, this would use AI/ML models)
        recommendations = [
            {
                "title": "Optimize Your Protein Intake",
                "description": f"Based on your weight of {user_profile['weight']}kg, aim for 1.2-1.6g of protein per kg of body weight daily.",
                "category": "nutrition",
                "priority": "high",
                "actionable": True,
                "estimated_impact": "high"
            },
            {
                "title": "Increase Daily Water Intake",
                "description": "Aim for 8-10 glasses of water daily to support metabolism and overall health.",
                "category": "wellness",
                "priority": "medium",
                "actionable": True,
                "estimated_impact": "medium"
            },
            {
                "title": "Establish Consistent Sleep Schedule",
                "description": "Maintain a regular sleep schedule with 7-9 hours of quality sleep for optimal recovery.",
                "category": "wellness",
                "priority": "high",
                "actionable": True,
                "estimated_impact": "high"
            }
        ]
        
        logger.info(f"Generated {len(recommendations)} recommendations for user")
        
        return {
            "recommendations": recommendations,
            "generated_at": "2024-01-15T10:30:00Z",
            "user_profile_summary": {
                "bmi": round(user_profile['weight'] / ((user_profile['height'] / 100) ** 2), 1),
                "age_group": "adult" if user_profile['age'] >= 18 else "minor",
                "activity_level": user_profile['activity_level']
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate recommendations")

@app.post("/analyze-nutrition-trends")
async def analyze_nutrition_trends(nutrition_data: List[Dict]):
    """
    Analyze nutrition trends from historical data
    """
    try:
        if not nutrition_data:
            raise HTTPException(status_code=400, detail="No nutrition data provided")
        
        # Mock trend analysis
        trends = {
            "calorie_trend": "stable",
            "protein_trend": "increasing",
            "carb_trend": "decreasing",
            "fat_trend": "stable",
            "insights": [
                "Your protein intake has increased by 15% over the last week",
                "Consider adding more complex carbohydrates for sustained energy",
                "Your overall nutrition balance is improving"
            ],
            "recommendations": [
                "Continue current protein intake levels",
                "Add more whole grains and vegetables",
                "Monitor portion sizes for optimal results"
            ]
        }
        
        logger.info("Nutrition trend analysis completed")
        
        return trends
        
    except Exception as e:
        logger.error(f"Error analyzing nutrition trends: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to analyze nutrition trends")

@app.get("/food-database/search")
async def search_food_database(query: str, limit: int = 10):
    """
    Search food database for nutritional information
    """
    try:
        if not query or len(query.strip()) < 2:
            raise HTTPException(status_code=400, detail="Query must be at least 2 characters")
        
        # Mock food database search
        mock_foods = [
            {
                "id": "1",
                "name": "Chicken Breast",
                "calories_per_100g": 165,
                "protein": 31,
                "carbs": 0,
                "fat": 3.6,
                "category": "protein"
            },
            {
                "id": "2", 
                "name": "Brown Rice",
                "calories_per_100g": 111,
                "protein": 2.6,
                "carbs": 23,
                "fat": 0.9,
                "category": "grain"
            },
            {
                "id": "3",
                "name": "Broccoli",
                "calories_per_100g": 34,
                "protein": 2.8,
                "carbs": 7,
                "fat": 0.4,
                "category": "vegetable"
            }
        ]
        
        # Filter results based on query
        filtered_foods = [food for food in mock_foods if query.lower() in food['name'].lower()]
        
        return {
            "query": query,
            "results": filtered_foods[:limit],
            "total_results": len(filtered_foods)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error searching food database: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to search food database")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

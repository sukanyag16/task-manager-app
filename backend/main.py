from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base

from routes import auth_routes
from routes import task_routes


Base.metadata.create_all(bind=engine)

print("Database Created")


app = FastAPI(
    title="Task Manager API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    auth_routes.router
)

app.include_router(
    task_routes.router
)


@app.get("/")
def home():

    return {
        "message": "Task Manager API Running"
    }
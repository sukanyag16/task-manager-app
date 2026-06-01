from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    stage: str


class TaskUpdate(BaseModel):
    title: str
    description: Optional[str] = ""
    stage: str


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    stage: str

    class Config:
        from_attributes = True
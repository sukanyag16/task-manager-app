from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import Header
from typing import Optional

from database import SessionLocal
from models import Task

from schemas import TaskCreate
from schemas import TaskUpdate

from auth import verify_token

router = APIRouter()


def get_current_user_id(authorization):

    print("AUTHORIZATION =", authorization)

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization token missing"
        )

    if authorization.startswith("Bearer "):
        token = authorization.replace(
            "Bearer ",
            ""
        )
    else:
        token = authorization

    print("TOKEN =", token)

    payload = verify_token(token)

    print("PAYLOAD =", payload)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return payload["user_id"]


@router.post("/tasks")
def create_task(
    task: TaskCreate,
    authorization: Optional[str] = Header(
        default=None,
        alias="Authorization"
    )
):

    user_id = get_current_user_id(
        authorization
    )

    db = SessionLocal()

    new_task = Task(
        title=task.title,
        description=task.description,
        stage=task.stage,
        owner_id=user_id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {
        "message": "Task created successfully",
        "task_id": new_task.id
    }


@router.get("/tasks")
def get_tasks(
    authorization: Optional[str] = Header(
        default=None,
        alias="Authorization"
    )
):

    user_id = get_current_user_id(
        authorization
    )

    db = SessionLocal()

    tasks = db.query(Task).filter(
        Task.owner_id == user_id
    ).all()

    return tasks


@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    task: TaskUpdate,
    authorization: Optional[str] = Header(
        default=None,
        alias="Authorization"
    )
):

    user_id = get_current_user_id(
        authorization
    )

    db = SessionLocal()

    existing_task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == user_id
    ).first()

    if not existing_task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    existing_task.title = task.title
    existing_task.description = task.description
    existing_task.stage = task.stage

    db.commit()

    return {
        "message": "Task updated successfully"
    }


@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    authorization: Optional[str] = Header(
        default=None,
        alias="Authorization"
    )
):

    user_id = get_current_user_id(
        authorization
    )

    db = SessionLocal()

    existing_task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == user_id
    ).first()

    if not existing_task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(existing_task)
    db.commit()

    return {
        "message": "Task deleted successfully"
    }
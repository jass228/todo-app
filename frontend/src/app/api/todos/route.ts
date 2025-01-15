import { APIResponse } from "@/types/api";
import { NextResponse } from "next/server";

const todos: APIResponse[] = [];
let nextId = 1;

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { title, description } = await request.json();

  const newTodo: APIResponse = {
    id: nextId++,
    title,
    description: description || "",
    completed: false,
    created_at: new Date(),
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const { id, completed } = await request.json();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos[index] = {
      ...todos[index],
      completed,
    };
    return NextResponse.json(todos[index]);
  }
  return NextResponse.json({ error: "Task not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Task not found" }, { status: 404 });
}

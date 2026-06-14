import { type Page, type Locator, expect } from "@playwright/test";

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly addButton: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoInput = page.getByPlaceholder("新しいタスクを入力");
    this.addButton = page.getByRole("button", { name: "追加" });
    this.todoList = page.getByRole("list");
    this.todoItems = page.getByRole("listitem");
  }

  async goto() {
    await this.page.goto("/todos");
  }

  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.addButton.click();
  }

  async getTodoCount() {
    return await this.todoItems.count();
  }

  async getTodoText(index: number) {
    return await this.todoItems.nth(index).textContent();
  }

  async deleteTodo(index: number) {
    const todoItem = this.todoItems.nth(index);
    const deleteButton = todoItem.getByRole("button", { name: "削除" });
    await deleteButton.click();
  }

  async toggleTodo(index: number) {
    const todoItem = this.todoItems.nth(index);
    const checkbox = todoItem.getByRole("checkbox");
    await checkbox.click();
  }

  async isTodoCompleted(index: number) {
    const todoItem = this.todoItems.nth(index);
    const checkbox = todoItem.getByRole("checkbox");
    return await checkbox.isChecked();
  }

  async expectTodoVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async expectTodoCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }
}

import { test, expect } from "@playwright/test";
import { TodoPage } from "./pages/TodoPage";

test.describe("Todo アプリ", () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("新しい Todo を追加できる", async () => {
    await todoPage.addTodo("牛乳を買う");

    await todoPage.expectTodoCount(1);
    await todoPage.expectTodoVisible("牛乳を買う");
  });

  test("複数の Todo を追加できる", async () => {
    await todoPage.addTodo("牛乳を買う");
    await todoPage.addTodo("本を読む");
    await todoPage.addTodo("運動する");

    await todoPage.expectTodoCount(3);
  });

  test("Todo を削除できる", async () => {
    await todoPage.addTodo("牛乳を買う");
    await todoPage.addTodo("本を読む");
    await todoPage.expectTodoCount(2);

    await todoPage.deleteTodo(0);
    await todoPage.expectTodoCount(1);

    const remainingText = await todoPage.getTodoText(0);
    expect(remainingText).toContain("本を読む");
  });

  test("Todo を完了済みにできる", async () => {
    await todoPage.addTodo("牛乳を買う");

    const isCompleted = await todoPage.isTodoCompleted(0);
    expect(isCompleted).toBe(false);

    await todoPage.toggleTodo(0);

    const isCompletedAfter = await todoPage.isTodoCompleted(0);
    expect(isCompletedAfter).toBe(true);
  });

  test("完了済みの Todo を未完了に戻せる", async () => {
    await todoPage.addTodo("牛乳を買う");
    await todoPage.toggleTodo(0);

    expect(await todoPage.isTodoCompleted(0)).toBe(true);

    await todoPage.toggleTodo(0);
    expect(await todoPage.isTodoCompleted(0)).toBe(false);
  });
});

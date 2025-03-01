test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(
    //"https://super-duper-eureka-pjw94xp47qrv3rq64-3000.app.github.dev/api/v1/status",
    "http://localhost:3000/api/v1/status",
  );
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual("100");
  expect(responseBody.dependencies.database.opened_connections).toEqual("1");
});

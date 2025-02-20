test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(
    "https://super-duper-eureka-pjw94xp47qrv3rq64-3000.app.github.dev/api/v1/status",
  );
  expect(response.status).toBe(200);
});

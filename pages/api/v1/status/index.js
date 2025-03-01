import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const version = await database.query("show server_version;");
  const databaseVersionValue = version.rows[0].server_version;

  const maxconnections = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxconnections.rows[0].max_connections;

  const actualConnections = await database.query(
    "SELECT count(*) FROM pg_stat_activity WHERE datname like 'local_db';",
  );
  const actualConnectionsValue = actualConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: maxConnectionsValue,
        opened_connections: actualConnectionsValue,
      },
    },
  });
}

// SELECT version();
// SHOW max_connections;
// SELECT count(*) FROM pg_stat_activity WHERE pid <> pg_backend_pid();
export default status;

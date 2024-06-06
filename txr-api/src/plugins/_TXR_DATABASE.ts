import knex from "knex";
export default async (expectedOptions: any, job: any, prevJobData: any, successCallback: (data: any) => void) => {
    const providedOptions = job?.options
    let clients: string[] = expectedOptions?.client?.split("|")
    clients = clients.map((client: string) => {
        client = client.trim()
        client = client.replaceAll("\'", "")
        return client
    })

    if (!clients.includes(providedOptions?.client)) {
        console.error(`Failed to execute job ${job?.id}. Reason: Invalid option client provided`)
        return
    }

    if (providedOptions?.database !== "" && providedOptions?.user !== "" && providedOptions?.password !== "") {
        const knexConfig = {
            client: providedOptions?.client,
            connection: {
              connectionString: providedOptions?.connection_string,
              host: providedOptions?.host,
              port: providedOptions?.port,
              database: providedOptions?.database,
              user: providedOptions?.user,
              password: providedOptions?.password,
              ssl: providedOptions?.password ? { rejectUnauthorized: false } : false,
            },
            pool: {
              min: 2,
              max: 2,
            },
            migrations: {
              tableName: "knex_migrations",
            },
        }

        const databaseConnection = knex(knexConfig);

        let query = providedOptions?.query;

        try {
            // Check if the query contains $PREV_OUTPUT
            if (query.includes('$PREV_OUTPUT')) {
              // Check the number of items in prevJobData
              const isSingleRowInsert = Array.isArray(prevJobData) ? prevJobData.length === 1 : false;
      
              if (isSingleRowInsert) {
                // If it's a single-row insert, generate the query for a single row
                const columns = Object.keys(prevJobData[0]).join(', ');
                const values = Object.values(prevJobData[0]).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
      
                query = query.replace('$PREV_OUTPUT', `(${columns}) VALUES (${values})`);
              } else {
                // If it's not a single-row insert, replace $PREV_OUTPUT with JSON stringified array
                query = query.replace('$PREV_OUTPUT', JSON.stringify(prevJobData));
              }
            }

            let data: any
            await databaseConnection.raw(query).then((results: any) => {
              data = JSON.stringify(results?.rows)
              successCallback(data)
            })
        } catch (error) {
            console.error('Error executing query:', error);
            databaseConnection.destroy();
        } finally {
            // Always destroy the database connection
            databaseConnection.destroy();
        }
    }


}
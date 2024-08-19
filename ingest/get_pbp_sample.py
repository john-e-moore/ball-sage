import duckdb
import pandas as pd

# Connect to the DuckDB database (use your database file or :memory: for in-memory database)
conn = duckdb.connect('app/data/ballsage.duckdb')

# Query the first 500 rows of a specific table
query = "SELECT * FROM play_by_play LIMIT 500;"
df = conn.execute(query).fetchdf()

# Save the result to a CSV file
df.to_csv('app/data/play-by-play_2013-2023.csv', index=False)

# Close the connection
conn.close()

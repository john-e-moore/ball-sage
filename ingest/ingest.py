import pandas as pd
import nfl_data_py as nfl
import duckdb
import json
import time
import sys
from datetime import datetime

def generate_timestamp():
    return datetime.now().strftime('%Y%m%d%H%M%S')

def write_weekly_cols():
    with open('app/data/nfl_weekly_cols', 'w') as f:
        weekly_cols_str = nfl.see_weekly_cols().to_series().to_string(index=False)
        f.write(weekly_cols_str)
    print("Weekly cols saved.")

def write_pbp_cols():
    with open('app/data/nfl_pbp_cols', 'w') as f:
        pbp_cols_str = nfl.see_pbp_cols().to_series().to_string(index=False)
        f.write(pbp_cols_str)
    print("Play-by-play cols saved.")

def insert_df_to_duckdb(df: pd.DataFrame, duckdb_filepath: str, table: str) -> None:
    with duckdb.connect(database=duckdb_filepath) as conn:
        conn.execute(f'CREATE TABLE IF NOT EXISTS {table} AS SELECT * FROM df WHERE FALSE')
        conn.execute(f'INSERT INTO {table} SELECT * FROM df') 

def query_tables(duckdb_filepath: str) -> list:
    with duckdb.connect(database=duckdb_filepath) as conn:
        query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'main';"
        return conn.execute(query).fetchall()

def export_duckdb_schema(filepath) -> None:
    pass

if __name__ == "__main__":
    
    ################################################################################
    # Ingest
    ################################################################################
    start_year = 2013
    end_year = 2024
    years = [year for year in range(start_year, end_year)]
    duckdb_filepath = 'app/data/ballsage.duckdb'

    """
    # Play-by-play data
    #write_pbp_cols()
    df = nfl.import_pbp_data(years=years, downcast=True, cache=False, alt_path=None)
    insert_df_to_duckdb(df, duckdb_filepath, 'play_by_play')

    # Write weekly player data columns to text file.
    write_weekly_cols()

    # Weekly player data
    df = nfl.import_weekly_data(years)
    #df.to_csv('./data/weekly-players_2013-2023.csv')
    #print("Weekly player data saved.")
    insert_df_to_duckdb(df, duckdb_filepath, 'weekly_players')
    print("weekly_players inserted.")

    time.sleep(2)

    # Scoring lines
    df = nfl.import_sc_lines(years)
    insert_df_to_duckdb(df, duckdb_filepath, 'weekly_sc_lines')
    print("weekly_sc_lines inserted.")

    time.sleep(2)

    # Officials
    df = nfl.import_officials(years)
    insert_df_to_duckdb(df, duckdb_filepath, 'officials')
    print("officials inserted.")

    time.sleep(2)

    # Draft picks
    df = nfl.import_draft_picks(years)
    insert_df_to_duckdb(df, duckdb_filepath, 'draft_picks')
    print("draft_picks inserted.")

    time.sleep(2)

    # Combine Data
    df = nfl.import_combine_data(years, ['QB', 'RB', 'WR', 'TE'])
    insert_df_to_duckdb(df, duckdb_filepath, 'combine_data')
    print("combine_data inserted.")

    """
    ################################################################################
    # Export schema
    ################################################################################

    # Query tables
    tables = query_tables(duckdb_filepath)

    # Write schema
    schema = {}
    with duckdb.connect(database=duckdb_filepath) as conn:
        for table, in tables:
            # Get the column information for each table
            columns_query = f"PRAGMA table_info('{table}');"
            columns = conn.execute(columns_query).fetchall()
            
            schema[table] = [
                {
                    "column_name": column[1],
                    "data_type": column[2],
                    # TODO: add descriptions
                }
                for column in columns
            ]

    # Save the schema to a JSON file
    timestamp = generate_timestamp()
    with open(f'app/data/ballsage-schema_{timestamp}.json', 'w') as f:
        json.dump(schema, f, indent=4)

    # Optionally, print the JSON schema to pass it as context
    print(json.dumps(schema, indent=4))

    

    
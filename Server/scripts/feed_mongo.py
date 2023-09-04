from pymongo import MongoClient
from dotenv import load_dotenv
import pandas as pd
import os
load_dotenv()

MONGO_URI=os.getenv("MONGO_URI")
# print(MONGO_URI)

# Read the clean csv file
current_dir = os.path.dirname(__file__)
clean_csv_file = os.path.join(current_dir, "../mongodb_uploads/cleaned.csv")

clean_data = pd.read_csv(clean_csv_file)


# connection to Mongo
client = MongoClient(MONGO_URI)
db = client['Blue[i]']
collection = db['claim']

# convert data to dictionary and insert
data_dict = clean_data.to_dict(orient='records')

collection.insert_many(data_dict)

client.close()
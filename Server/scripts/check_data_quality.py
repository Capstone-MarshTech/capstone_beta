import pandas as pd
from ydata_profiling import ProfileReport
import os

current_dir = os.path.dirname(__file__)
clean_csv_file = os.path.join(current_dir, "../mongodb_uploads/cleaned.csv")

clean_data = pd.read_csv(clean_csv_file)

# basic information
print("Basic Information: ")
print(clean_data.info())
print(clean_data.head())

# check for missing values
print("Missing values from each column: ")
print(clean_data.isnull().sum())

# check unique values
print("Unique values from each column: ")
for col in clean_data.select_dtypes(include=['object']).columns:
    print(f'Column: {col}, Unique values: {clean_data[col].unique()}')
    
# check for duplicates
duplicate_rows = clean_data[clean_data.duplicated()]
print(f'Duplicate rows:\n{duplicate_rows}')

# data summary
print("Data sumary: ")
print(clean_data.describe())

# Save profile summary of the data to html file 
profile = ProfileReport(clean_data, title="Profile Report")

profile.to_file("report.html")

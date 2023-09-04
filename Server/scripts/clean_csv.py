import pandas as pd
import os

current_dir = os.path.dirname(__file__)
input_file_path = os.path.join(current_dir, "../data/demo_original.csv")
output_file_path = os.path.join(current_dir, "../mongodb_uploads/cleaned.csv")

#  read original csv
input_file = input_file_path
output_file = output_file_path


data = pd.read_csv(input_file)

# only keep these columns:
columns_to_keep = ["claim_number",
                   "client_name",
 "effective_date",
 "cleansed_policyyear",
"total_net_paid",
 "total_net_os",
 "total_net_incurred",
 "open_claim",
"closed_claim",
"zero_value_claim",
"loss_banding",
 "marsh_line_of_business_1",
 "marsh_line_of_business_2"]

#  store the new csv file to mongodb_uploads
selected_data = data[columns_to_keep]

# convert types
# selected_data.loc[:, "effective_date"] = pd.to_datetime(selected_data["effective_date"])
selected_data.loc[:, "open_claim"] = selected_data["open_claim"].astype(bool)
selected_data.loc[:, "closed_claim"] = selected_data["closed_claim"].astype(bool)
selected_data.loc[:, "zero_value_claim"] = selected_data["zero_value_claim"].astype(bool)

# selected_data.loc[:, "total_net_paid"] = selected_data["total_net_paid"].astype(float).apply(lambda x: f"{x:.2f}")
# selected_data.loc[:, "total_net_incurred"] = selected_data["total_net_incurred"].astype(float).apply(lambda x: f"{x:.2f}")
# selected_data.loc[:, "total_net_os"] = selected_data["total_net_os"].astype(float).apply(lambda x: f"{x:.2f}")

# selected_data.loc[:, "total_net_paid"] = selected_data["total_net_paid"].astype(float).round(2)
# selected_data.loc[:, "total_net_incurred"] = selected_data["total_net_incurred"].astype(float).round(2)
# selected_data.loc[:, "total_net_os"] = selected_data["total_net_os"].astype(float).round(2)


# drop duplicate rows
selected_data = selected_data.drop_duplicates()

selected_data.to_csv(output_file, index=False)



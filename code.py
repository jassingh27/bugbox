import pandas as pd
 
# Load the CSV file
file_path = "path_to_your_csv.csv" // file exported from GA4 or looker stusdio
df = pd.read_csv(file_path)
 
# Filter rows containing '/blogs/' in the 'Page' column
filtered_df = df[df['Page'].str.contains('/blogs/')]
 
# Select the required columns
filtered_data = filtered_df[['Page', 'Pageviews']]
 
# Export the filtered data to a new CSV
filtered_data.to_csv("filtered_blog_data.csv", index=False)
 
print("Filtered data saved to filtered_blog_data.csv")

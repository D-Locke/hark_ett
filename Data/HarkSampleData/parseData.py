import pandas as pd
import json

df1 = pd.read_csv('Weather.csv')
df1 = df1.rename(columns={"Date": "RecordTime", "AverageTemperature": "AverageTemp"})
df1['RecordTime'] = pd.to_datetime(df1['RecordTime'],format='%d/%m/%Y %H:%M')
df1=df1.drop_duplicates()

df2 = pd.read_csv('HalfHourlyEnergyData.csv')
df2 = df2.rename(columns={"Timestamp": "RecordTime"})
df2['RecordTime']= pd.to_datetime(df2['RecordTime'])
df2=df2.drop_duplicates()



df = pd.merge(df1,df2)



df3 = pd.read_csv('HalfHourlyEnergyDataAnomalies.csv')
df3 = df3.rename(columns={"Timestamp": "RecordTime"})
df3['RecordTime']= pd.to_datetime(df3['RecordTime'])

df['IsAnomaly'] = df['RecordTime'].isin(df3['RecordTime'])

# df.to_json('Data.json', orient='records', lines=False, date_format='iso')

# from sqlalchemy import create_engine
# engine = create_engine('postgresql://username:password@localhost:5432/mydatabase')
# df.to_sql('table_name', engine)


import requests
headers = {'Content-Type': 'application/json'}
params = (('priority', 'normal'),)
api_url = "https://localhost:7129/api/energyrecords"



# DONT RUN BELOW AGAIN - ITS POPULATED!
# for (idx, row) in df.iterrows():
# 	jsonT = row.to_json(date_format='iso')	
# 	response = requests.post(api_url, data=jsonT, headers=headers, params=params, verify=False)
# 	print response.json()
# 	#print response.status_code



import json
import pickle

import pandas as pd

from os.path import join


from sklearn.ensemble import BaggingRegressor
from django.conf import settings
from django.shortcuts import render

from django.http import HttpRequest, JsonResponse


def __init__() -> (pd.DataFrame, BaggingRegressor):
    data = pd.read_csv(join(settings.BASE_DIR,'CarbonApi/Data/train.csv'),index_col='ID_LAT_LON_YEAR_WEEK')
   
    columns = data.columns
    for col in columns:
        if data[col].isna().sum() > 0:
            data[col].fillna(data[col].mean(), inplace=True)
    max_emission = data['emission'].max()
    mean_data = data.mean(axis=0)
    with open(join(settings.BASE_DIR,'CarbonApi/Model/BaggingRegressor'),'rb') as fp:
        model = pickle.load(fp)
    return data,mean_data,max_emission,columns, model
 
data,mean_data,max_emission,columns, model = __init__()
#############

def index(request):
    return JsonResponse({'Server':'Hello World'})

    

def getDataForLLAndPredict(latitude, longitude, year, week_no):
    rows = data[(data['latitude'] == latitude) & (data['longitude'] == longitude) & (data['year'] == year) & (data['week_no'] == week_no)]
    if rows.size == 0:

        rows = [mean_data]
        preds = model.predict([mean_data[columns[:4]]])
    else:

        preds = model.predict(rows[columns[:4]])
        rows = rows.values.tolist()
   
    return rows, preds

def predictEmission(request: HttpRequest):
    if request.method == 'POST':
        jdata = json.loads(request.body)
        data,preds = getDataForLLAndPredict(jdata.get('latitude',-0.51), jdata.get('longitude',29.29), jdata.get('year',2019),  jdata.get('weekNumber',1))
        respData = dict()
        for i, col in enumerate(columns):
            respData[col] = data[0][i]
        respData['EmissionPred'] = float(preds[0])
        respData['MaxEmission'] = max_emission
        return JsonResponse({'climateDataAndPredictions': respData})
    return JsonResponse({'Server':'Error Processing Request'})
    

# CMPE 272 Project

This document outlines the structure and details of two interlinked projects: `clima-carbonator` and `ClimaApi`. These projects are part of an initiative to monitor and predict atmospheric CO2 levels using machine learning techniques.

## clima-carbonator (React Frontend)

### Overview
The `clima-carbonator` is a React-based frontend application designed to provide users with a UI for predicting  CO2 levels. 

### Features
- Interactive charts and maps showing current CO2 levels.
- User-friendly interface for accessing CO2 prediction data.
- Real-time data updates from the `ClimaApi`.

### Installation and Running in Devlopment Environment
```bash
gh repo clone Moxi3231/CarbonEmission
cd clima-carbonator
npm install
npm run dev 
```

### Dependencies
- React
- Next.js
- MUI
## ClimaApi (Django-based API)

### Overview
`ClimaApi` is a Django-based backend application that processes satellite data to predict CO2 levels using machine learning algorithms.

### Features
- RESTful API endpoints for CO2 level data.
- Integration with machine learning models for CO2 prediction.
- Data ingestion from Sentinel-5P satellite dataset.

### Installation
```bash
gh repo clone Moxi3231/CarbonEmission
cd ClimaApi
pip install -r requirements.txt
python manage.py runserver
```

### Dependencies
- Django
- Scikit-Learn
- Pandas

### Machine Learning Models
- Linear Regression
- Lasso Regression
- Ensemble Regression Algorithms

### Usage
API endpoints can be accessed to retrieve or send data related to CO2 levels and predictions. The API interacts seamlessly with the `clima-carbonator` frontend for data visualization.

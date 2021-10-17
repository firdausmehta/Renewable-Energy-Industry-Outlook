# Outline
As someone who works as an analyst in the oil and gas industry I understand that now more than ever there is a global push to leave the fossil fuel age behind. Fossil fuels such as oil, coal, and natural gas are available in limited quantities only. As we keep extracting them, they may soon run out as they do not replenish as quickly as we use them. This is where the idea and inspiration for this research project stemmed from. 

Pollution levels from greenhouse gases has reached record levels and over the past 2 years millions of people around the world took to the streets to force policy makers to face up to the climate crisis. The world still heavily relies on fossil fuels and even continues subsidising them.

The machine learning models use data from the U.S. Energy Information Administration to forecast the difference between total renewable energy production and total energy consumption for the United States.

Using historical data from 1970 up to 2020 for renewable energy production and consumption in the United States of America; can we make accurate predictions on how these values will change for each of its states? 

# Research Questions
* How renewable energy production has changed and will continue to change across the United States?
 
* Can we use machine learning to predict each states capability to meet its energy consumption needs with renewable energy production?

# Visualisations
![download (1)](https://user-images.githubusercontent.com/80393628/137627306-7b0d3820-f3b7-4967-8243-1e91414b8d52.png) ![download](https://user-images.githubusercontent.com/80393628/137627307-367945ba-83a4-4aff-ad6b-c5287b6d002b.png)



# Analysis
* The data was mostly linear, over the years (1970-2017); population, energy price, renewable production, GDP numbers were all increasing

* Using simple linear regression model I predicted , renewable produuction, average energy price and population values for the future and used those predicted numbers to make a prediction for difference values
 
* Scaling the data didn't improve the R2 and MSE numbers

* I used miltiple-linear regression model to predict energy difference values for the future.

# Data Sources
* https://www.eia.gov/state/seds/seds-data-complete.php?sid=US#Consumption

* https://www.eia.gov/state/seds/seds-data-complete.php

* https://www.eia.gov/state/seds/seds-data-complete.php?sid=US#PricesExpenditures

* https://www.kaggle.com/washimahmed/usa-latlong-for-state-abbreviations


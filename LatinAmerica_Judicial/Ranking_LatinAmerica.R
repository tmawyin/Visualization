rm(list=ls())

## Libraries
library(rgdal)
library(leaflet)
library(tidyr)
library(dplyr)
library(xlsx)

## Loading the data
data <- read.xlsx2("BD-RankingPoderJudicial-AL.xlsx", header = FALSE, 
                  startRow = 3, endRow = 88, sheetIndex = 1, stringsAsFactors = FALSE)

data.countries <- read.xlsx2("BD-RankingPoderJudicial-AL.xlsx", header = FALSE, 
                   startRow = 1, endRow = 1, sheetIndex = 1, stringsAsFactors = FALSE)


## Adding the country names, and removing unnecessary columns
colnames(data)[4:28] <- data.countries[4:28]
colnames(data)[1] <- "Type"
## Let's remove the questions and the ID
data <- data[,c(1,4:28)]

## Convering values to numeric type
data[, 2:26] <- sapply(data[, 2:26], as.numeric)
data[,1] <- sapply(data[, 1], as.factor)

## Let's remove NAs
data <- data %>% filter(!is.na(data[,2]))

## Let's do a summary of the data
# First, we gather all the data to make sure we can add the values
data.melted <- data %>% gather(key = Country, value = Value, -Type)

# Next, we add all the values together to get a score.
data.summary <- data.melted %>% group_by(Type, Country) %>% 
                            summarise(Total = sum(Value))

##============================= MAP
# Let's have a varible displaying the type of data
type <- unique(data.summary$Type)
# Let's filter the data based on the information type
data.display <- data.summary %>% filter(Type == type[4])

# Reading the map - obtained via GIS
map <- readOGR("map", layer = "latinAmerica", verbose = FALSE)
map@data <- merge(map@data, data.display, by.x = "NAME", by.y ="Country",  sort = FALSE)

# Let's generate some colors
pal <- colorNumeric(palette = "Greens", domain = data.display$Total)

stamen_tiles <- "http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png"

## Setting up the pop-up
map.popup <- paste0("<strong>Country: </strong>",
                       map@data$NAME,
                       "<br><strong>Total: </strong>",
                       map[['Total']] )

latinAmerica.map <- leaflet(data = map) %>% addTiles() %>% 
    addTiles(urlTemplate = stamen_tiles) %>%
    setView(lat=--12.168, lng=-86.704, zoom = 4) %>%
    addPolygons(fillColor =~pal(map[['Total']]), 
                fillOpacity = 0.7, 
                color = "#BDBDC3", 
                weight = 1, 
                popup = map.popup) %>%
    addLegend("bottomright", 
              pal = pal, 
              values =~Total,
              title = paste("Ranking en",map@data$Type[1]),
              opacity = 1)

## Printing the map
latinAmerica.map 




# HTML Widget For Manhattan Plots

Traditional static manhattan plots are slow and ugly. Let's fix that with a little d3 and R!

## Example: 
This is assuming you've clone this repo onto your computer. 

```{r}
setwd("manhattanPlot")  #Get into the directory
devtools::install()     #Use devtools to install
library(manhattanPlot)  #Load it up. 

#Load in supplied data. 
d = read.csv('examples/data/males_small_data.csv')

manhattanPlot(d)        #Draw it!

#If you don't want a significance line: 
manhattanPlot(d, sigLine = FALSE)

```

## Notes: 

### Data: 

Make sure your data is a dataframe with one column with the SNP names and another with their corresponding p-values. You can then specify these to the plotting function. 

```{r}
manhattanPlot(d, snps_col = "SNP", pvals_col = "PVal")
```


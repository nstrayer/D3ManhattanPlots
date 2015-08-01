# HTML Widget For Manhattan Plots

Traditional static manhattan plots are slow and ugly. Let's fix that with a little d3 and R!

## Example: 
 

```{r}
library(devtools)
install_github("nstrayer/D3ManhattanPlots")

#Load in package data to test. 
d = sampleVals

manhattanPlot(d)        #Draw it!

#If you don't want a significance line: 
manhattanPlot(d, sigLine = FALSE)

#If you want it to load fast and forgo silly animations
manhattanPlot(d, animationSpeed = 50)
```

## Notes: 

### Data: 

Make sure your data is a dataframe with one column with the SNP names and another with their corresponding -log10-ed p-values. You can then specify these to the plotting function. 

```{r}
manhattanPlot(d, snps_col = "SNP", pvals_col = "PVal")
```


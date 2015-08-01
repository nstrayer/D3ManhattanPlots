# HTML Widget For Manhattan Plots

Traditional static manhattan plots are slow and ugly. Let's fix that with a little d3 and R!

Here's a [live example](http://nickstrayer.me/D3ManhattanPlots) (or just look in the `gh-pages` branch of this repo).  

## Example: 
 

```{r}
library(devtools)
install_github("nstrayer/D3ManhattanPlots")

#Load in package data to test. 
d = sampleVals

#Draw it!
manhattanPlot(d)        

#If you don't want a significance line: 
manhattanPlot(d, sigLine = FALSE)

#If you want it to load fast and forgo silly animations
manhattanPlot(d, animationSpeed = 50)
```

## Notes: 

### Data: 

Make sure your data is a dataframe with one column with the SNP names and another with their corresponding p-values. You can then specify these to the plotting function. If you have already -log10-ed your p-values then set the option `logged = TRUE`. 

```{r}
manhattanPlot(d, snps_col = "SNP", pvals_col = "PVal")
```

Two datasets have been included for ease of testing: 

- `sampleVals` are real data from Klein et al.'s 2005 science paper (run `?sampleVals` for more info and citation). 
- `random` which is randomly generated values with one significant snp (according to a bonferroni correction). 


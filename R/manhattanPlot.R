#' D3 Manhattan Plot Visualizer
#'
#' This generates an interactive manhattan plot using d3.js.
#' Mouse over snps to see name and pvalue. Now you don't have to waste your time
#' writing R code to find significant snp identities.
#'
#' @param dataset Your data. Contains SNP names and PValues as columns of a dataframe.
#' @param width Set custom width.
#' @param height Set custom height.
#' @param snps_col The name of the column of your dataframe containing the SNP names. Defaults to "SNP".
#' @param pvals_col The name of the column of your dataframe containing the PValues. Defaults to "PVal".
#' @param sigLine Draw a line indicating significance threshold according to a conservative bonferroni correction.
#' @param animationSpeed How fast you want the program to animate in milliseconds. To turn off set to 0.
#' @keywords manhattan plot, statistical genetics, GWAS
#'
#' @examples
#' #Load sample dataset from the package.
#' d = sampleVals
#' #and plot. It's that easy.
#' manhattanPlot(d, sigLine = FALSE)
#'
#' @import htmlwidgets
#'
#' @export

manhattanPlot <- function(dataset, width = NULL, height = NULL,
    snps_col  = "SNP",
    pvals_col = "PVal",
    sigLine   = TRUE,
    animationSpeed = 1000) {

    # create a list that contains the settings
    settings <- list(
      snps_col  = snps_col,
      pvals_col = pvals_col,
      sigLine   = sigLine,
      animationSpeed = animationSpeed
    )

    #This is where data manipulation will go.
    data  = data.frame(dataset[snps_col], dataset[pvals_col])


    # pass the data and settings using 'x'
    x <- list(
      data = data,
      settings = settings
    )


  # create widget
  htmlwidgets::createWidget(
    name = 'manhattanPlot',
    x,
    width = width,
    height = height,
    package = 'manhattanPlot'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
manhattanPlotOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'manhattanPlot', width, height, package = 'manhattanPlot')
}

#' Widget render function for use in Shiny
#'
#' @export
renderManhattanPlot <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, manhattanPlotOutput, env, quoted = TRUE)
}

#' Sample SNPS and Pvals from Klein et al. 2004
#'
#' This is a subset of the data from the 2005 paper in Science
#' "Complement Factor H Polymorphism in Age-Related Macular Degeneration". The
#' data are subsetted to the 100 most significant snps when stratifying by the
#' male gender.
#'
#' @format A data frame with 100 rows and 2 columns:
#' \describe{
#'   \item{SNP}{Snp names. Character}
#'   \item{PVal}{-log10 of the pvalues. Float}
#' }
#' @source Klein, R. J., Zeiss, C., Chew, E. Y., Tsai, J. Y., Sackler, R. S., Haynes,
#' C., ... & Hoh, J. (2005). Complement factor H polymorphism in age-related
#' macular degeneration. Science, 308(5720), 385-389.
"sampleVals"

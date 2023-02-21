# Lighthouse Report Building

## Create a sites.txt file
Create a sites.txt file with a list of URLs to batch test

Example
```
https://www.google.com
https://abc.net.au
```


## Build the report

To run simply kick off the lighthouse-batch job (note it takes about 20 minutes)

```
npx lighthouse-batch -f sites.txt
```

Once that's done you can generate the summary.csv file using the node script

```
node ./summary-to-csv.js
```

I normally clean it up a little and convert it to an Excel sheet before saving somewhere permanent.

# 24 - Data Loaders

[ObservableHQ Loaders](https://observablehq.com/framework/loaders)

- Script that runs and outputs to standard out
    - Remember to debug to standard error!
- Script is run locally as part of `npm dev` or `npm build`
- Cached by Observable in `.observablehq/cache/data`
- Added to the build only if statically referenced by `FileAttachment`.


- Extensions determine file type
    - `simpsons.csv.js` -> `CSV`
    - `simpsons.json.sh` -> `JSON`


- Single file
- Multiple files for a loader can be zipped into a single file
    - `simpsons.zip.ts` -> `ZIP` of some sort


- Static data can be included as well
    - `simpsons.csv`
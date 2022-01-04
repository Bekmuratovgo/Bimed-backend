# Documentation for project "backend.bimed.kg"

-   This directory includes the following :

1.  Project structure:           [structure]
2.  Database architecture:       [db]
3.  APIs manual:                 [api]
4.  Notes sections:              [notes]

### 1C integration

-   Integration rules:
    1.  1C used to add **new** items **ONLY**
    2.  **updating** existing items goes through admin panel  **ONLY**
    3.  external id is used as the indexing reference
    4.  items on 1C with no external id/s will NOT be saved - to avoid conflicts
    5.  existing items will NOT be updated through this process - 1C integration
    6.  items with NO images are allowed to be saved - images
        can be added through admin panel
    7.  a list of **ignored** items is saved to a file under `1C/` directory
    8.  a list of **newly saved** items is saved to a file under `1C/` directory
    9.  a list of **processed items found to be already existing on the database**
        is saved to a file under `1C/` directory

_Note_ `The documentation process is still in progress`

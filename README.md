# Nurture Resource Directory
#### File structure:
```
/src
  /api
  /assets
    /fonts
    /images
  /components
    /ComponentName
      ComponentName.tsx
      index.ts
    ...
  /features
    /FeatureName
      /components
      /layouts
      /styles
      /utils
    ...
  /layouts
    LayoutName.tsx
    ...
  /styles
    components.scss
    mobile.scss
    ...
    index.scss
  /utils
  ```
the root directory is treated like a feature (with a few extra features). In each feature directory (and the root directory) stores helper functions (like hooks) in the utils directory. Each feature can have a components/ directory to keep all the reusable components.  
Changelog for **PrimeNG**
=========================

> ![IMPORTANT NOTE](./red-alert-icon.16.svg)
> <span style="font-size: 24px; font-variant: small-caps;"> **note** </span>
> ![IMPORTANT NOTE](./red-alert-icon.16.svg)
> 
> This is the changelog for the [**OnSite** fork](https://github.com/chorpler/primeng).

---

# **v6.2.4** <span style="font-size: 12px; font-style: italic">(2023-02-25)</span>

**Changes:**

**<u>Calendar</u>**

- Add buttons for "now" and "OK" in button bar
- Add scroll wheel increment/decrement for editable time
- Fix bug in editable minutes input leading to `NaN`

# **v6.2.3** <span style="font-size: 12px; font-style: italic">(2023-02-23)</span>

**Changes:**

**<u>Showcase</u>**

- Tracking and analytics disabled

**<u>Table</u>**

- Added `"__obj"` filter
  - **Default:** N/A
  - **Description**: If `filter()` is run with `__obj` as the field name, it will compare each entire item instead of item's field's values. Useful for filtering by object.

# **v6.2.2** <span style="font-size: 12px; font-style: italic">(2023-02-22)</span>

**Changes:**

**<u>Calendar</u>**

- Added `timeReadOnly` input value
  - **Default:** `true`
  - **Description**: If `false`, time fields are editable input fields

# **v6.2.1** <span style="font-size: 12px; font-style: italic">(2023-02-02)</span>

**Changes:**

**<u>MultiSelect</u>**

- Added `labelSeparator` input value
  - **Default:** `", "` *(comma followed by space)*
  - **Description:** Uses this string when creating the combined label from multiple selected values. Does not add spaces, so make your separator include a space if you need one.
  - **Example:**
  - Template (HTML) file:
    ```html
    <p-multiSelect #recipientMultiselect [styleClass]="'multiselect-employees'" [panelStyleClass]="'multiselect-employees-panel'" [options]="employeeMenu" [(ngModel)]="recipients" defaultLabel="All Employees" [maxSelectedLabels]="20" selectedItemsLabel="{0} employees" labelSeparator="; " (onChange)="updateRecipientList($event)"></p-multiSelect>
    ```

  - Component (TypeScript) file:
    ```typescript
    // Property of component class
    public sitesFilterFields = [
      "label",
      "value.sitefilterable",
    ].join(',');
    ```
    - `sitefilterable` property of each `value` item should return a big string to be compared against.
    - In this case, each `Jobsite` object has a property `sitefilterable` which is a getter. The getter returns a string:
    ```typescript
    /* ... Other class properties and methods ...*/
    get sitefilterable():string {
      const filterStrings = [
        this._id,
        this.getSiteNameOnSchedule(),
        this.getSiteNameInMenus(),
        this.getSiteClientName(),
        this.getSiteLocationName(),
        this.getSiteDepartmentName(),
      ];
      return filterStrings.join(", ");
    }
    ```


# **v6.2.0** <span style="font-size: 12px; font-style: italic">(2022-10-31)</span>

**<u>MultiSelect</u>**

- Added `filterBy` input value
  - **Default:** `null` (filters by `label` value of each `SelectItem`)
  - **Description:** Useful when you don't just want to filter by the label text itself, but by additional properties of the items.
  - **Example:**
  - Template (HTML) file:

  ```html
  <p-multiSelect #jobsiteMultiselect [styleClass]="'site-multiselect'" defaultLabel="Choose work site(s)" [options]="sitesMenu" [(ngModel)]="selectedSites" [filter]="enableSitesMenuFilterable" [filterPlaceHolder]="sitesFilterPlaceholder" [filterBy]="sitesFilterFields" [resetFilterOnHide]="filterResetHideSites" [maxSelectedLabels]="1" [selectedItemsLabel]="selectedSitesLabel" (onChange)="updateSites($event)"></p-multiSelect>`
  ```

  - Component (TypeScript) file:

  ```typescript
  // Property of component's class
  public sitesFilterFields = [
    "label",
    "value.sitefilterable",
  ].join(',');
  ```
  - `sitefilterable` property of each `value` item should return a big string to be compared against.
  - In this case, each `Jobsite` object has a getter `sitefilterable` that returns:
  ```typescript
  /* ... Other class properties and methods ...*/
  get sitefilterable():string {
    const filterStrings = [
      this._id,
      this.getSiteNameOnSchedule(),
      this.getSiteNameInMenus(),
      this.getSiteClientName(),
      this.getSiteLocationName(),
      this.getSiteDepartmentName(),
    ];
    return filterStrings.join(", ");
  }
  ```



[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Join the chat at https://gitter.im/primefaces/primeng](https://badges.gitter.im/primefaces/primeng.svg)](https://gitter.im/primefaces/primeng?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/primeng.svg)](https://badge.fury.io/js/primeng)
[![Build Status](https://travis-ci.org/primefaces/primeng.svg?branch=master)](https://travis-ci.org/primefaces/primeng)

# PrimeNG

> 
> ## <u>![IMPORTANT NOTE](./red-alert-icon.16.svg) **NOTE** ![IMPORTANT NOTE](./red-alert-icon.16.svg)</u>
> 
> <span style="color: red">**You probably don't want to use this fork. If you do … beware.**</span>
> 
> This is the **OnSite** fork of PrimeNG 6.1.3. I forked it for internal enterprise applications that can't update to PrimeNG 7.x or beyond. So far, it's mostly just adding small features to `MultiSelect`.
>
> Almost certainly not useful to anybody but me, as I'm willing to tolerate not updating past PrimeNG 6.x because I don't want the true live reload when changing SCSS files to stop, and updating Angular and PrimeNG will break it.
>
> Testing is haphazard and rushed.
>
>
> The original **README.md** begins below.

---

UI Components for Angular

See [PrimeNG homepage](http://www.primefaces.org/primeng) for live showcase and documentation.

![alt text](https://www.primefaces.org/wp-content/uploads/2018/05/primeng-sidebar.svg "PrimeNG")

PrimeNG is a collection of rich UI components for Angular. All widgets are open source and free to use under MIT License. PrimeNG is developed by [PrimeTek Informatics](http://www.primetek.com.tr), a vendor with years of expertise in developing open source UI solutions. For project news and updates, please follow us on [twitter](https://twitter.com/prime_ng) and visit our [blog](https://www.primefaces.org/blog).

 - **80+ Components:** The most complete set of native widgets featuring 80+
   easy to use components for all your UI requirements.

- **Open Source:** Hosted at GitHub, all widgets are open source and free to use under MIT license. Feel the power of open source.

- **Productivity:** Allocate your valuable time on business logic rather than dealing with the complex user interface requirements.

- **Themes:** Don't get tied up in just one look&feel. Choose from a variety of options including material and flat design.

- **Templates:** Professionally designed highly customizable native Angular CLI application templates to get started in no time.

- **Mobile:** Enhanced mobile user experience with touch optimized responsive design elements.

---

#### Download

PrimeNG is available at NPM, if you have an existing application run the following command to download it to your project.

```
npm install primeng --save
npm install primeicons --save
```

#### Angular CLI Integration

Add PrimeNG and PrimeIcons as a dependencies.

```
"dependencies": {
  //...
  "primeng": "^6.1.2",
  "primeicons": "^1.0.0-beta.10"
},
```

Configure required styles at the styles section, example below uses the Nova Light theme.

```
"styles": [
  "node_modules/primeng/resources/themes/nova-light/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css",
  //...
],
```

That is all, you may now import PrimeNG components, for a working example visit the [PrimeNG CLI QuickStart sample](https://github.com/primefaces/primeng-quickstart-cli) at GitHub.

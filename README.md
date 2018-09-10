# Xsolla-clients-list

> Xsolla summer school 2018 graduation work

## Table of Content

- [Demo](#demo)
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Technologies](#technologies)
- [Tests](#tests)
- [Support](#support)

---

## Demo

Demo on heroku **https://xsolla-clients-list.herokuapp.com/**

---

## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/IlyaKukarkin/xsolla-clients-list/`

### Setup

> install npm dependencies

```shell
$ npm install
```

> Run the app

```shell
$ npm run dev
```

---

## Features

- Create clients, cars, flats and add them to contract
- Edit and delete each entity
- Switch between tables with tabs
- Input data validation
- On screen errors and messages
- Mobile version.

---

## Usage

### Create clients, cars, flats and add them to contract

To create entity click button "Add" on the page of needed entity. "Create client page" looks like this.

![add client](https://i.gyazo.com/f2eddd375ea7f1f1022a23ee8849f5ab.png)

If all your insert data passed throught, created client will appear in the clients table.

![clients list](https://i.gyazo.com/638fac94a207094c30ff2a1f96ff8a3e.png)

After you created at least one client and one flat or car, you can create a contract. "Create contract page" looks like this.

You can choose in dropdown list client for contract and select on of object for evaluation (flat or car). Depending on selected object in dropdown will appear enteties of this object category.

![add contract](https://i.gyazo.com/fa1c4ef4e241fc06c98ea57b234b3e1c.png)

### Edit and delete each entity

You can edit and delete each entity. For example "Edit client page" looks like this.

![edit client](https://i.gyazo.com/0b66b15853fc6497315f44756bf5407d.png)

### Switch between tables with tabs

On the top of a page there are tabs for navigation beetween entities

![tabs](https://i.gyazo.com/473af8f861d459e69331a31a6dc3bbfb.png)

### Input data validation

Each "Add" or "Edit" pages provided with data validation to prevent wrong data input

![validation](https://i.gyazo.com/39d8aaede5be8ee0274b28ca20755183.png)

### On screen errors and messages

There are always some things that user might do, which are not possible. On screenshots below examples of on screen errors and messages

![Errors](https://i.gyazo.com/e1736ec20e678c27084efe876b198fe0.png)

### Mobile version.

Many people nowadays using their cell phones for almoust everything. Thats why mobile version is always appreciated

![Mobile](https://i.gyazo.com/2d2e74426d8669f6b09cc7ffa91838e5.png)

---

## Technologies

- [Vue](https://vuejs.org/) - web framework
- [Vuex](https://vuex.vuejs.org/ru/guide/) - state management pattern
- [NPM](https://www.npmjs.com/) - package manager
- [Webpack](https://webpack.js.org/) - static module bundler
- [LocalForage](https://localforage.github.io/localForage/) - storage library for JavaScript
- [Bulma](https://bulma.io/) - CSS framework for styling
- [GitHub](https://github.com/) - version control
- [Jest with vue-test-utils](https://vue-test-utils.vuejs.org/) - javaScript testing with vue-test-utils
- [Eslint](https://eslint.org/) - javaScript linter
- [CircleCI](https://vuejs.org/) - continuous integration platform for linting and testing
- [Heroku](https://vuejs.org/) - cloud application platform for deploument

---

## Tests

Lint tests:

> run linting test

```shell
$ npm run lint
```

Result of lint testing:

![lint](https://i.gyazo.com/50b9917e15356d9a3d70e628b87e60fd.png)

No lint errors in project!

Unit tests:

> run tests

```shell
$ npm run test
```

Using vue-test-utils we can create local version of our store and test existing mutations.

For example: create client -> add him to the local store -> check store state

```javascript
test('add client into store', () => {
  const localVue = createLocalVue();                     // Calling local vue
  localVue.use(Vuex);                                    // Use Vuex
  const store = new Vuex.Store(cloneDeep(storeConfig));  // Create local clients store
  expect(store.state.clients).toEqual({});               // Check if store empty
  let client = {surname: 'Ivanov', name: 'Ivan', patronymic: 'Ivanovich', email: 'ivan777@gmail.com', phone: '89194651456', address: 'Lenina 50', series: 1638, number: 164162, birthDate: '18-11-1970'};
  store.commit('CREATE_CLIENT', {client: client});       // Add to the store client

  // Check if created client in the store
  expect(store.state.clients).toEqual({'undefined': {'address': 'Lenina 50', 'birthDate': '18-11-1970', 'email': 'ivan777@gmail.com', 'name': 'Ivan', 'number': 164162, 'patronymic': 'Ivanovich', 'phone': '89194651456', 'series': 1638, 'surname': 'Ivanov'}});
});
```

Each entity have 3 mutations - create, update and delete. That means for our 4 entities (Clients, Flats, Cars, Contracts) there will be in total 12 tests

Result of unit testing:

![lint](https://i.gyazo.com/cf860fcb534d35145889bf4d0aa6c714.png)

---

## What could i've done better

- Create clients, cars and flats while creating contract, that would make user's life easier
- Add search for each entity
- Add pagination
- Sort each table by clicking the headers
- Fix my code with Code Climate
- Fix "Entity already exist" window. Don't know what happend to it 🤷‍♂️
- Fix reload issue on heroku.

---

## Support

Reach out to me at one of the following places!

- E-mail at ilya1196@yandex.ru
- Telegram at <a href="https://t.me/ilyakukarkin" target="_blank">`@ilyakukarkin`</a>

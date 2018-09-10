# Xsolla-clients-list

> Xsolla summer school 2018 graduation work

[![INSERT YOUR GRAPHIC HERE](https://i.gyazo.com/f003bfeaefb8c58e8f8af86ba6ebe527.png)]()

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
- View all entities in table
- Switch between tables with tabs
- Input data validation
- On screen errors and messages
- Mobile version.

---

## Usage

### Create clients, cars, flats and add them to contract

To create entity click button "Add" on the page of needed entity. "Create client page" looks like this.

INSERT SCREENSHOT HERE!!

If all your insert data passed throught, created client will appear in the clients table.

INSERT SCREENSHOT HERE!!

After you created at least one client and one flat or car, you can create a contract. "Create contract page" looks like this.

INSERT SCREENSHOT HERE!!

You can choose in dropdown list client for contract and select on of object for evaluation (flat or car). Depending on selected object in dropdown will appear enteties of this object category.

INSERT SCREENSHOT HERE!!

!Может сделать скрин из 4-ёх скринов, многовато скринов получается здесь!

### Edit and delete each entity
### View all entities in table
### Switch between tables with tabs
### Input data validation
### On screen errors and messages
### Mobile version.

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

> run linting test

```shell
$ npm run lint
```

Result of testing:

INSERT SCREENSHOT HERE!!

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

Result of testing:

INSERT SCREENSHOT HERE!!

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
